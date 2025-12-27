import { useState, useRef } from 'react';
import { Camera, Upload, CheckCircle, X, Search, PlusCircle, ScanLine } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';

export default function FoodScanner({ onAddFood }) {
  const [dragActive, setDragActive] = useState(false);
  const [image, setImage] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const inputRef = useRef(null);

  // Mock Vision API Logic
  const scanImage = (file) => {
    setImage(URL.createObjectURL(file));
    setScanning(true);
    setResult(null);

    // Simulate Network/Processing Delay
    setTimeout(() => {
        setScanning(false);
        // Randomly pick a result for demo purposes
        const results = [
            { name: "Grilled Salmon Bowl", calories: 450, protein: 35, carbs: 40, fat: 18, confidence: 98 },
            { name: "Avocado Toast", calories: 320, protein: 12, carbs: 35, fat: 16, confidence: 95 },
            { name: "Chicken Caesar Salad", calories: 380, protein: 28, carbs: 12, fat: 22, confidence: 92 },
            { name: "Protein Smoothie", calories: 210, protein: 20, carbs: 25, fat: 4, confidence: 99 },
        ];
        setResult(results[Math.floor(Math.random() * results.length)]);
    }, 2500); // 2.5s scanning effect
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      scanImage(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      scanImage(e.target.files[0]);
    }
  };

  const reset = () => {
      setImage(null);
      setResult(null);
      setScanning(false);
  };

  return (
    <Card className="p-0 overflow-hidden bg-slate-900 border-slate-800 text-white relative">
      <div className="absolute inset-0 bg-blue-500/5 pointer-events-none"></div>
      
      {/* Header */}
      <div className="p-6 border-b border-slate-700/50 flex justify-between items-center relative z-10">
          <div>
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">AI Vision Scanner</h3>
              <p className="text-slate-400 text-xs">Snap a meal to track instantly</p>
          </div>
          <div className="p-2 bg-slate-800 rounded-full">
              <Camera className="w-5 h-5 text-blue-400" />
          </div>
      </div>

      <div className="p-6 relative z-10">
          {!image ? (
               <div 
                  className={`border-2 border-dashed rounded-2xl h-64 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer text-center p-6 ${dragActive ? "border-blue-500 bg-blue-500/10" : "border-slate-700 hover:border-slate-600 hover:bg-slate-800/50"}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => inputRef.current?.click()}
               >
                   <input ref={inputRef} type="file" className="hidden" accept="image/*" onChange={handleChange} />
                   <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4 shadow-lg">
                       <Upload className={`w-8 h-8 text-slate-400 ${dragActive ? 'animate-bounce text-blue-400' : ''}`} />
                   </div>
                   <p className="text-sm font-bold text-slate-300">Tap or Drag & Drop Image</p>
                   <p className="text-xs text-slate-500 mt-2">Supports JPG, PNG (Max 5MB)</p>
               </div>
          ) : (
              <div className="relative rounded-2xl overflow-hidden h-64 bg-black group">
                  <img src={image} alt="Scan" className="w-full h-full object-cover opacity-80" />
                  
                  {/* Scanning Overlay */}
                  {scanning && (
                      <div className="absolute inset-0 flex items-center justify-center z-20">
                          <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-[2px]"></div>
                          <div className="w-full h-1 bg-blue-400 absolute top-0 shadow-[0_0_15px_rgba(96,165,250,1)] animate-scan"></div>
                          <div className="relative bg-black/80 text-blue-400 px-6 py-2 rounded-full font-mono text-sm border border-blue-500/30 flex items-center gap-3">
                              <ScanLine className="w-4 h-4 animate-spin-slow" />
                              Analyzing Pixels...
                          </div>
                      </div>
                  )}

                  {/* Close Button */}
                  {!scanning && (
                      <button 
                        onClick={reset}
                        className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors z-30"
                      >
                          <X className="w-4 h-4" />
                      </button>
                  )}
              </div>
          )}

          {/* Results Area */}
          {result && !scanning && (
              <div className="mt-6 animate-slide-up">
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-emerald-500/30 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                          <div>
                              <div className="flex items-center gap-2 mb-1">
                                  <h4 className="text-lg font-bold text-white">{result.name}</h4>
                                  <span className="text-[10px] items-center flex gap-1 bg-emerald-900/50 text-emerald-400 px-2 py-0.5 rounded border border-emerald-900">
                                      <CheckCircle className="w-3 h-3" /> {result.confidence}% Match
                                  </span>
                              </div>
                              <p className="text-xs text-slate-400">Portion: 1 Serving (Est.)</p>
                          </div>
                      </div>

                      <div className="grid grid-cols-4 gap-2 mb-4">
                          <div className="text-center p-2 bg-slate-900 rounded-lg">
                              <div className="text-xs text-slate-400 mb-1">Cals</div>
                              <div className="font-bold text-white">{result.calories}</div>
                          </div>
                          <div className="text-center p-2 bg-slate-900 rounded-lg">
                              <div className="text-xs text-slate-400 mb-1">Pro</div>
                              <div className="font-bold text-blue-400">{result.protein}g</div>
                          </div>
                          <div className="text-center p-2 bg-slate-900 rounded-lg">
                              <div className="text-xs text-slate-400 mb-1">Carbs</div>
                              <div className="font-bold text-yellow-400">{result.carbs}g</div>
                          </div>
                          <div className="text-center p-2 bg-slate-900 rounded-lg">
                              <div className="text-xs text-slate-400 mb-1">Fat</div>
                              <div className="font-bold text-red-400">{result.fat}g</div>
                          </div>
                      </div>

                      <Button 
                        onClick={() => onAddFood && onAddFood(result)}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white"
                        icon={PlusCircle}
                      >
                          Add to Daily Log
                      </Button>
                  </div>
              </div>
          )}
      </div>
      
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </Card>
  );
}
