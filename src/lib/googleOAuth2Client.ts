import { google } from 'googleapis';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } from '$env/static/private';

export const oauth2Client = new google.auth.OAuth2(
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GOOGLE_REDIRECT_URI
);

export function getAuthUrl() {

	return oauth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: ['https://www.googleapis.com/auth/calendar']
	});
}