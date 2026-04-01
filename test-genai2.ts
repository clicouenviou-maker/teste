import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: 'test' });
console.log("ai.apiKey:", (ai as any).apiKey);
