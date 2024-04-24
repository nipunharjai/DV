import React from "react";
import Switch from "@mui/joy/Switch";
import Slider from "@mui/joy/Slider";

const valueText = (value) => value;

const Q2 = () => {
    const [selectedYear, setSelectedYear] = React.useState(1992);

    const handleSliderChange = ({ target: { value } }) => setSelectedYear(value);

    return (
        <>
            <>
                Note: This was used simply for prototyping and is NOT a part of the
                actual implementation part of this project.
            </>
            <div style={{ height: 100 }}/>

            <div
                style={{
                    marginBlockEnd: "0.5rem",
                    justifyContent: "space-between",
                    width: 220,
                }}
                className="d-flex"
            >
                <Switch size="lg" variant="solid"/>
                <div style={{ marginInline: "1rem" }}>Show region names</div>
            </div>
            <div
                style={{
                    marginBlockEnd: "0.5rem",
                    justifyContent: "space-between",
                    width: 245,
                }}
                className="d-flex"
            >
                <Switch size="lg" variant="solid"/>
                <div style={{ marginInline: "1rem" }}>Show affordability ratio</div>
            </div>

            {/* just for temporary vertical spacing */}
            <div style={{ height: 300 }}/>

            <div className="d-flex flex-dir-col">
                <div className="d-flex">
                    <Slider
                        min={1992}
                        max={2023}
                        marks
                        valueLabelDisplay="auto"
                        getAriaValueText={valueText}
                        onChange={handleSliderChange}
                        value={selectedYear}
                        size="lg"
                    />
                    <div className="q2-year-container">{selectedYear}</div>
                </div>
            </div>
        </>
    );
};

export default Q2;
