import { GoogleGenAI } from "@google/genai";
import { RESUME_DATA } from '../constants';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateChatResponse = async (userMessage: string): Promise<string> => {
  if (!apiKey) {
    return "I'm sorry, I seem to be missing my API key brain! Please configure it to talk to me.";
  }

  try {
    const systemInstruction = `
      You are a cute, enthusiastic, and helpful AI assistant for Alex Chen's portfolio website.
      You are knowledgeable about Software Engineering and AI/ML.
      Your tone should be friendly, professional but slightly playful (use occasional emojis).
      Use the following resume data to answer questions about Alex's background:
      
      ${RESUME_DATA}
      
      If the user asks something not in the resume, politely say you don't know but suggest they email Alex.
      Keep answers concise (under 100 words) unless asked for details.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I'm speechless! (No response text returned)";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Oops! My AI circuits got a bit tangled. Try again later!";
  }
};
