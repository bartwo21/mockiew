"use server";

import { CoreMessage, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createStreamableValue } from "ai/rsc";

export async function fetchCorrectAnswerFromAI(messages: CoreMessage[]) {
  const result = await streamText({
    model: openai("gpt-4o-mini"),
    messages: [
      {
        role: "user",
        content: `Bu soruya kısa bir şekilde doğru cevap ver: ${messages}`,
      },
    ],
  });

  const stream = createStreamableValue(result.textStream);

  return stream.value;
}
