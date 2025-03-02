import { generateContent } from "../services/ai.services.js";
export const getResponse=async(req,res)=>{

    const prompt=req.body.code;

    if(!prompt){
        return res.status(400).json({ message: "prompt is required" });
    }

    try {
        const r = await generateContent(prompt);
        console.log("success");
        console.log(r);

        if (r) {
            res.status(200).json({ data: r });
        } else {
            res.status(500).json({ message: "Failed to generate content" });
        }
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }


}
