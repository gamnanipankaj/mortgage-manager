import { calculateRateOfInterest } from "./calculate-rate-of-interest";
import { checkIsValidLoanDetails } from "./check-is-valid-loan-details";

interface ICalculateEmiArgs {
    principal: number;
    tenure: number;
    interest: number;
}

export const calculateEmi = ({principal, tenure, interest}: ICalculateEmiArgs) => {
    if(!checkIsValidLoanDetails({principal, interest, tenure})) {
        return 0;
    }

    const rateOfInterest = calculateRateOfInterest(interest);

    return principal * rateOfInterest * Math.pow((1 + rateOfInterest), tenure) / (Math.pow(1 + rateOfInterest, tenure) - 1);
}