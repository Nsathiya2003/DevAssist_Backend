//1.for gemini


// import dotenv from 'dotenv';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// dotenv.config();

// const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export const aiIntegrate = async (prompt, retries = 3) => {
//     console.log('prompt',prompt)
//     try{
//         const model = client.getGenerativeModel({
//             model: 'gemini-1.5-flash'
//         });
        
//         console.log('model',model)

//         const generateContent = await model.generateContent(prompt);

//         console.log('generateContent',generateContent)
    
//         const response = generateContent.response();
        
//         console.log('response',response)
    
//         const text = response.text();
//         console.log('text',text)
//         return text;
//     }
//      catch(error){
//         // Check if it's a quota error (429)
//         if(error?.status === 429 && retries > 0){
//             const retryDelay = Math.pow(2, 4 - retries) * 1000; // Exponential backoff
//             console.log(`Quota exceeded. Retrying in ${retryDelay/1000}s... (${retries} attempts left)`);
//             await new Promise(resolve => setTimeout(resolve, retryDelay));
//             return aiIntegrate(prompt, retries - 1);
//         }
//         console.log(error?.message)
//     }
// }



//2. for Llama via open-router
import dotenv from "dotenv";
import OpenAI from "openai";
import { extractJSON } from "../helpers/output-extraction.js";
import { systemPrompt } from "./system-prompt.js";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export const aiIntegrate = async (prompt, retries = 3) => {
  console.log("prompt", prompt);

  try {
    const response = await client.chat.completions.create({
      model: "meta-llama/llama-3-8b-instruct",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const text = response.choices[0].message.content;
   let parsed;

try {
  const jsonString = extractJSON(text);

  if (!jsonString) {
    return { raw: text };
  }

  parsed = JSON.parse(jsonString);

  return parsed;

} catch (e) {
  return { raw: text };
}
  } catch (error) {
    if (retries > 0) {
      const delay = (4 - retries) * 2000;
      console.log(`Retrying in ${delay / 1000}s... (${retries} left)`);
      await new Promise((res) => setTimeout(res, delay));
      return aiIntegrate(prompt, retries - 1);
    }

    console.log("Error:", error.message);
    return "AI service is temporarily unavailable. Please try again.";
  }
};