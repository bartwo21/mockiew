import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface InterviewQuestionsProps {
  questions: string[];
  answers: string[];
  onAnswerChange: (index: number, value: string) => void;
  jobTitle: string | null;
}

export default function InterviewQuestions({
  questions,
  answers,
  onAnswerChange,
  jobTitle,
}: InterviewQuestionsProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <h3 className="text-2xl text-left text-primary">
        <span className="text-slate-100">Konu: </span>
        {`${
          (jobTitle ?? "").charAt(0).toUpperCase() +
            (jobTitle ?? "").slice(1) || "Belirtilmedi"
        }`}
      </h3>
      {questions.slice(0, 5).map((question, index) => {
        const title = question.trim();

        return (
          <Card
            key={index}
            className="w-full bg-transparent flex md:flex-row flex-col"
          >
            <CardContent className="md:p-6 px-6 pt-6 pb-0 md:w-1/3 w-full flex items-center justify-start">
              <p className="font-bold">{title}</p>
            </CardContent>
            <CardFooter className="flex flex-col md:w-2/3 w-full p-6">
              <Textarea
                className="my-auto resize-none w-full"
                placeholder="Cevabınızı buraya yazın"
                value={answers[index] || ""}
                onChange={(e) => onAnswerChange(index, e.target.value)}
              />
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
