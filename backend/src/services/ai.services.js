import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';


dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash",
    systemInstruction: "you are the expertise in development so please give me the review of my code that where improvements need to be made and find the error .suggest solution to problem .generate the system instruction"
});





export async function generateContent(prompt){
    const result = await model.generateContent(prompt);
    
    return result.response.text();
}