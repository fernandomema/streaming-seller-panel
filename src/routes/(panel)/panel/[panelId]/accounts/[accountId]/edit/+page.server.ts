import { redirect, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { decodeToken, isTokenValid } from '$lib/utils/tokenParser';
import { userHasAccessOnPanel } from '$lib/utils/authValidation';

export async function load({ cookies, params }) {
   
	const account = await prisma.panelAccounts.findFirst({
        where: {
            id: parseInt(params.accountId)
        },
        include: {
            clients: true,
            clientsStatus: true,
        }
    })

    const linkableClients = await prisma.panelClient.findMany({
        where: {
            panelId: parseInt(params.panelId),
            accounts: {
                none: {
                    id: parseInt(params.accountId)
                }
            }
        },
        include: {
            accounts: true,
        }
    });

    const linkableProviders = await prisma.panelProvider.findMany({
        where: {
            panelId: parseInt(params.panelId),
        },
        include: {
            accounts: true,
        }
    });

    const linkablePlatforms = await prisma.panelPlatform.findMany({
        where: {
            OR: [
                { panelId: parseInt(params.panelId) },
                { panelId: null }
            ]
        }
    });

    return {
        account: account,
        linkableClients: linkableClients,
        linkableProviders: linkableProviders,
        linkablePlatforms: linkablePlatforms
    };
}