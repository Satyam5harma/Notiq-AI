
import { GoogleGenAI, Type } from "@google/genai";
import type { ProcessedNoteData } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const noteSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "A concise, descriptive title for the note, under 10 words.",
    },
    summary: {
      type: Type.STRING,
      description: "A brief summary of the note's content, about 2-3 sentences long.",
    },
    tags: {
      type: Type.ARRAY,
      description: "An array of 3 to 5 relevant keywords or tags, as single words or short phrases.",
      items: {
        type: Type.STRING,
      },
    },
  },
  required: ["title", "summary", "tags"],
};

export async function processTranscript(transcript: string): Promise<ProcessedNoteData> {
  try {
    const prompt = `Analyze the following voice note transcript. Based on its content, please generate a suitable title, a concise summary, and a list of relevant tags. The transcript is:\n\n---\n${transcript}\n---`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: noteSchema,
      },
    });
    
    const jsonText = response.text.trim();
    const processedData = JSON.parse(jsonText);
    
    // Basic validation to ensure the response structure is correct
    if (processedData && typeof processedData.title === 'string' && typeof processedData.summary === 'string' && Array.isArray(processedData.tags)) {
      return processedData;
    } else {
      throw new Error("Invalid data structure received from AI.");
    }

  } catch (error) {
    console.error("Error processing transcript with Gemini API:", error);
    // Fallback in case of API error
    return {
      title: "Untitled Note",
      summary: "Could not generate summary.",
      tags: ["untagged"],
    };
  }
}
