import { calendar_v3 } from "googleapis";

type Color = {
    morning: string;
    afternoon: string;
    night: string;
}

type Shift = {
    time: string;
    name: string;
}

class GoogleEvent {
    #worktime: number = 8.5 * 60 * 60 * 1000;
    #timeZone: string = "Europe/Sofia";
    #shift: Shift[] = [
        {
            time: "08:00",
            name: "morning"
        },
        {
            time: "16:30",
            name: "afternoon"
        },
        {
            time: "00:00",
            name: "night"
        },
    ]
    #color: Color = {
        morning: "10",
        afternoon: "5",
        night: "11"
    }

    getShift(time: string) {
        return this.#shift.find(s => s.time === time)?.name;
    }

    /**
     * get color for google event
     * @param shift
     * @returns
     */
    getColor(shift: string) {
        if (!this.#color.hasOwnProperty(shift))
            throw new Error(`${shift} key is not found.`);
        switch(shift) {
            case "morning":
                return this.#color.morning;
            case "afternoon":
                return this.#color.afternoon;
            case "night":
                return this.#color.night;
        }
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

    getDiffDay(startDate: string, endDate: string) {
        const date1: Date = new Date(startDate);
        const date2: Date = new Date(endDate);

        if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
            throw new Error('Invalid date format');
        }

        const diffTime = Math.abs(date2.getTime() - date1.getTime());
        return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }
}

export const googleEvent = new GoogleEvent();