import { ILoanDetails } from "../interfaces";
import { calculateAmortization } from "./calculate-amortization";
import { calculateEmi } from "./calculate-emi";

interface ICalculateEmiArgs extends ILoanDetails {}

export const calculateTerms = ({principal, tenure, interest}: ICalculateEmiArgs) => {
    const emi = calculateEmi({principal, tenure, interest});
    const amortizationTable = calculateAmortization({principal, tenure, interest, emi});

    return {emi, amortizationTable};
}