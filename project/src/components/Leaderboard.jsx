import { Trophy, Medal, Crown } from "lucide-react";

export default function Leaderboard() {
  const users = [
    { id: 1, name: "Sakura_Fit", points: 2450, badge: "Master", avatar: "🌸" },
    { id: 2, name: "Goku_Gains", points: 2300, badge: "Elite", avatar: "🔥" },
    { id: 3, name: "Zen_Yogi", points: 2100, badge: "Pro", avatar: "🧘" },
    { id: 4, name: "Iron_Mike", points: 1950, badge: "Rookie", avatar: "💪" },
    { id: 5, name: "Speedy_Gon", points: 1800, badge: "Rookie", avatar: "🏃" },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-yellow-500 flex items-center justify-center gap-3 mb-2">
          <Crown className="w-10 h-10 fill-current" /> Leaderboard
        </h1>
        <p className="text-gray-600">Top performers this week!</p>
      </div>

      <div className="space-y-4">
        {users.map((user, index) => (
          <div 
            key={user.id}
            className={`flex items-center p-4 rounded-2xl shadow-md border-2 animate-fade-in-up ${
                index === 0 ? "bg-yellow-50 border-yellow-400 scale-105" : "bg-white border-gray-100"
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mr-4 ${
                index === 0 ? "bg-yellow-400 text-white" : "bg-gray-200 text-gray-600"
            }`}>
                {index + 1}
            </div>
            
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl mr-4 shadow-inner">
               {user.avatar}
            </div>

            <div className="flex-1">
               <h3 className="font-bold text-lg">{user.name}</h3>
               <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-bold uppercase">{user.badge}</span>
            </div>

            <div className="text-right">
               <div className="font-extrabold text-xl text-purple-600">{user.points}</div>
               <div className="text-xs text-gray-500">points</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
