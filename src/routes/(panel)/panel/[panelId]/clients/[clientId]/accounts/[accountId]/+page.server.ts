import { redirect, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { decodeToken, isTokenValid } from '$lib/utils/tokenParser';
import { userHasAccessOnPanel } from '$lib/utils/authValidation';

export async function load({ cookies, params }) {
   	
    const clientId = parseInt(params.clientId);
    const accountId = parseInt(params.accountId);
    const panelId = parseInt(params.panelId);

    const clientAccountStatus = await prisma.clientAccountStatus.findFirst({
        where: {
            clientId: clientId,
            accountId: accountId,
        },
        include: {
            client: true,
            account: {
                include: {
                    platform: true,
                }
            },
            payments: true,
        }
    });

    if (!clientAccountStatus) return redirect(302, `/panel/${params.panelId}/clients/${params.clientId}/edit`);
    if (clientAccountStatus.client.panelId != panelId || clientAccountStatus.account.panelId != panelId) return redirect(302, `/panel/${params.panelId}/clients/${params.clientId}/`);

    return {
        clientAccountStatus: clientAccountStatus,
    };
}