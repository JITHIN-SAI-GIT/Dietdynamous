import { useState } from "react";
import { Search, Plus, Utensils, Camera } from "lucide-react";
import FoodScanner from "./FoodScanner";
import Card from "./ui/Card";
import Input from "./ui/Input";
import Button from "./ui/Button";
import Badge from "./ui/Badge";
import { searchFood } from "../data/mockData";


export default function FoodSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('text'); // 'text' or 'scan'

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
        const found = searchFood(query);
        setResults(found);
        setLoading(false);
    }, 600);
  };

  const handleScanResult = (foodItem) => {
      // Add standard fields to match search results
      const formatted = {
          id: Date.now(),
          ...foodItem
      };
      setResults([formatted, ...results]);
      setMode('text'); // Switch back to see result
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <div className="text-center space-y-4 animate-fade-in-up delay-100">
          <Badge className="bg-emerald-100 text-emerald-600 border-emerald-200">
             🍎 Knowledge is Power
          </Badge>
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
             Food <span className="text-emerald-500">Explorer</span>
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto">
             Instantly find nutritional info for thousands of foods. Track smarter, eat better.
          </p>
      </div>

      {/* SEARCH MODE TOGGLE */}
      <div className="flex justify-center gap-4 animate-fade-in-up delay-200">
          <button 
            onClick={() => setMode('text')}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${mode === 'text' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
          >
              Text Search
          </button>
          <button 
            onClick={() => setMode('scan')}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${mode === 'scan' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
          >
              <Camera className="w-4 h-4" /> AI Vision Scan
          </button>
      </div>

      {mode === 'scan' ? (
          <div className="animate-fade-in delay-300">
              <FoodScanner onAddFood={handleScanResult} />
          </div>
      ) : (
          <Card variant="solid" className="bg-white border-slate-200 shadow-xl overflow-visible relative z-10 animate-fade-in-up delay-300">
              <form onSubmit={handleSearch} className="flex gap-4 p-2">
                  <Input 
                      placeholder="e.g. Avocado Toast, Grilled Salmon..." 
                      value={query} 
                      onChange={(e) => setQuery(e.target.value)} 
                      className="flex-1 bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400"
                      icon={Search}
                      containerClassName="flex-1"
                  />
                  <Button type="submit" isLoading={loading} className="px-8 shadow-lg shadow-emerald-500/20">
                      Find Food
                  </Button>
              </form>
          </Card>
      )}

      <div className="space-y-4 animate-fade-in-up delay-400">
          {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.map((food) => (
                      <Card key={food.id} variant="glass" className="hover:bg-emerald-50/50 transition-colors group bg-white border-slate-200">
                           <div className="flex justify-between items-start mb-4">
                               <div className="flex items-center gap-3">
                                   <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center">
                                       <Utensils className="w-6 h-6" />
                                   </div>
                                   <div>
                                       <h3 className="font-bold text-lg text-slate-800 group-hover:text-emerald-600 transition-colors">{food.name}</h3>
                                       <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">1 Serving</span>
                                   </div>
                               </div>
                               <Button size="sm" variant="ghost" icon={Plus} className="text-emerald-600 hover:bg-emerald-100">Add</Button>
                           </div>

                           <div className="grid grid-cols-3 gap-2 text-center">
                               <div className="p-2 bg-slate-50 rounded-lg">
                                   <div className="text-xs text-slate-500 font-bold uppercase mb-1">Cals</div>
                                   <div className="text-xl font-black text-slate-800">{food.calories}</div>
                               </div>
                               <div className="p-2 bg-slate-50 rounded-lg">
                                   <div className="text-xs text-slate-500 font-bold uppercase mb-1">Protein</div>
                                   <div className="text-xl font-black text-slate-800">{food.protein}g</div>
                               </div>
                               <div className="p-2 bg-slate-50 rounded-lg">
                                   <div className="text-xs text-slate-500 font-bold uppercase mb-1">Carbs</div>
                                   <div className="text-xl font-black text-slate-800">{food.carbs}g</div>
                               </div>
                           </div>
                      </Card>
                  ))}
              </div>
          ) : (
                !loading && mode === 'text' && (
                    <div className="text-center py-12 text-slate-400">
                        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200">
                            <Search className="w-10 h-10 text-slate-300" />
                        </div>
                        <p>Search for a food to see details</p>
                    </div>
                )
          )}
      </div>
    </div>
  );
}
