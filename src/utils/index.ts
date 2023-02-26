import { calculateEmi } from "./calculate-emi";

interface ICalculateEmiArgs {
    principal: number;
    tenure: number;
    interest: number;
}

export const calculateTerms = ({principal, tenure, interest}: ICalculateEmiArgs) => {
    const emi = calculateEmi({principal, tenure, interest});

    return {emi};
}