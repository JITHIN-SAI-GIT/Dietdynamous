import { useState, useRef, useEffect } from "react";
import { Send, MessageCircle } from "lucide-react";
import { Navigate, useLocation } from "react-router-dom";
import api from "../services/api";

export default function NutritionChatbot() {
  const location = useLocation();



  const [botName, setBotName] = useState("Aura AI");
  const [botAvatar, setBotAvatar] = useState("🌸");
  const [showSettings, setShowSettings] = useState(false);

  const [messages, setMessages] = useState([
      {
        id: "1",
        text:
          `Konnichiwa! 🌸 I am ${botName || "Aura"}, your anime health companion! Ask me anything about diet, training, or just say hi!`,
        isUser: false,
        timestamp: new Date(),
      },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: input.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Call API
    try {
      const res = await api.post("/chat/message", { text: userMessage.text });
      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: res.data.response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Chat failed", err);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting to the server. 😓",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6 bg-purple-100 p-4 rounded-2xl border-2 border-purple-200 shadow-sm relative">
        <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white text-2xl border-4 border-white shadow-lg animate-bounce">
            {botAvatar}
            </div>
            <div>
            <h2 className="text-2xl font-extrabold text-purple-900">
                {botName}
            </h2>
            <p className="text-xs text-purple-600 font-bold uppercase tracking-wider">Online • Ready to help!</p>
            </div>
        </div>
        
        <button 
           onClick={() => setShowSettings(!showSettings)}
           className="text-xs font-bold text-purple-600 bg-white px-3 py-1 rounded-full border border-purple-200 hover:bg-purple-50"
        >
            Customize
        </button>

        {/* SETTINGS MODAL */}
        {showSettings && (
            <div className="absolute top-full right-0 mt-2 bg-white p-4 rounded-xl shadow-xl border-2 border-purple-100 w-64 z-20 animate-in fade-in zoom-in">
                <h3 className="font-bold text-sm mb-2 text-gray-700">Customize Bot</h3>
                
                <div className="mb-3">
                    <label className="text-xs font-bold text-gray-500">Name</label>
                    <input 
                       value={botName}
                       onChange={(e) => setBotName(e.target.value)}
                       className="w-full text-sm border-b-2 border-purple-200 focus:outline-none focus:border-purple-500 px-1 py-1"
                    />
                </div>

                <div className="mb-3">
                    <label className="text-xs font-bold text-gray-500 block mb-1">Avatar</label>
                    <div className="flex gap-2">
                        {["🌸", "🤖", "🦊", "🌟", "🐱"].map(icon => (
                            <button 
                               key={icon}
                               onClick={() => setBotAvatar(icon)}
                               className={`w-8 h-8 rounded-full flex items-center justify-center border ${botAvatar === icon ? "bg-purple-100 border-purple-500" : "border-gray-200"}`}
                            >
                                {icon}
                            </button>
                        ))}
                    </div>
                </div>
                
                <button 
                  onClick={() => setShowSettings(false)}
                  className="w-full bg-purple-600 text-white text-xs font-bold py-2 rounded-lg"
                >
                   Save & Close
                </button>
            </div>
        )}
      </div>

      {/* CHAT BOX */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-purple-100 flex flex-col h-96 relative overflow-hidden">
        {/* Anime Background decoration */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] pointer-events-none"></div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-5 py-3 shadow-sm ${
                  message.isUser
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl rounded-br-none"
                    : "bg-white border-2 border-purple-50 text-gray-800 rounded-2xl rounded-bl-none"
                }`}
              >
                <p className="text-sm leading-relaxed">
                  {message.text}
                </p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-4 py-3 rounded-lg rounded-bl-none">
                <div className="flex gap-2">
                  <Dot delay="0s" />
                  <Dot delay="0.1s" />
                  <Dot delay="0.2s" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <div className="border-t-2 border-gray-200 p-4 bg-gray-50">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about nutrition..."
              className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-sm"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* SUGGESTIONS */}
      <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800 font-semibold mb-2">
          Need ideas? Try asking:
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            "Is rice bad for weight loss?",
            "Best vegetarian protein foods",
            "What happens if I skip meals?",
            "How much water should I drink?",
            "Are carbs bad for you?",
            "Best foods for muscle building?",
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setInput(suggestion)}
              className="px-3 py-1 bg-white text-blue-700 border border-blue-300 rounded-full text-xs font-semibold hover:bg-blue-100"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- LOADING DOT ---------- */
function Dot({ delay }) {
  return (
    <div
      className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
      style={{ animationDelay: delay }}
    />
  );
}
