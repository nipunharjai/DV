import inflationData from '../data/inflation_data.json';

export const getInflationData = (yearRange) => {
    const data = [];
    const [lowYear, highYear] = yearRange;
    for (let i = lowYear; i < highYear; i++) {
        const val = inflationData[i]
        if (val !== undefined) data.push({ x: i, y: val })
    }

    return data;
};

export const getInflationDataForYear = (year) => {
    return inflationData[year];
};
