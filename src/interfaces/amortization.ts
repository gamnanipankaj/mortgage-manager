export interface IAmortization {
    emi: number;
    month: number;
    interestPayment: number;
    principalPayment: number;
    additionalPayment: number;
    principalRemaining: number;
    yearHR: string;
    monthHR: string;
}
