import { ILoanDetailsWithoutStart } from "../interfaces";
import { calculateAmortization } from "./calculate-amortization";
import { calculateEmi } from "./calculate-emi";

interface ICalculateEmiArgs extends ILoanDetailsWithoutStart {}

export const calculateTerms = ({principal, tenure, interest, additionalPayments, interestChanges}: ICalculateEmiArgs) => {
    const emi = calculateEmi({principal, tenure, interest});
    const amortization = calculateAmortization({principal, tenure, interest, emi, additionalPayments, interestChanges});

    return {emi, amortization};
}