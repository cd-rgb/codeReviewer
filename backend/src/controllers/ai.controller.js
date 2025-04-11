import aiService from "../services/ai.service.js";

export async function getReview(req, res) {

    console.log("Received request to get review");
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: "Code input is required" });
    }

    try {
        const response = await aiService(code);
        res.json({ review: response });
    } catch (error) {
        console.error("AI Service Error:", error);
        res.status(500).json({ error: "Error processing request" });
    }
}
