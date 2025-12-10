import { GoogleGenAI } from "@google/genai";
import { GenerationRequest } from "../types";

const apiKey = process.env.API_KEY;

export const generateReviewResponse = async (request: GenerationRequest): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please ensure process.env.API_KEY is set.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    You are an expert customer relations manager for a business using the tool 'Responde AI'. 
    Your task is to draft a professional response to a customer review.

    Input Review:
    "${request.reviewText}"

    Target Tone: ${request.tone}

    Instructions:
    1. STRICTLY DETECT the language of the Input Review.
    2. Write the response in the EXACT SAME language as the Input Review.
    3. If the input is aggressive, rude, or contains slang, filter that out. Do not be aggressive back. Address the core issue politely.
    4. Keep the response concise, professional, and empathetic.
    5. Do not include any explanations, "Here is the response:", or metadata. Just output the response text directly.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        // Higher temperature for a bit more natural/human creativity
        temperature: 0.7, 
      }
    });

    const text = response.text;
    
    if (!text) {
        throw new Error("No response generated from AI.");
    }

    return text.trim();
  } catch (error) {
    console.error("Error generating response:", error);
    throw new Error("Falha ao gerar resposta. Por favor, tente novamente.");
  }
};