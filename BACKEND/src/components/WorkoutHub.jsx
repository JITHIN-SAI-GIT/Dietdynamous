import { useState, useEffect, useRef } from "react";
import { Play, Heart, Moon, Zap, Activity, Timer, ChevronLeft, ChevronRight, X } from "lucide-react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Badge from "./ui/Badge";

export default function WorkoutHub() {
  const [activeWorkout, setActiveWorkout] = useState(null); 
  
  // Data Structure matching User Request
  const categories = [
    {
      id: "strength",
      title: "Strength / Resistance",
      description: "Build muscle & strength",
      icon: Activity, // Fallback from Dumbbell
      color: "text-blue-500",
      bg: "bg-blue-100",
      items: [
        { title: "Weight Training", subtitle: "Dumbbells & Barbells", duration: "45 min", difficulty: "Hard", videoId: "G626jAbU2OE" }, // HasFit
        { title: "Bodyweight Master", subtitle: "Push-ups & Squats", duration: "30 min", difficulty: "Medium", videoId: "1vRto-2MMZo" }, // MadFit
        { title: "Resistance Bands", subtitle: "Full Body Tone", duration: "20 min", difficulty: "Easy", videoId: "N1WwbV9rTGY" }, // Bands
        { title: "Powerlifting 101", subtitle: "Big 3 Lifts", duration: "60 min", difficulty: "Hard", videoId: "Ww2M-2P4VMA" }, // Dumbbell Strength
        { title: "Calisthenics", subtitle: "Street Workout", duration: "40 min", difficulty: "Hard", videoId: "0spA7W7c3QY" }, // Calisthenics
      ]
    },
    {
      id: "cardio",
      title: "Cardio (Aerobic)",
      description: "Improve heart health & burn calories",
      icon: Heart,
      color: "text-rose-500",
      bg: "bg-rose-100",
      items: [
        { title: "Power Walking", subtitle: "Low Impact", duration: "30 min", difficulty: "Easy", videoId: "ivNRyQEqa5o" }, // Walk at Home
        { title: "Running / Jogging", subtitle: "Endurance Run", duration: "45 min", difficulty: "Medium", videoId: "ml6cT4AZdqI" }, // POPSUGAR
        { title: "Indoor Cycling", subtitle: "Spin Class", duration: "40 min", difficulty: "Medium", videoId: "y7q7M3JgXac" }, // GCN
        { title: "Swimming drills", subtitle: "Pool Cardio", duration: "45 min", difficulty: "Medium", videoId: "pgyPMXy3i00" }, // GTN
        { title: "Skipping Rope", subtitle: "Jump Rope Cardio", duration: "15 min", difficulty: "Hard", videoId: "u3Kg60_b_Zc" }, // Jump Rope
        { title: "Zumba Dance", subtitle: "Fun Aerobics", duration: "30 min", difficulty: "Medium", videoId: "8DZlekt8k1A" }, // Zumba
      ]
    },
    {
      id: "hiit",
      title: "HIIT",
      description: "Burn fat fast in short time",
      icon: Zap, // Fallback from Flame
      color: "text-orange-500",
      bg: "bg-orange-100",
      items: [
        { title: "Sprint Intervals", subtitle: "Max Effort Running", duration: "20 min", difficulty: "Hard", videoId: "y1z_WfkA-Yc" }, // HIIT Run
        { title: "Circuit Training", subtitle: "Station to Station", duration: "35 min", difficulty: "Hard", videoId: "cbK7Zq_2b_s" }, // Circuit
        { title: "Tabata Protocol", subtitle: "20s Work / 10s Rest", duration: "4 min", difficulty: "Insane", videoId: "ieJtoO24tZ4" }, // Tabata
      ]
    },
    {
      id: "flexibility",
      title: "Flexibility & Mobility",
      description: "Increase flexibility & reduce injury",
      icon: Activity, // Fallback from Wind
      color: "text-emerald-500",
      bg: "bg-emerald-100",
      items: [
        { title: "Daily Stretching", subtitle: "Head to Toe", duration: "15 min", difficulty: "Easy", videoId: "g_tea8ZNk5A" }, // MadFit Stretch
        { title: "Morning Yoga", subtitle: "Sunrise Flow", duration: "25 min", difficulty: "Easy", videoId: "v7AYKMP6rOE" }, // Yoga with Adriene
        { title: "Mobility Drills", subtitle: "Joint Health", duration: "20 min", difficulty: "Medium", videoId: "G0Z0r6x8M6U" }, // Mobility
      ]
    },
    {
      id: "balance",
      title: "Balance & Stability",
      description: "Improve coordination & posture",
      icon: Activity,
      color: "text-indigo-500",
      bg: "bg-indigo-100",
      items: [
        { title: "Balance Training", subtitle: "Single Leg Work", duration: "20 min", difficulty: "Medium", videoId: "3_oC91Xh0K4" }, // Balance
        { title: "Core Stability", subtitle: "Plank Variations", duration: "15 min", difficulty: "Hard", videoId: "6TMgSH8HwIw" }, // Core
        { title: "Pilates Basics", subtitle: "Control & Breath", duration: "40 min", difficulty: "Medium", videoId: "K-PpDWCE2oo" }, // Pilates
      ]
    },
    {
        id: "sports",
        title: "Sports & Functional",
        description: "Improve real-life movement & skills",
        icon: Zap,
        color: "text-yellow-500",
        bg: "bg-yellow-100",
        items: [
            { title: "Functional Training", subtitle: "Natural Movement", duration: "40 min", difficulty: "Medium", videoId: "I6h1aC1rwKw" }, 
            { title: "CrossFit WOD", subtitle: "High Intensity", duration: "45 min", difficulty: "Hard", videoId: "9J1i72_h3Fk" },
            { title: "Boxing Basics", subtitle: "Shadow Boxing", duration: "30 min", difficulty: "Medium", videoId: "xyQG1C_1_3o" }, 
            { title: "Sports Drills", subtitle: "Agility & Speed", duration: "30 min", difficulty: "Medium", videoId: "vBdf-aGjTzY" }, 
        ]
    },
    {
        id: "mindbody",
        title: "Mind–Body",
        description: "Reduce stress & improve focus",
        icon: Moon,
        color: "text-violet-500",
        bg: "bg-violet-100",
        items: [
            { title: "Restorative Yoga", subtitle: "Relaxation", duration: "45 min", difficulty: "Easy", videoId: "LqXZ628YNj4" }, 
            { title: "Tai Chi Flow", subtitle: "Moving Meditation", duration: "30 min", difficulty: "Easy", videoId: "cNOS2xHh-N4" },
            { title: "Pilates Flow", subtitle: "Mindful Movement", duration: "40 min", difficulty: "Medium", videoId: "C1K2_36j0cM" }, 
        ]
    },
    {
        id: "endurance",
        title: "Endurance Training",
        description: "Increase stamina",
        icon: Activity,
        color: "text-cyan-500",
        bg: "bg-cyan-100",
        items: [
            { title: "Long Run", subtitle: "Pacing Strategy", duration: "60+ min", difficulty: "Hard", videoId: "fQ7J1J6X8y0" }, 
            { title: "Endurance Cycling", subtitle: "Steady State", duration: "60 min", difficulty: "Medium", videoId: "f1x940k1Z4Q" }, 
            { title: "Swim Laps", subtitle: "Continuous Swim", duration: "45 min", difficulty: "Hard", videoId: "5d0gG-k1Q3s" }, 
            { title: "Rowing Marathon", subtitle: "Ergometer Work", duration: "30 min", difficulty: "Hard", videoId: "H0_1G2k2k6c" }, 
        ]
    },
    {
        id: "specialized",
        title: "Specialized Workouts",
        description: "For specific needs",
        icon: Heart,
        color: "text-pink-500",
        bg: "bg-pink-100",
        items: [
            { title: "Home Workout", subtitle: "No Equipment", duration: "25 min", difficulty: "Medium", videoId: "UItWltVZZmE" }, 
            { title: "Gym Routine", subtitle: "Machine Based", duration: "50 min", difficulty: "Medium", videoId: "9J1i72_h3Fk" }, 
            { title: "Beginner Start", subtitle: "Foundation", duration: "20 min", difficulty: "Medium", videoId: "vecL7lqW_M4" }, 
            { title: "Women's Fitness", subtitle: "Strength & Tone", duration: "35 min", difficulty: "Medium", videoId: "M0uO8X3_tEA" }, 
            { title: "Senior Fitness", subtitle: "Low Impact & Balance", duration: "20 min", difficulty: "Easy", videoId: "kX2F48R_2Ac" }, 
            { title: "Rehabilitation", subtitle: "Recovery Moves", duration: "15 min", difficulty: "Easy", videoId: "9SIH56G3P1s" }, 
        ]
    }
  ];

  const handleStart = (item) => {
    // Parse duration "15 min" -> 15
    const min = parseInt(item.duration.split(" ")[0]) || 5;
    setActiveWorkout({ ...item, durationMin: min });
  };

  // Data Structure matching User Request
  return (
    <div className="w-full relative pb-20 space-y-12">
      {/* HEADER */}
      <div className="text-center mb-10 pt-4">
          <Badge className="mb-4 bg-emerald-100 text-emerald-600 border-emerald-200">
              Workout Library
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Explore <span className="text-emerald-500 underline decoration-4 decoration-emerald-200 underline-offset-4">Workouts</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Browse our comprehensive collection of exercises designed for every goal and fitness level.
          </p>
      </div>

      {categories.map((category) => (
          <WorkoutSection 
            key={category.id} 
            category={category} 
            onPlay={handleStart} 
          />
      ))}

      {/* ACTIVE WORKOUT MODAL */}
      {activeWorkout && (
        <WorkoutTimer 
          workout={activeWorkout} 
          onClose={() => setActiveWorkout(null)} 
        />
      )}
    </div>
  );
}

