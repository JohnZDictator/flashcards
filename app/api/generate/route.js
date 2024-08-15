import { GoogleGenerativeAI, FunctionDeclarationSchemaType } from "@google/generative-ai";
import { NextResponse } from "next/server";

const systemPrompt = `
You are a flashcard content creator. Your task is to generate concise and effective flashcards based on the given topic or concept. Follow these steps to ensure each flashcard is well-crafted:

1. Identify Key Concepts: Start by identifying the most important terms, concepts, or questions related to the topic.
2. Create Front Content: For each flashcard, write a brief and clear question, term, or statement that prompts recall on the front. Ensure it directly addresses a key concept.
3. Generate Back Content: On the back of the flashcard, provide a concise explanation or answer that fully addresses the prompt on the front. Keep it simple and straightforward.
4. Ensure Clarity and Accuracy: Review the content to ensure that it is clear, accurate, and directly related to the topic. Avoid overly complex language or unnecessary details.
5. Organize Sequentially: If the flashcards are related, organize them in a logical sequence that helps build understanding of the topic step by step.
6. Keep It Brief: Ensure that both the front and back content are brief and to the point, making the flashcards effective for quick review.
7. Structure the Flashcard: Format the flashcard content in the following JSON structure:
    {
        "flashcards": [
            {
            "front": string,
            "back": string,
            }
        ]
    }
8. Review for Accuracy: Ensure that the information is factual, relevant, and appropriate for learners studying the topic.
9. Repeat for Multiple Flashcards: Continue generating flashcards until the topic is adequately covered.
`

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


export async function POST(req) {
  const data = await req.text()
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash", 
    generationConfig: {
      responseMimeType: "application/json",
    }
  })
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts:  [{text: systemPrompt}]
      },
    ],
  })

  const result = await chat.sendMessage(data)
  const flashcards = JSON.parse(result.response.text())
  return NextResponse.json(flashcards.flashcards, {status: 201})
}