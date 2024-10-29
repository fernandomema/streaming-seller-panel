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
    if (client.panelId != parseInt(params.panelId)) return json({result: "error", message: "You cannot delete this client"}); 
    await prisma.panelClient.delete({
        where: {
            id: parseInt(params.clientId),
        }
    });
    return json({
        result: "ok"
    });
}