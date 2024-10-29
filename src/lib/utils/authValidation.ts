import prisma from "$lib/prisma"

export const userHasAccessOnPanel = async (userId: number, panelId: number|string): Promise<boolean> => {
    const user = await prisma.appUser.findFirst({
        where: {
            id: userId,
        },
        include: {
            panels: true,
        }
    });
    if (!user) return false;
    return user.panels.some(panel => panel.id.toString() === panelId.toString());
}