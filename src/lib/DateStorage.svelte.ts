class DateStorage {
    selectedOfDays = $state(new Set());
    startDate: Date = $state(new Date());
    endDate: Date = $state(new Date());
    shiftTime: string = $state('');

    constructor() {
        this.setStartDate = new Date();
        this.setEndDate = new Date();
    }

    set setStartDate(value: Date) {
        value.setUTCHours(0, 0, 0, 0);
        this.startDate = value;
    }

    set setEndDate(value: Date) {
        value.setUTCHours(0, 0, 0, 0);
        this.endDate = value;
    }
}

export const dateStorage = new DateStorage();