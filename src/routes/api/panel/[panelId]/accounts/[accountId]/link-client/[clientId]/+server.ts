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
    if (account.panelId != parseInt(params.panelId)) return json({result: "error", message: "You cannot modify this account"}); 

    const clientId = parseInt(params.clientId);
    const client = await prisma.panelClient.findFirst({
        where: {
            id: clientId,
        }
    });
    if (!client) return json({result: "error", message: "Client not found"});
    if (client.panelId != parseInt(params.panelId)) return json({result: "error", message: "You cannot modify this client"});

    await prisma.panelAccounts.update({
        where: {
            id: parseInt(params.accountId),
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