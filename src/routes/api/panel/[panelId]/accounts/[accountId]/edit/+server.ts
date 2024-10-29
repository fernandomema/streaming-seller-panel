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
    if (!account) return json({result: "error", message: "Account not found"});
    if (account.panelId != parseInt(params.panelId)) return json({result: "error", message: "You cannot delete this account"}); 

    const { email, password, expiresAt } = await request.json();
    
    await prisma.panelAccounts.update({
        where: {
            id: parseInt(params.accountId),
        },
        data: {
            email: email ?? account.email,
            password: password ?? account.password, 
            expiresAt: expiresAt ?? account.expiresAt,
        }
    });

    return json({
        result: "ok"
    });
}