import React from "react";
import { Radio, RadioGroup, Typography } from "@mui/joy";

const RadioButtonGroup = ({ title, itemList, defaultValue, onChange }) => {
    const selected = React.useRef(defaultValue);

    const handleChange = ({ target: { value } }) => {
        selected.current = value;
        onChange?.(value);
    };

    return (
        <>
            {title && (
                <Typography level="body-sm" fontWeight="lg" mb={1}>
                    {title}
                </Typography>
            )}
            <RadioGroup onChange={handleChange} defaultValue={defaultValue}>
                {itemList?.map((item, index) => (
                    <Radio key={index} value={item} label={item} variant="outlined"/>
                ))}
            </RadioGroup>
        </>
    );
};

export default RadioButtonGroup;
