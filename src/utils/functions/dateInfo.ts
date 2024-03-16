import { DateData } from "../models/Date.model"

export function dateInfo(date: Date): DateData {

    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return {
        date: date.toDateString(),
        year,
        month,
        day,
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
        formattedDate: `${year}-${month}-${day}`,
        isoDate: date.toISOString().slice(0, -5) + 'Z',
        unixTimeInSeconds: Math.floor(date.getTime() / 1000),
        unixTimestampInMilliseconds: date.getTime()
    }
}

export function previousDate(date: Date, days: number): DateData {
    const previousDays = date.setDate(date.getDate() - days)

    return dateInfo(new Date(previousDays))
}

export function getPreviousDaysFromCurrentDate(daysBefore: number): DateData[] {

    const days = []

    for (let i = 1; i <= daysBefore; i++) {
        days.push(previousDate(new Date(), i))
        console.log(i)
    }

    return days
}