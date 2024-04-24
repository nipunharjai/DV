import React from "react";
import { Tab, TabList, TabPanel, Tabs } from '@mui/joy'
import FixedDwellingWrapper from "./fixed-dwelling-wrapper";
import DataSourcesAndAck from "./data-sources-and-ack.jsx";

const Q1 = () => {
    return (
        <>
            <Tabs defaultValue={0}>
                <TabList>
                    <Tab variant="plain" color="primary">Visualisation</Tab>
                    <Tab variant="plain" color="primary">Data Processing</Tab>
                </TabList>
                <TabPanel style={{ background: 'white' }} value={0}>
                    <FixedDwellingWrapper/>
                </TabPanel>
                <TabPanel style={{ background: 'white' }} value={1}>
                    <DataSourcesAndAck />
                </TabPanel>
            </Tabs>
        </>
    );
};

export default Q1;
