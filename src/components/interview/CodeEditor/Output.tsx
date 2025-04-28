import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { executeCode } from "../../../../actions/actions";
import { LoadingSpinner } from "@/helpers/loadingSpinner";

interface OutputProps {
  editorRef: React.RefObject<{
    getValue: () => string;
  }>;
  language: string;
  containerHeight?: number;
}

export const Output: React.FC<OutputProps> = ({
  editorRef,
  language,
  containerHeight,
}) => {
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
    <div className="flex flex-col gap-4 h-full">
      <Button
        className="text-white lg:absolute top-[25px] lg:right-[210px] w-[125px] static"
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
      <div
        className="p-4 bg-zinc-950 rounded-lg relative overflow-hidden pb-20 lg:min-h-[180px] min-h-[100px]"
        style={{
          height: containerHeight
            ? `calc(100vh - ${containerHeight}px - 236px)`
            : "20vh",
        }}
      >
        <span className="text-gray-500 font-mono text-sm border border-gray-800 p-2 pl-3 absolute top-0 left-0 border-t-0 border-l-0">
          Console
        </span>
        <pre className="text-gray-200 font-mono text-sm whitespace-pre-wrap mt-8 overflow-y-auto h-full">
          {output ? (
            <span
              className={`text-gray-300 ${
                isError ? "text-red-500" : ""
              } break-words`}
            >
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
            <span className="text-gray-600 flex items-center justify-center flex-col gap-4">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-10 mx-auto shrink-0 text-neutral-600 dark:text-neutral-400"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM4 5V19H20V5H4ZM12 15H18V17H12V15ZM8.66685 12L5.83842 9.17157L7.25264 7.75736L11.4953 12L7.25264 16.2426L5.83842 14.8284L8.66685 12Z"></path>
              </svg>
              <span className="lg:flex hidden">
                Çıktı için &apos;Kodu Çalıştır&apos; butonuna tıklayınız.
              </span>
            </span>
          )}
        </pre>
      </div>
    </div>
  );
};
