import { redirect, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { decodeToken, isTokenValid } from '$lib/utils/tokenParser';
import { userHasAccessOnPanel } from '$lib/utils/authValidation';

export async function load({ cookies, params }) {
	const platforms = await prisma.panelPlatform.findMany({
        where: {
            OR: [
                {
                    panelId: parseInt(params.panelId)
                },
                {
                    panelId: null
                }
            ]
        }
    })
    return {
        platforms: platforms
    };
}