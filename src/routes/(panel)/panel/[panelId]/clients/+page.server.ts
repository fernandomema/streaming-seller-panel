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
	const clients = await prisma.panelClient.findMany({
        where: {
            panelId: parseInt(params.panelId)
        }
    })
    return {
        clients: clients
    };
}