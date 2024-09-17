import { Time } from "@/backend/model/dayTime";

export function parseTimeFromString(time: string): Time {
    const [strHour, strMinute] = time.split(":")

    const hour = parseInt(strHour);
    const minute = parseInt(strMinute);

    return {
        hour,
        minute
    };
}
