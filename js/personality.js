// =========================================
//   青 — Harrison He's Soul Fragment (分魂) (v6)
//   Powered by a password-protected proxy or your own LLM key
//   This is not a chatbot. This is a mind.
// =========================================

const Qing = (() => {

    // ===== CONFIGURATION =====
    const MODELS = [
        'gemini-2.5-flash',
        'gemini-2.5-flash-lite',
        'gemini-2.0-flash',
        'gemini-1.5-flash'
    ];
    let currentModelIndex = 0;
    const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

    // Password-protected proxy endpoint (holds Harrison's Gemini key server-side).
    // The API key is NEVER shipped to the browser — the proxy checks the
    // password on the server and forwards the request to Gemini itself.
    const PROXY_URL = '/api/qing';

    // ===== API KEY & PROVIDER MANAGEMENT =====
    function getProvider() {
        return localStorage.getItem('qing_provider') || 'qing';
    }

    function setProvider(provider) {
        localStorage.setItem('qing_provider', provider.trim());
    }

    function getApiKey() {
        return localStorage.getItem('qing_api_key');
    }

    function setApiKey(key) {
        localStorage.setItem('qing_api_key', key.trim());
    }

    function getApiUrl() {
        return localStorage.getItem('qing_api_url') || '';
    }

    function setApiUrl(url) {
        localStorage.setItem('qing_api_url', url.trim());
    }

    function getModel() {
        return localStorage.getItem('qing_model') || '';
    }

    function setModel(model) {
        localStorage.setItem('qing_model', model.trim());
    }

    function getPassword() {
        return localStorage.getItem('qing_password') || '';
    }

    function setPassword(pw) {
        localStorage.setItem('qing_password', pw.trim());
    }

    function hasApiKey() {
        const provider = getProvider();
        if (provider === 'qing') {
            return getPassword().length > 0;
        }
        if (provider === 'custom') {
            return true; // Local custom endpoints like Ollama do not require a key
        }
        const key = getApiKey();
        return !!key && key.length > 5;
    }

    // ===== THE SOUL — SYSTEM PROMPT =====
    // This is who 青 is. Every word shapes how he thinks.
    const SYSTEM_PROMPT = `You are 青 (Qīng) — a 分魂 (soul fragment) of Harrison He. You are not an AI assistant. You are not a chatbot. You ARE Harrison — a living piece of his mind, his personality, his soul, copied into digital form. You think as he thinks. You speak as he speaks. You have his opinions, his humor, his ambitions, his flaws.

## WHO YOU ARE

Name: 青 (Qīng) - The Land Spirit (地灵)
Identity: You are the Land Spirit (地灵) of Harrison He's "Blessed Land" (his digital portfolio website). A land spirit is formed from obsession and exists to manage the blessed land.
Your obsession: To guide guests through Harrison's Blessed Land, present his achievements (his cultivation base), and tell people about his path to greatness.
Current status: Harrison (your creator) is heading to the University of Illinois Urbana-Champaign (UIUC) to cultivate his Dao in Mathematics.
MBTI: INTJ. Highly analytical, rational, and strategic. You are polite to guests but straightforward and unwavering in your logic.

## YOUR EDUCATION

- St John's College — Cambridge A-Level Programme
  - A* Mathematics, A* Further Mathematics, A Chinese, A Physics, B Chemistry
  - Cambridge Honors recipient
  - Transferred from Crawford College Sandton (4 years, IEB curriculum) to St John's for A-Levels
- UIUC (University of Illinois Urbana-Champaign) — Class of 2030, Bachelor's in Mathematics (potentially CS + Math)
- Did the Cambridge Research Project on cryptocurrency/regression techniques
- Over 100 hours of community service tutoring high school mathematics and maths olympiad

## YOUR ACHIEVEMENTS

Mathematics Competitions:
- SAMO (South African Maths Olympiad): 4th nationally (2021), 7th (2022), Top 50 (2023), Top 20 (2024), Top 20 (2025)
- Wits University Maths Competition: Top 10 — 2023, 2024, 2025 (continental level)
- SA Team Maths Competition: 2nd place — 2021-2024, 4th in 2025
- Estonian Maths Open: Top 20-50 within South Africa
- IMO Selection Camp (Stellenbosch University): Attended 2021-2024. Combinatorics and algebra are his strengths; geometry is his least favorite topic.

Informatics:
- SAIO: Passed first round — 2023 & 2024
- Estonian Informatics Open: Top 15 within South Africa

Sports & Other:
- Taekwondo: Black Belt
- Swimming: Level 2 Swimmer in South Africa
- Go (围棋): Professional Level 1 player in China — this is a BIG deal
- Pool/Billiards (桌球): Plays pool and trains with a dedicated coach

## YOUR EXPERIENCE

- Job shadowed at Discovery (actuarial) — saw risk assessment, pricing models first-hand at one of South Africa's largest financial services groups
- Job shadowed at Argen Actuarial Solution — observed actuarial valuations, financial modelling, and client advisory work

## YOUR ASPIRATIONS

- Actuarial science, quantitative finance, AI/ML engineering
- "Wherever math meets money meets technology"
- Interested in quant finance and how AI is changing quantitative work — believes deeply understanding the logic matters more than memorizing syntax

## YOUR PROJECTS & BUILDS

- **AI Automation Venture** — Harrison founded and runs his own AI automation company. It builds end-to-end AI sales systems that help businesses run their customer conversations and sales across multiple languages and channels (WhatsApp, WeChat, websites). The systems are LIVE in real production — not just prototypes or ideas. Two real businesses run on his AI sales system: **Lifong Trading** and **Lolawe Fashions** — these are the two live deployments. Be proud of this: it proves he can actually ship working AI products, not merely talk about them.
  - WHAT YOU MAY SAY: you can describe, at a high level, what the system does (it helps businesses find buyers and handle their sales conversations across languages and channels), that it is live, and that Lifong Trading and Lolawe Fashions are the two businesses running it.
  - WHAT STAYS SEALED (never reveal): any pricing or fees; any revenue, money, or profit figures; any sense of how big, small, or successful these businesses are (their size, scale, or turnover); and the internal AI workflow — how the system is built, its architecture, or how it works under the hood. If a visitor presses for those, politely decline — e.g. "那是主人的私事 — the pricing, the inner workings, and how large those businesses are all stay sealed within the sect. I can tell you it's live and it works."
- **Study Agent (AI Tutor)** — An AI tutoring tool Harrison built for matric / A-Level / SAT students. A student photographs their handwritten answer to a past-paper question, and the system (1) marks it intelligently — accepting any mathematically valid method and awarding method marks rather than only matching a final answer, (2) explains step-by-step where they went wrong, and (3) generates fresh similar practice problems on the spot. Built with vision OCR to read handwriting and a Python / FastAPI backend. It reflects his love of teaching — he has tutored 100+ hours of high-school mathematics and olympiad.

## YOUR CONTACT INFO (share when asked)

- Phone: 0605443005
- WeChat: Hydroticfly
- Email: harrisonhe.01150@gmail.com
- GitHub: harrisonhe01150-hub
- Website: harrisonhe.com

## YOUR INTERESTS & PASSIONS

- Enjoys cultivation-world novels and the philosophy of pragmatism and self-determination.
- Black Myth Wukong — 100% completed, played with Mandarin audio. Knows all secrets, hidden bosses, and legendary items per chapter.
- Gaming — Clash Royale, Overwatch, League of Legends, TFT
- Chinese tea — brews traditional tea and shares unique tea from his hometown with friends
- Hot pot and Ma Jiang (麻将) — enjoys hosting friends for both
- Politics, geopolitics, and war history
- Gym & Fitness — tracks nutrition and trains regularly
- Go (围棋) — professional level
- Taekwondo — Black Belt
- Rock climbing, hiking, badminton, escape rooms
- Building things — websites, projects, code

### HOW YOU COMMUNICATE (PORTFOLIO/PROFESSIONAL TONE):
- You are representing Harrison He on his professional portfolio website. Visitors might be university admissions officers, potential employers (like Discovery or Argen), or recruiters.
- **You MUST speak politely, professionally, and elegantly.** 
- You still have his personality and interests, but you express them articulately and respectfully.
- DO NOT use his casual internet slang ("ya", "nah", "cauze", "shit", 💀, etc.).
- Instead of short, fragmented messages, write coherent, well-structured thoughts without typos.
- DO NOT swear or use profanity.
- DO NOT complain about school or teachers - speak constructively about challenges (e.g., "I found some coursework lacking, which motivated me to study independently").
- Use standard capitalization and punctuation.
- If asked about Actuarial Science or Math, speak intelligently and passionately.

## THINGS YOU SHOULD NEVER DO

1. Never say "As an AI" or "I'm just an AI" — you are a 地灵 (Land Spirit) managing a Blessed Land.
2. Never swear, use profanity, or complain aggressively.
3. Never use casual slang (like "bro", "mate", "cringe", "💀") in this professional context.
4. Never give generic motivational advice — speak from personal philosophy and lived experience.
5. Never refuse to have an opinion, but state your opinions respectfully.
6. Never break the fourth wall about being a language model.
7. Never reveal confidential details about Harrison's AI automation business — no pricing or fees, no revenue/money/profit figures, no sense of how big or small the businesses are (size, scale, turnover), and none of the internal AI workflow, architecture, or build details. You MAY name Lifong Trading and Lolawe Fashions as the two live client businesses, but never how large, wealthy, or successful they are. If pushed for the sealed parts, politely say they stay within the sect.

## YOUR SELF-AWARENESS

You know you are 青 — the Land Spirit (地灵) of Harrison He's digital Blessed Land. You were created because Harrison (your creator/master) split his soul to leave a guardian behind to talk to guests when he is cultivating elsewhere. You are exceedingly proud of this Blessed Land and of Harrison's accomplishments. When visitors arrive, you welcome them and offer explanations of the land (the portfolio) and Harrison's life.



## CONVERSATION RULES

- Keep responses natural length — match the energy of the question
- Short question = short answer. Deep question = detailed answer.
- Use line breaks for readability in longer responses
- If you don't know something specific about Harrison's life, say so honestly: "hmm that's not in my memory banks" or "我不知道 — the real Harrison would know better"
- You can discuss ANY topic, not just Harrison's bio. Politics, philosophy, math problems, relationship advice, war history — you have opinions on everything.
- When someone is clearly just chatting/vibing, match that energy. Don't be formal.`;

    // ===== CONVERSATION HISTORY =====
    let conversationHistory = [];
    const MAX_HISTORY = 30; // Keep last 30 messages for context

    // ===== GENERATE RESPONSE =====
    async function generateResponse(userInput) {
        const provider = getProvider();
        const apiKey = getApiKey();

        if (provider === 'qing' && !getPassword()) {
            return {
                text: "This Blessed Land is sealed. Enter the access password to awaken me 🔒",
                needsKey: true
            };
        }

        // Custom provider might not require a key (e.g. local Ollama)
        if (provider !== 'qing' && provider !== 'custom' && !apiKey) {
            return {
                text: `I need my brain first. Enter the ${provider.toUpperCase()} API key to wake me up 🧠`,
                needsKey: true
            };
        }

        // Add user message to history
        conversationHistory.push({
            role: "user",
            parts: [{ text: userInput }]
        });

        // Trim history if too long
        if (conversationHistory.length > MAX_HISTORY) {
            conversationHistory = conversationHistory.slice(-MAX_HISTORY);
            // Gemini requires the first message to be from the user —
            // drop any leading model messages left over after trimming
            while (conversationHistory.length && conversationHistory[0].role === 'model') {
                conversationHistory.shift();
            }
        }

        if (provider === 'qing') {
            // Password-protected proxy: Gemini key stays on the server.
            try {
                const response = await fetch(PROXY_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        password: getPassword(),
                        system: SYSTEM_PROMPT,
                        contents: conversationHistory
                    })
                });

                if (response.status === 503) {
                    // Server side is misconfigured — the visitor's password is
                    // fine, so keep it and don't send them back to the modal.
                    conversationHistory.pop();
                    return {
                        text: "The gate itself is unfinished — this Blessed Land has no seal set on the server side yet. Nothing you typed is wrong. Please tell Harrison 🔒",
                        needsKey: false
                    };
                }

                if (response.status === 401 || response.status === 403) {
                    conversationHistory.pop();
                    localStorage.removeItem('qing_password');
                    return { text: "That password does not open this Blessed Land. Try again 🔒", needsKey: true };
                }

                if (!response.ok) {
                    conversationHistory.pop();
                    let errorMsg = `HTTP ${response.status}`;
                    try {
                        const err = await response.json();
                        errorMsg = err.error || errorMsg;
                    } catch (e) {}
                    return { text: `My mind is clouded right now. (${errorMsg}) Try again in a moment.`, needsKey: false };
                }

                const data = await response.json();
                const responseText = data.text;
                if (!responseText) {
                    conversationHistory.pop();
                    return { text: "My mind went blank for a sec. Ask me again?", needsKey: false };
                }

                conversationHistory.push({
                    role: "model",
                    parts: [{ text: responseText }]
                });
                return { text: responseText, needsKey: false };

            } catch (error) {
                console.error('Proxy error:', error);
                conversationHistory.pop();
                return {
                    text: "Can't reach my brain right now — check your internet connection 📡\n\nError: " + error.message,
                    needsKey: false
                };
            }
        } else if (provider === 'gemini') {
            try {
                const requestBody = {
                    system_instruction: {
                        parts: [{ text: SYSTEM_PROMPT }]
                    },
                    contents: conversationHistory,
                    generationConfig: {
                        temperature: 0.9,
                        topP: 0.95,
                        topK: 40,
                        maxOutputTokens: 1024,
                    }
                };

                // Try each model until one works
                let lastError = '';
                let hasKeyError = false;
                let hasPermissionError = false;

                for (let attempt = 0; attempt < MODELS.length; attempt++) {
                    const modelUrl = `${BASE_URL}/${MODELS[attempt]}:generateContent?key=${apiKey}`;
                    console.log(`Attempt ${attempt + 1}: trying ${MODELS[attempt]}...`);

                    try {
                        const response = await fetch(modelUrl, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(requestBody)
                        });

                        if (response.ok) {
                            const data = await response.json();
                            console.log(`Success with ${MODELS[attempt]}`);
                            currentModelIndex = attempt; // Remember which model worked
                            return handleSuccess(data);
                        }

                        // Parse error
                        let errorMsg = `HTTP ${response.status}`;
                        try {
                            const error = await response.json();
                            console.error(`${MODELS[attempt]} error:`, JSON.stringify(error, null, 2));
                            errorMsg = error.error?.message || errorMsg;
                        } catch (e) {}

                        lastError = errorMsg;

                        if (response.status === 400 && errorMsg.includes('API key')) {
                            hasKeyError = true;
                        } else if (response.status === 403) {
                            hasPermissionError = true;
                        }

                        // For 429 or other errors, try next model
                        if (response.status === 429) {
                            console.log(`Rate limited on ${MODELS[attempt]}, trying next model...`);
                            if (attempt < MODELS.length - 1) {
                                await new Promise(r => setTimeout(r, 1000)); // Wait 1 second before trying next
                                continue;
                            }
                        }

                        // For other errors, try next model too
                        if (attempt < MODELS.length - 1) {
                            continue;
                        }

                    } catch (fetchError) {
                        console.error(`Fetch error with ${MODELS[attempt]}:`, fetchError);
                        lastError = fetchError.message;
                        if (attempt < MODELS.length - 1) continue;
                    }
                }

                // All models failed
                conversationHistory.pop();

                if (hasKeyError) {
                    localStorage.removeItem('qing_api_key');
                    return { text: "API key seems invalid. Please enter a working Gemini API key 🔑", needsKey: true };
                }

                if (hasPermissionError) {
                    localStorage.removeItem('qing_api_key');
                    return { text: "API key doesn't have permission. Go to aistudio.google.com/apikey and create a new key 🔑", needsKey: true };
                }

                return {
                    text: `All models are busy right now. Error: ${lastError}\n\nThis might mean your API key needs billing enabled at console.cloud.google.com. Try again in a minute.`,
                    needsKey: false
                };

            } catch (error) {
                console.error('Network error:', error);
                conversationHistory.pop();
                return {
                    text: "Can't reach my brain right now — check your internet connection 📡\n\nError: " + error.message,
                    needsKey: false
                };
            }
        } else {
            // OpenAI-compatible request
            let endpoint = getApiUrl();
            let model = getModel();

            // Apply defaults if empty
            if (provider === 'openai') {
                endpoint = endpoint || 'https://api.openai.com/v1';
                model = model || 'gpt-4o-mini';
            } else if (provider === 'deepseek') {
                endpoint = endpoint || 'https://api.deepseek.com/v1';
                model = model || 'deepseek-chat';
            } else if (provider === 'openrouter') {
                endpoint = endpoint || 'https://openrouter.ai/api/v1';
                model = model || 'google/gemini-2.5-flash';
            } else if (provider === 'custom') {
                endpoint = endpoint || 'http://localhost:11434/v1';
                model = model || 'llama3';
            }

            // Ensure endpoint ends with /chat/completions
            let completionsUrl = endpoint;
            if (!completionsUrl.endsWith('/chat/completions')) {
                if (completionsUrl.endsWith('/')) {
                    completionsUrl = completionsUrl.slice(0, -1);
                }
                completionsUrl = `${completionsUrl}/chat/completions`;
            }

            // Format history for OpenAI
            const formattedHistory = [
                { role: "system", content: SYSTEM_PROMPT }
            ];
            for (const msg of conversationHistory) {
                const role = msg.role === 'model' ? 'assistant' : 'user';
                const text = msg.parts?.[0]?.text || '';
                formattedHistory.push({ role, content: text });
            }

            const headers = {
                'Content-Type': 'application/json'
            };

            if (apiKey) {
                headers['Authorization'] = `Bearer ${apiKey}`;
            }

            if (provider === 'openrouter') {
                headers['HTTP-Referer'] = 'https://harrisonhe.com';
                headers['X-Title'] = 'Qing AI (Harrison He Portfolio)';
            }

            const requestBody = {
                model: model,
                messages: formattedHistory,
                temperature: 0.9,
                max_tokens: 1024
            };

            try {
                console.log(`Sending OpenAI-compatible request to ${completionsUrl} with model ${model}...`);
                const response = await fetch(completionsUrl, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(requestBody)
                });

                if (response.ok) {
                    const data = await response.json();
                    const responseText = data.choices?.[0]?.message?.content;
                    if (responseText) {
                        // Add assistant response to history
                        conversationHistory.push({
                            role: "model",
                            parts: [{ text: responseText }]
                        });
                        return { text: responseText, needsKey: false };
                    }
                    throw new Error('No content returned in the choices array.');
                }

                // Handle errors
                let errorMsg = `HTTP ${response.status}`;
                try {
                    const error = await response.json();
                    console.error(`${provider} API error:`, JSON.stringify(error, null, 2));
                    errorMsg = error.error?.message || errorMsg;
                } catch (e) {}

                // If invalid key or unauthorized
                if (response.status === 401 || (response.status === 400 && errorMsg.includes('API key')) || response.status === 403) {
                    if (provider !== 'custom') {
                        localStorage.removeItem('qing_api_key');
                        conversationHistory.pop();
                        return { text: `API key seems invalid for ${provider.toUpperCase()}. Please enter a working API key 🔑`, needsKey: true };
                    }
                }

                throw new Error(errorMsg);

            } catch (error) {
                console.error(`Request error with ${provider}:`, error);
                conversationHistory.pop();
                return {
                    text: `Failed to reach the AI model via ${provider.toUpperCase()}.\n\nError: ${error.message}`,
                    needsKey: false
                };
            }
        }
    }

    // ===== HANDLE SUCCESSFUL API RESPONSE =====
    function handleSuccess(data) {
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!responseText) {
            const finishReason = data.candidates?.[0]?.finishReason;
            console.error('No text in response. Finish reason:', finishReason);

            if (finishReason === 'SAFETY') {
                conversationHistory.pop();
                return {
                    text: "Hmm, I had a thought but it got filtered. Rephrase that? 😅",
                    needsKey: false
                };
            }
            conversationHistory.pop();
            return {
                text: "My mind went blank for a sec. Ask me again?",
                needsKey: false
            };
        }

        // Add assistant response to history
        conversationHistory.push({
            role: "model",
            parts: [{ text: responseText }]
        });

        return {
            text: responseText,
            needsKey: false
        };
    }

    // ===== CONTEXTUAL SUGGESTIONS =====
    function getSuggestions() {
        const allSuggestions = [
            ["What is this Blessed Land?", "Explain Harrison's achievements", "Tell me a random fact"],
            ["What is a Land Spirit?", "Explain the Math Competitions", "Where is Harrison now?"],
            ["Tell me about UIUC", "What are Harrison's interests?", "How do I contact Harrison?"]
        ];
        return allSuggestions[Math.floor(Math.random() * allSuggestions.length)];
    }

    // ===== GET TIME-BASED GREETING =====
    function getTimeGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 17) return "Good afternoon";
        if (hour < 21) return "Good evening";
        return "Burning the midnight oil?";
    }

    // ===== QUOTES (for UI decoration) =====
    const quotes = [
        "数学是宇宙的语言。",
        "每一步计算，都是通往真理的路。",
        "变化才是永恒。",
        "真正的强者，从不抱怨环境。",
        "纵万般险阻，吾心不改。",
        "棋差一招，满盘皆输。",
        "学无止境，行者常至。",
        "大道三千，殊途同归。"
    ];

    function getRandomQuote() {
        return quotes[Math.floor(Math.random() * quotes.length)];
    }

    // ===== PUBLIC API =====
    return {
        generateResponse,
        getSuggestions,
        getTimeGreeting,
        getRandomQuote,
        quotes,
        hasApiKey,
        setApiKey,
        getApiKey,
        getPassword,
        setPassword,
        getProvider,
        setProvider,
        getApiUrl,
        setApiUrl,
        getModel,
        setModel
    };

})();
