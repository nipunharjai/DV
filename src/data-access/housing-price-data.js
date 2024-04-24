// File to facilitate fetching data from the House Prices dataset along with utility functions for plotting.

import housePricesDataset from '../data/house_prices.json'
import { getColorPalette, npDiff } from "../components/utils.js";

const convertDwellingTypeToStringIndex = (dwellingType) => {
    switch (dwellingType) {
        case 'New Dwellings':
            return 'New dwellings__Average dwelling price';
        case 'Other Dwellings':
            return 'Other dwellings__Average dwelling price';
        case 'All Dwellings':
        default:
            return 'All dwellings__Average dwelling price';
    }
}

export const getHousingPricesData = (chartType, dwellingType, yearRange, locations) => {
    // apply location filter at top level.
    const prunedDataset = {};
    locations.forEach(location => {
        prunedDataset[location] = housePricesDataset[location];
    });

    const [lowYear, highYear] = yearRange;
    // apply year range filter
    locations.forEach((location) => {
        const entries = prunedDataset[location];
        prunedDataset[location] = entries.filter((entry) => (entry.Year >= lowYear && entry.Year <= highYear));
    });

    // apply dwelling type filter
    locations.forEach((location) => {
        const entries = prunedDataset[location];
        const propertyName = convertDwellingTypeToStringIndex(dwellingType);
        prunedDataset[location] = entries.map((entry) => entry[propertyName])
    });

    if (chartType === 'YoY % Change') {
        locations.forEach((location) => {
            const entries = prunedDataset[location];
            const newEntries = [];
            const diff = npDiff(entries);
            for (let i = 0; i < entries.length - 1; i++)
                newEntries.push(diff[i] / entries[i] * 100);

            prunedDataset[location] = newEntries;
        })
    }

    return prunedDataset;
};

export const convertFilteredDataToLineFormat = (prunedDataset, yearRange) => {
    const [lowYear, highYear] = yearRange
    const lineData = {};
    lineData['lines'] = [];
    const colors = getColorPalette(highYear - lowYear);
    const locations = Object.keys(prunedDataset);

    locations.forEach((location, index) => {
        const obj = {}
        obj['location'] = location;
        obj['color'] = colors[index];
        obj['strokeWidth'] = 2;
        obj['lineCoordinates'] = [];

        const entries = prunedDataset[location];
        entries.forEach((y, index) => {
            obj['lineCoordinates'].push({ x: (index + lowYear).toString(), y });
        });

        lineData['lines'].push(obj);
    })

    return lineData;
}
