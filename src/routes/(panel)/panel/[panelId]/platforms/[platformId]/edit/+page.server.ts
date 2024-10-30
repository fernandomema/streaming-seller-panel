import { redirect, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { decodeToken, isTokenValid } from '$lib/utils/tokenParser';
import { userHasAccessOnPanel } from '$lib/utils/authValidation';

export async function load({ cookies, params }) {
    const platformId = parseInt(params.platformId);
    const panelId = parseInt(params.panelId);
    const platform = await prisma.panelPlatform.findFirst({
        where: {
            id: platformId
        }
    });

    if (!platform || platform.panelId != panelId) return redirect(302, '/panel/' + panelId + '/platforms');

    return {
        platform: platform
    };
}