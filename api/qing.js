// =========================================
//   青 — Password-protected Gemini proxy
//   Deploy target: Vercel serverless function (/api/qing)
//
//   Required environment variables (set in Vercel dashboard):
//     QING_PASSWORD   — the password visitors must enter
//     GEMINI_API_KEY  — your Gemini API key (NEVER exposed to the browser)
// =========================================

const MODELS = [
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite',
    'gemini-2.0-flash',
    'gemini-1.5-flash'
];

const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

// Very simple in-memory rate limit (best-effort; resets on cold start)
const hits = new Map();
const WINDOW_MS = 60 * 1000;   // 1 minute
const MAX_PER_WINDOW = 15;     // 15 requests/minute per IP

function rateLimited(ip) {
    const now = Date.now();
    const entry = hits.get(ip) || { count: 0, start: now };
    if (now - entry.start > WINDOW_MS) {
        entry.count = 0;
        entry.start = now;
    }
    entry.count++;
    hits.set(ip, entry);
    return entry.count > MAX_PER_WINDOW;
}

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { password, system, contents } = req.body || {};

    // --- Password check (server-side, so the key never leaves the server) ---
    if (!process.env.QING_PASSWORD || password !== process.env.QING_PASSWORD) {
        return res.status(401).json({ error: 'Invalid password' });
    }

    if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: 'Server is missing GEMINI_API_KEY' });
    }

    if (!Array.isArray(contents) || contents.length === 0) {
        return res.status(400).json({ error: 'Missing conversation contents' });
    }

    // --- Rate limit ---
    const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
    if (rateLimited(ip)) {
        return res.status(429).json({ error: 'Too many requests — slow down a little' });
    }

    // --- Cap payload size to prevent abuse ---
    const totalChars = JSON.stringify(contents).length;
    if (totalChars > 60000) {
        return res.status(400).json({ error: 'Conversation too long' });
    }

    const requestBody = {
        system_instruction: { parts: [{ text: String(system || '').slice(0, 20000) }] },
        contents: contents,
        generationConfig: {
            temperature: 0.9,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 1024
        }
    };

    // --- Try each model until one works ---
    let lastError = 'Unknown error';
    for (const model of MODELS) {
        try {
            const r = await fetch(
                `${BASE_URL}/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody)
                }
            );

            if (r.ok) {
                const data = await r.json();
                const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
                if (text) {
                    return res.status(200).json({ text });
                }
                lastError = 'Empty response from model';
                continue;
            }

            lastError = `Gemini HTTP ${r.status}`;
            // 429 → try the next model
        } catch (e) {
            lastError = e.message;
        }
    }

    return res.status(502).json({ error: lastError });
};
