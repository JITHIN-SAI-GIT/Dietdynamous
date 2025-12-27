import React, { useState, useEffect } from 'react';
import { WifiOff, RotateCw } from 'lucide-react';

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setIsSyncing(true);
      // Simulate sync delay
      setTimeout(() => setIsSyncing(false), 2000);
    };

    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !isSyncing) return null;

  return (
    <div className={`fixed bottom-4 left-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 transition-all transform ${!isOnline ? 'bg-red-500 text-white translate-y-0 opacity-100' : 'bg-emerald-500 text-white translate-y-0 opacity-100'}`}>
        {!isOnline ? (
            <>
                <WifiOff className="w-5 h-5 animate-pulse" />
                <span className="text-sm font-bold">You are offline. Data saved locally.</span>
            </>
        ) : (
             <>
                <RotateCw className="w-5 h-5 animate-spin" />
                <span className="text-sm font-bold">Back online! Syncing data...</span>
            </>
        )}
    </div>
  );
};

export default OfflineIndicator;
