import React from "react";
import { getInterview } from "../../../../../actions/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InterviewClient from "@/components/feedback/InterviewClient";
import { Button } from "@/components/ui/button";

export default async function InterviewPage({
  params: { id },
}: {
  params: { id: any };
}) {
  const interview = await getInterview(id);
  const { jobTitle, questions, feedback } = interview;

  return (
    <div className="container mx-auto mt-14 px-4">
      <h2 className="text-2xl mb-5">
        Mülakat Konusu:{" "}
        <span className="text-primary">
          {jobTitle.charAt(0).toUpperCase() + jobTitle.slice(1)}
        </span>
      </h2>

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

      <div className="feedback">
        <h3 className="text-xl font-semibold mb-2">
          Sorular ve Cevapların ile ilgili geri bildirim
        </h3>
        <p className="opacity-70 text-sm">
          {feedback ? feedback : "Henüz geri bildirim eklenmedi."}
        </p>
        <Button className="mt-4 text-white">Geri Bildirim Ekle</Button>
      </div>
    </div>
  );
}

//  @TODO: tüm cevapları görüntüledikten sonra feedback ekleme butonu gösterilsin
