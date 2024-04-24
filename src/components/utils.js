export const getColorPalette = (num) => {
//     Return an array of colors.
    // taken from https://help.tableau.com/current/pro/desktop/en-us/formatting_create_custom_colors.htm
    const colors = ["#cfcfcf", "#ffbc79", "#1f77b4", "#898989",
        "#c85200", "#5f9ed1", "#595959", "#ababab", "#ff800e", "#006ba4",
        "#2ca02c", "#ffbb78", "#ff7f0e", "#aec7e8", "#a2c8ec"
    ]
    return colors.slice(0, num);
}

export const npDiff = (arr) => {
    // Source: https://stackoverflow.com/questions/56857346/in-javascript-how-do-i-create-a-list-of-differences-of-array-elements-elegantly
    return arr.slice(1).map((v, i) => v - arr[i]);
}

export const isMouseInsideDiv = (divId, mouseX, mouseY) => {
    const divElement = document.getElementById(divId);
    if (!divElement) return false;

    const boundingBox = divElement.getBoundingClientRect();
    return (
        mouseX >= boundingBox.left &&
        mouseX <= boundingBox.right &&
        mouseY >= boundingBox.top &&
        mouseY <= boundingBox.bottom
    );
}
