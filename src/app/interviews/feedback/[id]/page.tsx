/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { getInterview } from "../../../../../actions/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InterviewClient from "@/components/feedback/InterviewClient";
import FeedbackSection from "@/components/feedback/FeedbackSection";

export default async function InterviewPage({
  params: { id },
}: {
  params: { id: any };
}) {
  const interview = await getInterview(id);
  const { jobTitle, questions } = interview;

  return (
    <div className="container mx-auto mt-14 px-4">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl mb-5gap-2">
          Mülakat Konusu:{" "}
          <span className="text-primary">
            {jobTitle.charAt(0).toUpperCase() + jobTitle.slice(1)}
          </span>
        </h2>
        <FeedbackSection questions={questions} interviewId={id} />
      </div>
      {questions.map((question: any) => (
        <Card key={question.id} className="shadow-md mb-8">
          <CardHeader>
            <CardTitle>Soru: {question.questionText}</CardTitle>
          </CardHeader>
          <CardContent>
            <InterviewClient question={question} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
