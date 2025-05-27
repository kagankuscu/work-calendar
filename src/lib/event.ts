import { calendar_v3 } from "googleapis";

type Color = {
    morning: string;
    afternoon: string;
    night: string;
}

class GoogleEvent {
    #worktime: number = 8.5 * 60 * 60 * 1000;
    #timeZone: string = "Europe/Sofia";
    #color: Color = {
        morning: "10",
        afternoon: "5",
        night: "11"
    }

    /**
     * get color for google event
     * @param shift
     * @returns
     */
    getColor(shift: keyof Color) {
        if (!this.#color.hasOwnProperty(shift))
            throw new Error(`${shift} key is not found.`);

        return this.#color[shift];
    }

    /**
     * create Google Event
     * @param colorId
     * @param summary
     * @param startDateTime
     * @returns
     */
    createEvent(colorId: string,
        startDateTime: string,
        summary: string = "WORK"
    ) {

        const sDateTime = new Date(startDateTime);
        const endDateTime = new Date(sDateTime.getTime() + this.#worktime)

        let googleEvent: calendar_v3.Schema$Event = {
            colorId,
            summary,
            creator: {
                displayName: "Kagan Kuscu",
                email: "kuscukagan@gmail.com"
            },
            start: {
                dateTime: sDateTime.toISOString(),
                timeZone: this.#timeZone
            },
            end: {
                dateTime: endDateTime.toISOString(),
                timeZone: this.#timeZone
            }
        };
        return googleEvent;
    }
}

export const googleEvent = new GoogleEvent();