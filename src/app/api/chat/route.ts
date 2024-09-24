import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const convertedMessage = convertToCoreMessages(messages);

  if (!convertedMessage || messages.length === 0) {
    return new Response("No user message provided", { status: 400 });
  }

  const customMessage = `${convertedMessage[0].content} konusu için 5 tane interview sorusu hazırla (sadece soruları yazın).`;

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    messages: [{ role: "user", content: customMessage }],
  });

  return result.toDataStreamResponse();
}
