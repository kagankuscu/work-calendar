import { oauth2Client } from '$lib/googleOAuth2Client';
import { google } from 'googleapis';
import type { RequestHandler } from './$types';
import { googleEvent } from '$lib/event';
import { GOOGLE_CALENDER_ID } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
    const req: App.TypeEventRequest = await request.json();

    const { accessToken, endDate, time } = req;
		let { startDate } = req;

    if (!accessToken)
        return new Response('Unauthorized', { status: 401 });

    oauth2Client.setCredentials({access_token: accessToken});
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const dayDiff = googleEvent.getDiffDay(startDate, endDate);
    const date1 = new Date(startDate);

    try {

        for (let i = 0; i < dayDiff; i++) {
            startDate = `${date1.getFullYear()}-${(date1.getMonth() + 1).toString().padStart(2, "0")}-${date1.getDate().toString().padStart(2, "0")}T${time}`;
            if (!googleEvent.getShiftName(time)) {
                throw new Error("Invalid Time");
            }
            const color = googleEvent.getColor(googleEvent.getShiftName(time)!);
						const shiftTime = googleEvent.getShiftTime(time);

            await calendar.events.insert({
                calendarId: GOOGLE_CALENDER_ID,
                requestBody: googleEvent.createEvent(color!, startDate, `W: ${shiftTime}`)
            });
            date1.setDate(date1.getDate() + 1);
        }
        return new Response(null, {
            status: 302,
            headers: { Location: '/' }
        });
    } catch (err) {
        console.error(err);
        return new Response('Failed to create event', { status: 500 });
    }
}
