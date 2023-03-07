import { IAmortization } from "../interfaces";
import { calculateCurrentMonthOffset } from "./calculate-current-month-offset";

export const calculateRemainingPrincipal = (start: string, amortization: IAmortization[]) => {
    if(!amortization || amortization.length === 0) {
        return 0;
    }

    let principalRemaining = 0;
    const currentMonthOffset = calculateCurrentMonthOffset(start) - 1;
    for(let month = 1; month <= amortization.length; month += 1) {
        if(month <= currentMonthOffset) {
            continue;
        }

        principalRemaining += amortization[month - 1].principalPayment;
    }

    return principalRemaining;
}