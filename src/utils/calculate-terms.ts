import { ILoanDetails } from "../interfaces";
import { calculateAmortization } from "./calculate-amortization";
import { calculateEmi } from "./calculate-emi";

interface ICalculateEmiArgs extends ILoanDetails {}

export const calculateTerms = ({start, principal, tenure, interest, additionalPayments, interestChanges}: ICalculateEmiArgs) => {
    const emi = calculateEmi({principal, tenure, interest});
    const amortization = calculateAmortization({start, principal, tenure, interest, emi, additionalPayments, interestChanges});

    return {emi, amortization};
}