import { IAdditionalPayment } from "./additional-payment";
import { IDisbursement } from "./disbursement";
import { IInterestChange } from "./interest-change";

export interface ILoanDetails {
    start: string;
    principal: number;
    tenure: number;
    interest: number;
    additionalPayments: IAdditionalPayment[];
    interestChanges: IInterestChange[];
    disbursements: IDisbursement[];
}

export interface ILoanDetailsWithoutStart extends Omit<ILoanDetails, 'start'> {}
