import { redirect, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { decodeToken, isTokenValid } from '$lib/utils/tokenParser';
import { userHasAccessOnPanel } from '$lib/utils/authValidation';

export async function load({ cookies, params }) {
    cookies.delete('token', {
        path: '/',
    });
    return redirect(302, '/');
}