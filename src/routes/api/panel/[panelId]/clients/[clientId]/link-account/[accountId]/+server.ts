import { json, redirect, text } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { decodeToken, isTokenValid } from '$lib/utils/tokenParser';
import { userHasAccessOnPanel } from '$lib/utils/authValidation';

export async function GET({ request, cookies, params }) {
    const client = await prisma.panelClient.findFirst({
        where: {
            id: parseInt(params.clientId),
        }
    })
    if (!client) return json({result: "error", message: "Client not found"});
    if (client.panelId != parseInt(params.panelId)) return json({result: "error", message: "You cannot modify this client"}); 

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
            clients: {
                connect: {
                    id: client.id,
                }
            }
        },
        include: {
            clients: true,
        }
    });

    return json({
        result: "ok"
    });
}