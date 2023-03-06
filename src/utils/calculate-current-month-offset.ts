import { calculateMonthOffset } from "./calculate-month-offset";
import { formatMonthAndYear } from "./format-month-and-year";

export const calculateCurrentMonthOffset = (start: string) => {
    return calculateMonthOffset(start, formatMonthAndYear(new Date())) + 1;
}