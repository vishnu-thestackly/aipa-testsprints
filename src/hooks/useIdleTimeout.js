import { useEffect, useRef } from "react";

const DEFAULT_ACTIVITY_EVENTS = [
  "mousemove",
  "mousedown",
  "keydown",
  "scroll",
  "touchstart",
];

export default function useIdleTimeout({
  timeoutMs = 60000,
  onTimeout,
  enabled = true,
  events = DEFAULT_ACTIVITY_EVENTS,
}) {
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!enabled || typeof onTimeout !== "function") {
      return undefined;
    }

    const clearTimer = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };

    const startTimer = () => {
      clearTimer();
      timeoutRef.current = setTimeout(() => {
        onTimeout();
      }, timeoutMs);
    };

    const handleActivity = () => {
      startTimer();
    };

    startTimer();
    events.forEach((eventName) =>
      window.addEventListener(eventName, handleActivity),
    );

    return () => {
      clearTimer();
      events.forEach((eventName) =>
        window.removeEventListener(eventName, handleActivity),
      );
    };
  }, [enabled, events, onTimeout, timeoutMs]);
}
