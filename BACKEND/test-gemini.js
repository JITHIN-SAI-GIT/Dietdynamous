require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testModel(modelName) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return "NO_KEY";
  
  try {
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent("Hi");
    await result.response;
    return "SUCCESS";
  } catch (err) {
    if (err.message.includes("403") || err.message.includes("SERVICE_DISABLED")) return "403_DISABLED";
    if (err.message.includes("404")) return "404_NOT_FOUND";
    return "ERR:" + err.message.substring(0,20);
  }
}

async function run() {
  console.log("PRO:", await testModel("gemini-pro"));
  console.log("PRO-1.0:", await testModel("gemini-1.0-pro"));
}

run();
