import { redirect, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { decodeToken, isTokenValid } from '$lib/utils/tokenParser';
import { userHasAccessOnPanel } from '$lib/utils/authValidation';

export async function load({ cookies, params }) {
    const token =  cookies.get('token');
    if (!token || !isTokenValid(token)) return redirect(302, '/login');
    const userId = decodeToken(token)!.userId;
    const userHasAccess = await userHasAccessOnPanel(userId, params.panelId);
    if (!userHasAccess) return redirect(302, '/login');
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

    return {
        account: account,
        linkableClients: linkableClients
    };
}