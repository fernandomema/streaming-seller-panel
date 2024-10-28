import prisma from '$lib/prisma.js';
import { createToken } from '$lib/utils/tokenParser.js';
import { json, redirect } from '@sveltejs/kit';

export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		let user = await prisma.appUser.findFirst({
			where: {
				email: {
					equals: email as string,
				}
			}
		});

		if (!user) {
			return json({ error: 'Invalid email or password' }, { status: 401 });
		}

		if (user.password !== password) {
			return json({ error: 'Invalid email or password' }, { status: 401 });
		}

        const token = createToken({ 
            email: email as string,
			userId: user.id,
        });

		cookies.set('token', token, { path: '/' });

		return redirect(303, '/');
	},
};