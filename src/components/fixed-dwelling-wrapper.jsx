import React from "react";
import { Box, Button, Drawer, Grid, List, ListItem, Slider, Switch } from "@mui/joy";
import RadioButtonGroup from "./radio-button-group";
import CheckboxGroup from "./checkbox-group";
import LineChartWrapper from "./line-chart-wrapper";
import { multipleLinesData } from '../data/line-chart-object.js'
import { convertFilteredDataToLineFormat, getHousingPricesData } from "../data-access/housing-price-data.js";

const locations = [
    {
        label: "United Kingdom",
        defaultChecked: true,
    },
    {
        label: "England",
    },
    {
        label: "North East",
    },
    {
        label: "North West",
    },
    {
        label: "Yorkshire and the Humber",
    },
    {
        label: "East Midlands",
    },
    {
        label: "West Midlands",
    },
    {
        label: "East of England",
    },
    {
        label: "London",
        defaultChecked: true,
    },
    {
        label: "South East",
    },
    {
        label: "South West",
    },
    {
        label: "Wales",
    },
    {
        label: "Scotland",
    },
    {
        label: "Northern Ireland",
    },
];

const defaultDwellingType = "New Dwellings";
const defaultChartType = "House Prices";
const defaultSelectedLocations = locations
    .filter((listItem) => listItem?.defaultChecked)
    .map((listItem) => listItem.label);

const defaultOptions = {
    lineThickness: 2, // stroke width
    showPoints: false, // draw circular points
    smoothenLines: true, // curve or straight lines
    showZeroLine: true, // y = 0 reference line
    showInflationLine: false // plot inflation data
};

