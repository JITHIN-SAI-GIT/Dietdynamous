import { useState } from "react";
import { Shield, Scroll, Trophy, Star, Zap, Crown, Flame, Sword, Skull } from "lucide-react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Badge from "./ui/Badge";

export default function RPG({ streak }) {
  const [selectedClass, setSelectedClass] = useState(null);
  const [activeBattle, setActiveBattle] = useState(null);
  const [battleLog, setBattleLog] = useState([]);
  
  // Mock Hero State (would be in DB)
  const [hero, setHero] = useState({
      name: "Player 1",
      level: 5,
      xp: 450,
      xpToNext: 1000,
      class: {
          name: "The Sentinel",
          icon: Sword,
          color: "red",
          stats: { str: 9, end: 4, agi: 2 } // Mock
      },
      stats: { str: 9, end: 4, agi: 2 }
  });

  const xpPercent = (hero.xp / hero.xpToNext) * 100;

  const classes = [
    {
      id: "warden",
      name: "The Warden",
      icon: Shield,
      desc: "Protector of the realm. Gains bonus XP from walks & steps.",
      color: "blue",
      stats: { str: 3, end: 8, agi: 4 },
    },
    {
      id: "sentinel",
      name: "The Sentinel",
      icon: Sword,
      desc: "Warrior of light. Gains bonus XP from high-intensity workouts.",
      color: "red",
      stats: { str: 9, end: 4, agi: 2 },
    },
    {
      id: "ascetic",
      name: "The Ascetic",
      icon: Scroll,
      desc: "Master of balance. Gains bonus XP from consistency & yoga.",
      color: "emerald",
      stats: { str: 4, end: 6, agi: 8 },
    },
  ];

  const monsters = [
      { id: 1, name: "Sugar Demon", level: 3, hp: 500, task: "Do 20 Burpees" },
      { id: 2, name: "Sloth Titan", level: 5, hp: 1200, task: "Run 3km" },
      { id: 3, name: "Carb Golem", level: 8, hp: 2000, task: "No Sugar for 24h" },
  ];

  const handleClassSelect = (cls) => {
      setSelectedClass(cls);
      // In real app, update DB
      setHero(prev => ({ ...prev, class: cls, stats: cls.stats }));
  };

  const handleBattleStart = (monster) => {
      setActiveBattle(monster);
      setBattleLog([`Battle started against ${monster.name}!`, `Objective: ${monster.task}`]);
  };

  const handleAttack = () => {
    // Simulate battle logic
    const dmg = Math.floor(Math.random() * 50) + 20;
    setBattleLog(prev => [...prev, `You attacked for ${dmg} damage!`]);
    // Logic to win/lose would go here
  };

  return (
    <div className="space-y-12 pb-12 animate-fade-in">
      
      {/* HEADER SECTION */}
      <div className="text-center space-y-4 relative z-10 animate-fade-in-up delay-100">
         <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-2xl shadow-lg shadow-purple-500/20 mb-4">
             <Crown className="w-8 h-8 text-white" />
         </div>
         <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
            The Vitality Chronicle <span className="text-purple-600">⚔️</span>
         </h1>
         <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Restore the vitality of Aethelgard through your sweat!
         </p>
      </div>

      {/* CLASS SELECTION CARDS */}
      {!selectedClass && !hero.class ? (
        <div className="space-y-8 animate-fade-in-up delay-200">
            <div className="flex items-center justify-center">
                 <h2 className="text-2xl font-bold text-slate-700 relative">
                    <span className="relative z-10">Choose Your Destiny</span>
                    <div className="absolute bottom-1 left-0 w-full h-3 bg-purple-100 -z-0"></div>
                 </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {classes.map((cls) => {
                const Icon = cls.icon;
                
                return (
                    <Card 
                        key={cls.id} 
                        variant="glass" 
                        onClick={() => handleClassSelect(cls)}
                        className={`p-8 cursor-pointer hover:-translate-y-2 transition-transform duration-300 relative group overflow-hidden bg-white border-${cls.color}-200`}
                    >   
                        <div className={`w-20 h-20 bg-${cls.color}-100 rounded-2xl flex items-center justify-center text-${cls.color}-600 mb-6 group-hover:scale-110 transition-transform`}>
                            <Icon size={40} />
                        </div>
                        <h3 className={`text-2xl font-black text-slate-800 mb-2 group-hover:text-${cls.color}-600 transition-colors`}>{cls.name}</h3>
                        <p className="text-slate-500 font-medium mb-6 leading-relaxed">{cls.desc}</p>
                        
                        <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                             <StatBar label="STR" val={cls.stats.str} color="red" />
                             <StatBar label="END" val={cls.stats.end} color="blue" />
                             <StatBar label="AGI" val={cls.stats.agi} color="emerald" />
                        </div>

                        {/* Hover Gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-${cls.color}-50/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}></div>
                    </Card>
                )
            })}
            </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8 animate-fade-in-up delay-200">
            {/* BATTLE MODAL */}
            {activeBattle && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="max-w-md w-full">
                        <Card variant="solid" className="bg-slate-900 border-2 border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.4)] overflow-hidden">
                            <div className="p-8 text-center relative">
                                {/* Background Effect */}
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 blur-[60px]"></div>

                                <Badge className="bg-red-500/20 text-red-400 border-red-500/40 mb-4 animate-pulse">
                                    ⚔️ COMBAT ENGAGED
                                </Badge>
                                
                                <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-wider">{activeBattle.name}</h3>
                                <p className="text-red-300 font-medium mb-8">Objective Required to Defeat:</p>
                                
                                <div className="bg-red-900/30 p-6 rounded-2xl border border-red-500/30 mb-8 backdrop-blur-md">
                                    <p className="text-2xl font-black text-orange-200">{activeBattle.task}</p>
                                </div>

                                <div className="space-y-3">
                                    <Button 
                                        onClick={handleAttack}
                                        className="w-full py-6 text-lg font-black bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white shadow-lg border-0"
                                        icon={Sword}
                                    >
                                         COMPLETE REPS & ATTACK!
                                    </Button>
                                    <button 
                                        onClick={() => setActiveBattle(null)}
                                        className="text-slate-500 hover:text-slate-300 text-sm font-bold transition-colors"
                                    >
                                        Flee Battle (Coward!)
                                    </button>
                                </div>

                                {/* BATTLE LOG */}
                                <div className="mt-8 text-left h-32 overflow-y-auto text-xs text-slate-400 space-y-2 bg-black/40 p-4 rounded-xl border border-white/5 font-mono scrollbar-thin scrollbar-thumb-slate-700">
                                    {battleLog.map((log, i) => (
                                        <div key={i}>{'>'} {log}</div>
                                    ))}
                                    <div ref={(el) => el?.scrollIntoView({ behavior: 'smooth' })} />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            )}

            {/* HERO CARD */}
            <div className="lg:col-span-1">
                <Card variant="glass" className="p-6 sticky top-24 bg-white border-slate-200">
                   <div className="flex items-center gap-4 mb-8">
                      <div className={`w-20 h-20 bg-${hero.class.color}-100 rounded-2xl flex items-center justify-center text-${hero.class.color}-600 border border-${hero.class.color}-200 shadow-lg`}>
                          <hero.class.icon className="w-10 h-10" />
                      </div>
                      <div>
                          <h3 className="text-2xl font-black text-slate-800">{hero.name}</h3>
                          <Badge variant="outline" className={`border-${hero.class.color}-200 text-${hero.class.color}-600`}>
                              Lvl {hero.level} {hero.class.name}
                          </Badge>
                      </div>
                   </div>

                   {/* XP BAR */}
                   <div className="mb-8">
                      <div className="flex justify-between text-xs font-bold mb-2 text-slate-500 uppercase tracking-wider">
                          <span>Experience Points</span>
                          <span>{hero.xp} / {hero.xpToNext}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200 relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-yellow-50"></div>
                          <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-300 shadow-[0_0_10px_rgba(234,179,8,0.4)]" style={{ width: `${xpPercent}%` }}></div>
                      </div>
                   </div>

                   <div className="space-y-4">
                       <StatBar label="Strength" val={hero.stats.str} color="red" />
                       <StatBar label="Endurance" val={hero.stats.end} color="blue" />
                       <StatBar label="Agility" val={hero.stats.agi} color="emerald" />
                   </div>
                </Card>
            </div>

            {/* ACTION AREA */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* QUEST BOARD */}
              <Card variant="solid" className="p-8 relative bg-amber-50 border-amber-200">
                   <div className="absolute -top-3 left-8 bg-amber-500 px-4 py-1 rounded text-xs font-bold text-white border border-amber-600 shadow-lg uppercase tracking-wider">Daily Quests</div>
                   
                   <ul className="space-y-4 mt-4">
                       <li className="flex items-center gap-4 p-3 bg-white rounded-xl border border-amber-200 hover:shadow-md transition-all cursor-pointer group">
                           <div className="w-6 h-6 rounded border-2 border-amber-300 flex items-center justify-center group-hover:border-amber-500">
                              <div className="w-3 h-3 bg-amber-500 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                           </div>
                           <span className="font-medium text-amber-900/90 group-hover:text-amber-800">Walk 5,000 Steps (Reward: 50 XP)</span>
                       </li>
                       <li className="flex items-center gap-4 p-3 bg-white rounded-xl border border-amber-200 hover:shadow-md transition-all cursor-pointer group">
                           <div className="w-6 h-6 rounded border-2 border-amber-300 flex items-center justify-center group-hover:border-amber-500">
                              <div className="w-3 h-3 bg-amber-500 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                           </div>
                           <span className="font-medium text-amber-900/90 group-hover:text-amber-800">Complete a 15 min Workout (Reward: 100 XP)</span>
                       </li>
                   </ul>
              </Card>

              {/* MONSTER LIST */}
              <div>
                  <h3 className="text-xl font-bold flex items-center gap-2 mb-6 text-slate-800">
                      <Skull className="w-6 h-6 text-red-500" /> Battle The Blight
                  </h3>
                  <div className="grid gap-4">
                      {monsters.map((m, i) => (
                          <Card key={i} variant="glass" className="p-4 flex items-center justify-between hover:border-red-200 transition-all group relative overflow-hidden bg-white border-slate-200">
                              <div className="absolute inset-0 bg-red-50/0 group-hover:bg-red-50/50 transition-colors"></div>
                              <div className="relative z-10 flex gap-4 items-center">
                                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-500 text-lg font-bold border border-red-200">
                                      {m.name[0]}
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-lg text-slate-800 group-hover:text-red-600 transition-colors">{m.name}</h4>
                                      <div className="flex items-center gap-2 mt-1">
                                          <Badge size="sm" variant="outline" className="text-xs border-slate-300 text-slate-500">Lvl {m.level}</Badge>
                                          <span className="text-xs text-slate-500 font-bold uppercase">{m.hp} HP</span>
                                      </div>
                                  </div>
                              </div>
                              
                              <Button 
                                  onClick={() => handleBattleStart(m)}
                                  variant="danger"
                                  size="sm"
                                  className="relative z-10 shadow-lg shadow-red-500/20"
                                  icon={Sword}
                              >
                                  Battle
                              </Button>
                          </Card>
                      ))}
                  </div>
              </div>

            </div>
        </div>
      )}

    </div>
  );
}

function StatBar({ label, val, color }) {
    return (
        <div>
            <div className="flex justify-between text-xs font-bold text-slate-400 mb-1 uppercase">
                <span>{label}</span>
                <span className={`text-${color}-500`}>{val}</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className={`h-full bg-${color}-500 shadow-sm`} style={{ width: `${(val / 20) * 100}%` }}></div>
            </div>
        </div>
    )
}
