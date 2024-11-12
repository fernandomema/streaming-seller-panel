import { json, redirect, text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';
import { decodeToken, isTokenValid } from '$lib/utils/tokenParser';
import { userHasAccessOnPanel } from '$lib/utils/authValidation';

export async function POST({ request, cookies, params }) {
	const {email, name, phone} = await request.json();
    await prisma.panelClient.create({
        data: {
            name: name.value,
            email: email.value,
            phone: phone.value,
            panelId: parseInt(params.panelId),
            notes: name.value || '',
        }
    });
    return json({
        result: "ok"
    });
}