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

export async function fetchFeedbackOnAllQuestionsAndResponsesFromAI(
  messages: CoreMessage[]
) {
  const result = await streamText({
    model: openai("gpt-4o-mini"),
    messages: [
      {
        role: "user",
        content: `Sana gelen prompta sorular ve soruların yanında kullanınıcının verdiği cevaplar var. Bu sorulara ve cevaplara göre gerçekçi ve karşı tarafın (karşı taraf herhangi biri olabilir ona göre yaz) düzeltmesi gereken şeyleri belirten bir feedback yaz: ${messages[0].content}`,
      },
    ],
  });

  const stream = createStreamableValue(result.textStream);

  return stream.value;
}
