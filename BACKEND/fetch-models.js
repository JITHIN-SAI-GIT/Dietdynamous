require("dotenv").config();

async function checkModels() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) { console.log("NO_KEY"); return; }

  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.models) {
      console.log("GENERATION MODELS:");
      const genModels = data.models.filter(m => m.supportedGenerationMethods.includes("generateContent"));
      console.log("GENERATION MODELS FOUND: " + genModels.length);
      const hasFlash = genModels.some(m => m.name.includes("gemini-1.5-flash"));
      console.log("HAS gemini-1.5-flash: " + hasFlash);
      
      console.log("FIRST 5 MODELS:");
      genModels.slice(0, 5).forEach(m => {
             console.log("Model: " + m.name.replace("models/", ""));
      });
    } else {
      console.log("ERROR RESPONSE:", JSON.stringify(data, null, 2));
    }
  } catch (err) {
    console.error("FETCH ERROR:", err);
  }
}

checkModels();
