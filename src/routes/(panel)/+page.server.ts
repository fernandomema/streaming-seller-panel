import { redirect, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { decodeToken, isTokenValid } from '$lib/utils/tokenParser';

export async function load({ cookies }) {
    const token =  cookies.get('token');
    if (!token || !isTokenValid(token)) return redirect(302, '/login');
    const userId = decodeToken(token)!.userId;
	const panels = await prisma.panel.findMany({
        "orderBy": [{"createdAt" : "desc"} ],
        where: {
            users: {
                some: {
                    id: userId
                }
            }
        },
        include: {
            users: true
        }
    })
    return {
        panels: panels
    };
}