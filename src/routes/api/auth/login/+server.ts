import type { RequestHandler } from './$types';
import { getAuthUrl } from '$lib/googleOAuth2Client';


export const GET: RequestHandler = async () => {
	const url = getAuthUrl();
	return new Response(null, {
		status: 302,
		headers: {
			Location: url
		}
	});
};