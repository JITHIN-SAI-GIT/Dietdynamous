import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Settings,
  Search,
  BookOpen,
  MessageSquare,
  Compass,
  LogOut,
  Star,
  Lock,
  Zap,
  Palette,
  Activity,
  Trophy,
  Menu,
  X,
  Bell,
  ChevronRight,
  Heart,
  Swords,
  ShoppingCart,
  Dumbbell
} from "lucide-react";
import Button from "./ui/Button";
import Badge from "./ui/Badge";
import NotificationBell from "./NotificationBell";

export default function DashboardLayout({ children, userData }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    // Clear user data logic here if needed
    // localStorage.removeItem("user");
    navigate("/");
  };

  const menuItems = [
    { path: "/dashboard", icon: Activity, label: "Dashboard" }, // Primary Landing
    { path: "/dashboard/health-hub", icon: Heart, label: "Health Hub" },
    { path: "/dashboard/workout", icon: Dumbbell, label: "Workout Zone" },
    { path: "/dashboard/diet", icon: Settings, label: "Diet Plan" },
    { path: "/dashboard/chat", icon: MessageSquare, label: "AI Chat" },
    { path: "/dashboard/tracker", icon: BookOpen, label: "Meal Tracker" },
    { path: "/dashboard/wearables", icon: Zap, label: "Wearables" }, 
    { path: "/dashboard/duel", icon: Swords, label: "PvP Arena" },
    { path: "/dashboard/rpg", icon: Trophy, label: "RPG Journey" },
    { path: "/dashboard/explore", icon: Compass, label: "Community" },
    { path: "/dashboard/themes", icon: Palette, label: "Themes" },
  ];

  // Combine sidebar items with other reachable pages for the search
  const searchableRoutes = [
    ...menuItems,
    { path: "/dashboard/profile", icon: User, label: "My Profile" },
    { path: "/dashboard/leaderboard", icon: Trophy, label: "Leaderboard" },
    { path: "/dashboard/facts", icon: BookOpen, label: "Food Facts" },
    { path: "/admin", icon: Lock, label: "Admin Panel" }
  ];

  return (
    <div className="min-h-screen bg-dark-BG flex font-sans text-dark-text selection:bg-emerald-500/30">
      {/* ... (keep mobile header) ... */}

      {/* ... (sidebar code unchanged) ... */}
      {/* SIDEBAR NAVIGATION */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-72 bg-dark-card/90 backdrop-blur-xl border-r border-white/10 shadow-2xl transform transition-transform duration-300 ease-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        <div className="flex flex-col h-full relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 left-0 w-full h-64 bg-emerald-500/5 blur-[80px] pointer-events-none" />
          
          {/* LOGO AREA */}
          <div className="h-24 flex items-center px-8 relative z-10">
            <Link to="/dashboard" className="flex items-center gap-3 font-bold text-2xl tracking-tight group">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-dark-text to-dark-muted group-hover:from-emerald-600 group-hover:to-teal-600 transition-all duration-300">
                FitAura
              </span>
            </Link>
          </div>

          {/* USER MINI PROFILE */}
          <div className="px-6 mb-6 relative z-10">
            <div className="p-4 bg-dark-BG rounded-2xl border border-white/10 flex items-center gap-3 hover:bg-emerald-50/10 transition-colors group cursor-pointer shadow-sm">
               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white/20 group-hover:ring-emerald-500/30 transition-all">
                  {userData?.username?.charAt(0).toUpperCase() || "U"}
               </div>
               <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-dark-text truncate group-hover:text-emerald-600 transition-colors">{userData?.username || "Guest User"}</p>
                  <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {userData?.gamification?.streak || 0} Day Streak
                  </p>
               </div>
            </div>
          </div>

          {/* MENU ITEMS */}
          <nav className="flex-1 px-4 space-y-1 overflow-y-auto relative z-10 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            <p className="px-4 text-xs font-semibold text-dark-muted uppercase tracking-wider mb-2 mt-2">Menu</p>
            {menuItems.map((item) => {
              const isActive = 
                item.path === "/dashboard" 
                  ? location.pathname === "/dashboard"
                  : location.pathname.startsWith(item.path);
                  
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all group relative overflow-hidden ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-600 shadow-[0_0_20px_rgba(52,211,153,0.15)]"
                      : "text-dark-muted hover:bg-dark-BG hover:text-dark-text"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 transition-colors ${
                      isActive ? "text-emerald-600 drop-shadow-sm" : "text-dark-muted group-hover:text-emerald-500"
                    }`}
                  />
                  <span className="relative z-10">{item.label}</span>
                  {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-400 rounded-l-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>}
                </Link>
              );
            })}
          </nav>

          {/* FOOTER */}
          <div className="p-4 border-t border-white/10 relative z-10">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-500 hover:bg-red-500/10 hover:text-red-600 rounded-xl font-semibold transition-all group"
            >
              <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* ... (mobile overlay) ... */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-72 transition-all duration-300">
        {/* HEADER */}
        <header className="sticky top-0 z-20 bg-dark-card/80 backdrop-blur-lg border-b border-white/10 h-24 px-8 flex items-center gap-8 hidden md:flex">
             {/* LEFT: Greeting */}
             <div className="w-64 flex-shrink-0">
                <h1 className="text-xl font-bold text-dark-text">
                  Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">{userData?.username || "Friend"}</span>! 👋
                </h1>
                <p className="text-sm text-dark-muted">Let's crush your goals.</p>
             </div>

             {/* CENTER: Quick Search */}
             <div className="flex-1 max-w-2xl mx-auto relative z-50">
                <div className="relative group">
                   <input 
                     type="text" 
                     placeholder="Quick Search (e.g., 'Diet', 'Leaderboard', 'Facts')..." 
                     value={searchQuery}
                     onChange={(e) => {
                         setSearchQuery(e.target.value);
                         setShowSuggestions(true);
                     }}
                     onFocus={() => setShowSuggestions(true)}
                     onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                     className="w-full bg-dark-BG border-2 border-white/5 rounded-2xl px-6 py-4 text-lg text-dark-text focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-dark-muted font-medium shadow-inner"
                   />
                   <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-emerald-500/10 p-2 rounded-lg text-emerald-600">
                       <Search className="w-5 h-5" />
                   </div>
                </div>
                
                {/* Search Suggestions Dropdown */}
                {showSuggestions && searchQuery && (
                    <div className="absolute top-full left-0 right-0 mt-3 bg-dark-card rounded-2xl shadow-2xl border border-white/10 overflow-hidden animate-swipe-down">
                        <div className="max-h-[60vh] overflow-y-auto p-2">
                           {searchableRoutes
                            .filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map(item => (
                                <div 
                                   key={item.path}
                                   onMouseDown={(e) => {
                                       e.preventDefault(); // Prevent focus loss
                                       navigate(item.path);
                                       setSearchQuery("");
                                       setShowSuggestions(false);
                                   }}
                                   className="flex items-center gap-4 px-4 py-4 hover:bg-dark-BG rounded-xl cursor-pointer transition-colors group"
                                >
                                    <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-xl group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <span className="text-base font-bold text-dark-text block">{item.label}</span>
                                        <span className="text-xs text-dark-muted">Jump to page</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-dark-muted ml-auto group-hover:translate-x-1 transition-transform" />
                                </div>
                            ))
                           }
                           {searchableRoutes.filter(i => i.label.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                               <div className="px-4 py-8 text-center text-dark-muted">
                                   <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                   <p>No results found for "{searchQuery}"</p>
                               </div>
                           )}
                        </div>
                    </div>
                )}
             </div>

             {/* RIGHT: Actions */}
             <div className="w-64 flex justify-end items-center gap-4">
                <NotificationBell userId={userData?._id} />
                <div className="relative">
                    <button 
                         onClick={() => setShowProfileMenu(!showProfileMenu)}
                         className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20 cursor-pointer hover:scale-110 transition-transform"
                    >
                       <div className="w-full h-full bg-dark-card rounded-full flex items-center justify-center text-sm font-bold text-emerald-600">
                         {userData?.username?.charAt(0).toUpperCase() || "U"}
                       </div>
                    </button>

                    {/* Profile Dropdown */}
                    {showProfileMenu && (
                         <div className="absolute top-full right-0 mt-2 w-72 bg-dark-card rounded-2xl shadow-2xl border border-white/10 overflow-hidden animate-fade-in z-50">
                             <div className="px-6 py-6 border-b border-white/10 bg-dark-BG/50">
                                 <h3 className="font-bold text-lg text-dark-text">{userData?.username || "Guest User"}</h3>
                                 <p className="text-sm text-dark-muted">{userData?.email || "guest@fitaura.com"}</p>
                             </div>
                             
                             <div className="p-2 space-y-1">
                                 <Link 
                                    to="/dashboard/profile"
                                    onClick={() => setShowProfileMenu(false)}
                                    className="px-4 py-3 hover:bg-dark-BG rounded-xl flex items-center gap-3 text-sm font-medium text-dark-text transition-colors"
                                 >
                                     <User className="w-5 h-5 text-emerald-500" />
                                     Edit Profile
                                 </Link>
                                 <Link 
                                    to="/dashboard/profile"
                                    onClick={() => setShowProfileMenu(false)}
                                    className="px-4 py-3 hover:bg-dark-BG rounded-xl flex items-center gap-3 text-sm font-medium text-dark-text transition-colors cursor-pointer"
                                 >
                                     <Settings className="w-5 h-5 text-dark-muted" />
                                     Account Settings
                                 </Link>
                             </div>

                             <div className="border-t border-white/10 p-2">
                                 <button 
                                    onClick={handleLogout}
                                    className="w-full px-4 py-3 hover:bg-red-500/10 text-red-500 rounded-xl flex items-center gap-3 text-sm font-bold transition-colors"
                                 >
                                    <LogOut className="w-5 h-5" />
                                    Sign Out
                                 </button>
                             </div>
                         </div>
                    )}
                </div>
             </div>
        </header>

        {/* CONTENT SHELL */}
        <main className="p-4 md:p-8 w-full max-w-7xl mx-auto space-y-8 animate-fade-in mt-16 md:mt-0 relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

