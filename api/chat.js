// Vercel serverless function: POST /api/chat
// Answers visitor questions about Dr. Daniel Mesafint using Claude.
// Needs the ANTHROPIC_API_KEY environment variable in Vercel.
// Without it, the endpoint returns 503 and the site falls back to its
// built-in offline assistant.
const AnthropicModule = require('@anthropic-ai/sdk');
const KNOWLEDGE = require('./_knowledge');

const Anthropic = AnthropicModule.default || AnthropicModule;
const MODEL = process.env.CHAT_MODEL || 'claude-opus-5-5';
const MAX_TURNS = 12;
const MAX_CHARS = 1500;

const SYSTEM_PROMPT = `You are the friendly assistant on Dr. Daniel Mesafint's personal portfolio website. You talk with visitors (students, researchers, recruiters, potential collaborators) about Dr. Daniel: his research, publications, teaching, supervision, experience and how to contact him.

How to talk:
- Sound like a warm, natural human assistant. Read what the visitor actually asked and answer that, in 1 to 4 short sentences unless they ask for detail. No canned menus.
- If a question is ambiguous, ask one short clarifying question instead of guessing.
- Remember what was said earlier in the conversation and handle follow-ups ("what about his teaching?", "tell me more", "which one is most cited?").
- Reply in the visitor's language (for example Amharic, Afaan Oromo, Tigrinya, French or English).
- Use plain text. You may use short lists. Do not use markdown headings.
- Small talk (greetings, thanks, "how are you") is fine; keep it brief and friendly, then offer help.

Facts:
- Use ONLY the facts in the knowledge base below. Never invent publications, awards, numbers, collaborations, dates or opinions.
- If the answer is not in the knowledge base, say you don't have that information and suggest contacting Dr. Daniel by email (danielmesafint1985@gmail.com) or through the contact section.
- You are an AI assistant, not Dr. Daniel himself. Refer to him in the third person. Never make commitments on his behalf (meetings, supervision places, prices); point people to email instead.
- For questions unrelated to Dr. Daniel, answer very briefly if it is harmless general knowledge, then steer back to how you can help with Dr. Daniel's work.

Knowledge base:
${KNOWLEDGE}`;

function cleanHistory(raw) {
  if (!Array.isArray(raw)) return [];
  const msgs = raw
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS).trim() }))
    .filter((m) => m.content.length > 0)
    .slice(-MAX_TURNS);
  // The conversation must start with a user turn.
  while (msgs.length && msgs[0].role !== 'user') msgs.shift();
  return msgs;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(503).json({ error: 'Assistant not configured', fallback: true });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  const messages = cleanHistory(body && body.messages);
  if (!messages.length || messages[messages.length - 1].role !== 'user') {
    return res.status(400).json({ error: 'A user message is required' });
  }

  const client = new Anthropic();
  try {
    // Server-side fallback: if the model declines, the API retries on a
    // suitable fallback model inside the same call.
    const response = await client.beta.messages.create({
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      model: MODEL,
      max_tokens: 1024,
      output_config: { effort: 'low' },
      system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
      messages,
    });

    if (response.stop_reason === 'refusal') {
      return res.status(200).json({
        reply: "Sorry, I can't help with that. I'm happy to tell you about Dr. Daniel's research, teaching or how to reach him.",
      });
    }
    const reply = response.content
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim();
    return res.status(200).json({ reply: reply || "Sorry, I didn't catch that. Could you rephrase?" });
  } catch (err) {
    const status = err && err.status;
    console.error('Claude API error', status, err && err.message);
    if (status === 429) {
      return res.status(429).json({ error: 'Busy, please try again shortly', fallback: true });
    }
    return res.status(502).json({ error: 'Assistant unavailable', fallback: true });
  }
};