const FixedDwellingWrapper = () => {
    const [data, setData] = React.useState(multipleLinesData);
    const [yearRange, setYearRange] = React.useState([1992, 2023]);

    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const [options, setOptions] = React.useState(defaultOptions);

    const [dwellingType, setDwellingType] = React.useState(defaultDwellingType);
    const [chartType, setChartType] = React.useState(defaultChartType);
    const [selectedLocations, setSelectedLocations] = React.useState(
        defaultSelectedLocations
    );

    const handleMenuButtonClick = () => {
        setIsDrawerOpen(prevState => !prevState);
    }

    React.useEffect(() => {
        const rawNewData = getHousingPricesData(chartType, dwellingType, yearRange, selectedLocations);
        setData(rawNewData);
    }, [dwellingType, chartType, selectedLocations, yearRange]);

    const handleYearRangeChange = ({ target: { value } }) => {
        // prevent the high value becoming smaller than the low value.
        const [low, high] = value;
        if (high - low > 1) setYearRange(value);
    };

    const handleOptionsChange = (name, { target: { value } }) => {
        let newState = { ...options };
        switch (name) {
            case 'lineWidth':
                newState = { ...newState, lineThickness: value };
                break;
            case 'plotDataPoints':
                newState = { ...newState, showPoints: !options.showPoints };
                break;
            case 'smoothenLines':
                newState = { ...newState, smoothenLines: !options.smoothenLines };
                break;
            case 'showZeroLine':
                newState = { ...newState, showZeroLine: !options.showZeroLine };
                break;
            case 'showInflationLine':
                newState = { ...newState, showInflationLine: !options.showInflationLine };
                break;
        }

        setOptions(newState);
    }

    return (
        <>
            <Grid container spacing={4} sx={{ flexGrow: 1 }}>
                <Grid style={{ minHeight: '90vh' }} md={8} xs={12}>
                    <LineChartWrapper
                        yearRange={yearRange}
                        selectedLocations={selectedLocations}
                        dwellingType={dwellingType}
                        chartType={chartType}
                        data={convertFilteredDataToLineFormat(data, yearRange)}
                        rawData={data}
                        options={options}
                    />
                </Grid>
                <Grid md={4} xs={12}>
                    <Grid container sx={{ flexGrow: 1, justifyContent: 'space-between' }}>
                        <Grid paddingBlockEnd={2} xs={4}>
                            <RadioButtonGroup
                                title="Dwelling Type"
                                itemList={["New Dwellings", "Other Dwellings", "All Dwellings"]}
                                defaultValue={defaultDwellingType}
                                onChange={setDwellingType}
                            />
                        </Grid>
                        <Grid paddingBlockEnd={2} xs={4}>
                            <RadioButtonGroup
                                title="Chart Type"
                                itemList={["House Prices", "YoY % Change"]}
                                defaultValue={defaultChartType}
                                onChange={setChartType}
                            />
                        </Grid>
                        <Grid xs={4}>
                            <Button onClick={handleMenuButtonClick}>Options</Button>
                            <Drawer size='md' open={isDrawerOpen} anchor='right' onClose={() => setIsDrawerOpen(false)}>
                                <Box role="presentation">
                                    <List>
                                        <ListItem>
                                            <div className='d-flex jc-between'
                                                 style={{ flexGrow: 1, alignItems: 'center' }}>
                                                <div>Line Width</div>
                                                <div style={{ width: '60%' }}>
                                                    <Slider value={options.lineThickness}
                                                            name={"lineWidth"}
                                                            min={0.5}
                                                            max={4}
                                                            step={0.5}
                                                            valueLabelDisplay={'auto'}
                                                            onChange={(e) => handleOptionsChange('lineWidth', e)}/>
                                                </div>
                                            </div>
                                        </ListItem>
                                        <ListItem>
                                            <div className='d-flex jc-between'
                                                 style={{ flexGrow: 1, alignItems: 'center' }}>
                                                <div>Plot Data Points</div>
                                                <Switch checked={options.showPoints}
                                                        onChange={(e) => handleOptionsChange('plotDataPoints', e)}/>
                                            </div>
                                        </ListItem>
                                        <ListItem>
                                            <div className='d-flex jc-between'
                                                 style={{ flexGrow: 1, alignItems: 'center' }}>

                                                <div>Smoothen Lines</div>
                                                <Switch checked={options.smoothenLines}
                                                        onChange={(e) => handleOptionsChange('smoothenLines', e)}/>
                                            </div>
                                        </ListItem>
                                        {
                                            chartType === 'YoY % Change' && (
                                                <>
                                                    <ListItem>
                                                        <div className='d-flex jc-between'
                                                             style={{ flexGrow: 1, alignItems: 'center' }}>

                                                            <div>Zero Line</div>
                                                            <Switch disabled={chartType !== 'YoY % Change'}
                                                                    checked={options.showZeroLine}
                                                                    onChange={(e) => handleOptionsChange('showZeroLine', e)}/>
                                                        </div>
                                                    </ListItem>
                                                    <ListItem>
                                                        <div className='d-flex jc-between'
                                                             style={{ flexGrow: 1, alignItems: 'center' }}>

                                                            <div>Inflation Line</div>
                                                            <Switch disabled={chartType !== 'YoY % Change'}
                                                                    checked={options.showInflationLine}
                                                                    onChange={(e) => handleOptionsChange('showInflationLine', e)}/>
                                                        </div>
                                                    </ListItem>
                                                </>

                                            )
                                        }


                                    </List>
                                </Box>
                            </Drawer>
                        </Grid>
                    </Grid>
                    <Grid sx={{ marginBlock: '2em' }}>
                        <CheckboxGroup
                            title="Locations"
                            listItems={locations}
                            onChange={setSelectedLocations}
                        />
                    </Grid>
                    <Grid sx={{ marginTop: '2em' }}>
                        <Slider
                            size="lg"
                            min={1992}
                            max={2023}
                            value={yearRange}
                            onChange={handleYearRangeChange}
                            valueLabelDisplay="on"
                        />
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
        ;
};

export default FixedDwellingWrapper;
