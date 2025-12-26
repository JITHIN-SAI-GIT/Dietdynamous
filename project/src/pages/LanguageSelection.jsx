import { useNavigate } from "react-router-dom";

export default function LanguageSelection() {
  const navigate = useNavigate();

  const handleSelect = (lang) => {
    // Determine where to go based on login status, or just go to landing/login
    // For now, go to Login/Landing
    localStorage.setItem("appLanguage", lang);
    navigate("/landing"); // navigate to landing (the current home) 
  };

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸", color: "bg-blue-100 border-blue-400" },
    { code: "es", name: "Español", flag: "🇪🇸", color: "bg-yellow-100 border-yellow-400" },
    { code: "hi", name: "Hindi", flag: "🇮🇳", color: "bg-orange-100 border-orange-400" },
    { code: "fr", name: "Français", flag: "🇫🇷", color: "bg-purple-100 border-purple-400" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-4 animate-bounce">
          FitAura
        </h1>
        <p className="text-gray-600 text-lg font-medium">
          Choose your language to start your journey
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 max-w-lg w-full">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleSelect(lang.code)}
            className={`${lang.color} border-b-4 hover:border-b-0 hover:translate-y-1 transition-all rounded-2xl p-6 flex flex-col items-center shadow-lg active:scale-95`}
          >
            <span className="text-5xl mb-2">{lang.flag}</span>
            <span className="font-bold text-gray-800 text-lg">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
