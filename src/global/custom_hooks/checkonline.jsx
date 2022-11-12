import { useState, useEffect } from "react";

export function useCheckOnline({
  onOnline = () => {},
  onOffLine = () => {},
} = {}) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(navigator.onLine);
      onOnline();
    };
    const handleOffline = () => {
      setIsOnline(navigator.onLine);
      onOffLine();
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [onOffLine, onOnline]);

  useEffect(() => {
    console.log(isOnline);
  }, [isOnline]);
  return { isOnline };
}
