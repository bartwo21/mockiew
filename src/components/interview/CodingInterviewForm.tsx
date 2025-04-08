import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CodeEditor } from "./CodeEditor/CodeEditor";
import { Card, CardContent } from "@/components/ui/card";
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from "./CodeEditor/constants";
import { fetchCodeQuestionFromAI } from "../../../actions/aiActions";
import { readStreamableValue } from "ai/rsc";
import { CoreMessage } from "ai";
import { LoadingSpinner } from "@/helpers/loadingSpinner";
import { formatQuestionText, stripHtml } from "@/lib/helper";
import { saveInterviewAndInterviewQuestions } from "../../../actions/actions";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SaveInterviewButton from "./SaveInterviewButton";

interface CodingInterviewFormProps {
  onBack: () => void;
}

export default function CodingInterviewForm({
  onBack,
}: CodingInterviewFormProps) {
  const { data: session } = useSession();
  const [selectedLanguage, setSelectedLanguage] =
    useState<string>("javascript");
  const [question, setQuestion] = useState<string>("");
  const [rawQuestion, setRawQuestion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [codeAnswer, setCodeAnswer] = useState<string>(
    CODE_SNIPPETS[selectedLanguage as keyof typeof CODE_SNIPPETS]
  );
  const isFetchingRef = useRef<boolean>(false);
  const router = useRouter();

  const handleLanguageSelect = (value: string) => {
    setSelectedLanguage(value);
  };

  const handleCodeChange = (code: string) => {
    setCodeAnswer(code);
  };

  const handleSubmit = async () => {
    if (!session?.user?.email) {
      toast.error("Cevabınızı kaydetmek için giriş yapmalısınız.");
      return;
    }
    setIsSubmitting(true);

    try {
      const cleanQuestion = stripHtml(rawQuestion);

      const result = await saveInterviewAndInterviewQuestions(
        session.user.email,
        `Kod Yazma - ${
          selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)
        }`,
        [
          {
            questionText: cleanQuestion,
            answerText: codeAnswer,
          },
        ]
      );

      if (result.success) {
        toast.success("Cevabınız başarıyla kaydedildi.");
        router.push(
          `/interviews/feedback/${result.interviewId}${
            selectedLanguage ? `?lang=${selectedLanguage}` : ""
          }`
        );
      } else {
        toast.error("Cevabınız kaydedilirken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Cevap kaydedilirken bir hata oluştu:", error);
      toast.error("Cevabınız kaydedilirken bir hata oluştu.");
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchCodeQuestion = async () => {
      if (isFetchingRef.current) return;

      isFetchingRef.current = true;
      setLoading(true);

      try {
        const result = await fetchCodeQuestionFromAI();
        let finalQuestion = "";

        for await (const content of readStreamableValue(result)) {
          setMessages([
            ...messages,
            {
              role: "assistant",
              content: content as string,
            },
          ]);
          finalQuestion = content as string;
        }

        setRawQuestion(finalQuestion);

        const formattedQuestion = formatQuestionText(finalQuestion);
        setQuestion(formattedQuestion);
        setPageLoaded(true);
      } catch (error) {
        console.error("Soru çekilirken bir hata oluştu:", error);
        setPageLoaded(true);
      } finally {
        setLoading(false);
        isFetchingRef.current = false;
      }
    };

    fetchCodeQuestion();
  }, []);

  if (!pageLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-black/50 border border-gray-800 rounded-lg p-8 backdrop-blur-sm shadow-lg">
      <h1 className="text-3xl text-center my-2 mb-7 text-gray-200">
        Kod Yazma Mülakat Sorusu
      </h1>
      <div className="space-y-6">
        <p className="text-gray-300">
          Aşağıdaki soru algoritma ve programlama becerilerinizi ölçmek için
          yapay zeka tarafından oluşturuldu.
        </p>

        <div className="space-y-6">
          <Card className="bg-black/30 border-gray-900">
            <CardContent className="p-6">
              <h2 className="text-lg text-primary">Programlama Sorusu</h2>
              <div className="rounded-md mt-2">
                {loading ? (
                  <div className="flex space-x-2 justify-center items-center dark:invert">
                    <span className="sr-only">Yükleniyor...</span>
                    <div className="h-3 w-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-3 w-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-3 w-3 bg-white rounded-full animate-bounce"></div>
                  </div>
                ) : (
                  <div
                    className="whitespace-pre-wrap text-gray-300"
                    dangerouslySetInnerHTML={{ __html: question }}
                  />
                )}
              </div>
            </CardContent>
          </Card>

          <div className="border border-gray-900 rounded-lg overflow-hidden p-6 relative ">
            <div className="flex justify-between items-center sm:flex-row flex-col">
              <h3 className="text-lg text-primary mb-4">Kod Editörü</h3>
              <div className="flex gap-4 mb-6 w-[175px]">
                <Select
                  onValueChange={handleLanguageSelect}
                  value={selectedLanguage}
                >
                  <SelectTrigger className="w-full bg-black/40 border-gray-900 text-white">
                    <SelectValue placeholder="Programlama dili seçiniz" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-gray-900 text-white">
                    {Object.keys(LANGUAGE_VERSIONS).map((lang) => (
                      <SelectItem
                        key={lang}
                        value={lang}
                        className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer"
                      >
                        {lang}{" "}
                        <span className="text-xs text-gray-500 ml-1">
                          {
                            LANGUAGE_VERSIONS[
                              lang as keyof typeof LANGUAGE_VERSIONS
                            ]
                          }
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <CodeEditor
              language={selectedLanguage}
              onChange={handleCodeChange}
            />
          </div>

          <div className="flex items-center gap-4 mt-6">
            <Button className="w-1/2" variant="outline" onClick={onBack}>
              Geri Dön
            </Button>

            <div className="-mt-5 w-1/2">
              <SaveInterviewButton
                onSave={handleSubmit}
                answered={isSubmitting}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
