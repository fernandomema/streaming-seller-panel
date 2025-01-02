import { redirect, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { decodeToken, isTokenValid } from '$lib/utils/tokenParser';
import { userHasAccessOnPanel } from '$lib/utils/authValidation';

export async function load({ cookies, params }) {
    const panelId = parseInt(params.panelId);

    const clientCount = await prisma.panelClient.count({
        where: {
            panelId: {
                equals: panelId
            }
        }
    })

    const accountCount = await prisma.panelAccounts.count({
        where:{
            panelId: {
                equals: panelId
            }
        }
    });

    const daysUntilExpiry = 7;
    const currentDate = new Date();
    const expiryThreshold = new Date(currentDate);
    expiryThreshold.setDate(currentDate.getDate() + daysUntilExpiry);
    const accountsAboutToExpireCount = await prisma.panelAccounts.count({
        where: {
            panelId: {
                equals: panelId
            },
            expiresAt: {
                lte: expiryThreshold,
                gte: currentDate
            }
        }
    })

    const paymentsByMonthLastYear = await getPaymentsByMonthLastYear(panelId);
    const costsByMonthLastYear = await getAccountCostsByMonthLastYear(panelId);

    return {
        count: {
            clients: clientCount,
            accounts: accountCount,
            accountsAboutToExpire: accountsAboutToExpireCount,
            paymentsByMonthLastYear: paymentsByMonthLastYear,
            costsByMonthLastYear: costsByMonthLastYear,
            platforms: await getPlatformsCount(panelId),
            providers: await getProvidersCount(panelId),
        }
    };
}

async function getPaymentsByMonthLastYear(panelId: number) {
    const now = new Date()
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth() + 1, 1)
  
    const paymentsByMonth = await prisma.panelClientAccountPayment.groupBy({
      by: ['paymentDate'],
      where: {
        clientAccountStatus: {
          account: {
            panelId: panelId,
          },
        },
        paymentDate: {
          gte: oneYearAgo,
          lte: now,
        },
      },
      _sum: {
        amount: true,
      },
      orderBy: {
        paymentDate: 'asc',
      },
    });
  
    // Generate an array of all months in the last year in "YYYY-MM" format
    const allMonths = []
    for (let i = 0; i <= 11; i++) {
      const date = new Date(oneYearAgo.getFullYear(), oneYearAgo.getMonth() + i, 1)
      const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`
      allMonths.push(monthYear)
    }
  
    // Format the fetched data to an object with "YYYY-MM" keys
    const paymentsData = paymentsByMonth.reduce((acc: any, record) => {
      const month = record.paymentDate.getMonth() + 1
      const year = record.paymentDate.getFullYear()
      const monthYear = `${year}-${month.toString().padStart(2, '0')}`
      acc[monthYear] = record._sum.amount || 0
      return acc
    }, {})
  
    // Fill in missing months with a value of 0
    const formattedData = allMonths.reduce((acc: any, month) => {
      acc[month] = paymentsData[month] || 0
      return acc
    }, {})
  
    return formattedData
}

async function getAccountCostsByMonthLastYear(panelId: number) {
    const now = new Date()
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth() + 1, 1)
  
    const costsByMonth = await prisma.panelAccounts.groupBy({
      by: ['activatedAt'],
      where: {
        panelId: panelId,
        activatedAt: {
          gte: oneYearAgo,
          lte: now
        }
      },
      _sum: {
        buyCost: true
      },
      orderBy: {
        activatedAt: 'asc'
      }
    })
  
    // Generate an array of all months in the last year in "YYYY-MM" format
    const allMonths = []
    for (let i = 0; i <= 11; i++) {
      const date = new Date(oneYearAgo.getFullYear(), oneYearAgo.getMonth() + i, 1)
      const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`
      allMonths.push(monthYear)
    }
  
    // Format the fetched data to an object with "YYYY-MM" keys
    const costData = costsByMonth.reduce((acc: any, record) => {
      const month = record.activatedAt.getMonth() + 1
      const year = record.activatedAt.getFullYear()
      const monthYear = `${year}-${month.toString().padStart(2, '0')}`
      acc[monthYear] = record._sum.buyCost || 0
      return acc
    }, {})
  
    // Fill in missing months with a value of 0
    const formattedData = allMonths.reduce((acc: any, month) => {
      acc[month] = costData[month] || 0
      return acc
    }, {})
  
    return formattedData
}

async function getPlatformsCount(panelId: number) {
    return await prisma.panelPlatform.count({
        where: {
            panelId: {
                equals: panelId
            }
        }
    });
}

async function getProvidersCount(panelId: number) {
    return await prisma.panelProvider.count({
        where: {
            panelId: {
                equals: panelId
            }
        }
    })
}
