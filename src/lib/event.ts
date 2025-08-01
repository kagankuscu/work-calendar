import { PUBLIC_KGN_NAME, PUBLIC_KGN_MAIL } from "$env/static/public";

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
        morning: "5",
        afternoon: "2",
        night: "9"
    }

	/**
	 * get the shift name
	 * @param time
	 */
    getShiftName(time: string) {
        return this.#shift.find(s => s.time === time)?.name;
    }

		/**
		 * get the shift time
		 * @param time
		 */
		getShiftTime(time: string) {
			return this.#shift.find(s => s.time === time)?.time;
		}

    /**
     * get color for Google event
     * @param shift
     * @returns
     */
    getColor(shift: string) {
        if (!Object.hasOwn(this.#color, shift))
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

        const googleEvent: App.MyEvent = {
            colorId,
            summary,
            creator: {
                displayName: PUBLIC_KGN_NAME,
                email: PUBLIC_KGN_MAIL
            },
            start: {
                dateTime: this.formatLocalDateTime(sDateTime),
                // dateTime: sDateTime.toUTCString(),
                timeZone: this.#timeZone
            },
            end: {
                dateTime: this.formatLocalDateTime(endDateTime),
                // dateTime: endDateTime.toUTCString(),
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

		/**
		 * Format the date Europe/Sofia time
		 * @param date
		 */
		formatLocalDateTime(date: Date) {
			return [
					date.getFullYear().toString().padStart(4, "0"),
					(date.getMonth() + 1).toString().padStart(2, "0"),
					date.getDate().toString().padStart(2, "0")
				].join("-") +
				"T" +
				[
					date.getHours().toString().padStart(2, "0"),
					date.getMinutes().toString().padStart(2, "0"),
					date.getSeconds().toString().padStart(2, "0")
				].join(":");
		}
}

export const googleEvent = new GoogleEvent();