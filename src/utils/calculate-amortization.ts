import { IAmortization, ILoanDetails } from "../interfaces";
import { calculateEmi } from "./calculate-emi";
import { calculateRateOfInterest } from "./calculate-rate-of-interest";
import { checkIsValidLoanDetails } from "./check-is-valid-loan-details";
import { getMonthAndYearByOffset } from "./get-month-and-year-by-offset";

interface ICalculateAmortizationArgs extends ILoanDetails {
    emi: number;
}

export const calculateAmortization = ({ start, principal, interest, tenure, emi, additionalPayments, interestChanges, disbursements }: ICalculateAmortizationArgs) => {
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

        // const disbursement = disbursements.find((disbursement) => disbursement.month === month)?.amount ?? 0;
        // if(disbursement > 0) {
        //     principalRemaining += disbursement;
        //     emi = calculateEmi({ principal: principalRemaining, tenure: tenure - month + 1, interest });
        // }

        // Case where the EMI remains same but the interest changes
        interest = interestChanges.find((interestChange) => interestChange.month === month)?.interest ?? interest;
        rateOfInterest = calculateRateOfInterest(interest);

        const additionalPayment = additionalPayments.find((additionalPayment) => additionalPayment.month === month)?.amount ?? 0;
        const interestPayment = (principalRemaining - additionalPayment) * rateOfInterest;
        const principalPayment = additionalPayment + Math.min(emi - interestPayment, principalRemaining);

        // Remaining principal at the end of the month
        principalRemaining -= principalPayment;

        const [yearHR, monthHR] = getMonthAndYearByOffset(start, month - 1).split('-');
        amortization.push({
            emi,
            month,
            interestPayment,
            principalPayment,
            additionalPayment,
            principalRemaining: Math.max(principalRemaining, 0),
            yearHR,
            monthHR,
        });
    }

    return amortization;
};