require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) { console.log("NO_KEY"); return; }

  try {
    const genAI = new GoogleGenerativeAI(key);
    // There isn't a direct listModels on genAI instance in some versions, 
    // but typically it's on the class or via a manager. 
    // Actually, distinct from python sdk, node sdk might not have listModels easily exposed on the main entry.
    // Let's try to just check if 'gemini-pro' works again or 'gemini-1.0-pro'.
    
    // Instead of listing (which might be complex to implement without looking up reference), 
    // let's test a few standard model names.
    const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro", "gemini-1.0-pro"];
    
    for (const m of models) {
        process.stdout.write(`Testing ${m}... `);
        try {
            const model = genAI.getGenerativeModel({ model: m });
            await model.generateContent("Hi");
            console.log("✅ OK");
        } catch (e) {
            console.log("❌ FAILED: " + e.message); 
        }
    }

  } catch (err) {
    console.error("Fatal Error:", err);
  }
}

listModels();
