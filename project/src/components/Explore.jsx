import { useState } from "react";
import { 
  Compass, Lock, Star, PlayCircle, Users, Trophy, 
  MessageCircle, Heart, Share2, Crown, Zap, Flame 
} from "lucide-react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Badge from "./ui/Badge";
import Input from "./ui/Input";

export default function Explore({ streak = 0 }) {
  const [activeTab, setActiveTab] = useState("discover");

  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in pb-12">
      {/* HEADER */}
      <div className="text-center mb-10 relative z-10 animate-fade-in-up delay-100">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-100 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 mb-4">
          Explore & Discover
        </h1>
        <p className="text-slate-500 font-medium text-lg">Your gateway to the fitness multiverse! 🌌</p>
      </div>

      {/* TABS */}
      <div className="flex justify-center mb-10 gap-2 md:gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-emerald-200 animate-fade-in-up delay-200">
        {["discover", "community", "challenges", "premium"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-3 rounded-full font-bold transition-all capitalize whitespace-nowrap border ${
              activeTab === tab
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 border-emerald-500 scale-105"
                : "bg-white text-slate-500 border-slate-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CONTENT AREA */}
      <div className="animate-fade-in-up delay-300">
        {activeTab === "discover" && <DiscoverTab streak={streak} />}
        {activeTab === "community" && <CommunityTab />}
        {activeTab === "challenges" && <ChallengesTab />}
        {activeTab === "premium" && <PremiumTab streak={streak} />}
      </div>
    </div>
  );
}

/* ================== SUB-COMPONENTS ================== */

function DiscoverTab({ streak }) {
  const featured = [
    { title: "Trending Diets", icon: Compass, color: "text-emerald-600", bg: "bg-emerald-100", border: "border-emerald-200", desc: "Latest scientist-approved meal plans." },
    { title: "Weekly Ranking", icon: Trophy, color: "text-amber-500", bg: "bg-amber-100", border: "border-amber-200", desc: "See who's top of the leaderboard!" },
    { title: "Transformation Stories", icon: Star, color: "text-purple-600", bg: "bg-purple-100", border: "border-purple-200", desc: "Real users, real gains." },
  ];

  return (
    <div className="space-y-8">
      {/* STREAK BANNER */}
      <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-center relative overflow-hidden group border border-orange-300">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -mr-20 -mt-20 blur-3xl group-hover:blur-2xl transition-all"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        
        <div className="z-10 mb-6 md:mb-0">
          <h2 className="text-4xl font-black mb-2 flex items-center gap-3">
            Streak: {streak} Days <Flame className="w-10 h-10 animate-pulse text-yellow-200" />
          </h2>
          <p className="opacity-90 font-medium text-lg">Keep the fire alive! Reach 100 days for <span className="font-bold underline text-yellow-100">Premium Access</span>.</p>
        </div>
        
        <div className="flex items-center gap-6 z-10 bg-white/20 p-4 rounded-2xl backdrop-blur-md border border-white/30">
            <div className="text-right">
                <div className="text-xs font-bold uppercase tracking-wider opacity-90">Next Goal</div>
                <div className="text-xl font-bold">100 Days</div>
            </div>
            <div className="relative">
                <svg className="w-16 h-16 -rotate-90">
                    <circle className="text-white/30" strokeWidth="6" stroke="currentColor" fill="transparent" r="28" cx="32" cy="32"/>
                    <circle className="text-yellow-300" strokeWidth="6" strokeDasharray="175" strokeDashoffset={175 - (175 * (Math.min(streak, 100)/100))} strokeLinecap="round" stroke="currentColor" fill="transparent" r="28" cx="32" cy="32"/>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-sm">{Math.min(streak, 100)}%</div>
            </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {featured.map((item, idx) => (
          <Card key={idx} variant="glass" className={`p-8 hover:-translate-y-2 transition-transform duration-300 cursor-pointer overflow-hidden relative group border ${item.border} bg-white`}>
            <div className={`w-16 h-16 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <item.icon size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CommunityTab() {
  const [posts, setPosts] = useState([
    { id: 1, user: "AlexFit99", avatar: "🐲", content: "Just finished the 7-day core challenge! My abs are on fire! 🔥", likes: 24, comments: 5, time: "2h ago", liked: false },
    { id: 2, user: "SarahLiftz", avatar: "🌙", content: "Don't skip breakfast! Tried the new protein pancake recipe today. 🥞✨", likes: 156, comments: 32, time: "4h ago", liked: false },
    { id: 3, user: "RunMaster", avatar: "🏃", content: "Ran 10km today! Feeling unstoppable. 🍃", likes: 89, comments: 12, time: "6h ago", liked: false },
  ]);
  const [newPost, setNewPost] = useState("");

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post = {
      id: Date.now(),
      user: "You",
      avatar: "👤",
      content: newPost,
      likes: 0,
      comments: 0,
      time: "Just now",
      liked: false
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  const toggleLike = (id) => {
    setPosts(posts.map(p => 
      p.id === id 
        ? { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked }
        : p
    ));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* POST INPUT */}
      <Card variant="glass" className="p-4 flex gap-4 bg-white border-slate-200">
        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-xl border border-emerald-200 text-emerald-600">👤</div>
        <div className="flex-1 flex gap-2">
            <input 
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share your progress and inspire others..." 
            className="flex-1 bg-slate-50 rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-slate-700 placeholder-slate-400 transition-all border border-slate-200 focus:bg-white"
            onKeyDown={(e) => e.key === 'Enter' && handlePost()}
            />
            <Button 
            onClick={handlePost}
            disabled={!newPost.trim()}
            variant="primary"
            size="sm"
            >
            Post
            </Button>
        </div>
      </Card>

      {/* FEED */}
      {posts.map((post) => (
        <Card key={post.id} variant="glass" className="p-6 transition-all hover:border-emerald-300 bg-white border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-tr from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
              {post.avatar}
            </div>
            <div>
              <h4 className="font-bold text-slate-800">{post.user}</h4>
              <p className="text-xs text-slate-500">{post.time}</p>
            </div>
          </div>
          <p className="text-slate-600 mb-6 leading-relaxed text-base border-l-2 border-slate-200 pl-4">{post.content}</p>
          <div className="flex gap-6 border-t border-slate-50 pt-4">
            <button 
              onClick={() => toggleLike(post.id)}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${post.liked ? "text-pink-500" : "text-slate-400 hover:text-pink-500"}`}
            >
              <Heart className={`w-4 h-4 ${post.liked ? "fill-current" : ""}`} /> {post.likes}
            </button>
            <button className="flex items-center gap-2 text-slate-400 hover:text-blue-500 transition-colors text-sm font-medium">
              <MessageCircle className="w-4 h-4" /> {post.comments}
            </button>
            <button className="flex items-center gap-2 text-slate-400 hover:text-emerald-500 transition-colors text-sm font-medium ml-auto">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
}

function ChallengesTab() {
  const [challenges, setChallenges] = useState([
    { id: 1, title: "7-Day Core Blast", level: "Beginner", participants: 1200, color: "emerald", joined: false },
    { id: 2, title: "Spartan Stamina", level: "Advanced", participants: 850, color: "red", joined: false },
    { id: 3, title: "Zen Yoga Flow", level: "All Levels", participants: 2400, color: "blue", joined: false },
    { id: 4, title: "HIIT Intensity", level: "Extreme", participants: 500, color: "orange", joined: false },
  ]);

  const toggleJoin = (id) => {
    setChallenges(challenges.map(c => 
      c.id === id 
        ? { ...c, joined: !c.joined, participants: c.joined ? c.participants - 1 : c.participants + 1 }
        : c
    ));
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {challenges.map((c) => (
        <Card key={c.id} variant="glass" className={`p-6 relative overflow-hidden group hover:border-slate-300 transition-all duration-500 bg-white border-slate-100`}>
          <div className={`absolute top-0 right-0 p-2 bg-${c.color}-100 rounded-bl-xl text-${c.color}-600 font-bold text-xs border-b border-l border-${c.color}-200`}>
            {c.level}
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-2 group-hover:text-emerald-600 transition-colors text-slate-800">{c.title}</h3>
            <p className="text-sm text-slate-500 mb-6 flex items-center gap-2">
                <Users className="w-4 h-4" /> {c.participants.toLocaleString()} Joined
            </p>
            <Button 
                onClick={() => toggleJoin(c.id)}
                variant={c.joined ? "outline" : "primary"}
                className={`w-full ${c.joined ? "border-emerald-200 text-emerald-600 bg-emerald-50" : ""}`}
            >
                {c.joined ? "Joined ✓" : "Join Challenge"}
            </Button>
          </div>
          
          {/* Background Glow */}
          <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-${c.color}-100 blur-[50px] rounded-full group-hover:bg-${c.color}-200/50 transition-colors`}></div>
        </Card>
      ))}
    </div>
  );
}

function PremiumTab({ streak }) {
  const isLocked = streak < 100;
  
  const features = [
    { name: "Deep Health Insights", icon: Crown, desc: "AI analysis of your metabolic age & trends." },
    { name: "Virtual Twin Upgrade", icon: Users, desc: "3D Avatar customization & gear." },
    { name: "Custom Meal Plans", icon: Zap, desc: "Macro-perfect recipes generated daily." },
  ];

  return (
    <div className="relative">
      {/* LOCKED OVERLAY */}
      {isLocked && (
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl border border-slate-700 group">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 blur-[100px] rounded-full"></div>
          
          <div className="relative z-10">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.3)]">
                <Lock className="w-10 h-10 text-purple-400 animate-pulse" />
            </div>
            <h2 className="text-4xl font-black mb-4">Premium is Locked</h2>
            <p className="text-xl text-purple-300 mb-10 max-w-lg mx-auto leading-relaxed">
                "Only the disciplined may enter! Maintain a <span className="text-white font-bold border-b-2 border-purple-500">100-day streak</span> to unlock these god-tier features for free!"
            </p>
            <div className="inline-flex items-center gap-3 bg-black/40 backdrop-blur-md border border-purple-500/30 px-8 py-4 rounded-full font-bold text-lg shadow-lg">
                <span className="text-purple-400">Current Streak:</span> {streak} / 100 🛡️
            </div>
          </div>
        </div>
      )}

      {/* FEATURES GRID (Blurred if locked) */}
      <div className={`grid md:grid-cols-3 gap-6 mt-10 transition-all duration-700 ${isLocked ? "opacity-30 blur-sm pointer-events-none select-none grayscale" : ""}`}>
        {features.map((f, i) => (
          <Card key={i} variant="glass" className="p-8 border-purple-200 bg-purple-50">
            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6 border border-purple-200">
              <f.icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{f.name}</h3>
            <p className="text-slate-500 leading-relaxed">{f.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
