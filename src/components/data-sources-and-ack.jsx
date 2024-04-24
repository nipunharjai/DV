import React from 'react';
import { Card, List, ListItem, Typography } from "@mui/joy";
import { codeReferences } from "../data/code-references.js";

const DataSourcesAndAck = () => {
    return (
        <>
            <>
                <Card style={{ background: 'white', marginBottom: '2em' }} variant="outlined">
                    <Typography level="h4">Data Processing</Typography>
                    <Typography>
                        {
                            "The implementation of the first research question required two primary time-series:\
                            house prices data, and inflation data. The house prices dataset is originally provided\
                            as a single sheet consisting of all regions one below the other. Furthermore, there is\
                            a lot of mismatch in the columnar layout - making it infeasible for a data-frame library\
                            like Pandas to parse directly.\
                            "
                        }
                    </Typography>
                    <Typography>
                        {
                            "Firstly, I used Jupyter Notebook (.ipynb files) with Python 3 to break the single file\
                            into region-wise sheets within the same Excel file, segregating each location's data and\
                            properly formatting the column names. This allowed me to parse the file with Pandas and create\
                            data frames. Next, I removed all of the columnar spacing, and duplicated the year values to\
                            fill each row, rather than have the year in just the first row of each year. This processed\
                            dataset was then written to a new Excel sheet to be used for all prototype visualisations.\
                            The pre-processing of the inflation dataset was minimal. It simply required taking out just\
                            the UK's data, and reducing the number of years in the time series to match the other dataset.\
                            "
                        }
                    </Typography>
                    <Typography>
                        {
                            "Finally, once the prototyping was complete, and inline-analysis was done, I looked around for\
                            how I can integrate the frontend code and the data required for displaying the chart. Since the\
                            visualisation supports several user interactions, it was imperative that I would have to process\
                            data on the fly based on multiple parameters and static data could not be directly used. I first\
                            thought about implementing a flask API, which would set up an extremely lightweight server in Python\
                            and allow me to use Pandas and NumPy, thereby allowing reuse of the prototyping code. However, I did\
                            not want to add a server dependency in the application to reduce the \"moving parts\" of the app, and\
                            to allow for easier grading. Next, I explored the use of a JavaScript equivalent of Pandas. While\
                            several options are present, it would require re-work to port over Python code to JS code. All things\
                            considered, I finally settled into converting the Excel file into JSON data using an online converter,\
                            and wrote custom wrapper methods in the data-access folder to query that JSON object, with custom\
                            parameter-based filtering.\
                            "
                        }
                    </Typography>
                </Card>
                <Card style={{ background: 'white' }} variant="outlined">
                    <Typography level="h4">Acknowledgements</Typography>
                    <Typography>The following datasets are used in this assignment:</Typography>
                    <List component="ol" marker="decimal">
                        <ListItem>
                            <div>
                                <Typography fontWeight={600}>Quarterly House Prices Dataset</Typography>
                                <Typography>
                                    This is a public dataset provided by the Office of
                                    National Statistics and can be accessed at {" "}
                                    <a target="_blank"
                                       href="https://www.ons.gov.uk/economy/inflationandpriceindices/datasets/housepriceindexmonthlyquarterlytables1to19">this
                                        URL</a>.
                                </Typography>
                            </div>
                        </ListItem>
                        <ListItem>
                            <div>
                                <Typography fontWeight={600}>Inflation Dataset</Typography>
                                <Typography>
                                    This is a public dataset provided by the World Bank and can be accessed at {" "}
                                    <a target="_blank"
                                       href="https://data.worldbank.org/indicator/FP.CPI.TOTL.ZG?locations=GB">this
                                        URL</a>.
                                </Typography>
                            </div>
                        </ListItem>
                        <ListItem>
                            <div>
                                <Typography fontWeight={600}>Dwelling Construction Dataset</Typography>
                                <Typography>
                                    This is a public dataset provided by the Department for
                                    Levelling Up, Housing and
                                    Communities and Ministry of Housing, Communities & Local Government and can
                                    be accessed at {" "}
                                    <a target="_blank"
                                       href="https://www.gov.uk/government/statistical-data-sets/live-tables-on-house-building">this
                                        URL</a>.
                                </Typography>
                            </div>
                        </ListItem>
                        <ListItem>
                            <div>
                                <Typography fontWeight={600}>UK Map</Typography>
                                <Typography>
                                    This is a set of maps of the UK that were used for the visualisation of the 2nd
                                    question
                                    and the development of the heat map. They can be accessed at {" "}
                                    <a target="_blank"
                                       href="https://www.ordnancesurvey.co.uk/documents/resources/uk-outline-admin-maps.pdf">this
                                        URL</a>.
                                </Typography>
                            </div>
                        </ListItem>

                    </List>

                    Furthermore, the following links point to the online code examples and solutions referred to while
                    implementing this application:

                    <List marker="decimal">
                        {
                            codeReferences.map((item, index) => (
                                <ListItem key={index}>
                                    <Typography>
                                        <a target="_blank" href={item.url}>{item.title}</a>
                                    </Typography>
                                </ListItem>
                            ))
                        }
                    </List>
                </Card>
            </>
        </>
    );
}

export default DataSourcesAndAck;
