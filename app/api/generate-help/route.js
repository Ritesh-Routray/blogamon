import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

export async function POST(request) {
  const { helpRequest } = await request.json();

  if (!helpRequest) {
    return new Response(JSON.stringify({ error: "Help request is required" }), {
      status: 400,
    });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  try {
    console.log("Received Help Request: ", helpRequest);

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate the help suggestion based on user input
    const result = await model.generateContent(
      `Suggest help or resources for: ${helpRequest}`
    );

    // Check if the response contains the text function
    if (result.response && typeof result.response.text === "function") {
      // Call the function to get the generated text
      const generatedHelp = await result.response.text();

      return new Response(JSON.stringify({ suggestion: generatedHelp }), {
        status: 200,
      });
    } else {
      console.error("Unexpected result format: ", result);
      return new Response(
        JSON.stringify({ error: "Unexpected result format from API" }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error generating help suggestion:", error.message || error);

    return new Response(
      JSON.stringify({
        error: "Failed to generate help suggestions",
        details: error.message || "Unknown error",
      }),
      { status: 500 }
    );
  }
}
