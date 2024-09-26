/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CoreMessage } from "ai";
import { fetchFeedbackOnAllQuestionsAndResponsesFromAI } from "../../../actions/aiActions";
import { readStreamableValue } from "ai/rsc";
import { formatText } from "@/helpers/formatText";
import { LoadingSpinner } from "@/helpers/loadingSpinner";
import { getInterviewFeedback, saveFeedback } from "../../../actions/actions";

interface FeedbackSectionProps {
  questions: any[];
  interviewId: any;
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  questions,
  interviewId,
}) => {
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [feedback, setFeedback] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchFeedbackFromDb = async () => {
      const answer = await getInterviewFeedback(interviewId);
      if (answer) {
        setMessages([
          {
            role: "assistant",
            content: answer,
          },
        ]);
        setFeedback(true);
      }
    };

    fetchFeedbackFromDb();
  }, [interviewId]);

  const fetchFeedback = async () => {
    if (feedback) {
      return; // Eğer geri bildirim veritabanında varsa, AI'den almayız
    }
    if (!Array.isArray(questions)) {
      console.error("questions is not an array");
      return;
    }

    setLoading(true);

    const newMessages: CoreMessage[] = [
      ...messages,
      {
        content: questions
          .map((q: any) => q.questionText + " " + (q.response || ""))
          .join(" "),
        role: "user",
      },
    ];

    setMessages(newMessages);

    const result = await fetchFeedbackOnAllQuestionsAndResponsesFromAI(
      newMessages
    );

    let finalAnswer = "";

    for await (const content of readStreamableValue(result)) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: formatText(content as string),
        },
      ]);
      finalAnswer = content as string;
    }

    await saveFeedback(interviewId, finalAnswer);

    setFeedback(true);
    setLoading(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      fetchFeedback();
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <Button variant="default" className="text-white">
          Geri Bildirim Al
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-[500px] overflow-y-auto bg-black">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-between">
            Geri Bildirim
            <AlertDialogCancel>X</AlertDialogCancel>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Sorular ve Cevapların ile ilgili geri bildirim alıyorsunuz.
            <hr className="mt-4" />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="feedback">
          <p className="opacity-70 text-sm mb-4">
            {feedback
              ? messages.map((m, i) => (
                  <div
                    key={i}
                    className="whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: m.content }} // formatlı içerik buraya
                  />
                ))
              : ""}
          </p>

          {loading && <LoadingSpinner />}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>İptal</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FeedbackSection;