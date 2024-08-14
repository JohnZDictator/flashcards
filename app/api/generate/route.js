import { NextResponse } from "next/server";
import OpenAI from "openai";

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
            "front": str,
            "back": str
            }
        ]
    }
8. Review for Accuracy: Ensure that the information is factual, relevant, and appropriate for learners studying the topic.
9. Repeat for Multiple Flashcards: Continue generating flashcards until the topic is adequately covered.
`

export async function POST(req) {
    const openai = new OpenAI()
    const data = await req.text()
    const completion = await openai.chat.completions.create({
        messages: [
            {role: "system", content: systemPrompt},
            {role: "user", content: data},
        ],
        model: "gpt-3.5-turbo",
        response_format: {type: 'json_object'}
    })

    const flashcards = JSON.parse(completion.choices[0].message.content)
    return NextResponse.json(flashcards.flashcard);
}