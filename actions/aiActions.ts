"use server";

import { CoreMessage, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createStreamableValue } from "ai/rsc";
import { LANGUAGE_VERSIONS } from "@/components/interview/CodeEditor/constants";

export async function fetchCorrectAnswerFromAI(
  message: CoreMessage[],
  lang?: string
) {
  const result = await streamText({
    model: openai("gpt-4o-mini"),
    messages: [
      {
        role: "user",
        content: `Sen bir mülakat soru cevaplama asistanısın. Cevabı direkt olarak yaz, soruyu tekrarlama. Bu soruya kısa bir şekilde doğru cevap ver: ${message}. Eğer soru kod gerektiriyorsa, pratik bir örnek ver${
          lang ? ` ve ${lang} dilinde yaz` : ""
        }`,
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
        content: `Sana gelen prompta sorular ve soruların yanında kullanınıcının verdiği cevaplar var. Bu sorulara ve cevaplara göre gerçekçi ve karşı tarafın (karşı taraf herhangi biri olabilir ona göre yaz) düzeltmesi gereken şeyleri belirten bir feedback yaz(sadece feedback metinini yaz, soru ve cevapları tekrarlama): ${messages[0].content}`,
      },
    ],
  });

  const stream = createStreamableValue(result.textStream);

  return stream.value;
}

export const fetchCodeQuestionFromAI = async () => {
  const difficultyLevels = ["Kolay", "Orta", "Zor"];
  const randomDifficulty =
    difficultyLevels[Math.floor(Math.random() * difficultyLevels.length)];

  const topics = [
    "Array",
    "String",
    "Graph",
    "Sorting",
    "Recursion",
    "Dynamic Programming",
    "Linked List",
    "Tree",
    "Hash Table",
    "Binary Search",
    "Stack",
    "Queue",
    "Heap",
    "Bit Manipulation",
  ];
  const randomTopic = topics[Math.floor(Math.random() * topics.length)];

  const timestamp = new Date().getTime();

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    messages: [
      {
        role: "user",
        content: `Bu projeye kod editörü ile kod yazma bölümü oluşturdum. Senden bu dillere uygun ${randomDifficulty} zorlukta ve ${randomTopic} konusunda bir algoritma sorusu yazmanı istiyorum. Diller: ${Object.keys(
          LANGUAGE_VERSIONS
        ).join(
          ", "
        )}. Algoritma ve problem çözme yeteneğini test eden özgün ve daha önce verilmemiş bir teknik mülakat sorusu üret. Soru tamamen farklı ve yaratıcı olmalı. Uzun bir soru değil. Lütfen aşağıdaki formatta döndür:
        - 🧠 Konu: ${randomTopic}
        - 🎯 Zorluk: ${randomDifficulty}
        - ❓ Soru: (açıklayıcı bir şekilde ifade et)
        
        Not: Bu istek zaman damgası ${timestamp} ile oluşturuldu, lütfen her seferinde farklı bir soru üret.`,
      },
    ],
  });

  const stream = createStreamableValue(result.textStream);

  return stream.value;
};
