import React, { useEffect, useRef } from 'react';

interface CountUpStatsProps {
    value: number;
    decimalPlaces?: number;
}

const CountUpStats: React.FC<CountUpStatsProps> = ({ value }) => {

    const countupRef = useRef(null);
    let countUpAnim;

    useEffect(() => {
        initCountUp();
    }, []);

    async function initCountUp() {
        const countUpModule = await import('countup.js');
        if (countupRef.current) {
            countUpAnim = new countUpModule.CountUp(countupRef.current, value);
            if (!countUpAnim.error) {
                countUpAnim.start();
            } else {
                console.error(countUpAnim.error);
            }
        }
    }

    return (
        <h1 ref={countupRef}>0</h1>
    );
};

export default CountUpStats;
