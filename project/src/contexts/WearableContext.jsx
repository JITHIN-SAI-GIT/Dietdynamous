import React, { createContext, useContext, useState, useEffect } from 'react';
import api from "../services/api";

const WearableContext = createContext();

export function useWearable() {
  return useContext(WearableContext);
}

export function WearableProvider({ children, isAuthenticated }) {
  const [provider, setProvider] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, connecting, connected, error, syncing
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [wearableData, setWearableData] = useState({
     steps: 0,
     heartRate: 0,
     calories: 0,
     sleep: "--",
     battery: 0
  });

  // Check initial connection status
  useEffect(() => {
     if (isAuthenticated) {
        syncData(true);
     }
  }, [isAuthenticated]);

  const connectProvider = async (providerId) => {
      setStatus('connecting');
      try {
          // 1. Initiate OAuth Flow
          const authRes = await api.post(`/wearables/auth/${providerId}`);
          console.log(authRes.data.msg); // "Redirecting..."

          // 2. Simulate User Authorizing (in real app, this is a redirect)
          await new Promise(resolve => setTimeout(resolve, 2000));

          // 3. Callback / Token Exchange
          const cbRes = await api.post("/wearables/callback", { 
              provider: providerId, 
              code: "mock_auth_code_123" 
          });

          if (cbRes.data.success) {
              setProvider(providerId);
              setStatus('connected');
              // 4. Initial Sync
              await syncData();
          }
          
      } catch (err) {
          console.error("Connection failed", err);
          setStatus('error');
      }
  };

  const disconnectProvider = async () => {
      try {
          await api.post("/wearables/disconnect");
          setProvider(null);
          setWearableData({ steps: 0, heartRate: 0, calories: 0, sleep: "--", battery: 0 });
          setStatus('idle');
          setLastSyncTime(null);
      } catch (e) {
          console.error("Disconnect failed", e);
      }
  };

  const syncData = async (silent = false) => {
      if (!silent) setStatus('syncing');
      
      try {
          const res = await api.get("/wearables/data");
          if (res.data.success) {
              setProvider(res.data.provider);
              setWearableData(res.data.data);
              setLastSyncTime(new Date(res.data.lastSync));
              setStatus('connected');
          }
      } catch (err) {
          // If 401, it means not connected
          if (!silent) {
              setStatus('idle'); // or error
          }
      }
  };

  // Poll for updates if connected
  useEffect(() => {
      if (provider) {
          const interval = setInterval(() => syncData(true), 15000); // 15s poll
          return () => clearInterval(interval);
      }
  }, [provider]);

  const value = {
      provider,
      status,
      wearableData,
      lastSyncTime,
      connectProvider,
      disconnectProvider,
      syncData
  };

  return (
    <WearableContext.Provider value={value}>
      {children}
    </WearableContext.Provider>
  );
}
