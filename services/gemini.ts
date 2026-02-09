
import { GoogleGenAI, Type } from "@google/genai";
import { ProjectCategory, BrandSuggestions } from "../types";

// Initialize the Gemini API client using the environment variable directly as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBrandSuggestions = async (
  category: ProjectCategory,
  businessName: string
): Promise<BrandSuggestions> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Suggest a brand identity for a ${category} called "${businessName}". Provide a catchy slogan, a 2-sentence description of how it helps the rural community, and 5 brand hex color codes that fit the required palette for this category. Return as JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          slogan: { type: Type.STRING },
          description: { type: Type.STRING },
          colors: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          headingFont: { type: Type.STRING },
          bodyFont: { type: Type.STRING }
        },
        required: ["slogan", "description", "colors", "headingFont", "bodyFont"]
      }
    }
  });

  // Access the text property directly on the response object.
  const text = response.text || '';
  return JSON.parse(text.trim());
};

// Updated aspect ratio types to include all supported values: "1:1", "3:4", "4:3", "9:16", and "16:9".
// This fixes the type mismatch in App.tsx where "9:16" was used.
export const generateImageAsset = async (prompt: string, aspectRatio: "1:1" | "3:4" | "4:3" | "9:16" | "16:9" = "1:1") => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      imageConfig: {
        aspectRatio,
        // Removed imageSize as it is only available for gemini-3-pro-image-preview.
      }
    }
  });

  // Iterate through all parts to find the image data, as recommended.
  if (response.candidates?.[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  }
  return null;
};
