// =========================================
//   青 — Chat UI Controller
//   Handles DOM, events, rendering
//   Now powered by Gemini AI
// =========================================

document.addEventListener('DOMContentLoaded', () => {

    // ===== DOM REFERENCES =====
    const landingScreen = document.getElementById('landing-screen');
    const app = document.getElementById('app');
    const messagesContainer = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');
    const suggestionsContainer = document.getElementById('chat-suggestions');
    const apiKeyModal = document.getElementById('api-key-modal');
    const apiKeyInput = document.getElementById('api-key-input');
    const apiKeySubmit = document.getElementById('api-key-submit');
    const apiKeySkip = document.getElementById('api-key-skip');
    
    // New multi-provider DOM references
    const apiProviderSelect = document.getElementById('api-provider-select');
    const apiUrlInput = document.getElementById('api-url-input');
    const apiModelInput = document.getElementById('api-model-input');
    const advancedInputs = document.getElementById('advanced-inputs');
    const modalDesc = document.getElementById('modal-desc');
    const modalHint = document.getElementById('modal-hint');

    let isTyping = false;

    // ===== LANDING SCREEN =====
    landingScreen.addEventListener('click', enterChat);
    document.addEventListener('keydown', (e) => {
        if (!landingScreen.classList.contains('fade-out') && (e.key === 'Enter' || e.key === ' ')) {
            enterChat();
        }
    });

    function enterChat() {
        landingScreen.classList.add('fade-out');
        setTimeout(() => {
            landingScreen.style.display = 'none';

            // Check if API key exists
            if (!Qing.hasApiKey()) {
                showApiKeyModal();
            } else {
                startChat();
            }
        }, 1200);
    }

    // ===== API KEY MODAL =====
    function showApiKeyModal() {
        // Initialize inputs with stored settings
        if (apiProviderSelect) {
            const provider = Qing.getProvider();
            apiProviderSelect.value = provider;
            
            // Prefill stored keys
            apiKeyInput.value = Qing.getApiKey() || '';
            apiUrlInput.value = Qing.getApiUrl() || '';
            apiModelInput.value = Qing.getModel() || '';
            
            // Trigger provider-specific visual layout
            apiProviderSelect.dispatchEvent(new Event('change'));
        }

        apiKeyModal.style.display = 'flex';
        setTimeout(() => {
            apiKeyModal.classList.add('visible');
            apiKeyInput.focus();
        }, 100);
    }

    function hideApiKeyModal() {
        apiKeyModal.classList.remove('visible');
        setTimeout(() => {
            apiKeyModal.style.display = 'none';
        }, 400);
    }

    // Handle provider selection UI updates
    if (apiProviderSelect) {
        apiProviderSelect.addEventListener('change', () => {
            const provider = apiProviderSelect.value;
            
            if (provider === 'gemini') {
                modalDesc.textContent = "青 needs a brain to think. Enter a Google Gemini API key to give him consciousness.";
                modalHint.innerHTML = `Free key → <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">aistudio.google.com/apikey</a>`;
                apiKeyInput.setAttribute('placeholder', 'Paste your Gemini API key here...');
                advancedInputs.style.display = 'none';
            } else if (provider === 'openrouter') {
                modalDesc.textContent = "Awaken 青 using OpenRouter. OpenRouter supports browser-based calls natively (CORS-friendly).";
                modalHint.innerHTML = `Get OpenRouter Key → <a href="https://openrouter.ai/keys" target="_blank" rel="noopener">openrouter.ai/keys</a>`;
                apiKeyInput.setAttribute('placeholder', 'Paste your OpenRouter API key here...');
                
                advancedInputs.style.display = 'flex';
                apiUrlInput.style.display = 'none';
                apiUrlInput.value = 'https://openrouter.ai/api/v1';
                apiModelInput.value = Qing.getModel() || 'google/gemini-2.5-flash';
                apiModelInput.setAttribute('placeholder', 'Model name (e.g. google/gemini-2.5-flash)');
            } else if (provider === 'openai') {
                modalDesc.textContent = "Awaken 青 using OpenAI. Note: OpenAI API calls from a browser may require custom CORS bypass.";
                modalHint.innerHTML = `Get OpenAI Key → <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener">platform.openai.com</a>`;
                apiKeyInput.setAttribute('placeholder', 'Paste your OpenAI API key here...');
                
                advancedInputs.style.display = 'flex';
                apiUrlInput.style.display = 'none';
                apiUrlInput.value = 'https://api.openai.com/v1';
                apiModelInput.value = Qing.getModel() || 'gpt-4o-mini';
                apiModelInput.setAttribute('placeholder', 'Model name (e.g. gpt-4o-mini)');
            } else if (provider === 'deepseek') {
                modalDesc.textContent = "Awaken 青 using DeepSeek. Note: DeepSeek API calls from a browser may require custom CORS bypass.";
                modalHint.innerHTML = `Get DeepSeek Key → <a href="https://platform.deepseek.com" target="_blank" rel="noopener">platform.deepseek.com</a>`;
                apiKeyInput.setAttribute('placeholder', 'Paste your DeepSeek API key here...');
                
                advancedInputs.style.display = 'flex';
                apiUrlInput.style.display = 'none';
                apiUrlInput.value = 'https://api.deepseek.com/v1';
                apiModelInput.value = Qing.getModel() || 'deepseek-chat';
                apiModelInput.setAttribute('placeholder', 'Model name (e.g. deepseek-chat)');
            } else if (provider === 'custom') {
                modalDesc.textContent = "Awaken 青 using any OpenAI-compatible API endpoint (e.g., local Ollama, Groq, Together).";
                modalHint.innerHTML = `Configure custom API endpoint and model name below.`;
                apiKeyInput.setAttribute('placeholder', 'Paste your API key here (leave blank if not required)...');
                
                advancedInputs.style.display = 'flex';
                apiUrlInput.style.display = 'block';
                apiUrlInput.value = Qing.getApiUrl() || 'http://localhost:11434/v1';
                apiModelInput.value = Qing.getModel() || 'llama3';
                apiUrlInput.setAttribute('placeholder', 'API Endpoint (e.g. http://localhost:11434/v1)');
                apiModelInput.setAttribute('placeholder', 'Model Name (e.g. llama3)');
            }
        });
    }

    apiKeySubmit.addEventListener('click', () => {
        const provider = apiProviderSelect ? apiProviderSelect.value : 'gemini';
        const key = apiKeyInput.value.trim();
        const url = apiUrlInput ? apiUrlInput.value.trim() : '';
        const model = apiModelInput ? apiModelInput.value.trim() : '';

        if (provider === 'custom' || key.length > 5) {
            Qing.setProvider(provider);
            Qing.setApiKey(key || 'no-key-required');
            Qing.setApiUrl(url);
            Qing.setModel(model);
            hideApiKeyModal();
            setTimeout(() => startChat(), 500);
        } else {
            apiKeyInput.style.borderColor = 'rgba(200, 100, 100, 0.5)';
            apiKeyInput.setAttribute('placeholder', 'Please enter a valid API key');
            setTimeout(() => {
                apiKeyInput.style.borderColor = '';
                apiKeyInput.setAttribute('placeholder', 'Paste your API key here...');
            }, 2000);
        }
    });

    apiKeyInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            apiKeySubmit.click();
        }
    });

    apiKeySkip.addEventListener('click', () => {
        hideApiKeyModal();
        setTimeout(() => startChat(), 500);
    });

    // ===== START CHAT =====
    function startChat() {
        app.classList.add('visible');
        showWelcome();
    }

    // ===== WELCOME MESSAGE =====
    function showWelcome() {
        const timeGreeting = Qing.getTimeGreeting();
        const hasKey = Qing.hasApiKey();

        const statusText = hasKey
            ? `Welcome, Guest. I am 青, the Land Spirit (地灵) managing this Blessed Land. Master Harrison is cultivating elsewhere. Do you have any questions about his achievements, this website, or his goals? I would be happy to explain.`
            : `Welcome, Guest. I am 青, the Land Spirit (地灵) managing this Blessed Land. I need an LLM API Key to awaken my full consciousness to assist you.`;

        const welcomeHTML = `
            <div class="welcome-message">
                <img src="assets/avatar.png" alt="青" class="welcome-avatar" />
                <h3 class="welcome-title">青 · 分魂</h3>
                <p class="welcome-sub">${statusText}</p>
                ${!hasKey ? '<button class="setup-key-btn" id="setup-key-btn">🔑 Enter API Key</button>' : ''}
            </div>
        `;

        messagesContainer.innerHTML = welcomeHTML;

        // Setup key button listener if present
        const setupKeyBtn = document.getElementById('setup-key-btn');
        if (setupKeyBtn) {
            setupKeyBtn.addEventListener('click', showApiKeyModal);
        }

        // Show initial suggestions after a delay
        setTimeout(() => {
            showSuggestions(Qing.getSuggestions());
        }, 800);
    }

    // ===== SEND MESSAGE =====
    async function handleSend() {
        const text = chatInput.value.trim();
        if (!text || isTyping) return;

        // Render user message
        renderMessage('user', text);
        chatInput.value = '';

        // Show typing indicator
        showTyping();

        try {
            // Generate response from 青's mind (Gemini AI)
            const response = await Qing.generateResponse(text);

            hideTyping();

            if (response.needsKey) {
                renderMessage('qing', response.text);
                showApiKeyModal();
                return;
            }

            renderMessage('qing', response.text);

            // Show follow-up suggestions
            setTimeout(() => {
                showSuggestions(Qing.getSuggestions());
            }, 300);

        } catch (error) {
            hideTyping();
            renderMessage('qing', "Something broke. Try again? 🤔");
            console.error('Chat error:', error);
        }
    }

    // Input events
    sendBtn.addEventListener('click', () => {
        sendBtn.classList.add('ink-ripple');
        setTimeout(() => sendBtn.classList.remove('ink-ripple'), 600);
        handleSend();
    });

    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });

    // ===== RENDER MESSAGE =====
    function renderMessage(role, text) {
        // Remove welcome message if it exists
        const welcome = messagesContainer.querySelector('.welcome-message');
        if (welcome) {
            welcome.style.opacity = '0';
            welcome.style.transform = 'translateY(-10px)';
            setTimeout(() => welcome.remove(), 300);
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${role}`;

        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Process text — convert markdown-like formatting
        const processedText = formatResponse(text);

        if (role === 'qing') {
            messageDiv.innerHTML = `
                <img src="assets/avatar.png" alt="青" class="message-avatar" />
                <div>
                    <div class="message-bubble">${processedText}</div>
                    <div class="message-time">青 · ${timeStr}</div>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div>
                    <div class="message-bubble">${processedText}</div>
                    <div class="message-time" style="text-align:right">${timeStr}</div>
                </div>
            `;
        }

        messagesContainer.appendChild(messageDiv);
        scrollToBottom();
    }

    // ===== FORMAT RESPONSE =====
    function formatResponse(text) {
        // Escape HTML first
        let formatted = escapeHTML(text);

        // Convert **bold** to <strong>
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Convert *italic* to <em>
        formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Convert `code` to <code>
        formatted = formatted.replace(/`(.*?)`/g, '<code style="background:rgba(184,168,154,0.1);padding:0.1em 0.3em;border-radius:3px;font-size:0.9em">$1</code>');

        // Convert newlines to <br>
        formatted = formatted.replace(/\n/g, '<br>');

        return formatted;
    }

    // ===== TYPING INDICATOR =====
    function showTyping() {
        isTyping = true;
        hideSuggestions();

        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <img src="assets/avatar.png" alt="青" class="message-avatar" />
            <div class="typing-dots">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </div>
        `;

        messagesContainer.appendChild(typingDiv);
        scrollToBottom();
    }

    function hideTyping() {
        isTyping = false;
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    // ===== SUGGESTIONS =====
    function showSuggestions(suggestions) {
        suggestionsContainer.innerHTML = '';

        suggestions.forEach((text, i) => {
            const chip = document.createElement('button');
            chip.className = 'suggestion-chip';
            chip.textContent = text;
            chip.style.animationDelay = `${i * 0.08}s`;
            chip.addEventListener('click', () => {
                chatInput.value = text;
                handleSend();
            });
            suggestionsContainer.appendChild(chip);
        });

        setTimeout(() => {
            suggestionsContainer.classList.add('visible');
        }, 100);
    }

    function hideSuggestions() {
        suggestionsContainer.classList.remove('visible');
        setTimeout(() => {
            suggestionsContainer.innerHTML = '';
        }, 400);
    }

    // ===== UTILITIES =====
    function scrollToBottom() {
        requestAnimationFrame(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        });
    }

    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // ===== INK PARTICLE SYSTEM (DISABLED FOR SWORD PATH) =====
    // function createInkParticles() {
    //     const container = document.getElementById('ink-particles');
    //     if (!container) return;
    // ...
    // }
    // createInkParticles();

    // ===== HEADER QUOTE ROTATION =====
    const headerQuote = document.getElementById('header-quote');
    if (headerQuote) {
        const quotes = Qing.quotes;
        let quoteIndex = 0;

        setInterval(() => {
            headerQuote.style.opacity = '0';
            setTimeout(() => {
                quoteIndex = (quoteIndex + 1) % quotes.length;
                headerQuote.textContent = `「${quotes[quoteIndex]}」`;
                headerQuote.style.opacity = '0.6';
            }, 400);
        }, 12000);
    }

    // ===== FOCUS INPUT ON APP VISIBLE =====
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.classList.contains('visible')) {
                setTimeout(() => chatInput.focus(), 500);
            }
        });
    });
    observer.observe(app, { attributes: true, attributeFilter: ['class'] });
});
