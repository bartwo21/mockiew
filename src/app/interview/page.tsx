/* eslint-disable prefer-const */
"use client";

import { useChat } from "ai/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InterviewPage() {
  const router = useRouter();

  const { messages, input, handleInputChange, handleSubmit, data, isLoading } =
    useChat();
  const [interviewStarted, setInterviewStarted] = useState(false);

  const assistantMessages = messages.filter(
    (message) => message.role === "assistant"
  );

  const lastAssistantMessage =
    assistantMessages[assistantMessages.length - 1]?.content || "";

  const questions = lastAssistantMessage
    .split("\n")
    .filter((question) => question.trim() !== "");

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e);
    setInterviewStarted(true);
  };

  //@TODO interview'ı databaseye kaydederken ai'ın soruları bitirmesini beklemek gerekiyor.

  const startNewInterview = () => {
    router.back();
  };

  return (
    <div className="flex flex-col items-center justify-center mt-16">
      <div className="w-2/3 flex flex-col gap-16">
        <div className="grid w-full gap-2">
          {!interviewStarted && (
            <>
              <h1 className="text-3xl text-center my-2 mb-7 text-gray-200">
                Hangi alanla ilgili bir mülakat yapmak istiyorsunuz?
              </h1>
              <form onSubmit={handleFormSubmit}>
                <Textarea
                  placeholder="Örn: Yazılım, tasarım, pazarlama"
                  value={input}
                  onChange={handleInputChange}
                />
                <Button className="text-white mt-4" type="submit">
                  Gönder
                </Button>
              </form>
            </>
          )}

          {interviewStarted && (
            <Button
              className="text-white mt-4 bg-secondary"
              onClick={startNewInterview}
            >
              Yeni mülakat için tıklayınız
            </Button>
          )}
        </div>

        {isLoading && (
          <div className="flex space-x-2 justify-center items-center dark:invert">
            <span className="sr-only">Loading...</span>
            <div className="h-3 w-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-3 w-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-3 w-3 bg-white rounded-full animate-bounce"></div>
          </div>
        )}

        {data && (
          <div className="grid grid-cols-1 gap-4">
            {questions.slice(0, 5).map((question, index) => {
              let title = question.trim(); // Soruyu temizliyoruz

              return (
                <Card key={index} className="w-full bg-transparent">
                  <CardHeader>
                    <CardTitle>{`Soru ${index + 1}`}</CardTitle>
                    <hr className="my-12 h-0.5 border-t-0 bg-neutral-800 dark:bg-white/10" />
                  </CardHeader>
                  <CardContent>
                    <p className="font-bold">{title}</p>
                  </CardContent>
                  <CardFooter className="flex flex-col">
                    <Textarea
                      className="mt-4"
                      placeholder="Cevabınızı buraya yazın"
                    />
                    <Button className="text-white mt-4 mr-auto">Cevapla</Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
