import {useEffect, useState} from "react";

const Countdown: React.FC<{from: number, onComplete: () => void}> = ({from, onComplete}) => {
    const [timeLeft, setTimeLeft] = useState(from);

    useEffect(() => {
        if (timeLeft <= 0) {
            onComplete();
            return;
        }

        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
    }, [timeLeft, onComplete]);

    return <div>{timeLeft}</div>;
};

export default Countdown;