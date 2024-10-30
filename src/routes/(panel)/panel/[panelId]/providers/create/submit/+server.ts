import { json, redirect, text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';
import { decodeToken, isTokenValid } from '$lib/utils/tokenParser';
import { userHasAccessOnPanel } from '$lib/utils/authValidation';

export async function POST({ request, cookies, params }) {
	const {email, name, phone} = await request.json();
    try {
        await prisma.panelProvider.create({
            data: {
                panelId: parseInt(params.panelId),
                name: name.value,
                notes: name?.value,
            }
        });
    } catch (e: any) {
        return json({
            result: "error",
            message: e.message
        });
    }

    return json({
        result: "ok"
    });
}