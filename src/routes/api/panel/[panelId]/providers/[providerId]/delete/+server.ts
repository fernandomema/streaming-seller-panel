import { json, redirect, text } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export async function GET({ request, cookies, params }) {
    const providerId = parseInt(params.providerId);
    const panelId = parseInt(params.panelId);
    const provider = await prisma.panelProvider.findFirst({
        where: {
            id: providerId,
        }
    })
    if (!provider) return json({result: "error", message: "Provider not found"});
    if (provider.panelId != panelId) return json({result: "error", message: "You cannot delete this provider"}); 
    await prisma.panelProvider.delete({
        where: {
            id: providerId,
        }
    });
    return json({
        result: "ok"
    });
}