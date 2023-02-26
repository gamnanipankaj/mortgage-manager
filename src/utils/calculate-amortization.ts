import { IAmortization, ILoanDetails } from "../interfaces";
import { calculateRateOfInterest } from "./calculate-rate-of-interest";

interface ICalculateAmortizationArgs extends ILoanDetails {
    emi: number;
}

export const calculateAmortization = ({ principal, interest, tenure, emi, additionalPayments, interestChanges }: ICalculateAmortizationArgs) => {
    const amortization: IAmortization[] = [];

    let principalRemaining = principal;
    let rateOfInterest = calculateRateOfInterest(interest);
    for(let month = 1; month <= tenure; month += 1) {
        const interestChange = interestChanges.find((interestChange) => interestChange.month === month)?.interest ?? interest;
        interest = interestChange;
        rateOfInterest = calculateRateOfInterest(interest);
        
        const additionalPayment = additionalPayments.find((additionalPayment) => additionalPayment.month === month)?.amount ?? 0;
        principalRemaining -= additionalPayment;
        
        const interestPayment = principalRemaining * rateOfInterest;
        const principalPayment = emi - interestPayment;

        // Remaining principal at the end of the month
        principalRemaining -= principalPayment;

        amortization.push({
            month,
            interestPayment,
            principalPayment,
            additionalPayment,
            principalRemaining,
        });

        if(principalRemaining <= 0) {
            break;
        }
    }

    return amortization;
};