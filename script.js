document.getElementById('shortenForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const url = document.getElementById('urlInput').value;
  const resultElement = document.getElementById('result');
  
  // Clear previous result
  resultElement.textContent = '';

  try {
    const response = await fetch('https://iec.deno.dev/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error('Failed to shorten the URL');
    }

    const result = await response.json();
    const shortenedUrl = `https://iec.deno.dev/${result.shortId}`;
    resultElement.innerHTML = `Shortened URL: <a href="${shortenedUrl}" target="_blank">${shortenedUrl}</a>`;
  } catch (error) {
    resultElement.textContent = 'Error shortening URL. Please try again.';
  }
});
