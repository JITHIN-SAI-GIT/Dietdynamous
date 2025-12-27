import { useState, useEffect } from "react";
import { Swords, Trophy, User, Shield, Zap, Flame } from "lucide-react";
import Card from "./ui/Card";
import Button from "./ui/Button";

// Avatar Mock
const Avatar = ({ color, name, hp, maxHp }) => (
    <div className="flex flex-col items-center">
        <div className="relative mb-4">
            <div className={`w-24 h-24 rounded-full border-4 border-white shadow-xl ${color} flex items-center justify-center overflow-hidden`}>
                <User className="w-12 h-12 text-white/50" />
            </div>
            {/* HP Bar */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-2 bg-slate-700 rounded-full overflow-hidden border border-slate-600">
                <div 
                    className={`h-full transition-all duration-500 ${hp > 30 ? 'bg-emerald-500' : 'bg-red-500'}`}
                    style={{ width: `${(hp/maxHp)*100}%` }}
                ></div>
            </div>
        </div>
        <h3 className="font-bold text-slate-800">{name}</h3>
        <p className="text-xs font-bold text-slate-400">{hp}/{maxHp} HP</p>
    </div>
);

export default function PvPDuelArena() {
  const [battleState, setBattleState] = useState('lobby'); // lobby, fighting, victory, defeat
  const [playerSteps, setPlayerSteps] = useState(8432);
  const [enemySteps, setEnemySteps] = useState(0);
  const [battleLog, setBattleLog] = useState([]);
  
  // Game Stats
  const PLAYER_MAX_HP = 1000;
  const [playerHp, setPlayerHp] = useState(1000);
  const [enemyHp, setEnemyHp] = useState(1000);

  // Simulate Battle
  useEffect(() => {
     if (battleState === 'fighting') {
         const interval = setInterval(() => {
             // Enemy Bot Logic
             const dmg = Math.floor(Math.random() * 50) + 10;
             setPlayerHp(prev => Math.max(0, prev - dmg));
             
             // Log
             setBattleLog(prev => [`Opponent attacks for ${dmg} DMG!`, ...prev.slice(0,4)]);

             // Win/Loss Condition
             if (playerHp <= 0) setBattleState('defeat');
         }, 2000);
         
         return () => clearInterval(interval);
     }
  }, [battleState, playerHp]);

  const handleAttack = () => {
      // Attack based on steps
      const dmg = Math.floor(Math.random() * 80) + 20;
      setEnemyHp(prev => {
          const newHp = Math.max(0, prev - dmg);
          if (newHp <= 0) setBattleState('victory');
          return newHp;
      });
      setBattleLog(prev => [`You hit for ${dmg} DMG!`, ...prev.slice(0,4)]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up delay-100">
            <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight flex items-center justify-center gap-3">
                <Swords className="w-10 h-10 text-rose-500" />
                PvP <span className="text-rose-500">Arena</span>
            </h1>
            <p className="text-slate-500">Transform your steps into damage. Win battles to rank up.</p>
        </div>

        {battleState === 'lobby' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up delay-200">
                <Card className="p-8 text-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl shadow-indigo-500/30 border-0">
                    <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-300 drop-shadow-lg" />
                    <h2 className="text-2xl font-bold mb-2">Ranked Match</h2>
                    <p className="text-indigo-100 mb-8">Challenge a random opponent based on your step count.</p>
                    <Button 
                        onClick={() => setBattleState('fighting')}
                        className="bg-white text-indigo-600 hover:bg-indigo-50 w-full font-black tracking-wider"
                    >
                        FIND MATCH
                    </Button>
                </Card>
                <Card className="p-8 text-center bg-white border-slate-200">
                    <User className="w-16 h-16 mx-auto mb-4 text-emerald-500" />
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Friend Duel</h2>
                    <p className="text-slate-400 mb-8">Invite a friend for a friendly 24h step battle.</p>
                    <Button variant="outline" className="w-full">
                        INVITE FRIEND
                    </Button>
                </Card>
            </div>
        )}

        {battleState === 'fighting' && (
            <Card className="bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-slate-900 border-slate-800 text-white relative overflow-hidden animate-fade-in-up">
                <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay"></div>
                
                {/* Battle Area */}
                <div className="relative z-10 p-8 flex flex-col md:flex-row items-center justify-between gap-12">
                     <div className="order-2 md:order-1 animate-bounce-custom">
                         <Avatar color="bg-blue-500" name="You" hp={playerHp} maxHp={PLAYER_MAX_HP} />
                     </div>

                     <div className="order-1 md:order-2 text-center">
                         <div className="text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500 mb-4">VS</div>
                         <div className="w-full max-w-xs h-32 bg-black/40 rounded-xl p-4 overflow-hidden text-left shadow-inner border border-white/10">
                             {battleLog.map((log, i) => (
                                 <div key={i} className={`text-xs mb-1 font-mono ${log.includes('You') ? 'text-emerald-400' : 'text-rose-400'}`}>
                                     {log}
                                 </div>
                             ))}
                         </div>
                     </div>

                     <div className="order-3 animate-pulse-slow">
                         <Avatar color="bg-rose-500" name="Shadow Runner" hp={enemyHp} maxHp={PLAYER_MAX_HP} />
                     </div>
                </div>

                {/* Controls */}
                <div className="relative z-10 p-4 bg-slate-800/80 backdrop-blur-md border-t border-white/10 flex justify-center gap-4">
                    <Button 
                        onClick={handleAttack} 
                        className="bg-rose-600 hover:bg-rose-500 text-white px-8 py-4 text-lg font-black clip-path-slant shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:shadow-[0_0_30px_rgba(225,29,72,0.6)] transition-all active:scale-95"
                    >
                        <Flame className="w-5 h-5 mr-2" /> ATTACK ({Math.floor(playerSteps/1000)}k)
                    </Button>
                    <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10">
                        <Shield className="w-5 h-5" /> DEFEND
                    </Button>
                </div>
            </Card>
        )}

        {['victory', 'defeat'].includes(battleState) && (
            <Card className="p-12 text-center bg-white border-slate-200 animate-slide-up">
                 {battleState === 'victory' ? (
                     <>
                        <Trophy className="w-24 h-24 mx-auto text-yellow-500 mb-6 animate-bounce" />
                        <h2 className="text-4xl font-extrabold text-slate-800 mb-2">VICTORY!</h2>
                        <p className="text-slate-500 mb-8">You crushed your opponent with superior fitness.</p>
                        <div className="inline-block px-6 py-2 bg-yellow-100 text-yellow-700 font-bold rounded-full mb-8">
                            +500 XP Gained
                        </div>
                     </>
                 ) : (
                     <>
                        <Shield className="w-24 h-24 mx-auto text-slate-400 mb-6" />
                        <h2 className="text-4xl font-extrabold text-slate-800 mb-2">DEFEAT</h2>
                        <p className="text-slate-500 mb-8">Train harder and come back stronger.</p>
                     </>
                 )}
                 <Button onClick={() => { setBattleState('lobby'); setPlayerHp(1000); setEnemyHp(1000); }} className="w-full max-w-xs">
                     Main Menu
                 </Button>
            </Card>
        )}
    </div>
  );
}
