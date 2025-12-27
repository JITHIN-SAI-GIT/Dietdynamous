import React from 'react';
import { Palette, Check } from 'lucide-react';
import Card from './ui/Card';
import { useTheme } from '../contexts/ThemeContext';

const Themes = () => {
  const { theme: activeTheme, setTheme } = useTheme();

  const themes = [
    { id: 'light', name: 'Clean Light', color: 'bg-slate-50', text: 'text-slate-900' },
    { id: 'dark', name: 'Midnight Dark', color: 'bg-slate-900', text: 'text-white' },
    { id: 'emerald', name: 'Emerald Forest', color: 'bg-emerald-900', text: 'text-emerald-50' },
    { id: 'ocean', name: 'Deep Ocean', color: 'bg-sky-900', text: 'text-sky-50' },
    { id: 'sunset', name: 'Sunset Vibes', color: 'bg-orange-50', text: 'text-orange-900' },
    { id: 'lavender', name: 'Lavender Haze', color: 'bg-purple-50', text: 'text-purple-900' },
  ];

  const handleApply = (themeId) => {
      setTheme(themeId);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-4 animate-fade-in-up delay-100">
        <div className="p-3 bg-indigo-100 rounded-xl">
            <Palette className="w-8 h-8 text-indigo-600" />
        </div>
        <div>
            <h1 className="text-3xl font-bold text-slate-800">Theme Store</h1>
            <p className="text-slate-500">Customize the look and feel of your workspace.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up delay-200">
        {themes.map((theme) => (
            <Card 
                key={theme.id} 
                className={`p-6 cursor-pointer group transition-all duration-300 hover:scale-[1.02] border-2 ${activeTheme === theme.id ? 'border-emerald-500 ring-4 ring-emerald-500/10' : 'border-slate-100 hover:border-emerald-300'}`}
                variant="glass"
                onClick={() => handleApply(theme.id)}
            >
                <div className={`h-32 mb-4 rounded-xl shadow-inner flex items-center justify-center ${theme.color}`}>
                    <span className={`font-bold text-lg ${theme.text}`}>Aa</span>
                </div>
                
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-slate-800">{theme.name}</h3>
                        <p className="text-xs text-slate-500 uppercase tracking-wide">{activeTheme === theme.id ? 'Active' : 'Click to apply'}</p>
                    </div>
                    {activeTheme === theme.id && (
                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                            <Check className="w-4 h-4" />
                        </div>
                    )}
                </div>
            </Card>
        ))}
      </div>
    </div>
  );
};

export default Themes;
