import { IAdditionalPayment, ILoanDetails } from "../interfaces";
import { calculateAmortization } from "./calculate-amortization";
import { calculateEmi } from "./calculate-emi";

interface ICalculateEmiArgs extends ILoanDetails {
    additionalPayments: IAdditionalPayment[]
}

export const calculateTerms = ({principal, tenure, interest, additionalPayments}: ICalculateEmiArgs) => {
    const emi = calculateEmi({principal, tenure, interest});
    const amortizationTable = calculateAmortization({principal, tenure, interest, emi, additionalPayments});

    return {emi, amortizationTable};
}