import prisma from '$lib/prisma';
export async function load({ cookies, params }) {
    const panelId = parseInt(params.panelId);

	const accounts = await prisma.panelAccounts.findMany({
        where: {
            panelId: panelId,
        },
        include: {
            platform: true,
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
                { panelId: panelId },
                { panelId: null }
            ]
        }
    });

    return {
        accounts: accounts,
        linkableProviders: linkableProviders,
        linkablePlatforms: linkablePlatforms
    };
}