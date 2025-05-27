import { oauth2Client } from '$lib/googleOAuth2Client';
import { google } from 'googleapis';
import type { RequestHandler } from './$types';
import { googleEvent } from '$lib/event';
import { GOOGLE_CALENDER_ID } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
    const req = await request.json();

    const access_token = req.access_token;
    if (!access_token)
        return new Response('Unauthorized', { status: 401 });

    oauth2Client.setCredentials({ access_token });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    try {
        await calendar.events.insert({
            calendarId: GOOGLE_CALENDER_ID,
            requestBody: googleEvent.createEvent("10", "2025-05-27T16:30")
        });
        return new Response(null, {
            status: 302,
            headers: { Location: '/' }
        });
    } catch (err) {
        console.error(err);
        return new Response('Failed to create event', { status: 500 });
    }
}
