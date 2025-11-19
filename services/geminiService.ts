import { GoogleGenAI, Type } from "@google/genai";
import { MoodResponse } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key not found. AI features will be disabled.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeSentiment = async (text: string): Promise<MoodResponse | null> => {
  const ai = getClient();
  if (!ai) return null;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the following short journal entry. Provide a 1-2 word abstract 'mood' description and a single matching 'emoji' that represents the feeling. Entry: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            mood: { type: Type.STRING },
            emoji: { type: Type.STRING },
          },
          required: ["mood", "emoji"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as MoodResponse;
    }
    return null;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};