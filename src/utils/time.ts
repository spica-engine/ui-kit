export namespace time {
    export const timeUnitsInSeconds: { [key: string]: number } = {
        'second': 1,
        'minute': 60,
        'hour': 3600,
        'day': 86400,
        'week': 604800,
        'month': 2592000,
        'quarter': 7776000,
        'year': 31536000
    };

    export const unitMapper = (minuteDiff: number) => {
        if (minuteDiff <= 10) return 'second';
        // 10min-2h
        if (minuteDiff <= 120) return 'minute';
        // 2h-36h
        if (minuteDiff <= 2160) return 'hour';
        // 36h-36d
        if (minuteDiff <= 43200) return 'day'
        // 36d-36w
        if (minuteDiff <= 50400) return 'week';
        // 36w-30m
        if (minuteDiff <= 43200 * 30) return 'month';
        // 30m-18y
        if (minuteDiff <= 43200 * 12 * 18) return 'quarter';
        // 18y+
        return 'year';
    }

    export const getDiffInMinutes = (date1: Date, date2: Date) => {
        const diffInMilliseconds = Math.abs(date2.getTime() - date1.getTime());
        const diffInMinutes = diffInMilliseconds / (1000 * 60);
        return diffInMinutes;
    };

    export const formatDateToEnUs = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        };

        return new Intl.DateTimeFormat("en-US", options).format(date);
    };
}