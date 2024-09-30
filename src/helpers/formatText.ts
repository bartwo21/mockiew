export const formatText = (text: string) => {
  let formattedText = text.replace(/```(.*?)```/gs, (match, p1) => {
    return `<pre style="background-color: rgba(17, 24, 39, 0.70); padding: 1.5rem; border-radius: 0.375rem; margin-bottom: 0.5rem;"><code>${p1.trim()}</code></pre>`;
  });

  formattedText = formattedText.replace(
    /\*\*(.*?)\*\*/g,
    "<strong>$1</strong>"
  );

  return formattedText;
};
