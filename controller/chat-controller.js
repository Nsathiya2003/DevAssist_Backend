import { aiIntegrate } from "../services/ai-integration.js";
import { buildPrompt } from "../services/prompt-builder.js";

export const createChat = async (req,res) => {
    const { prompt } = req.body;

    try{
        const prompts = await buildPrompt(prompt);

        const data = await aiIntegrate(prompts);

        console.log("the data is",data)

        return res.status(201).json({
            status:'success',
            message:'output retrived successfully',
            data : data
        });
    }
    catch(error){
        return res.status(500).json({
            status:'failure',
            message:'Failed to generate output',
            error:error.message,
            data:[]
        })
    }
}