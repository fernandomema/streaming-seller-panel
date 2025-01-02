import { fail, redirect, type Action, type Actions, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { decodeToken, isTokenValid } from '$lib/utils/tokenParser';
import { userHasAccessOnPanel } from '$lib/utils/authValidation';

export async function load({ cookies, params }) {
    const platformId = parseInt(params.platformId);
    const panelId = parseInt(params.panelId);
    const platform = await getPlatform(platformId);

    if (!platform || platform.panelId != panelId) return redirect(302, '/panel/' + panelId + '/platforms');

    return {
        platform: platform
    };
}

export const actions = {
    edit: async ({ request, cookies, params }) => {
        const platform = await getPlatform(parseInt(params.platformId!));
        if (!platform || platform.panelId != parseInt(params.panelId!)) {
            return fail(403, {
                message: 'Platform not found'
            });
        }

        const formData = await request.formData();
        const updatedPlatform = await prisma.panelPlatform.update({
            where: {
                id: platform.id
            },
            data: {
                name: formData.get('name') as string || platform.name,
                icon: formData.get('icon') as string || platform.icon,
            }
        });
        return {
            platform: updatedPlatform
        }
    },
} satisfies Actions;

const getPlatform = async (platformId: number) => {
    return await prisma.panelPlatform.findFirst({
        where: {
            id: platformId
        }
    });
}