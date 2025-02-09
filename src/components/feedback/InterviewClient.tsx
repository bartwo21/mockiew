/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchCorrectAnswerFromAI } from "../../../actions/aiActions";
import { type CoreMessage } from "ai";
import { readStreamableValue } from "ai/rsc";
import {
  saveAnswerToQuestion,
  getAnswerToQuestion,
} from "../../../actions/actions";
import { formatText } from "@/helpers/formatText";

export default function InterviewClient({ question }: { question: any }) {
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [correctAnswerFetched, setCorrectAnswerFetched] = useState(false);

  useEffect(() => {
    const fetchAnswerFromDb = async () => {
      const answer = await getAnswerToQuestion(question.id);
      if (answer) {
        setMessages([
          {
            role: "assistant",
            content: answer,
          },
        ]);
        setCorrectAnswerFetched(true);
      }
    };

    fetchAnswerFromDb();
  }, [question.id]);

  const handleAnswerQuestion = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (correctAnswerFetched) return;

    const newMessages: CoreMessage[] = [...messages];

    setMessages(newMessages);

    const result = await fetchCorrectAnswerFromAI(question.questionText);

    let correctAnswer = "";
    let finalAnswer = "";

    for await (const content of readStreamableValue(result)) {
      correctAnswer += content as string;
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: content as string,
        },
      ]);
      finalAnswer = content as string;
    }

    await saveAnswerToQuestion(question.id, finalAnswer);
    setCorrectAnswerFetched(true);
  };

  return (
    <Tabs defaultValue="your-answer" className="w-full">
      <div className="flex justify-between items-center pt-[1.5rem] sm:flex-row flex-col">
        <p className="mr-3">Soru: {question.questionText}</p>
        <TabsList className="flex justify-center rounded-sm lg:w-[30%] sm:my-0 my-3 ml-auto lg:flex-row flex-col h-full w-[100%]">
          <TabsTrigger
            value="your-answer"
            className="text-center data-[state=active]:bg-zinc-950 rounded-sm w-full"
          >
            Senin Cevabın
          </TabsTrigger>
          <TabsTrigger
            value="correct-answer"
            className="text-center data-[state=active]:bg-black w-full"
            onClick={(e) => handleAnswerQuestion(e)}
          >
            Doğru Cevap
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="your-answer" className="p-4 border-t">
        <h3 className="text-xl font-semibold mb-2">Senin Cevabın</h3>
        <p className="opacity-70 text-sm">
          {question.response ? question.response : "Henüz cevap verilmedi."}
        </p>
      </TabsContent>

      <TabsContent value="correct-answer" className="p-4 border-t">
        <h3 className="text-xl font-semibold mb-2">Doğru Cevap</h3>
        <div className="opacity-70 text-sm">
          <div className="opacity-70 text-sm">
            {messages.map((m, i) => (
              <div key={i} className="whitespace-pre-wrap">
                {formatText(typeof m.content === "string" ? m.content : "")}
              </div>
            ))}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
