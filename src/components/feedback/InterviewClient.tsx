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
import { formatQuestionText, formatCodeBlock } from "@/lib/helper";
import { toast } from "sonner";

export default function InterviewClient({
  question,
  lang,
}: {
  question: any;
  lang?: string;
}) {
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [correctAnswerFetched, setCorrectAnswerFetched] = useState(false);
  const [formattedQuestion, setFormattedQuestion] = useState<string>("");
  const [formattedAnswer, setFormattedAnswer] = useState<string>("");
  const [formattedCorrectAnswer, setFormattedCorrectAnswer] =
    useState<string>("");

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
        setFormattedCorrectAnswer(formatQuestionText(answer));
      }
    };

    fetchAnswerFromDb();
  }, [question.id]);

  useEffect(() => {
    const formattedQ = formatQuestionText(question.questionText);
    setFormattedQuestion(formattedQ);

    if (question.response) {
      if (
        question.response.includes("```") ||
        question.response.includes("function")
      ) {
        const formattedA = formatCodeBlock(question.response);
        setFormattedAnswer(formattedA);
      } else {
        const formattedA = formatQuestionText(question.response);
        setFormattedAnswer(formattedA);
      }
    }
  }, [question]);

  const handleAnswerQuestion = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (correctAnswerFetched) return;

    const newMessages: CoreMessage[] = [...messages];

    setMessages(newMessages);

    const result = await fetchCorrectAnswerFromAI(question.questionText, lang);

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
      setFormattedCorrectAnswer(formatQuestionText(finalAnswer));
    }

    await saveAnswerToQuestion(question.id, finalAnswer);
    setCorrectAnswerFetched(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Kopyalandı!");
      },
      (err) => {
        toast.error("Kopyalama başarısız oldu!");
        console.error("Kopyalama hatası:", err);
      }
    );
  };

  const processHtmlWithCopyButtons = (html: string) => {
    if (!html.includes("<pre")) return html;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    const preBlocks = tempDiv.querySelectorAll("pre");

    preBlocks.forEach((preBlock) => {
      const wrapper = document.createElement("div");
      wrapper.className = "relative";

      const copyButton = document.createElement("button");
      copyButton.className =
        "absolute top-0 right-0 p-3 bg-gray-800/55 hover:bg-gray-800/70 rounded-md transition-colors hidden lg:block";
      copyButton.title = "Kopyala";
      copyButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>';

      copyButton.setAttribute("data-copy-button", "true");
      preBlock.setAttribute("data-code-content", preBlock.textContent || "");

      preBlock.parentNode?.replaceChild(wrapper, preBlock);
      wrapper.appendChild(preBlock);
      wrapper.appendChild(copyButton);
    });

    return tempDiv.innerHTML;
  };

  useEffect(() => {
    const handleCopyButtonClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest('[data-copy-button="true"]');

      if (button) {
        const wrapper = button.parentElement;
        if (wrapper) {
          const preBlock = wrapper.querySelector("pre");
          if (preBlock) {
            const textToCopy = preBlock.textContent || "";
            copyToClipboard(textToCopy);
          }
        }
      }
    };

    document.addEventListener("click", handleCopyButtonClick);

    return () => {
      document.removeEventListener("click", handleCopyButtonClick);
    };
  }, []);

  return (
    <Tabs defaultValue="your-answer" className="w-full">
      <div className="flex justify-between items-center pt-[1.5rem] sm:flex-row flex-col">
        <div className="mr-3 w-full">
          <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
            <h3 className="text-lg font-semibold mt-auto">Soru</h3>
            <TabsList className="flex justify-center rounded-sm sm:my-0 my-3 ml-auto lg:flex-row flex-col h-full w-[50%] lg:w-[30%] bg-neutral-900">
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
          <div
            className="text-gray-300"
            dangerouslySetInnerHTML={{ __html: formattedQuestion }}
          />
        </div>
      </div>
      <TabsContent value="your-answer" className="py-4 border-t">
        <h3 className="text-xl font-semibold mb-2">Senin Cevabın</h3>
        {question.response ? (
          <div className="text-sm">
            <div
              dangerouslySetInnerHTML={{
                __html: processHtmlWithCopyButtons(formattedAnswer),
              }}
            />
          </div>
        ) : (
          <p className="opacity-70 text-sm">Henüz cevap verilmedi.</p>
        )}
      </TabsContent>

      <TabsContent value="correct-answer" className="py-4 border-t">
        <h3 className="text-xl font-semibold mb-2">Doğru Cevap</h3>
        <div className="text-sm">
          <div
            dangerouslySetInnerHTML={{
              __html: processHtmlWithCopyButtons(formattedCorrectAnswer),
            }}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}
