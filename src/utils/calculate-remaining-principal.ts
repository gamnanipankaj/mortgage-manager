import { IAmortization } from "../interfaces";
import { calculateCurrentMonthOffset } from "./calculate-current-month-offset";

export const calculateRemainingPrincipal = (start: string, amortization: IAmortization[]) => {
    if(!amortization || amortization.length === 0) {
        return 0;
    }

    const currentMonthOffset = calculateCurrentMonthOffset(start) - 1;
    return amortization[currentMonthOffset].principalRemaining;
}