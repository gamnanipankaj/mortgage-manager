import { ILoanDetails } from "../interfaces";
import { calculateRateOfInterest } from "./calculate-rate-of-interest";

interface ICalculateAmortizationArgs extends ILoanDetails {
    emi: number;
}

interface IAmortization {
    month: number;
    interestPayment: number;
    principalPayment: number;
    principalRemaining: number;
}

export const calculateAmortization = ({ principal, interest, tenure, emi }: ICalculateAmortizationArgs) => {
    const amortization: IAmortization[] = [];

    let principalRemaining = principal;
    let rateOfInterest = calculateRateOfInterest(interest);
    for(let month = 1; month <= tenure; month += 1) {
        const interestPayment = principalRemaining * rateOfInterest;
        const principalPayment = emi - interestPayment;
        principalRemaining -= principalPayment;

        amortization.push({
            month,
            interestPayment,
            principalPayment,
            principalRemaining,
        });

    }

    return amortization;
};