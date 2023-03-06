import { IAmortization } from "../interfaces";
import { calculateMonthOffset } from "./calculate-month-offset";
import { formatMonthAndYear } from "./format-month-and-year";
import { getMonthAndYearByOffset } from "./get-month-and-year-by-offset";

export const calculateRemainingTerms = (amortization: IAmortization[], start: string) => {
    if(!amortization || amortization.length === 0) {
        return 0;
    }

    const today = new Date();
    const todayInMonthAndYear = formatMonthAndYear(today);

    const lastDayOffset = amortization[amortization.length - 1].month;
    const lastDayInMonthAndYear = getMonthAndYearByOffset(start, lastDayOffset);

    return calculateMonthOffset(todayInMonthAndYear, lastDayInMonthAndYear);
}