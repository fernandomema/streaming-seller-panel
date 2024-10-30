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
                lte: expiryThreshold
            }
        }
    })

    return {
        count: {
            clients: clientCount,
            accounts: accountCount,
            accountsAboutToExpire: accountsAboutToExpireCount,
        }
    };
}