import { useState } from "react";
import { ChevronRight, ChevronLeft, Activity, User, Ruler, Weight, MapPin, Briefcase, FileHeart, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Input from "./ui/Input";

export default function ProfileSetup({ onComplete }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 9;

  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
    locality: "",
    profession: "",
    medicalHistory: "",
    goal: "",
  });

  const [errors, setErrors] = useState({});

  const validateStep = () => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.age || formData.age < 10 || formData.age > 100) {
          newErrors.age = "Please enter a valid age (10-100)";
        }
        break;
      case 2:
        if (!formData.gender) newErrors.gender = "Please select your gender";
        break;
      case 3:
        if (!formData.height || formData.height < 100 || formData.height > 250)
          newErrors.height = "Please enter a valid height in cm (100-250)";
        break;
      case 4:
        if (!formData.weight || formData.weight < 30 || formData.weight > 300)
          newErrors.weight = "Please enter a valid weight in kg (30-300)";
        break;
      case 5:
        if (!formData.activityLevel)
          newErrors.activityLevel = "Please select your activity level";
        break;
      case 6:
        if (!formData.locality) newErrors.locality = "Please enter your locality";
        break;
      case 7:
        if (!formData.profession) newErrors.profession = "Please enter your profession";
        break;
      case 8:
        if (!formData.medicalHistory)
          newErrors.medicalHistory = "Please enter details or 'None'";
        break;
      case 9:
        if (!formData.goal) newErrors.goal = "Please select your primary goal";
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    if (step === totalSteps) {
      try {
        await api.put("/user/profile", formData);
        localStorage.setItem("userProfile", JSON.stringify(formData));

        if (onComplete) {
          onComplete(formData);
        }
        navigate("/dashboard");
      } catch (error) {
        console.error("Failed to save profile", error);
        alert("Failed to save profile. Please try again.");
      }
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    setErrors({});
  };

  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden font-sans text-slate-800">
      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-emerald-100/50 to-transparent pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-emerald-100 rounded-full blur-[100px] pointer-events-none" />

      <Card variant="glass" className="max-w-xl w-full p-8 md:p-12 relative z-10 animate-fade-in border-slate-200 bg-white shadow-xl">
        
        {/* HEADER & PROGRESS */}
        <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 mb-2">
                Let's customize your plan
            </h1>
            <p className="text-slate-500 text-sm mb-8">
                Step {step} of {totalSteps}
            </p>
            
            {/* PROGRESS BAR */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500 ease-out shadow-sm"
                style={{ width: `${(step / totalSteps) * 100}%` }}
                />
            </div>
        </div>

        {/* STEP CONTENT CONTAINER */}
        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="min-h-[300px] flex flex-col justify-center animate-slide-up">
          {step === 1 && (
            <StepInput
              icon={User}
              label="What's your age?"
              value={formData.age}
              onChange={(v) => updateFormData("age", v)}
              error={errors.age}
              type="number"
              placeholder="e.g. 25"
            />
          )}

          {step === 2 && (
            <StepButtons
              icon={User}
              label="Select your gender"
              options={["Male", "Female", "Other"]}
              selected={formData.gender}
              onSelect={(v) => updateFormData("gender", v)}
              error={errors.gender}
            />
          )}

          {step === 3 && (
            <StepInput
              icon={Ruler}
              label="Your height (cm)"
              value={formData.height}
              onChange={(v) => updateFormData("height", v)}
              error={errors.height}
              type="number"
              placeholder="e.g. 175"
            />
          )}

          {step === 4 && (
            <StepInput
              icon={Weight}
              label="Your weight (kg)"
              value={formData.weight}
              onChange={(v) => updateFormData("weight", v)}
              error={errors.weight}
              type="number"
              placeholder="e.g. 70"
            />
          )}

          {step === 5 && (
            <StepButtons
              icon={Activity}
              label="Activity level"
              options={["Low", "Moderate", "High"]}
              selected={formData.activityLevel}
              onSelect={(v) => updateFormData("activityLevel", v)}
              error={errors.activityLevel}
            />
          )}

          {step === 6 && (
            <StepInput
              icon={MapPin}
              label="Where do you live?"
              subLabel="Locality"
              value={formData.locality}
              onChange={(v) => updateFormData("locality", v)}
              error={errors.locality}
              placeholder="e.g. New York, NY"
            />
          )}

          {step === 7 && (
            <StepInput
              icon={Briefcase}
              label="What is your profession?"
              value={formData.profession}
              onChange={(v) => updateFormData("profession", v)}
              error={errors.profession}
              placeholder="e.g. Software Engineer"
            />
          )}

          {step === 8 && (
            <StepInput
              icon={FileHeart}
              label="Medical History"
              subLabel="Any conditions we should know about?"
              value={formData.medicalHistory}
              onChange={(v) => updateFormData("medicalHistory", v)}
              error={errors.medicalHistory}
              placeholder="e.g. None, Diabetes (Type 2)..."
            />
          )}

          {step === 9 && (
            <StepButtons
              icon={Trophy}
              label="What is your primary goal?"
              options={[
                { value: "weight_loss", label: "Lose Weight" },
                { value: "weight_gain", label: "Gain Muscle" },
                { value: "muscle_building", label: "Build Strength" },
                { value: "maintain_health", label: "Maintain Health" },
              ]}
              isComplex
              selected={formData.goal}
              onSelect={(v) => updateFormData("goal", v)}
              error={errors.goal}
            />
          )}
        </form>

        {/* NAVIGATION BUTTONS */}
        <div className="flex gap-4 mt-8 pt-8 border-t border-slate-100">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex-1 border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <ChevronLeft className="w-4 h-4 mr-2" /> Back
            </Button>
          )}

          <Button
            variant="primary"
            onClick={handleNext}
            className={`flex-1 shadow-lg shadow-emerald-500/20 ${step === 1 ? 'w-full' : ''}`}
          >
            {step === totalSteps ? "Complete Setup" : "Continue"}
            {step < totalSteps && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </Card>
    </div>
  );
}

