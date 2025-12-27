import { useState, useEffect } from "react";
import { User, MapPin, Briefcase, Activity, Edit2, Hexagon, Trophy, Save, X } from "lucide-react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Badge from "./ui/Badge";

export default function UserProfile({ userData, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(userData || {});

  useEffect(() => {
    if (userData) setForm(userData);
  }, [userData]);

  if (!userData) return <div className="text-center p-10 text-slate-400 animate-pulse">Loading Profile...</div>;

  const handleSave = () => {
    // In a real app, call API to update user
    onUpdate({ ...userData, ...form });
    setIsEditing(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* HEADER CARD */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl group border border-indigo-200 animate-fade-in-up delay-100">
        {/* Background Gradient & Pattern - Kept colorful but refined */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-[0_0_40px_rgba(255,255,255,0.2)] border-4 border-white/20 relative group-hover:scale-105 transition-transform duration-500">
                <User className="w-16 h-16" />
                <div className="absolute bottom-0 right-0 bg-emerald-500 w-8 h-8 rounded-full border-4 border-purple-600 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                </div>
            </div>

            <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
                    {form.name || "User Profile"}
                </h1>
                <p className="text-purple-200 font-medium text-lg mb-4">{form.email || "user@example.com"}</p>
                
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <Badge variant="glass" className="bg-white/20 hover:bg-white/30 text-white border-white/20">
                        <MapPin className="w-3 h-3 mr-1" /> {form.locality || "Unknown Locality"}
                    </Badge>
                    <Badge variant="glass" className="bg-white/20 hover:bg-white/30 text-white border-white/20">
                        <Briefcase className="w-3 h-3 mr-1" /> {form.profession || "Unknown Profession"}
                    </Badge>
                    <Badge variant="glass" className="bg-white/20 hover:bg-white/30 text-white border-white/20">
                        {form.age} years old • {form.gender}
                    </Badge>
                </div>
            </div>

            <Button 
                onClick={() => setIsEditing(!isEditing)}
                variant="glass"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20 shadow-lg backdrop-blur-md"
                icon={isEditing ? X : Edit2}
            >
                {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
        </div>
      </div>

      {/* STATS ROW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up delay-200">
        <StatCard label="Height" value={`${form.height} cm`} color="blue" />
        <StatCard label="Weight" value={`${form.weight} kg`} color="emerald" />
        <StatCard label="Goal" value={form.goal?.replace("_", " ")} color="orange" />
        <StatCard label="Points" value={userData.gamification?.points || 0} color="purple" icon={Trophy} />
      </div>

      {/* EDIT FORM */}
      {isEditing && (
        <Card variant="glass" className="p-8 border-slate-200 animate-in fade-in slide-in-from-top-4 bg-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
          
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
            <Edit2 className="w-5 h-5 text-purple-500" /> Edit Details
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 relative z-10">
             <Input label="Locality" value={form.locality} onChange={v => setForm({...form, locality: v})} className="bg-slate-50 border-slate-200" />
             <Input label="Profession" value={form.profession} onChange={v => setForm({...form, profession: v})} className="bg-slate-50 border-slate-200" />
             <Input label="Weight (kg)" value={form.weight} type="number" onChange={v => setForm({...form, weight: v})} className="bg-slate-50 border-slate-200" />
             <Input label="Age" value={form.age} type="number" onChange={v => setForm({...form, age: v})} className="bg-slate-50 border-slate-200" />
          </div>

          <Button 
            onClick={handleSave}
            variant="primary"
            className="mt-8 w-full shadow-lg shadow-emerald-500/20"
            icon={Save}
          >
            Save Changes
          </Button>
        </Card>
      )}

      {/* MEDICAL HISTORY */}
      <Card variant="glass" className="p-8 border-slate-200 bg-white shadow-sm">
         <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-red-500" /> Medical History
         </h3>
         <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-slate-600 leading-relaxed font-medium">
            {form.medicalHistory || "No medical history recorded."}
         </div>
      </Card>
    </div>
  );
}

function StatCard({ label, value, color, icon: Icon }) {
  return (
    <Card variant="glass" className={`p-6 flex flex-col items-center justify-center text-center bg-white border-slate-200 hover:border-${color}-200 hover:shadow-lg transition-all group relative overflow-hidden`}>
      <div className={`absolute inset-0 bg-${color}-50 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
      <div className="relative z-10">
          <span className={`text-${color}-500 font-black text-2xl flex items-center gap-2 mb-1 justify-center group-hover:scale-110 transition-transform`}>
             {Icon && <Icon className="w-6 h-6" />}
             {value}
          </span>
          <span className={`text-slate-400 text-xs uppercase font-bold tracking-wider group-hover:text-${color}-600 transition-colors`}>{label}</span>
      </div>
    </Card>
  )
}
