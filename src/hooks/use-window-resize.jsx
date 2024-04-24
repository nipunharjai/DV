import React from 'react';

const useWindowResize = () => {
    const [state, setState] = React.useState(0);

    const handleResize = React.useCallback(() => setState((prev) => prev + 1), []);

    React.useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    return state;
}

export default useWindowResize;
