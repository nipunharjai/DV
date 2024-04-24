import React from "react";
import { Checkbox, List, ListItem, Typography } from "@mui/joy";

const CheckboxGroup = ({ title, listItems, onChange }) => {
    const selectedLabels = listItems
        .filter((listItem) => listItem?.defaultChecked)
        .map((listItem) => listItem.label);

    const activeSelections = React.useRef(selectedLabels);

    const handleChange = (listItem) => {
        if (activeSelections.current.includes(listItem.label)) {
            activeSelections.current = activeSelections.current.filter(
                (item) => item !== listItem.label
            );
        } else
            activeSelections.current = [...activeSelections.current, listItem.label];

        onChange?.(activeSelections.current); // send it to the parent component
    };

    return (
        <>
            {title && (
                <Typography level="body-sm" fontWeight="lg" mb={1}>
                    {title}
                </Typography>
            )}
            <div role="group">
                <List size="sm">
                    {listItems?.map((item, index) => (
                        <ListItem key={index}>
                            {/* disable checkbox if only one is selected */}
                            <Checkbox
                                disabled={activeSelections.current.length === 1 && item?.label === activeSelections.current[0]}
                                onChange={() => handleChange(item)}
                                label={item?.label}
                                defaultChecked={item?.defaultChecked}
                            />
                        </ListItem>
                    ))}
                </List>
            </div>
        </>
    );
};

export default CheckboxGroup;
