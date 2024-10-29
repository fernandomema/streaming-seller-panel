import { json, redirect, text } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { decodeToken, isTokenValid } from '$lib/utils/tokenParser';
import { userHasAccessOnPanel } from '$lib/utils/authValidation';

export async function GET({ request, cookies, params }) {
    const account = await prisma.panelAccounts.findFirst({
        where: {
            id: parseInt(params.accountId),
        }
    })
    if (!account) return json({result: "error", message: "Client not found"});
    if (account.panelId != parseInt(params.panelId)) return json({result: "error", message: "You cannot delete this client"}); 
    await prisma.panelAccounts.delete({
        where: {
            id: parseInt(params.accountId),
        }
    });
    return json({
        result: "ok"
    });
}