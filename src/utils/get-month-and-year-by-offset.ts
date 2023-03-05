import { formatMonthAndYear } from "./format-month-and-year";

export const getMonthAndYearByOffset = (date: string, offset: number) => {
    const baseDate = new Date(date);
    const offsetDate = new Date(baseDate.setMonth(baseDate.getMonth() + offset));

    return formatMonthAndYear(offsetDate);
}