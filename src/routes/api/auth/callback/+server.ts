import { oauth2Client } from '$lib/googleOAuth2Client';
import type { RequestHandler } from './$types';
// import { serialize } from 'cookie';


export const GET: RequestHandler = async ({ url }) => {
	const code = url.searchParams.get('code');
	if (!code) return new Response('No code', { status: 400 });

	const { tokens } = await oauth2Client.getToken(code);
	oauth2Client.setCredentials(tokens);

	// // Store token + events in cookie (simplified)
	// const cookie = serialize('access_token', tokens.access_token ?? '', {
	// 	path: '/',
	// 	httpOnly: true,
	// 	maxAge: 3600
	// });


	return new Response(null, {
		status: 302,
		headers: {
			Location: `/?token=${tokens.access_token}`
		}
	});
};