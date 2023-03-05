import { IAmortization, ILoanDetails } from "../interfaces";
import { calculateRateOfInterest } from "./calculate-rate-of-interest";

interface ICalculateAmortizationArgs extends ILoanDetails {
    emi: number;
}

export const calculateAmortization = ({ principal, interest, tenure, emi, additionalPayments, interestChanges }: ICalculateAmortizationArgs) => {
    const amortization: IAmortization[] = [];

    let principalRemaining = principal;
    let rateOfInterest = calculateRateOfInterest(interest);
    for(let month = 1; month <= 2 * tenure && principalRemaining > 0; month += 1) {
        // Case where the EMI remains same but the interest changes
        interest = interestChanges.find((interestChange) => interestChange.month === month)?.interest ?? interest;
        rateOfInterest = calculateRateOfInterest(interest);

        const interestPayment = principalRemaining * rateOfInterest;
        const additionalPayment = additionalPayments.find((additionalPayment) => additionalPayment.month === month)?.amount ?? 0;
        const principalPayment = additionalPayment + emi - interestPayment;

        // Remaining principal at the end of the month
        principalRemaining -= principalPayment;

        amortization.push({
            month,
            interestPayment,
            principalPayment,
            additionalPayment,
            principalRemaining,
        });
    }

    return amortization;
};