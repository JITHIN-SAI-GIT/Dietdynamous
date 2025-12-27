const { GoogleGenerativeAI } = require("@google/generative-ai");

class GeminiService {
  constructor() {
    this.genAI = null;
    this.model = null;
    this.apiKey = process.env.GEMINI_API_KEY;

    if (this.apiKey) {
      this.genAI = new GoogleGenerativeAI(this.apiKey);
      this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    } else {
      console.warn("GeminiService: API Key missing");
    }
  }

  async generateResponse(user, weightHistory, userMessage) {
    if (!this.model) {
      throw new Error("Gemini Model not initialized (Missing API Key)");
    }

    const historyText = weightHistory
      .map((h) => `${new Date(h.date).toLocaleDateString()}: ${h.weight}kg`)
      .join("; ");

    const systemPrompt = `
      You are Aura, an anime-style health companion.
      User Profile:
      - Name: ${user.username}
      - Age: ${user.age}
      - Gender: ${user.gender}
      - Weight: ${user.weight}kg
      - Height: ${user.height}cm
      - Goal: ${user.goal}
      - Activity: ${user.activityLevel}
      - Recent Weight History: ${historyText || "No history yet"}
      
      Rules:
      - Be encouraging, concise, and helpful.
      - Use knowledge of their stats to answer.
      - If data is missing/null, ask them generally or suggest checking their profile.
      - Don't ask for weight if it's already in the profile.
    `;

    try {
      const chat = this.model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: systemPrompt + "\n\n(System Context set. Await user query.)" }],
          },
          {
            role: "model",
            parts: [{ text: "Understood! I am ready to help as Aura! 🌸" }],
          },
        ],
      });

      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      return response.text();

    } catch (error) {
       console.error("GeminiService Error:", error);
       throw error;
    }
  }
}

module.exports = new GeminiService();
