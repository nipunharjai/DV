import React from "react";

const useMouseLocation = () => {
    const [mouseLocation, setMouseLocation] = React.useState({ x: 0, y: 0 });

    const updateMouseLocation = (event) => {
        setMouseLocation({ x: event.clientX, y: event.clientY });
    };

    React.useEffect(() => {
        window.addEventListener('mousemove', updateMouseLocation);
        return () => window.removeEventListener('mousemove', updateMouseLocation);
    }, []);

    return mouseLocation;
};

export default useMouseLocation;
