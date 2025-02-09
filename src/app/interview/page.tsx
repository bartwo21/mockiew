/* eslint-disable prefer-const */
"use client";

import { useChat } from "ai/react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { saveInterviewAndInterviewQuestions } from "../../../actions/actions";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function InterviewPage() {
  const [userEmail, setUserEmail] = useState(null);
  const [jobTitleState, setJobTitleState] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, data, isLoading } =
    useChat();
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);

  const router = useRouter();

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
    if (input.trim() === "") {
      toast.error("Lütfen bir alan giriniz");
      return;
    }
    setJobTitleState(input);
    handleSubmit(e);
    setInterviewStarted(true);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/user");
      const data = await res.json();
      setUserEmail(data.user.email);
    };

    fetchUser();
  }, []);

  const startNewInterview = () => {
    window.location.reload();
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-16">
      <div className="absolute top-0 z-[-2] w-full h-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_60%_-35%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="w-2/3 flex flex-col">
        <div className="grid w-full gap-2">
          {!interviewStarted ? (
            <>
              <form
                onSubmit={handleFormSubmit}
                className="flex items-center justify-center md:flex-row flex-col md:gap-8 gap-3"
              >
                <Image
                  src="/startInterview-removebg-preview.png"
                  width={300}
                  height={300}
                  alt="interview"
                  className="filter drop-shadow-lg rounded-lg"
                />
                <div className="">
                  <h1 className="text-3xl text-center my-2 mb-7 text-gray-200">
                    Hangi alanla ilgili bir mülakat yapmak istiyorsunuz?
                  </h1>
                  <div className="flex gap-4">
                    <Input
                      placeholder="Örn: Yazılım, tasarım, pazarlama"
                      value={input}
                      onChange={handleInputChange}
                    />
                    <Button className="text-white h-full" type="submit">
                      Gönder
                    </Button>
                  </div>
                </div>
              </form>
            </>
          ) : (
            <div className="text-right">
              <Button
                className="text-white mt-4 text-xs bg-secondary"
                onClick={startNewInterview}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex space-x-2 justify-center items-center pr-2">
                    <span className="sr-only">Loading...</span>
                    <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
                  </div>
                ) : (
                  "Yeni mülakat için tıklayınız"
                )}
              </Button>
            </div>
          )}
        </div>
        {data && (
          <div className="grid grid-cols-1 gap-4">
            <h3 className="text-2xl text-center text-primary">
              {`${
                (jobTitleState ?? "").charAt(0).toUpperCase() +
                  (jobTitleState ?? "").slice(1) || "Belirtilmedi"
              }`}
            </h3>
            {questions.slice(0, 5).map((question, index) => {
              let title = question.trim();

              return (
                <Card key={index} className="w-full bg-transparent flex">
                  <CardContent className="p-6 w-1/3">
                    <p className="text-center">{`Soru ${index + 1}`}</p>
                    <hr className="my-1 h-0.5 border-t-0 bg-neutral-800 dark:bg-white/10" />
                    <p className="font-bold">{title}</p>
                  </CardContent>
                  <CardFooter className="flex flex-col w-2/3 p-6">
                    <Textarea
                      className="my-auto resize-none w-full"
                      placeholder="Cevabınızı buraya yazın"
                      value={answers[index] || ""}
                      onChange={(e) =>
                        handleAnswerChange(index, e.target.value)
                      }
                    />
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
        {data && userEmail && (
          <Button
            onClick={async () => {
              try {
                const result = await saveInterviewAndInterviewQuestions(
                  userEmail,
                  jobTitleState || "",
                  questions.map((question, index) => ({
                    questionText: question,
                    answerText: answers[index]?.trim() || "",
                  }))
                );
                if (result.success == true) {
                  router.push(`/interviews/feedback/${result.interviewId}`);
                }
              } catch (error) {
                console.error(error);
              } finally {
                setAnswered(true);
              }
            }}
            className={`mt-5 ${
              answered ? "bg-secondary text-white" : "bg-primary text-white"
            }`}
            disabled={answered}
          >
            {answered ? "Cevaplandırıldı" : "Cevapla"}
          </Button>
        )}
      </div>
    </div>
  );
}
