import { useEffect, useState } from "react";

function useOnLineStatus() {
    const [isOnLine, setIsOnLine] = useState(navigator.onLine);
  
    useEffect(() => {
      function handleOnline() {
        setIsOnLine(true);
      }
  
      function handleOffline() {
        setIsOnLine(false);
      }
  
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
  
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }, []);
  
    return isOnLine;
  }
  
  export default useOnLineStatus;  