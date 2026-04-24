import { useMutation } from '@tanstack/react-query';
import { uploadMealImage } from '../lib/storage';
import * as FileSystem from 'expo-file-system';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { MealLog } from '../types/database';

const apiKey = process.env.EXPO_PUBLIC_GEMINI_VISION_API_KEY;
if (!apiKey) {
  console.warn("EXPO_PUBLIC_GEMINI_VISION_API_KEY is missing from environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

export type AnalyzeResult = Omit<MealLog, 'id' | 'user_id' | 'created_at'>;

export const useAnalyze = () => {
  return useMutation({
    mutationFn: async ({ imageUri, userId }: { imageUri: string; userId: string }): Promise<AnalyzeResult> => {
      // 1. Upload the image to Supabase
      const uploadedUrl = await uploadMealImage(userId, imageUri);

      // 2. Read file as Base64 for Gemini
      const base64Data = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const mimeType = imageUri.toLowerCase().endsWith('png') ? 'image/png' : 'image/jpeg';

      // 3. Call Gemini
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
You are an expert food analyzer and sommelier. Analyze this food image and return a JSON object with the exact following schema. Do NOT use markdown code blocks, return ONLY raw JSON.
{
  "name": "string (the name of the dish)",
  "restaurant": "string (null if unknown)",
  "location": "string (null if unknown)",
  "calories": number (estimated total calories),
  "protein": number (estimated grams of protein),
  "carbs": number (estimated grams of carbs),
  "fat": number (estimated grams of fat),
  "fiber": number (estimated grams of fiber),
  "sodium": number (estimated mg of sodium),
  "sugar": number (estimated grams of sugar),
  "flavor_tags": ["string", "string"] (list of dominant flavor notes like "savory", "umami", "spicy", "sweet"),
  "ingredients": ["string", "string"] (list of main ingredients visible),
  "ai_insight": "string (a short, insightful paragraph describing the culinary profile of the dish)",
  "pairing_suggestion": "string (a beverage pairing suggestion with explanation)",
  "match_score": number (generate a random integer between 80 and 99 representing how much a generic user would like this)
}
      `;

      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: base64Data,
            mimeType
          }
        }
      ]);

      const text = result.response.text();
      
      // Attempt to parse JSON. Sometimes Gemini wraps it in \`\`\`json ... \`\`\`
      let parsedJson: any;
      try {
        const cleanText = text.replace(/\`\`\`json\s*/, '').replace(/\s*\`\`\`/, '').trim();
        parsedJson = JSON.parse(cleanText);
      } catch (err) {
        console.error("Failed to parse Gemini response:", text);
        throw new Error("Failed to parse AI response. Please try again.");
      }

      return {
        image_url: uploadedUrl,
        name: parsedJson.name || "Unknown Dish",
        restaurant: parsedJson.restaurant || null,
        location: parsedJson.location || null,
        calories: parsedJson.calories || 0,
        protein: parsedJson.protein || 0,
        carbs: parsedJson.carbs || 0,
        fat: parsedJson.fat || 0,
        fiber: parsedJson.fiber || 0,
        sodium: parsedJson.sodium || 0,
        sugar: parsedJson.sugar || 0,
        flavor_tags: parsedJson.flavor_tags || [],
        ingredients: parsedJson.ingredients || [],
        ai_insight: parsedJson.ai_insight || "",
        pairing_suggestion: parsedJson.pairing_suggestion || "",
        match_score: parsedJson.match_score || 85,
      };
    }
  });
};
