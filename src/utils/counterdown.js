import { useEffect, useMemo, useState } from "react";

export function useCountdown(targetDate) {

  const targetTime = useMemo(() => {
    if (!targetDate) {
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      return endOfDay.getTime();
    }

    return targetDate instanceof Date
      ? targetDate.getTime()
      : targetDate;
  }, [targetDate]);

  const getTimeLeft = () => {
    const now = Date.now();
    const diff = targetTime - now;

    if (diff <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    const ONE_HOUR = 60 * 60 * 1000;
    const ONE_MINUTE = 60 * 1000;

    const hours = Math.trunc(diff / ONE_HOUR);
    const minutes = Math.trunc((diff % ONE_HOUR) / ONE_MINUTE);
    const seconds = Math.trunc((diff % ONE_MINUTE) / 1000);

    return { hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  return timeLeft;
}