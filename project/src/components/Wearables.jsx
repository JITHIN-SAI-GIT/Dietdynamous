import { useState } from "react";
import { 
  Watch, Activity, Smartphone, Link as LinkIcon, 
  CheckCircle, AlertCircle, RefreshCw, XCircle, Heart, Battery, 
  Lock, ExternalLink
} from "lucide-react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import RemindersPanel from "./RemindersPanel";
import { useWearable } from "../contexts/WearableContext";

// Brand Assets (Mock)
// In a real app, these would be SVGs or image imports
const BrandLogo = ({ brand }) => {
    const colors = {
        fitbit: "bg-teal-500",
        garmin: "bg-blue-600",
        apple: "bg-slate-800",
        samsung: "bg-blue-500",
        xiaomi: "bg-orange-500"
    };
    return (
        <div className={`w-10 h-10 rounded-xl ${colors[brand]} text-white flex items-center justify-center font-bold text-xs shadow-md`}>
            {brand.charAt(0).toUpperCase()}
        </div>
    );
};

export default function Wearables() {
  const { 
      connectProvider, 
      disconnectProvider, 
      provider, 
      status, 
      wearableData,
      lastSyncTime,
      syncData
  } = useWearable();

  const BRANDS = [
      { id: 'fitbit', name: 'Fitbit', desc: 'Syncs via Fitbit API', popular: true },
      { id: 'garmin', name: 'Garmin', desc: 'Garmin Connect Cloud' },
      { id: 'apple', name: 'Apple Health', desc: 'iOS HealthKit Sync' },
      { id: 'samsung', name: 'Samsung Health', desc: 'Galaxy Wearable Sync' },
      { id: 'xiaomi', name: 'Mi Fitness', desc: 'Zepp Life / Mi Fit' },
  ];

  const getStatusColor = () => {
      switch(status) {
          case 'connected': return 'text-emerald-500';
          case 'connecting': return 'text-amber-500';
          case 'syncing': return 'text-blue-500';
          case 'error': return 'text-red-500';
          default: return 'text-slate-400';
      }
  };

  const getStatusText = () => {
      switch(status) {
          case 'connected': return 'Connected';
          case 'connecting': return 'Authorizing...';
          case 'syncing': return 'Syncing Data...';
          case 'error': return 'Sync Failed';
          default: return 'Disconnected';
      }
  };


  const [selectedBrand, setSelectedBrand] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const startAuth = (brand) => {
      setSelectedBrand(brand);
      setShowAuthModal(true);
  };

  const confirmAuth = async () => {
      if (selectedBrand) {
          // Trigger the context flow
          connectProvider(selectedBrand.id);
          // The context handles the waiting/status
          // We can close modal after a delay or keep it open with 'connecting' state?
          // Let's keep modal open if connecting, or purely rely on the main UI?
          // Better: Close modal, let the main UI show the 'Connecting...' status we already have.
          setShowAuthModal(false);
      }
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in text-slate-800 relative">
      {/* AUTH MODAL */}
      {showAuthModal && selectedBrand && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowAuthModal(false)}></div>
              <Card className="relative z-10 w-full max-w-md bg-white p-8 shadow-2xl animate-scale-in border-0 rounded-2xl">
                  {/* Modal Header */}
                  <div className="text-center mb-8">
                      <div className="w-20 h-20 mx-auto bg-slate-50 rounded-3xl flex items-center justify-center mb-5 shadow-sm">
                          <BrandLogo brand={selectedBrand.id} />
                      </div>
                      <h3 className="text-2xl font-black text-slate-800">Connect {selectedBrand.name}</h3>
                      <p className="text-sm font-medium text-slate-400 mt-2">
                          Step-by-Step Mobile Integration
                      </p>
                  </div>
                  
                  {/* Step-by-Step Guide */}
                  <div className="space-y-6">
                      <div className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-black text-sm">1</div>
                          <div>
                              <h4 className="font-bold text-slate-800 text-sm">Open Mobile App</h4>
                              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                  Download and launch the <strong>Diet Dynamos Mobile App</strong> on your smartphone.
                              </p>
                          </div>
                      </div>

                      <div className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-black text-sm">2</div>
                          <div>
                              <h4 className="font-bold text-slate-800 text-sm">Navigate to Settings</h4>
                              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                  Tap the <strong>Profile Icon</strong> and select <strong>Integrations & Devices</strong>.
                              </p>
                          </div>
                      </div>

                      <div className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-black text-sm">3</div>
                          <div>
                              <h4 className="font-bold text-slate-800 text-sm">Select & Authorize</h4>
                              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                  Choose <strong>{selectedBrand.name}</strong> from the list and follow the on-screen prompts to log in securely.
                              </p>
                          </div>
                      </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 space-y-3">
                      <Button 
                        onClick={() => {
                            // Simulate checking status
                            setShowAuthModal(false);
                            confirmAuth(); // We can reuse this to pretend we checked and found a connection (or connected state)
                        }}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5"
                      >
                          I've Connected It
                      </Button>
                      <button 
                        onClick={() => setShowAuthModal(false)}
                        className="w-full py-3 text-slate-400 font-bold text-xs hover:text-slate-600 uppercase tracking-widest"
                      >
                          Close Instructions
                      </button>
                  </div>
              </Card>
          </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 animate-fade-in-up delay-100">
          <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 border-l-4 border-emerald-500 pl-4">Wearable Integrations</h1>
              <p className="text-slate-500 mt-2 pl-4">Connect your device via official cloud APIs.</p>
          </div>
          
          <div className="flex items-center gap-3">
              <span className={`px-3 py-1 bg-white border rounded-full text-xs font-bold shadow-sm flex items-center gap-2 ${getStatusColor()}`}>
                   <span className={`w-2 h-2 rounded-full ${['connected', 'syncing'].includes(status) ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></span>
                   {getStatusText()}
                   {status === 'connected' && <span className="text-slate-400 font-normal">| {provider?.charAt(0).toUpperCase() + provider?.slice(1)}</span>}
              </span>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up delay-200">
          
          {/* LEFT COLUMN: BRAND SELECTOR */}
          <div className="lg:col-span-1 space-y-6">
              {!provider ? (
                 <Card variant="glass" className="p-6 bg-white border-slate-200">
                    <h3 className="font-bold text-lg text-slate-900 mb-4">Select Your Device</h3>
                    <div className="space-y-3">
                        {BRANDS.map((brand) => (
                            <div 
                                key={brand.id}
                                className="group relative border border-slate-200 rounded-xl p-4 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer bg-white"
                                onClick={() => startAuth(brand)}
                            >
                                {status === 'connecting' && (
                                    <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
                                        <RefreshCw className="w-5 h-5 text-emerald-500 animate-spin" />
                                    </div>
                                )}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <BrandLogo brand={brand.id} />
                                        <div>
                                            <h4 className="font-bold text-slate-800 text-sm group-hover:text-emerald-700">{brand.name}</h4>
                                            <p className="text-xs text-slate-500">{brand.desc}</p>
                                        </div>
                                    </div>
                                    <div className="p-2 bg-slate-50 rounded-full text-slate-400 group-hover:text-emerald-600 group-hover:bg-emerald-50 transition-colors">
                                        <LinkIcon className="w-4 h-4" />
                                    </div>
                                </div>
                                {brand.popular && (
                                    <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                                        POPULAR
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-slate-400 mt-4 text-center">
                        <Lock className="w-3 h-3 inline mr-1" />
                        Secure OAuth 2.0 Connection
                    </p>
                 </Card>
              ) : (
                  <Card variant="glass" className="p-6 bg-white border-emerald-100 shadow-lg shadow-emerald-500/5">
                      <div className="flex flex-col items-center text-center py-6">
                           <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4 relative rotate-3 group-hover:rotate-0 transition-transform">
                               <BrandLogo brand={provider} />
                               <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                                   <CheckCircle className="w-5 h-5 text-emerald-500" />
                               </div>
                           </div>
                           <h3 className="font-bold text-xl text-slate-800">Connected to {BRANDS.find(b => b.id === provider)?.name}</h3>
                           <p className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-full">
                               <RefreshCw className={`w-3 h-3 ${status === 'syncing' ? 'animate-spin' : ''}`} /> 
                               {status === 'syncing' ? 'Syncing...' : 'Auto-Sync Active'}
                           </p>
                           
                           <div className="mt-8 w-full space-y-3">
                               <Button 
                                    onClick={() => syncData()} 
                                    disabled={status === 'syncing'}
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                                >
                                   Sync Now
                               </Button>
                               <Button 
                                    variant="outline" 
                                    onClick={disconnectProvider} 
                                    className="w-full border-red-200 text-red-500 hover:bg-red-50"
                               >
                                   Disconnect
                               </Button>
                           </div>
                      </div>
                  </Card>
              )}

              {/* LIVE DATA PREVIEW CARD */}
              {provider && (
                  <Card className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500 rounded-full blur-[80px] opacity-20 pointer-events-none" />
                      <div className="flex items-center justify-between mb-4 relative z-10">
                          <h3 className="font-bold">Health Metrics</h3>
                          <Battery className="w-4 h-4 text-emerald-400" />
                      </div>
                      
                      <div className="space-y-4 relative z-10">
                          <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                              <div className="flex items-center gap-3">
                                  <div className="p-2 bg-red-500/20 rounded-full text-red-400">
                                      <Heart className="w-5 h-5 animate-pulse" />
                                  </div>
                                  <div>
                                      <p className="text-xs text-slate-400">Avg Heart Rate</p>
                                      <p className="font-bold text-lg">{wearableData.heartRate} BPM</p>
                                  </div>
                              </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                                  <p className="text-xs text-slate-400">Steps</p>
                                  <p className="font-bold">{wearableData.steps.toLocaleString()}</p>
                              </div>
                              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                                  <p className="text-xs text-slate-400">Sleep</p>
                                  <p className="font-bold">{wearableData.sleep}</p>
                              </div>
                          </div>

                          <div className="text-right border-t border-white/10 pt-2">
                              <span className="text-[10px] text-slate-500">Last Sync: {lastSyncTime?.toLocaleTimeString()}</span>
                          </div>
                      </div>
                  </Card>
              )}
          </div>

          {/* RIGHT COLUMN: REMINDERS */}
          <div className="lg:col-span-2">
              <RemindersPanel />
          </div>

      </div>
    </div>
  );
}
