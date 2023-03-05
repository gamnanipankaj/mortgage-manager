import { IAdditionalPayment } from "./additional-payment";
import { IInterestChange } from "./interest-change";

export interface ILoanDetails {
    start: string;
    principal: number;
    tenure: number;
    interest: number;
    additionalPayments: IAdditionalPayment[];
    interestChanges: IInterestChange[];
}

export interface ILoanDetailsWithoutStart extends Omit<ILoanDetails, 'start'> {}
