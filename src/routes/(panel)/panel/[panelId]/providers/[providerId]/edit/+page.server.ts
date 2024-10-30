import { redirect, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { decodeToken, isTokenValid } from '$lib/utils/tokenParser';
import { userHasAccessOnPanel } from '$lib/utils/authValidation';

export async function load({ cookies, params }) {
    const providerId = parseInt(params.providerId);
    const panelId = parseInt(params.panelId);
    const provider = await prisma.panelProvider.findFirst({
        where: {
            id: providerId
        },
        include: {
            accounts: true,
        }
    });

    if (!provider || provider.panelId != panelId) return redirect(302, '/panel/' + panelId + '/providers');

    const linkableAccounts = await prisma.panelAccounts.findMany({
        where: {
            AND: [
                { 
                    panelId: panelId,
                }, {
                    OR: [
                        { provider: null },
                        { provider: { id: { not: 1 } } },
                    ],
                }
            ]
        },
        include: {
            clients: true,
        }
    });


    return {
        provider: provider,
        linkableAccounts: linkableAccounts
    };
}