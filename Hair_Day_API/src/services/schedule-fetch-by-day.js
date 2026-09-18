import { apiConfig } from "./api-config.js";
import dayjs from "dayjs";

export async function scheduleFetchByDay({date}) {
    try {
        const response = await fetch(`${apiConfig.baseUrl}/schedules`)
        const data = await response.json();

        const dailySchedules = data.filter(schedule => dayjs(date).isSame(schedule.when, 'day'));

        return dailySchedules;

    } catch (error) {
        
    }
}