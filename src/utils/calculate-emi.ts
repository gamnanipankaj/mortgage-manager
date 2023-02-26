interface ICalculateEmiArgs {
    principal: number;
    tenure: number;
    interest: number;
}

export const calculateEmi = ({principal, tenure, interest}: ICalculateEmiArgs) => {
    const rateOfInterest = interest / 12 / 100;

    return principal * rateOfInterest * Math.pow((1 + rateOfInterest), tenure) / (Math.pow(1 + rateOfInterest, tenure) - 1);
}