import jwt from 'jsonwebtoken';

export const load = (async ({ cookies, params }) => {
    const token = cookies.get('token');
    let isLogedIn = false;
    let decode = {};
    if (token) {
        try {
            decode = jwt.verify(token, 'secret-key');
            isLogedIn = true;
        } catch(e) {}
    }

    return {
        isLoggedIn: isLogedIn,
        tokenData: decode,
        panelId: params.panelId
    };
});