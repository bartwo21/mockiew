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
      <h3 className="text-2xl text-center text-primary">
        {`${
          (jobTitle ?? "").charAt(0).toUpperCase() +
            (jobTitle ?? "").slice(1) || "Belirtilmedi"
        }`}
      </h3>
      {questions.slice(0, 5).map((question, index) => {
        const title = question.trim();

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
                onChange={(e) => onAnswerChange(index, e.target.value)}
              />
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
