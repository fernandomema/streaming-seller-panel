import { json, redirect, text } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { decodeToken, isTokenValid } from '$lib/utils/tokenParser';
import { userHasAccessOnPanel } from '$lib/utils/authValidation';

export async function POST({ request, cookies, params }) {
    const { billingCycle, notes } = await request.json();
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

    const accountUpdated = await prisma.panelAccounts.update({
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

    if (!account) return json({result: "error", message: "Error updating account"});
    const clientAccountStatus = await prisma.clientAccountStatus.create({
        data: {
          clientId: client.id,
          accountId: account.id,
          billingCycle: billingCycle || "monthly",
          notes: notes || "",
        }
    });

    if (!clientAccountStatus) return json({result: "error", message: "Error creating client account status"});
    

    return json({
        result: "ok"
    });
}