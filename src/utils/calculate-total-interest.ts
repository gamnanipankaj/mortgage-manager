import { IAmortization } from "../interfaces";

export const calculateTotalInterest = (amortization: IAmortization[]) => {
    let totalInterest = 0;
    for(const { interestPayment } of amortization) {
        totalInterest += interestPayment;
    }

    return totalInterest;
}