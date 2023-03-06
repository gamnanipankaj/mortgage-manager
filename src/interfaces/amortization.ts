export interface IAmortization {
    month: number;
    interestPayment: number;
    principalPayment: number;
    additionalPayment: number;
    principalRemaining: number;
    yearHR: string;
    monthHR: string;
}