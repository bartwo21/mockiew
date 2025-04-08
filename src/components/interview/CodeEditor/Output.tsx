import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { executeCode } from "../../../../actions/actions";
import { LoadingSpinner } from "@/helpers/loadingSpinner";

interface OutputProps {
  editorRef: React.RefObject<{
    getValue: () => string;
  }>;
  language: string;
}

export const Output: React.FC<OutputProps> = ({ editorRef, language }) => {
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const source = editorRef.current?.getValue();
    if (!source) return;

    try {
      setIsLoading(true);
      const result = await executeCode(source, language);
      setOutput(result.run.output.split("\n"));
      console.log(output);
      if (result.run.code === 1) {
        setIsError(true);
      } else {
        setIsError(false);
      }
    } catch (error) {
      setOutput(
        `Hata: ${
          error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Button
        className="text-white absolute top-[25px] right-[210px] w-[125px]"
        onClick={runCode}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="-ml-2 mt-1 opacity-80">
            <LoadingSpinner />
          </div>
        ) : (
          "Kodu Çalıştır"
        )}
      </Button>
      <div className="p-4 bg-gray-950 rounded-lg h-[75vh]">
        <pre className="text-gray-200 font-mono text-sm whitespace-pre-wrap">
          {output ? (
            <span className={`text-gray-300 ${isError ? "text-red-500" : ""}`}>
              {Array.isArray(output)
                ? output.map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))
                : output}
            </span>
          ) : (
            <span className="text-gray-600">
              Çıktı için &apos;Kodu Çalıştır&apos; butonuna tıklayınız.
            </span>
          )}
        </pre>
      </div>
    </div>
  );
};
