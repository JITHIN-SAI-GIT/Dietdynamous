---
description: How to obtain and configure a Google Gemini API Key
---
This workflow guides you through the process of getting a free API key for Google Gemini and configuring it for the Diet Dynamos chatbot.

## 1. Get Your API Key
1.  Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
2.  Click **"Create API key"**.
3.  Select **"Create API key in new project"** (or an existing one).
4.  Copy the generated key (it starts with `AIza...`).

## 2. Configure the Backend
1.  Open the file `BACKEND/.env`.
2.  Find the line `GEMINI_API_KEY=YOUR_API_KEY_HERE`.
3.  Replace `YOUR_API_KEY_HERE` with your actual key.
    *   Example: `GEMINI_API_KEY=AIzsyB...`
4.  Save the file.

## 3. Restart the Backend
1.  Stop the currently running backend terminal (Ctrl+C).
2.  Run `nodemon app.js` (or `node app.js`) again to load the new key.

## 4. Test the Chatbot
1.  Go to [http://localhost:5173/dashboard/chat](http://localhost:5173/dashboard/chat).
2.  Send a message like "Hello!" to confirm it works.
