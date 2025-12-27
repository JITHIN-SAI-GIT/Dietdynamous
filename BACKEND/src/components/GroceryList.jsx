import { useState } from "react";
import { ShoppingCart, Check, Trash2, Plus, Download } from "lucide-react";
import Card from "./ui/Card";
import Button from "./ui/Button";

// Mock Data derived from a "Diet Plan"
const GENERATED_LIST = {
    "Produce": [
        { id: 1, name: "Spinach", amount: "200g", checked: false },
        { id: 2, name: "Avocados", amount: "3 count", checked: false },
        { id: 3, name: "Sweet Potato", amount: "1 kg", checked: false },
        { id: 4, name: "Bananas", amount: "6 count", checked: true },
    ],
    "Protein": [
        { id: 5, name: "Chicken Breast", amount: "1 kg", checked: false },
        { id: 6, name: "Salmon Fillet", amount: "500g", checked: false },
        { id: 7, name: "Eggs", amount: "12 count", checked: true },
    ],
    "Pantry": [
        { id: 8, name: "Quinoa", amount: "500g", checked: false },
        { id: 9, name: "Olive Oil", amount: "1 bottle", checked: true },
        { id: 10, name: "Almonds", amount: "200g", checked: false },
    ]
};

export default function GroceryList() {
  const [list, setList] = useState(GENERATED_LIST);

  const toggleCheck = (category, id) => {
      setList(prev => ({
          ...prev,
          [category]: prev[category].map(item => 
              item.id === id ? { ...item, checked: !item.checked } : item
          )
      }));
  };

  const getProgress = () => {
      let total = 0;
      let checked = 0;
      Object.values(list).forEach(items => {
          items.forEach(i => {
              total++;
              if (i.checked) checked++;
          });
      });
      return Math.round((checked / total) * 100);
  };

  // ... inside component
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", amount: "1", category: "Pantry" });

  const handleAddItem = (e) => {
      e.preventDefault();
      if (!newItem.name) return;
      
      const category = newItem.category;
      const itemToAdd = {
          id: Date.now(),
          name: newItem.name,
          amount: newItem.amount,
          checked: false
      };

      setList(prev => ({
          ...prev,
          [category]: [...(prev[category] || []), itemToAdd]
      }));
      
      setIsAdding(false);
      setNewItem({ name: "", amount: "1", category: "Pantry" });
  };

  const handleExport = () => {
     const text = Object.entries(list).map(([cat, items]) => {
         return `${cat.toUpperCase()}:\n` + items.map(i => `- [${i.checked ? 'x' : ' '}] ${i.name} (${i.amount})`).join('\n');
     }).join('\n\n');
     
     // Simple download mock
     const blob = new Blob([text], { type: 'text/plain' });
     const url = URL.createObjectURL(blob);
     const a = document.createElement('a');
     a.href = url;
     a.download = 'shopping-list.txt';
     a.click();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-fade-in">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Grocery <span className="text-emerald-500">List</span></h1>
                <p className="text-slate-500">Generated from your Weekly Meal Plan</p>
            </div>
            <div className="text-right">
                <div className="text-2xl font-black text-slate-800">{getProgress()}%</div>
                <div className="text-xs font-bold text-slate-400 uppercase">Completed</div>
            </div>
        </div>

        {/* Categories */}
        {Object.entries(list).map(([category, items], idx) => (
            <Card 
                key={category} 
                className="bg-white border-slate-200 overflow-hidden animate-fade-in-up" 
                variant="glass"
                style={{ animationDelay: `${(idx + 1) * 100}ms` }}
            >
                <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-700">{category}</h3>
                    <span className="text-xs font-bold bg-white px-2 py-1 rounded border border-slate-200 text-slate-500">{items.length} items</span>
                </div>
                <div>
                    {items.map((item) => (
                        <div 
                            key={item.id}
                            onClick={() => toggleCheck(category, item.id)}
                            className={`px-6 py-4 flex items-center justify-between cursor-pointer transition-all hover:bg-slate-50 border-b last:border-0 border-slate-50
                                ${item.checked ? 'opacity-50 grayscale' : 'opacity-100'}
                            `}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                                    ${item.checked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 bg-white'}
                                `}>
                                    {item.checked && <Check className="w-3 h-3" />}
                                </div>
                                <span className={`font-medium ${item.checked ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                                    {item.name}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                                    {item.amount}
                                </span>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setList(prev => ({
                                            ...prev,
                                            [category]: prev[category].filter(i => i.id !== item.id)
                                        }));
                                    }}
                                    className="p-1 text-slate-300 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        ))}
        
        {/* Adds Item UI */}
        {isAdding && (
            <Card className="bg-emerald-50 border-emerald-200 p-4 animate-slide-up">
                <form onSubmit={handleAddItem} className="flex flex-col md:flex-row gap-3">
                    <input 
                        type="text" 
                        placeholder="Item Name (e.g. Milk)" 
                        className="flex-1 px-4 py-2 rounded-xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        value={newItem.name}
                        onChange={e => setNewItem({...newItem, name: e.target.value})}
                        autoFocus
                    />
                     <input 
                        type="text" 
                        placeholder="Amount" 
                        className="w-full md:w-32 px-4 py-2 rounded-xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        value={newItem.amount}
                        onChange={e => setNewItem({...newItem, amount: e.target.value})}
                    />
                    <select 
                        className="px-4 py-2 rounded-xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                        value={newItem.category}
                        onChange={e => setNewItem({...newItem, category: e.target.value})}
                    >
                        {Object.keys(list).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <div className="flex gap-2">
                        <Button type="submit" size="sm" className="bg-emerald-600 text-white">Save</Button>
                        <Button type="button" size="sm" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                    </div>
                </form>
            </Card>
        )}

        <div className="flex gap-4 pt-4">
            <Button onClick={handleExport} className="flex-1 bg-slate-800 text-white hover:bg-slate-900" icon={Download}>
                Export List
            </Button>
            <Button onClick={() => setIsAdding(true)} className="flex-1 bg-emerald-600 text-white hover:bg-emerald-500" icon={Plus}>
                Add Item
            </Button>
        </div>
    </div>
  );
}
