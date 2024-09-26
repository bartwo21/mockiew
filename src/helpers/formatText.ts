export const formatText = (text: string) => {
  let formattedText = text.replace(/```(.*?)```/gs, (match, p1) => {
    return `<pre class="bg-gray-950 bg-opacity-25 p-2 rounded-md mb-2"><code>${p1.trim()}</code></pre>`;
  });

  formattedText = formattedText.replace(
    /\*\*(.*?)\*\*/g,
    "<strong>$1</strong>"
  );

  return formattedText;
};