/* ---------- SMALL HELPERS ---------- */
function StepInput({ label, subLabel, value, onChange, error, placeholder, type = "text", icon: Icon }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
         {Icon && <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600 border border-emerald-200 shadow-sm"><Icon className="w-8 h-8"/></div>}
         <h2 className="text-2xl font-bold text-slate-800">{label}</h2>
         {subLabel && <p className="text-slate-500 mt-2">{subLabel}</p>}
      </div>
      
      <div className="max-w-xs mx-auto">
         <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            type={type}
            error={error}
            className="text-center text-lg bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400 focus:bg-white"
         />
      </div>
    </div>
  );
}

function StepButtons({ label, options, selected, onSelect, error, icon: Icon, isComplex }) {
  return (
    <div className="space-y-6 w-full">
      <div className="text-center mb-6">
        {Icon && <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600 border border-emerald-200 shadow-sm"><Icon className="w-8 h-8"/></div>}
        <h2 className="text-2xl font-bold text-slate-800">{label}</h2>
      </div>

      <div className="grid grid-cols-1 gap-3 max-w-sm mx-auto">
        {options.map((opt) => {
           const val = isComplex ? opt.value : opt;
           const text = isComplex ? opt.label : opt;
           const isSelected = selected === val;

           return (
            <button
                key={val}
                onClick={() => onSelect(val)}
                className={`
                    w-full py-4 px-6 rounded-xl border-2 transition-all duration-300 font-medium text-lg
                    ${isSelected 
                        ? "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-md" 
                        : "bg-white border-slate-100 text-slate-500 hover:bg-slate-50 hover:border-slate-200 hover:text-slate-700"
                    }
                `}
            >
                {text}
            </button>
           )
        })}
      </div>
      {error && <p className="text-red-500 text-sm text-center mt-2 animate-pulse">{error}</p>}
    </div>
  );
}
