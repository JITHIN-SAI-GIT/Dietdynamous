const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("No GEMINI_API_KEY found in .env");
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  try {
    // There isn't a direct listModels on genAI instance in the node SDK generally exposed easily in the main class 
    // depending on version, but usually we just try to use a model.
    // However, `gemini-pro` should definitely work. 
    // Let's try to just get a model and run a simple prompt check, catching the specific error.
    
    // Actually, newer SDKs might expose it differently or via ModelService. 
    // Let's try the simplest test: generateContent with a fallback model.
    
    console.log("Testing API Key with model: gemini-1.5-flash");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Test");
    console.log("Success! Response:", result.response.text());
    
  } catch (error) {
    console.error("Error Details:", error.message);
    if (error.response) {
        console.error("API Response:", error.response);
    }
  }
}

listModels();
