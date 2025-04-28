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
  const [editorHeight, setEditorHeight] = useState("30vh");
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const onMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();

    if (!initialized) {
      const initialValue =
        CODE_SNIPPETS[language as keyof typeof CODE_SNIPPETS];
      setValue(initialValue);
      onChange?.(initialValue);
      setInitialized(true);
    }
  };

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

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newHeight = e.clientY - containerRect.top;

    const minHeight = 150;
    const maxHeight = window.innerHeight - 250;
    const clampedHeight = Math.min(Math.max(newHeight, minHeight), maxHeight);

    setEditorHeight(`${clampedHeight}px`);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div
      className="flex gap-4 flex-col lg:h-[calc(100vh-400px)] h-[calc(100vh-250px)]"
      ref={containerRef}
    >
      <div className="w-full" style={{ height: editorHeight }}>
        <Editor
          height="100%"
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
      </div>
      <div
        className="w-full h-1 bg-gray-900 cursor-row-resize hover:bg-gray-800 transition-colors"
        onMouseDown={handleMouseDown}
      />
      <div className="output-box w-full lg:min-h-[175px] min-h-[200px] flex-1">
        <Output
          editorRef={editorRef}
          language={language}
          containerHeight={parseInt(editorHeight)}
        />
      </div>
    </div>
  );
};
