import { IAmortization, ILoanDetailsWithoutStart } from "../interfaces";
import { calculateRateOfInterest } from "./calculate-rate-of-interest";
import { checkIsValidLoanDetails } from "./check-is-valid-loan-details";

interface ICalculateAmortizationArgs extends ILoanDetailsWithoutStart {
    emi: number;
}

export const calculateAmortization = ({ principal, interest, tenure, emi, additionalPayments, interestChanges }: ICalculateAmortizationArgs) => {
    const amortization: IAmortization[] = [];

    let principalRemaining = principal;
    let rateOfInterest = calculateRateOfInterest(interest);

    if(!checkIsValidLoanDetails({principal, interest, tenure})) {
        return amortization;
    }

    for(let month = 1; month <= 2 * tenure; month += 1) {
        if(Math.floor(principalRemaining) <= 0) {
            break;
        }

        // Case where the EMI remains same but the interest changes
        interest = interestChanges.find((interestChange) => interestChange.month === month)?.interest ?? interest;
        rateOfInterest = calculateRateOfInterest(interest);

        const interestPayment = principalRemaining * rateOfInterest;
        const additionalPayment = additionalPayments.find((additionalPayment) => additionalPayment.month === month)?.amount ?? 0;
        const principalPayment = additionalPayment + Math.min(emi - interestPayment, principalRemaining);

        // Remaining principal at the end of the month
        principalRemaining -= principalPayment;

        amortization.push({
            month,
            interestPayment,
            principalPayment,
            additionalPayment,
            principalRemaining: Math.max(principalRemaining, 0),
        });
    }

    return amortization;
};