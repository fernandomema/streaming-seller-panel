import { fail, redirect, type Actions, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export async function load({ cookies, params }) {
   
    const panelId = parseInt(params.panelId);
    const accountId = parseInt(params.accountId);
	const account = await await getAccount(accountId);
    if (!account || account.panelId != panelId) {
        return redirect(307, `/panel/${params.panelId}/accounts`);
    }

    const linkableClients = await prisma.panelClient.findMany({
        where: {
            panelId: panelId,
            accounts: {
                none: {
                    id: accountId
                }
            }
        },
        include: {
            accounts: true,
        }
    });

    const linkableProviders = await prisma.panelProvider.findMany({
        where: {
            panelId: panelId,
        },
        include: {
            accounts: true,
        }
    });

    const linkablePlatforms = await prisma.panelPlatform.findMany({
        where: {
            OR: [
                { panelId: parseInt(params.panelId) },
                { panelId: null }
            ]
        }
    });

    return {
        account: account,
        linkableClients: linkableClients,
        linkableProviders: linkableProviders,
        linkablePlatforms: linkablePlatforms
    };
}


export const actions = {
    edit: async ({ request, cookies, params }) => {
        const account = await getAccount(parseInt(params.accountId!));
        if (!account || account.panelId != parseInt(params.panelId!)) {
            return fail(403, {
                message: 'Account not found'
            });
        }
        // get form data
        const formData = await request.formData();
        const updatedAccount = await prisma.panelAccounts.update({
            where: {
                id: account.id
            },
            data: {
                email: formData.get('email') as string || account.email,
                password: formData.get('password') as string || account.password,
                expiresAt: new Date(formData.get('expiresAt') as string).toISOString() || account.expiresAt,
                providerId: parseInt(formData.get('providerId') as string) || account.providerId,
                platformId: parseInt(formData.get('platformId') as string) || account.platformId,
                activatedAt: new Date(formData.get('activatedAt') as string).toISOString() || account.activatedAt,
                buyCost: parseInt(formData.get('buyCost') as string) || account.buyCost,
                sellPrice: parseInt(formData.get('sellPrice') as string) || account.sellPrice,
                maxClients: parseInt(formData.get('maxClients') as string) || account.maxClients,
                notes: formData.get('notes') as string || account.notes
            }
        });
        return {
            account: updatedAccount
        }
        
    },
} satisfies Actions;

const getAccount = async (accountId: number) => {
    return await prisma.panelAccounts.findFirst({
        where: {
            id: accountId
        },
        include: {
            clients: true,
            clientsStatus: true,
        }
    });
}