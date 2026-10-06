function convertMarkdown() {
  const input = document.getElementById('markdown-input')?.value || '';

  
  const lines = input.split('\n');

  const convertedLines = lines.map(line => {
    let processedLine = line;

   
    processedLine = processedLine.replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2">');

   
    processedLine = processedLine.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

   
    processedLine = processedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    processedLine = processedLine.replace(/(.*?)/g, '<strong>$1</strong>');

    
    processedLine = processedLine.replace(/\*(.*?)\*/g, '<em>$1</em>');
    processedLine = processedLine.replace(/_(.*?)_/g, '<em>$1</em>');

    
    if (/^\s*### (.*)$/.test(processedLine)) {
      return processedLine.replace(/^\s*### (.*)$/, '<h3>$1</h3>');
    }
    if (/^\s*## (.*)$/.test(processedLine)) {
      return processedLine.replace(/^\s*## (.*)$/, '<h2>$1</h2>');
    }
    if (/^\s*# (.*)$/.test(processedLine)) {
      return processedLine.replace(/^\s*# (.*)$/, '<h1>$1</h1>');
    }

    // 6. Цитаты (blockquote)
    if (/^\s*> (.*)$/.test(processedLine)) {
      return processedLine.replace(/^\s*> (.*)$/, '<blockquote>$1</blockquote>');
    }

    return processedLine;
  });

  return convertedLines.join('');
}


const markdownInput = document.getElementById('markdown-input');
const htmlOutput = document.getElementById('html-output');
const preview = document.getElementById('preview');

if (markdownInput) {
  markdownInput.addEventListener('input', () => {
    const htmlResult = convertMarkdown();

    if (htmlOutput) {
      htmlOutput.textContent = htmlResult;
    }

    if (preview) {
      preview.innerHTML = htmlResult;
    }
  });
}