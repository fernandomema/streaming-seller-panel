import { redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import prisma from '$lib/prisma.js';
import { createToken } from '$lib/tokenParser';

export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const username = data.get('username');
		const password = data.get('password');
		const password2 = data.get('password2');

		if (password != password2) return {
			status: 400,
			message: "Both passwords must be equal"
		}

		if (!isEmailValid(email as string)) return {
			status: 400,
			message: "Email is not valid"
		}

		if (await userExists(email as string, username as string)) return {
			status: 400,
			message: "Email or username alredy in use"
		}

		const user = await prisma.user.create({
			data: {
				email: email as string,
				password: password as string,
				username: username as string,
			}
		});

		if (!user) return {
			status: 500,
			message: "Error creating user"
		}

        var token = createToken({
            email: email as string,
			username: user.username,
			userId: user.id,
         });

		cookies.set('token', token, { path: '/' });

		return redirect(303, '/');
	},
};

function isEmailValid(email: string) {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Test the email string against the regex
    return emailRegex.test(email);
}

async function userExists(email: string, username: string) {
	const user = await prisma.user.findFirst({
		where: {
			OR: [
				{ email: email },
				{ username: username }
			]
		}
	});
	return user != null
}