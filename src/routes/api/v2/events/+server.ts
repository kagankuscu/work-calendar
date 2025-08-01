import { oauth2Client } from '$lib/googleOAuth2Client';
import { google } from 'googleapis';
import type { RequestHandler } from './$types';
import { GOOGLE_CALENDER_ID } from '$env/static/private';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
    const req: App.EventRequest = await request.json();
    const { accessToken, events } = req;

    if (!accessToken)
        return json('UnAuthorized', { status: 401 });

    oauth2Client.setCredentials({ access_token: accessToken});
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client});

    try {
        for (let event of events) {
            await calendar.events.insert({
                calendarId: GOOGLE_CALENDER_ID,
                requestBody: event
            });
        }
        return json('Event save successfull', { status: 200 });
    } catch (err) {
        console.log(err)
        return json('Failed to create event', { status: 500 });
    }

}
