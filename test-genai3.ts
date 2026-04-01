import { GoogleGenAI } from '@google/genai';

async function main() {
  const ai = new GoogleGenAI({ apiKey: 'invalid_key' });
  try {
    console.log("Calling generateContent...");
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: 'Hello',
    });
    console.log("Response:", response.text);
  } catch (e) {
    console.error("Caught error:", e);
  }
}
main();
