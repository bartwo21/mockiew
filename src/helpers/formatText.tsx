import { FaCopy } from "react-icons/fa";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Kopyalama başarısız!", err);
    }
  };

  return (
    <div
      className="relative p-4 rounded-md mb-2"
      style={{
        backgroundColor: "rgba(17, 24, 39, 0.70)",
        padding: "1.5rem",
        borderRadius: "0.375rem",
        marginBottom: "0.5rem",
      }}
    >
      <Button
        variant="outline"
        onClick={handleCopy}
        className="absolute top-2 mr-3"
        style={{ right: "0" }}
        disabled={copied}
      >
        {copied ? "Kopyalandı!" : <FaCopy />}
      </Button>
      <pre className="whitespace-pre-wrap">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
};

export const formatText = (text: string) => {
  const segments = text.split(/(```[\s\S]*?```)/g);

  return segments.map((segment, index) => {
    if (/^```[\s\S]*?```$/.test(segment)) {
      const codeContent = segment.slice(3, -3);
      return <CodeBlock key={index} code={codeContent} />;
    } else {
      const parts = segment.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={index}>
          {parts.map((part, i) => {
            if (/^\*\*.*\*\*$/.test(part)) {
              return <strong key={i}>{part.slice(2, -2)}</strong>;
            } else {
              return <span key={i}>{part}</span>;
            }
          })}
        </span>
      );
    }
  });
};
