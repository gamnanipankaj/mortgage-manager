interface IFormatAmountOptions {
    isCurrencySymbol: boolean;
}

const defaultFormatAmountOptions: IFormatAmountOptions = {
    isCurrencySymbol: false
};

export const formatAmount = (amount: number, options: IFormatAmountOptions = defaultFormatAmountOptions) => {
    const numberFormatOptions: Intl.NumberFormatOptions = {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    }

    if(options?.isCurrencySymbol) {
        numberFormatOptions.currency = 'INR',
        numberFormatOptions.style = 'currency'
    }

    return amount.toLocaleString("en-IN", numberFormatOptions);
};