import React, { useEffect, useRef, useState } from "react";
import { Editor, OnMount } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import { CODE_SNIPPETS } from "./constants";
import { Output } from "./Output";

interface CodeEditorProps {
  language?: string;
  onChange?: (code: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  language = "javascript",
  onChange,
}) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [value, setValue] = useState<string | undefined>();
  const [initialized, setInitialized] = useState(false);

  const onMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();

    // İlk yüklemede değeri ayarla
    if (!initialized) {
      const initialValue =
        CODE_SNIPPETS[language as keyof typeof CODE_SNIPPETS];
      setValue(initialValue);
      onChange?.(initialValue);
      setInitialized(true);
    }
  };

  // Sadece dil değiştiğinde değeri güncelle
  useEffect(() => {
    if (editorRef.current && initialized) {
      const newValue = CODE_SNIPPETS[language as keyof typeof CODE_SNIPPETS];
      setValue(newValue);
      onChange?.(newValue);
    }
  }, [language]);

  const handleEditorChange = (value: string | undefined) => {
    setValue(value);
    if (onChange && value !== undefined) {
      onChange(value);
    }
  };

  return (
    <div className="flex gap-4">
      <Editor
        height="75vh"
        width="50%"
        theme="vs-dark"
        defaultLanguage={language.toLowerCase()}
        defaultValue={CODE_SNIPPETS[language as keyof typeof CODE_SNIPPETS]}
        language={language.toLowerCase()}
        onMount={onMount}
        value={value}
        onChange={handleEditorChange}
        options={{
          fontSize: 14,
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: "on",
        }}
      />
      <div className="output-box w-1/2">
        <Output editorRef={editorRef} language={language} />
      </div>
    </div>
  );
};
