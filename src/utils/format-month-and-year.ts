export const formatMonthAndYear = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = date.getMonth() + 1;

    return `${yyyy}-${mm < 10 ? '0' : ''}${mm}`;
}