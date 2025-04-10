/* eslint-disable prefer-const */
"use client";

import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import { saveInterviewAndInterviewQuestions } from "../../../actions/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import BackgroundGradient from "@/components/interview/BackgroundGradient";
import InterviewTypeSelection from "@/components/interview/InterviewTypeSelection";
import GeneralInterviewForm from "@/components/interview/GeneralInterviewForm";
import CodingInterviewForm from "@/components/interview/CodingInterviewForm";
import InterviewQuestions from "@/components/interview/InterviewQuestions";
import SaveInterviewButton from "@/components/interview/SaveInterviewButton";
import { LoadingSpinner } from "@/helpers/loadingSpinner";

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

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSaveInterview = async () => {
    try {
      if (!userEmail) {
        toast.error("Kullanıcı bilgileri bulunamadı");
        return;
      }

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
  };

  return (
    <div className="flex flex-col items-center justify-center lg:mt-8 mt-4 min-h-[60vh]">
      <BackgroundGradient />
      <div className="w-full lg:w-3/4 flex flex-col px-4">
        <div className="grid w-full gap-2">
          {!interviewStarted ? (
            jobTitleState == null ? (
              <InterviewTypeSelection onSelectType={setJobTitleState} />
            ) : jobTitleState === "general" ? (
              <GeneralInterviewForm
                input={input}
                handleInputChange={handleInputChange}
                handleSubmit={handleFormSubmit}
                onBack={() => setJobTitleState(null)}
              />
            ) : jobTitleState === "code" ? (
              <CodingInterviewForm onBack={() => setJobTitleState(null)} />
            ) : null
          ) : isLoading && !data ? (
            <div className="flex justify-center items-center h-full">
              <LoadingSpinner />
            </div>
          ) : null}
        </div>

        {data && (
          <InterviewQuestions
            questions={questions}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            jobTitle={jobTitleState}
          />
        )}

        {data && userEmail && (
          <SaveInterviewButton
            onSave={handleSaveInterview}
            answered={answered}
          />
        )}
      </div>
    </div>
  );
}
