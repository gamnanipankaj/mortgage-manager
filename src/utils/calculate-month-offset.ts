export const calculateMonthOffset = (d1: string, d2: string) => {
    const date1 = new Date(d1);
    const date2 = new Date(d2);

    let months = 0;

    months += (date2.getFullYear() - date1.getFullYear()) * 12;
    months += date2.getMonth() - date1.getMonth();

    return Math.max(months, 0);
}