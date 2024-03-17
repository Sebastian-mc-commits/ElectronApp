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
        unixTimestampInMilliseconds: date.getTime(),
        inputDate: date
    }
}

export function dateSetter(date: Date, days: number): DateData {
    const previousDays = date.setDate(date.getDate() + days)

    return dateInfo(new Date(previousDays))
}

export function getPreviousDaysFromCurrentDate(from: number, to: number): DateData[] {

    const days = []

    console.log("i", from)
    console.log("to", to)
    for (let i = from; i <= to; i++) {
        days.push(dateSetter(new Date(), i * -1))
    }

    return days
}