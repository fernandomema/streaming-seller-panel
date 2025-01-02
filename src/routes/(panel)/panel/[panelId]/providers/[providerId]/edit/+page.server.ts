import { fail, redirect, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export async function load({ cookies, params }) {
    const providerId = parseInt(params.providerId);
    const panelId = parseInt(params.panelId);
    const provider = await getProvider(providerId);

    if (!provider || provider.panelId != panelId) return redirect(302, '/panel/' + panelId + '/providers');

    const linkableAccounts = await prisma.panelAccounts.findMany({
        where: {
            AND: [
                { 
                    panelId: panelId,
                }, {
                    OR: [
                        { provider: null },
                        { provider: { id: { not: 1 } } },
                    ],
                }
            ]
        },
        include: {
            clients: true,
        }
    });


    return {
        provider: provider,
        linkableAccounts: linkableAccounts
    };
}

export const actions = {
    edit: async ({ request, cookies, params }) => {
        const provider = await getProvider(parseInt(params.providerId!));
        if (!provider || provider.panelId != parseInt(params.panelId!)) {
            return fail(403, {
                message: 'Provider not found'
            });
        }

        const formData = await request.formData();
        const updatedProvider = await prisma.panelProvider.update({
            where: {
                id: provider.id
            },
            data: {
                name: formData.get('name') as string || provider.name,
                notes: formData.get('notes') as string || provider.notes
            }
        });
        return {
            provider: updatedProvider
        }
    },
}

const getProvider = async (providerId: number) => {
    return await prisma.panelProvider.findFirst({
        where: {
            id: providerId
        },
        include: {
            accounts: true,
        }
    });
}