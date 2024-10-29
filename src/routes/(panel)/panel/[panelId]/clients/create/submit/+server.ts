import { json, redirect, text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';
import { decodeToken, isTokenValid } from '$lib/utils/tokenParser';
import { userHasAccessOnPanel } from '$lib/utils/authValidation';

export async function POST({ request, cookies, params }) {
    const token =  cookies.get('token');
    if (!token || !isTokenValid(token)) return json({result: "error", message: "Invalid token"});
    const userId = decodeToken(token)!.userId;
    const userHasAccess = await userHasAccessOnPanel(userId, params.panelId);
    if (!userHasAccess) return json({result: "error", message: "You don't have access to this panel"});
	const {email, name, phone} = await request.json();
    await prisma.panelClient.create({
        data: {
            name: name.value,
            email: email.value,
            phone: phone.value,
            panelId: parseInt(params.panelId),
        }
    });
    return json({
        result: "ok"
    });
}