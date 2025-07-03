import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY, 
  dangerouslyAllowBrowser: true,
  defaultHeaders: {
    "HTTP-Referer": "https://yourdomain.com",
    "X-Title": "Your App Name",
  },
});

async function queryAI(prompt) {
  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-pro-1.5",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });

    const choice = completion.choices?.[0];
    const content = choice?.message?.content;
    const reasoning = choice?.message?.reasoning;
    const finalResponse = content || reasoning || "No response content";
    return finalResponse;
  } catch (error) {
    console.error("API Error:", error);
    return "Error: " + error.message;
  }
}

export default queryAI