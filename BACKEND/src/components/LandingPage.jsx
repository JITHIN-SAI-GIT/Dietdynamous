import { Utensils, Target, TrendingUp, Brain, ChevronRight, Activity, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 overflow-x-hidden selection:bg-emerald-500/30 font-sans">
      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 mix-blend-multiply"></div>
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 mix-blend-multiply"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        {/* HEADER */}
        <header className="flex justify-between items-center mb-20 animate-fade-in">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Activity className="w-7 h-7 text-white" />
             </div>
             <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
               Fit<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Aura</span>
             </h1>
          </div>
          <Button variant="outline" className="hidden md:flex border-slate-300 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200" onClick={() => navigate("/login")}>
             Member Login
          </Button>
        </header>

        {/* HERO */}
        <section className="text-center mb-32 relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none mix-blend-multiply" />
           
           <div className="relative z-10 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-emerald-600 text-sm font-medium mb-8">
                  <Star className="w-4 h-4 fill-emerald-600" /> New: AI-Powered Meal Plans
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight text-slate-900">
                Your Health, <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600">Elevated by Intelligence.</span>
              </h1>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                 Experience a fitness journey that adapts to you. Premium analytics, personalized AI coaching, and a community that cares.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                 <Button 
                    size="xl" 
                    variant="primary" 
                    onClick={() => navigate("/signup")}
                    className="w-full md:w-auto shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.23)] hover:-translate-y-1 transition-all"
                 >
                    Start Your Journey <ChevronRight className="w-5 h-5 ml-2" />
                 </Button>
                 <Button 
                    size="xl" 
                    variant="ghost" 
                    onClick={() => navigate("/login")}
                    className="w-full md:w-auto text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                 >
                    Sign In
                 </Button>
              </div>
           </div>
        </section>

        {/* FEATURES GRID */}
        <section className="mb-32">
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard 
                 icon={Brain} 
                 color="text-purple-600" 
                 bg="bg-purple-100" 
                 border="border-purple-200"
                 title="AI Analytics" 
                 desc="Smart insights that evolve with your progress."
              />
              <FeatureCard 
                 icon={Target} 
                 color="text-emerald-600" 
                 bg="bg-emerald-100" 
                 border="border-emerald-200"
                 title="Goal Tracking" 
                 desc="Real-time visualization of your achievements."
              />
              <FeatureCard 
                 icon={Utensils} 
                 color="text-orange-600" 
                 bg="bg-orange-100" 
                 border="border-orange-200"
                 title="Smart Nutrition" 
                 desc="Macronutrient breakdown for every meal."
              />
              <FeatureCard 
                 icon={TrendingUp} 
                 color="text-blue-600" 
                 bg="bg-blue-100" 
                 border="border-blue-200"
                 title="Progress Maps" 
                 desc="See your transformation over time."
              />
           </div>
        </section>

        {/* PROBLEM / SOLUTION */}
        <section className="grid lg:grid-cols-2 gap-16 items-center mb-32">
            <div className="space-y-8">
               <h2 className="text-4xl font-bold leading-tight text-slate-900">
                  Stop Guessing. <br/>
                  <span className="text-emerald-600">Start Knowing.</span>
               </h2>
               <p className="text-slate-500 text-lg leading-relaxed">
                  Most diet plans fail because they are rigid and generic. Diet Dynamos adapts to your unique metabolism, preferences, and lifestyle changes in real-time.
               </p>
               <ul className="space-y-4">
                  <BenefitItem text="Personalized macro targets based on daily activity" />
                  <BenefitItem text="Real-time hydration and sleep correlation" />
                  <BenefitItem text="Community challenges to keep you motivated" />
               </ul>
            </div>
            
            <div className="relative">
               <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur-[80px] opacity-10" />
               <Card variant="glass" className="p-8 relative z-10 border border-slate-200 shadow-xl bg-white/80">
                   <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-full bg-cover bg-center border-2 border-emerald-500" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80")'}}></div>
                      <div>
                         <div className="text-slate-900 font-bold">Sarah Jenkins</div>
                         <div className="text-emerald-600 text-sm">Lost 15lbs in 2 months</div>
                      </div>
                   </div>
                   <p className="text-slate-600 italic mb-6">
                      "I never realized how much protein I was missing until tracking with this app. The AI suggestions for dinner are a lifesaver!"
                   </p>
                   <div className="flex gap-1 text-yellow-400">
                      <Star className="fill-current w-5 h-5"/><Star className="fill-current w-5 h-5"/><Star className="fill-current w-5 h-5"/><Star className="fill-current w-5 h-5"/><Star className="fill-current w-5 h-5"/>
                   </div>
               </Card>
            </div>
        </section>

        {/* CTA FOOTER */}
        <div className="text-center pb-12">
           <div className="p-12 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 relative overflow-hidden shadow-lg">
               <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
               <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10 text-emerald-900">Ready to transform your life?</h2>
               <Button 
                  size="xl" 
                  variant="primary" 
                  onClick={() => navigate("/signup")}
                  className="px-12 relative z-10 shadow-lg hover:shadow-emerald-500/20"
               >
                  Get Started for Free
               </Button>
               <p className="mt-6 text-slate-500 text-sm relative z-10">No credit card required. Cancel anytime.</p>
           </div>
        </div>

      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc, color, bg, border }) {
   return (
      <Card className={`p-6 border ${border} hover:bg-white hover:shadow-lg transition-all group`} variant="glass">
         <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center ${color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-7 h-7" />
         </div>
         <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
         <p className="text-slate-500 leading-relaxed">{desc}</p>
      </Card>
   )
}

function BenefitItem({ text }) {
   return (
      <li className="flex items-center gap-3 text-slate-600">
         <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <TrendingUp className="w-3 h-3" />
         </div>
         {text}
      </li>
   )
}
