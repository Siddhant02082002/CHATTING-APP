
import { currentProfilePages } from "@/lib/currentProfilePage";;
import { db } from "@/lib/db";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not allowed" })
    }
    try {
        const profile = await currentProfilePages(req);
        if (!profile) {
            return res.status(401).json({ error: "Unauthorized" })
        }

        const { content, fileUrl } = req.body;


        if (!content) {
            return res.status(401).json({ error: "connot allow empty content" });
        }
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = content

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();



        const message = await db.aICHAT.create({
            data: {
                UserPromt: prompt,
                GeminiResponse: text,
                profileId: profile.id,
            },
            include:{
                profile: true,
            }
        });

        const AiKey = `chat:${profile.id}:messages`;

        res?.socket?.server?.io?.emit(AiKey, message);
        return res.status(200).json(message);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Internal Error" })
    }
}