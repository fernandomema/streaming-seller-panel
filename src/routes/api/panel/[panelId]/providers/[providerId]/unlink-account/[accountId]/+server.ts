import { json, redirect, text } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { decodeToken, isTokenValid } from '$lib/utils/tokenParser';
import { userHasAccessOnPanel } from '$lib/utils/authValidation';

export async function GET({ request, cookies, params }) {
    const providerId = parseInt(params.providerId);
    const panelId = parseInt(params.panelId);

    const provider = await prisma.panelProvider.findFirst({
        where: {
            id: panelId,
        }
    })
    if (!provider) return json({result: "error", message: "Provider not found"});
    if (provider.panelId != parseInt(params.panelId)) return json({result: "error", message: "You cannot modify this provider"}); 

    const accountId = parseInt(params.accountId);
    const account = await prisma.panelAccounts.findFirst({
        where: {
            id: accountId,
        }
    });
    if (!account) return json({result: "error", message: "Account not found"});
    if (account.panelId != parseInt(params.panelId)) return json({result: "error", message: "You cannot modify this account"});

    await prisma.panelAccounts.update({
        where: {
            id: accountId,
        },
        data: {
            providerId: null,
        },
        include: {
            provider: true,
        }
    });

    return json({
        result: "ok"
    });
}