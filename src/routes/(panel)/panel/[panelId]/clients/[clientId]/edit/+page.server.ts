import { redirect, type Actions, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { decodeToken, isTokenValid } from '$lib/utils/tokenParser';
import { userHasAccessOnPanel } from '$lib/utils/authValidation';

export async function load({ cookies, params }) {
	
    const client = await getClient(parseInt(params.clientId));
    if (!client || client.panelId != parseInt(params.panelId)) {
        return redirect(307, `/panel/${params.panelId}/clients`);
    }

    const linkableAccounts = await prisma.panelAccounts.findMany({
        where: {
            panelId: parseInt(params.panelId),
            clients: {
                none: {
                    id: parseInt(params.clientId)
                }
            }
        },
        include: {
            clients: true,
            platform: true
        }
    });

    return {
        client: client,
        linkableAccounts: linkableAccounts
    };
}

export const actions = {
	edit: async ({ request, cookies, params }) => {
        const client = await getClient(parseInt(params.clientId!));
        if (!client || client.panelId != parseInt(params.panelId!)) {
            return {
                success: false,
                message: 'Client not found'
            }
        }
		// get form data
		const formData = await request.formData();
        const updatedClient = await prisma.panelClient.update({
            where: {
                id: client.id
            },
            data: {
                name: formData.get('name') as string || client.name,
                email: formData.get('email') as string || client.email,
                phone: formData.get('phone') as string || client.phone,
                notes: formData.get('notes') as string || client.notes
            }
        });
        return {
            client: updatedClient
        }
        
	},
} satisfies Actions;

const getClient = async (clientId: number) => {
    return await prisma.panelClient.findFirst({
        where: {
            id: clientId
        },
        include: {
            accounts: {
                include: {
                    platform: true
                }
            },
            accountsStatus: true
        }
    });
}