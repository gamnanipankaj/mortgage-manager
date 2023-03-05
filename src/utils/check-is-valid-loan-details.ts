import { ILoanDetails } from "../interfaces";

export const checkIsValidLoanDetails = ({ principal, interest, tenure }: Omit<ILoanDetails, 'additionalPayments' | 'interestChanges'>): boolean => {
    return !isNaN(principal) && !isNaN(interest) && !isNaN(tenure) && principal > 0 && interest > 0 && tenure > 0;
}
