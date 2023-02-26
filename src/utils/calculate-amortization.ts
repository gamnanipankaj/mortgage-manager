import { IAdditionalPayment, ILoanDetails } from "../interfaces";
import { calculateRateOfInterest } from "./calculate-rate-of-interest";

interface ICalculateAmortizationArgs extends ILoanDetails {
    emi: number;
    additionalPayments: IAdditionalPayment[];
}

interface IAmortization {
    month: number;
    interestPayment: number;
    principalPayment: number;
    additionalPayment: number;
    principalRemaining: number;
}

export const calculateAmortization = ({ principal, interest, tenure, emi, additionalPayments }: ICalculateAmortizationArgs) => {
    const amortization: IAmortization[] = [];

    let principalRemaining = principal;
    let rateOfInterest = calculateRateOfInterest(interest);
    for(let month = 1; month <= tenure; month += 1) {
        // Remaining principal at the end of the month
        const additionalPayment = additionalPayments.find((additionalPayment) => additionalPayment.month === month)?.amount ?? 0;
        principalRemaining -= additionalPayment;

        const interestPayment = principalRemaining * rateOfInterest;
        const principalPayment = emi - interestPayment;
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