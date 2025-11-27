import { GoogleGenAI } from "@google/genai";

const AI_MODEL = 'gemini-2.5-flash-image';

export const GeminiService = {
  generateImage: async (prompt: string): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    try {
      const response = await ai.models.generateContent({
        model: AI_MODEL,
        contents: {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      });

      // The API returns an image in the parts
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
            return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
      
      throw new Error("No image data found in response.");

    } catch (error: any) {
      console.error("Gemini Image Generation Error:", error);
      throw new Error(error.message || "Failed to generate image.");
    }
  }
};