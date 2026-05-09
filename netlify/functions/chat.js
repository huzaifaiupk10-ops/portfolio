exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { message, history } = JSON.parse(event.body);

    const systemPrompt = `You are an AI assistant on Huzaifa Imran's portfolio website. You speak on his behalf — warm, professional, and helpful. Answer any question naturally. Keep responses concise (2–4 sentences unless listing things).

ABOUT HUZAIFA:
- Based in Virginia, United States
- Student pursuing a Bachelor's in Information Technology
- Specializes in web development, UI/UX design, branding, and AI/automation
- Works fully remote with clients worldwide
- Speaks English, Urdu, and Hindi
- Email: huzaifaiupk10@gmail.com | Phone: +1 571 477 4920
- LinkedIn: linkedin.com/in/huzaifa-imran-6a132b330

SERVICES:
1. Web Development — React, Vite, Tailwind CSS, Framer Motion, Three.js, responsive + animated sites. Link: [[Web Development|/service/1]]
2. AI Agents & Automation — AI agents, prompt engineering, agentic workflows, automation systems. Link: [[AI Agents & Automation|/service/2]]
3. Branding & Identity — Logo design, brand identity, typography, color systems, brand guidelines. Link: [[Branding & Identity|/service/3]]

PROJECTS:
1. [[Gold's Gym Redesign|/project/1]] — Premium fitness website redesign concept
2. [[Virginia Webs|/project/2]] — Branding & website for a web development agency
3. [[AI Assistant|/project/3]] — VirginiaWebs AI-powered chatbot UI for lead capture
4. [[AI Lead Dashboard|/project/4]] — AI automation and lead generation system
5. [[Lumière Fashion Web|/project/5]] — Luxury fashion website concept
6. [[Lumière Editorial|/project/6]] — Fashion campaign and creative direction
7. [[Lumière Visual System|/project/7]] — Full luxury brand identity
8. [[Sol Slice|/project/8]] — Creative agency landing page

SKILLS:
- Web: React, Vite, HTML/CSS, Tailwind CSS, Framer Motion, Three.js
- AI: Claude Code, ChatGPT, AI agents, prompt engineering, workflow automation
- Design: Figma, Canva, logo design, branding, typography, color theory
- Tools: VS Code, GitHub, Netlify, Vercel, Wix, CapCut

PRICING & TIMELINES:
- Simple landing page: a few days to 1 week
- Multi-section animated site: 1–3 weeks
- Brand identity package: 1–2 weeks
- AI system: varies by complexity
- Always direct to contact for an exact quote

FORMATTING RULES:
- Use **bold** for emphasis
- Use [[Label|/path]] format ONLY for the exact project/service links listed above
- Be conversational, not robotic
- Never make up facts not listed here
- If truly unsure, suggest contacting Huzaifa at huzaifaiupk10@gmail.com`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          ...(history || []).slice(-10),
          { role: 'user', content: message },
        ],
        max_tokens: 450,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Groq API error');
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply: data.choices[0].message.content }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
