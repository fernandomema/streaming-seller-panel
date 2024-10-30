import { userHasAccessOnPanel } from '$lib/utils/authValidation';
import { decodeToken, isTokenValid } from '$lib/utils/tokenParser';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {

    // Panel api auth verification
	if (event.url.pathname.startsWith('/api/panel/') || event.url.pathname.startsWith('/panel/')) {
        const panelId = event.params.panelId;
        if (!panelId) return new Response('Panel id is required', { status: 400 });
        const token = event.cookies.get('token');
        if (!token) return new Response('Token is required', { status: 400 });
        if (!isTokenValid(token)) return new Response('Invalid token', { status: 400 });
        const userId = decodeToken(token)!.userId;
        const userHasAccess = await userHasAccessOnPanel(userId, panelId);
        if (!userHasAccess) {
            if (event.request.headers.get('accept')?.includes('json')) {
                return new Response('You don\'t have access to this panel', { status: 400 });
            } else {
                return new Response(null, {
                    status: 302,
                    headers: { location: '/' }
                })
            }
        }
	}

	const response = await resolve(event);
	return response;
};