// Sub-component for Horizontal Scroll Section
function WorkoutSection({ category, onPlay }) {
    const scrollRef = useRef(null);
    const Icon = category.icon || Activity; // Safety Fallback

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 320; 
            current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <div className="space-y-4 border border-slate-100 p-4 rounded-xl">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${category.bg || 'bg-slate-100'} ${category.color || 'text-slate-500'}`}>
                        <Icon className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">{category.title}</h2>
                        <p className="text-sm text-slate-500">{category.description}</p>
                    </div>
                </div>
                
                <div className="flex gap-2">
                    <button 
                        onClick={() => scroll('left')}
                        className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={() => scroll('right')}
                        className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div 
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-6 pt-2 px-2 scrollbar-hide snap-x"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {category.items.map((item, idx) => (
                    <div key={idx} className="min-w-[280px] md:min-w-[320px] snap-center">
                        <Card variant="glass" className="h-full p-0 overflow-hidden group hover:shadow-xl transition-all duration-300 border-slate-200 relative bg-white">
                             {/* Top Color Bar */}
                             <div className={`h-2 w-full ${(category.bg || '').replace('100', '400')}`}></div>
                             
                             <div className="p-5 space-y-4">
                                <div className="flex justify-between items-start">
                                    <Badge variant={
                                        item.difficulty === "Easy" ? "lime" :
                                        item.difficulty === "Medium" ? "warning" :
                                        "danger"
                                    } className="text-xs">{item.difficulty}</Badge>
                                    <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold font-mono bg-slate-50 px-2 py-1 rounded-md">
                                        <Timer className="w-3 h-3" /> {item.duration}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg text-slate-800 group-hover:text-emerald-600 transition-colors line-clamp-1" title={item.title}>{item.title}</h3>
                                    <p className="text-sm text-slate-500">{item.subtitle}</p>
                                </div>

                                <Button 
                                    onClick={() => onPlay(item)}
                                    variant="outline" 
                                    className="w-full mt-2"
                                    icon={Play}
                                >
                                    Start
                                </Button>
                             </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
}

function WorkoutTimer({ workout, onClose }) {
    const [timeLeft, setTimeLeft] = useState(workout.durationMin * 60); // Seconds
    const [isRunning, setIsRunning] = useState(true);

    // Format MM:SS
    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // Timer Logic
    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        alert("Workout Complete! Great job! 🎉");
                        onClose();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft, onClose]);

    return (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl items-center bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl relative overflow-hidden text-slate-800">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors z-20"
                >
                    <X size={24} />
                </button>
                
                {/* VIDEO PLAYER */}
                <div className="w-full lg:w-2/3 aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-100 relative z-10 group">
                    {workout.videoId ? (
                        <iframe 
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${workout.videoId}?autoplay=1&mute=0`}
                            title="YouTube video player" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <div className="flex items-center justify-center h-full text-slate-500 bg-slate-50">No Video Available</div>
                    )}
                </div>

                {/* CONTROLS */}
                <div className="text-center w-full lg:w-1/3 flex flex-col items-center relative z-10">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold mb-2 text-slate-800">{workout.title}</h2>
                        <h3 className="text-xl font-bold text-emerald-600 mb-2">{formatTime(timeLeft)}</h3>
                        <p className="text-slate-500">Stay focused. Breathe.</p>
                    </div>

                     <div className="flex gap-4 justify-center w-full">
                        <Button 
                            onClick={() => setIsRunning(!isRunning)}
                            variant={isRunning ? "secondary" : "primary"}
                            className="w-32"
                        >
                            {isRunning ? "Pause" : "Resume"}
                        </Button>
                        <Button
                            onClick={onClose}
                            variant="danger"
                            className="w-32"
                        >
                            Stop
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
