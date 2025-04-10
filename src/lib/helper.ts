import bcrypt from "bcryptjs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function saltAndHashPassword(password: any) {
  // Password'un string olmasını sağla
  const passwordStr = String(password);

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(passwordStr, salt);

  return hash;
}

export const formatText = (
  text: string,
  options: {
    asHtml?: boolean;
    stripHtml?: boolean;
    formatCodeBlocks?: boolean;
  } = {}
): string => {
  const {
    asHtml = false,
    stripHtml: shouldStripHtml = false,
    formatCodeBlocks = true,
  } = options;

  if (shouldStripHtml) {
    const tmp = document.createElement("div");
    tmp.innerHTML = text;
    return tmp.textContent || tmp.innerText || "";
  }

  if (asHtml) {
    let formattedText = text;

    formattedText = formattedText.replace(
      /\*\*([^*]+)\*\*/g,
      "<strong>$1</strong>"
    );

    formattedText = formattedText.replace(/\*([^*]+)\*/g, "<em>$1</em>");

    formattedText = formattedText.replace(
      /##\s+([^\n]+)/g,
      '<h2 class="text-xl font-bold my-3">$1</h2>'
    );

    formattedText = formattedText.replace(
      /^#\s+([^\n]+)$/gm,
      '<h1 class="text-2xl font-bold my-4">$1</h1>'
    );

    if (formatCodeBlocks) {
      formattedText = formattedText.replace(
        /```([\s\S]*?)```/g,
        (match, code) => {
          return `<div class="bg-[#0e0e11] p-4 rounded-md my-2 overflow-x-auto"><pre class="text-gray-300"><code>${code.trim()}</code></pre></div>`;
        }
      );

      formattedText = formattedText.replace(
        /`([^`]+)`/g,
        '<code class="bg-gray-800 px-1 rounded text-gray-300">$1</code>'
      );
    }

    formattedText = formattedText.replace(/\n\n/g, '</p><p class="my-2">');
    formattedText = formattedText.replace(/\n/g, "<br>");

    formattedText = formattedText.replace(/^([^#\n]+)$/gm, (match) => {
      if (
        match.trim() &&
        !match.includes("<div") &&
        !match.includes("<p") &&
        !match.includes("<code") &&
        !match.includes("<strong") &&
        !match.includes("<em") &&
        !match.includes("<h1") &&
        !match.includes("<h2")
      ) {
        return `<h3 class="text-md my-3">${match.trim()}</h3>`;
      }
      return match;
    });

    return `<p class="my-2">${formattedText}</p>`;
  }

  return text;
};

export const formatCodeBlock = (code: string): string => {
  if (code.includes("```")) {
    return code.replace(/```([\s\S]*?)```/g, (match, codeContent) => {
      return `<div class="bg-[#0e0e11] p-4 rounded-md my-2 overflow-x-auto"><pre class="text-gray-300"><code>${codeContent.trim()}</code></pre></div>`;
    });
  } else {
    return `<div class="bg-[#0e0e11] p-4 rounded-md my-2 overflow-x-auto"><pre class="text-gray-300"><code>${code.trim()}</code></pre></div>`;
  }
};

export const formatQuestionText = (text: string): string => {
  return formatText(text, { asHtml: true });
};

export const stripHtml = (html: string): string => {
  return formatText(html, { stripHtml: true });
};
