import { IAdditionalPayment } from "./additional-payment";
import { IInterestChange } from "./interest-change";

export interface ILoanDetails {
    principal: number;
    tenure: number;
    interest: number;
    additionalPayments: IAdditionalPayment[];
    interestChanges: IInterestChange[];
}