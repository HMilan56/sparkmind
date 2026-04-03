import { useState, useEffect, useMemo } from 'react';

export function useCountdown(targetTimestamp: number, serverTimeAtFetch: number) {
    const serverOffset = useMemo(() => 
        serverTimeAtFetch ? serverTimeAtFetch - Date.now() : 0
    , [serverTimeAtFetch]);

    const calculateTimeLeft = () => {
        const now = Date.now() + serverOffset;
        const difference = targetTimestamp - now;

        if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
            expired: false
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            const nextTick = calculateTimeLeft();

            setTimeLeft(prev => {
                if (prev.seconds === nextTick.seconds && prev.expired === nextTick.expired) {
                    return prev;
                }
                return nextTick;
            });

            if (nextTick.expired) clearInterval(timer);
        }, 100);

        return () => clearInterval(timer);
    }, [targetTimestamp, serverOffset]);

    return timeLeft;
};