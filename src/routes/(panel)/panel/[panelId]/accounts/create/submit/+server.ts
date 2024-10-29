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
	const {email, password} = await request.json();
    await prisma.panelAccounts.create({
        data: {
            email: email.value,
            password: password.value,
            panelId: parseInt(params.panelId),
            activatedAt: new Date(),
            expiresAt: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
        }
    });
    return json({
        result: "ok"
    });
}