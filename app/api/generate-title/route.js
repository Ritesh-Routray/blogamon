import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

export async function POST(request) {
  const { brief } = await request.json();

  if (!brief) {
    return new Response(JSON.stringify({ error: "Brief is required" }), {
      status: 400,
    });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(
      `Generate a blog title for: ${brief}`
    );

    // Log the full response to confirm the structure
    console.log("API Response:", result);

    // Call the 'text' function to get the actual title
    const generatedTitle = result.response?.text
      ? await result.response.text()
      : "Failed to generate title";

    return new Response(JSON.stringify({ title: generatedTitle }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error generating title:", error.message || error);
    return new Response(JSON.stringify({ error: "Failed to generate title" }), {
      status: 500,
    });
  }
}
