import React from "react";
import * as d3 from "d3";
import useWindowResize from "../hooks/use-window-resize.jsx";
import useMouseLocation from "../hooks/use-mouse-location.jsx";
import { getColorPalette, isMouseInsideDiv } from "./utils.js";
import { getInflationData, getInflationDataForYear } from "../data-access/inflation-data.js";


const margin = { top: 20, right: 20, bottom: 50, left: 50 };

const LineChartWrapper = (props) => {
    const { data, chartType, yearRange, rawData, selectedLocations, options } = props;
    const { lineThickness, showPoints, smoothenLines, showZeroLine, showInflationLine } = options;
    const [lowYear, highYear] = yearRange;

    const containerRef = React.useRef(null);
    const scales = React.useRef({ xScale: null, yScale: null });
    const resizeTrigger = useWindowResize();
    const mouseLocation = useMouseLocation();

    const [showTooltip, setShowTooltip] = React.useState(false);
    const [tooltipContent, setTooltipContent] = React.useState({ value: [] });

    const [chartDimensions, setChartDimensions] = React.useState({ width: 0, height: 0 });

    React.useEffect
    (() => {
        const { width, height } = getChartWrapperHeight();
        setChartDimensions({ width, height });
    }, [resizeTrigger]);

    const formatTooltip = (arr) => {
        const { x } = mouseLocation;
        let hoverYear = Math.round(getXValueClosestToMouse(x));
        hoverYear = Math.min(hoverYear, highYear);
        hoverYear = Math.max(hoverYear, lowYear);

        if (chartType === 'YoY % Change') {
            hoverYear = hoverYear.toString() + " to " + (hoverYear + 1).toString();
        }

        const colors = getColorPalette(selectedLocations?.length);
        const formattedData = [{
            location: 'Year',
            value: hoverYear
        }];

        if (chartType === 'YoY % Change' && showInflationLine) {
            const inflationData = parseFloat(
                getInflationDataForYear(hoverYear.split("to")[0].trim())
            ).toFixed(2);

            if (!isNaN(inflationData))
                formattedData.push({ color: "black", location: "Inflation", value: inflationData });
        }

        arr.forEach((value, i) => {
            const obj = {
                color: colors[i],
                location: selectedLocations[i],
                value: chartType === 'YoY % Change' ? parseFloat(value).toFixed(2) : parseFloat(value).toFixed(0),
            };
            formattedData.push(obj);
        });


        return formattedData.map((value, i) => {
            return (
                <div key={i} style={{ alignItems: 'center' }} className={value.color ? 'd-flex' : 'd-flex jc-center'}>
                    {
                        value.color &&
                        <div style={{
                            height: 12,
                            width: 12,
                            border: '1px solid black',
                            marginRight: 5,
                            background: value.color
                        }}/>
                    }
                    <div>{value.location}</div>
                    <div style={{ marginRight: 5 }}>{":"}</div>
                    <div>{value.value}</div>

                </div>

            )
        });
    };

    const getXValueClosestToMouse = (mouseX) => {
        const { xScale } = scales.current;
        if (!xScale) return undefined;
        const subtract = d3.select('g')?.node()?.getBoundingClientRect()?.x || 0;
        return xScale.invert(mouseX - 40 - subtract);
    }

    React.useEffect(() => {
        const { x, y } = mouseLocation;
        d3
            .select('#hover-tooltip')
            .style("left", `${x - 20}px`)
            .style("top", `${y - 30}px`);

        let hoverYear = Math.round(getXValueClosestToMouse(x));
        hoverYear = Math.min(hoverYear, highYear);
        hoverYear = Math.max(hoverYear, lowYear);
        const idx = hoverYear - lowYear;
        if (isNaN(idx)) return;
        const yValues = [];

        selectedLocations?.forEach((location) => {
            if (rawData[location]?.[idx])
                yValues.push(rawData[location]?.[idx]);
        });

        setTooltipContent({ value: yValues })

        if (isMouseInsideDiv('line-chart-wrapper', x, y) && !showTooltip) setShowTooltip(true);
        if (!isMouseInsideDiv('line-chart-wrapper', x, y) && showTooltip) setShowTooltip(false);

    }, [mouseLocation, showTooltip, selectedLocations]);

    React.useEffect(() => {
        const tooltip = d3.select('#hover-tooltip');
        if (showTooltip) tooltip.style("opacity", `0.9`).style('z-index', 100);
        else tooltip.style("opacity", `0`).style('z-index', -1);
    }, [showTooltip]);

    const teardownChart = () => {
        d3.select('svg').remove();
    }

    const getChartWrapperHeight = () => {
        const width =
            d3.select("#line-chart-wrapper").node().clientWidth -
            (margin.left + margin.right);
        const height =
            d3.select("#line-chart-wrapper").node().clientHeight -
            (margin.top + margin.bottom);

        return { height, width };
    }

    const addAxisLabels = (xLabel, yLabel) => {
        const { height, width } = getChartWrapperHeight();
        const svg = d3.select('svg');

        svg
            .append("text")
            .attr("transform", `translate(${(width + margin.left + margin.right) / 2},${height + margin.bottom + 10})`)
            .style("text-anchor", "middle")
            .text(xLabel);

        svg
            .append("text")
            .attr("transform", `translate(${14},${(height + margin.top + margin.bottom) / 2}) rotate(-90)`)
            .style("text-anchor", "middle")
            .text(yLabel);
    };

    const setupScales = (lineData) => {
        const { height, width } = getChartWrapperHeight();

        let maxX = -Infinity;
        let maxY = -Infinity;

        let minX = Infinity;
        let minY = Infinity;

        let linesCopy = [...lineData.lines];
        if (chartType === 'YoY % Change' && showInflationLine) {
            const inflationData = getInflationData(yearRange);
            linesCopy = [...linesCopy, { lineCoordinates: inflationData }];
        }

        linesCopy.forEach(line => {
            line.lineCoordinates.forEach(coord => {
                if (coord.x > maxX) maxX = coord.x;
                if (coord.y > maxY) maxY = coord.y;

                if (coord.x < minX) minX = coord.x;
                if (coord.y < minY) minY = coord.y;
            });
        });


        const xScale = d3
            .scaleLinear()
            .domain([minX, maxX])
            .range([0, width]);

        const yScale = d3
            .scaleLinear()
            .domain([minY, maxY])
            .range([height, 0]);

        scales.current = { xScale, yScale };

        d3.select('g')
            .append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

        d3.select('g').append("g").call(d3.axisLeft(yScale).tickFormat(d3.format(".2s")));
    };

    const setupInitialSVG = () => {

        const { width, height } = getChartWrapperHeight();
        d3
            .select(containerRef.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
    }

    const drawPoints = (lineData) => {
        if (!showPoints) return;

        const { xScale, yScale } = scales.current;
        const { lines } = lineData;

        lines.forEach((lineData) => {
            d3.select('g')
                .selectAll(`.point-${lineData.color.replace(/#/g, "")}`)
                .data(lineData.lineCoordinates)
                .enter().append("circle")
                .attr("class", `point point-${lineData.color.replace(/#/g, "")}`)
                .attr("cx", (d) => xScale(d.x))
                .attr("cy", (d) => yScale(d.y))
                .attr("r", 5)
                .style("fill", lineData.color);
        });
    };

    const drawLines = (lineData) => {
        const { xScale, yScale } = scales.current;
        const { lines } = lineData;

        let line = d3
            .line()
            .x((point) => xScale(point.x))
            .y((point) => yScale(point.y));

        if (smoothenLines)
            line = line.curve(d3.curveBasis);

        if (chartType === 'YoY % Change') {

            if (showZeroLine) {
                const zeroLine = [];
                for (let i = lowYear; i <= highYear; i++)
                    zeroLine.push({ x: i, y: 0 });

                d3.select('g')
                    .append("path")
                    .datum(zeroLine)
                    .attr("class", "line")
                    .attr("d", line)
                    .attr("stroke", 'black')
                    .attr('stroke-width', 1)
                    .attr('stroke-dasharray', 3)
                    .attr("fill", "none");
            }

            if (showInflationLine) {
                const inflationLineData = getInflationData(yearRange);
                lines.push({
                    color: 'black',
                    strokeWidth: lineThickness,
                    lineCoordinates: inflationLineData
                });
            }
        }

        lines.forEach((lineData) => {
            d3.select('g')
                .append("path")
                .datum(lineData.lineCoordinates)
                .attr("class", "line")
                .attr("d", line)
                .attr("stroke", lineData.color)
                .attr('stroke-width', lineThickness)
                .attr("fill", "none");
        });

        drawPoints(lineData);
    };

    React.useEffect(() => {
        if (!containerRef.current) return;

        setupInitialSVG();
        setupScales(data);
        drawLines(data);
        addAxisLabels("Year", chartType);

        return teardownChart;
    }, [chartDimensions, data, chartType, options]);

    return (
        <div
            id="line-chart-wrapper"
            className="line-chart-wrapper"
            ref={containerRef}
        >
            {tooltipContent && (
                <div id="hover-tooltip" className="tooltip">
                    {formatTooltip(tooltipContent.value)}
                </div>
            )}
        </div>
    );
};


export default LineChartWrapper;
