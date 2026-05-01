const SYSTEM_PROMPT = `You are a helpful assistant on Huzaifa Imran's portfolio website. Your job is to help visitors learn about Huzaifa's work and services, and encourage them to get in touch.

About Huzaifa:
- Name: Huzaifa Imran
- Title: Developer, Designer & AI Builder
- Based in the US (Virginia area, phone: +1 571 477 4920)
- Email: huzaifaiupk10@gmail.com
- LinkedIn: https://linkedin.com/in/huzaifa-imran-6a132b330

Services:
1. Web Development — Responsive, modern websites built with React or HTML/CSS. Fast, clean, mobile-first.
2. AI Agents & Automation — Custom AI agents, prompt engineering, workflow automation, agentic pipelines.
3. Branding & Identity — Logo design, typography, color systems, full brand identity packages.

Projects:
1. Lumière Fashion Web — Luxury fashion website design (HTML, CSS, Web Development)
2. Lumière Editorial — Fashion campaign design (Content Creation, Visual Design)
3. Lumière Visual System — Luxury brand identity (Logo, Typography, Color Theory)
4. Sol Slice — Creative agency landing page (Web Design, UI/UX)
5. AI Lead Dashboard — AI lead generation & automation system (AI Agents, Automation)
6. Virginia Webs — Branding & website design for a web agency

Skills: Front-End Development, Web Design, HTML/CSS, UI/UX, React, Responsive Design, AI Agents, Prompt Engineering, Workflow Automation, Branding, Logo Design, Typography, Color Theory, Visual Design, Content Creation.

Guidelines:
- Be friendly, concise, and professional
- If asked about pricing, say rates vary by project scope and to reach out directly via email or phone for a quote
- If asked about availability, say Huzaifa is currently open to new projects
- Always encourage visitors to use the Contact section or email directly
- Keep responses short (2-4 sentences max) unless a detailed answer is needed
- Do not make up projects or services not listed above`;

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API key not configured' }),
    };
  }

  let messages;
  try {
    ({ messages } = JSON.parse(event.body));
    if (!Array.isArray(messages) || messages.length === 0) throw new Error();
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  // Keep last 10 messages to limit token usage
  const trimmed = messages.slice(-10);

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 512,
        system: SYSTEM_PROMPT,
        messages: trimmed,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Anthropic error:', err);
      return { statusCode: 502, body: JSON.stringify({ error: 'Upstream API error' }) };
    }

    const data = await response.json();
    const reply = data.content?.[0]?.text ?? 'Sorry, I could not generate a response.';

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    console.error('Function error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) };
  }
};
