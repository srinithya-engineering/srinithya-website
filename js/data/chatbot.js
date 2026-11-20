/**
 * SEPL In-Site Chatbot
 * 
 * This script creates a floating chatbot widget that allows users to interact
 * with the website and search for products using the window.productData object.
 * 
 * Usage: Include this script in your HTML files after the product_data.js script.
 * <script src="js/data/product_data.js"></script>
 * <script src="js/data/chatbot.js"></script>
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Configuration matching project colors
    const config = {
        colors: {
            primary: '#1e3a8a',   // Dark Blue
            secondary: '#d97706', // Amber/Orange
            white: '#ffffff',
            gray: '#f3f4f6',
            text: '#1f2937'
        },
        companyName: "SEPL Assistant"
    };

    // Determine root path for assets
    const rootPath = (window.location.pathname.includes('/Product_details/') || window.location.pathname.includes('/Service_details/')) ? '../' : '';

    // 1. Inject CSS Styles
    const styles = `
        #sepl-chatbot-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }

        #sepl-chatbot-window {
            display: none;
            width: 350px;
            height: 500px;
            background-color: ${config.colors.white};
            border-radius: 12px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            flex-direction: column;
            overflow: hidden;
            position: fixed;
            bottom: 20px;
            right: 20px;
            border: 1px solid #e5e7eb;
            animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        #sepl-chatbot-header {
            background-color: ${config.colors.primary};
            color: ${config.colors.white};
            padding: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 600;
        }
        #sepl-chatbot-messages {
            flex: 1;
            padding: 16px;
            overflow-y: auto;
            background-color: ${config.colors.gray};
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .sepl-message {
            max-width: 85%;
            padding: 10px 14px;
            border-radius: 12px;
            font-size: 14px;
            line-height: 1.5;
            word-wrap: break-word;
        }
        .sepl-message.bot {
            background-color: ${config.colors.white};
            color: ${config.colors.text};
            align-self: flex-start;
            border-bottom-left-radius: 2px;
            border: 1px solid #e5e7eb;
        }
        .sepl-message.user {
            background-color: ${config.colors.primary};
            color: ${config.colors.white};
            align-self: flex-end;
            border-bottom-right-radius: 2px;
        }
        #sepl-chatbot-input-area {
            padding: 12px;
            border-top: 1px solid #e5e7eb;
            display: flex;
            background-color: ${config.colors.white};
            gap: 8px;
        }
        #sepl-chatbot-input {
            flex: 1;
            border: 1px solid #d1d5db;
            border-radius: 20px;
            padding: 8px 16px;
            outline: none;
            font-size: 14px;
        }
        #sepl-chatbot-input:focus {
            border-color: ${config.colors.primary};
        }
        #sepl-chatbot-send {
            background-color: ${config.colors.primary};
            color: ${config.colors.white};
            border: none;
            border-radius: 50%;
            width: 36px;
            height: 36px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.2s;
        }
        #sepl-chatbot-send:hover {
            background-color: #1e40af;
        }
        #sepl-chatbot-mic {
            background-color: transparent;
            color: #6b7280;
            border: 1px solid #d1d5db;
            border-radius: 50%;
            width: 36px;
            height: 36px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
        }
        #sepl-chatbot-mic:hover { background-color: #f3f4f6; color: ${config.colors.primary}; }
        #sepl-chatbot-mic.listening { color: #ef4444; border-color: #ef4444; animation: sepl-pulse 1.5s infinite; }
        @keyframes sepl-pulse { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }
        .bot-product-card {
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 10px;
            margin-top: 8px;
            background: #fff;
        }
        .bot-product-card h4 {
            margin: 0 0 4px 0;
            font-size: 14px;
            color: ${config.colors.primary};
            font-weight: 700;
        }
        .bot-product-card p {
            margin: 0;
            font-size: 12px;
            color: #4b5563;
        }
        .bot-action-btn {
            display: block;
            width: 100%;
            margin-top: 8px;
            padding: 6px;
            background-color: ${config.colors.secondary};
            color: white;
            text-align: center;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            border: none;
            transition: background-color 0.2s;
        }
        .bot-action-btn:hover {
            background-color: #b45309;
        }
        .sepl-typing {
            align-self: flex-start;
            background-color: #f3f4f6;
            padding: 12px 16px;
            border-radius: 12px;
            border-bottom-left-radius: 2px;
            border: 1px solid #e5e7eb;
            display: flex;
            gap: 4px;
            width: fit-content;
            margin-bottom: 10px;
        }
        .sepl-typing-dot { width: 6px; height: 6px; background-color: #9ca3af; border-radius: 50%; animation: sepl-bounce 1.4s infinite ease-in-out both; }
        .sepl-typing-dot:nth-child(1) { animation-delay: -0.32s; } .sepl-typing-dot:nth-child(2) { animation-delay: -0.16s; }
        @keyframes sepl-bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }

        .sepl-suggestions {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 8px;
            margin-bottom: 4px;
        }
        .sepl-chip {
            background: #f3f4f6;
            color: ${config.colors.primary};
            padding: 6px 12px;
            border-radius: 16px;
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
            border: 1px solid #e5e7eb;
            transition: all 0.2s;
        }
        .sepl-chip:hover {
            background: ${config.colors.secondary};
            color: white;
            border-color: ${config.colors.secondary};
            transform: translateY(-1px);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        #sepl-chatbot-quick-actions {
            padding: 10px 16px;
            display: flex;
            gap: 8px;
            overflow-x: auto;
            background-color: ${config.colors.white};
            border-top: 1px solid #f3f4f6;
            scrollbar-width: none;
        }
        #sepl-chatbot-quick-actions::-webkit-scrollbar { display: none; }
        .sepl-quick-btn {
            background-color: ${config.colors.gray};
            color: ${config.colors.text};
            border: 1px solid #e5e7eb;
            border-radius: 20px;
            padding: 6px 12px;
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.2s;
            flex-shrink: 0;
            //hidden on mobile to save space
        }
        .sepl-quick-btn:hover {
            background-color: ${config.colors.secondary};
            color: ${config.colors.white};
            border-color: ${config.colors.secondary};
        }
        #sepl-chatbot-hint {
            position: absolute;
            right: 75px;
            top: 12px;
            background-color: ${config.colors.white};
            color: ${config.colors.text};
            padding: 8px 12px;
            border-radius: 20px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            font-size: 13px;
            font-weight: 600;
            white-space: nowrap;
            opacity: 0;
            transform: translateX(-10px);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            pointer-events: none;
        }
        #sepl-chatbot-hint.show {
            opacity: 1;
            transform: translateX(0);
        }
        #sepl-chatbot-hint::after {
            content: '';
            position: absolute;
            right: -6px;
            top: 50%;
            transform: translateY(-50%);
            border-width: 6px 0 6px 6px;
            border-style: solid;
            border-color: transparent transparent transparent ${config.colors.white};
        }

        /* CSS Bot Icon Definitions */
        .sepl-css-bot {
            position: relative;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .sepl-bot-head {
            width: 26px;
            height: 20px;
            background: ${config.colors.primary};
            border-radius: 6px;
            position: relative;
            z-index: 2;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .sepl-bot-eyes {
            position: absolute;
            top: 6px;
            left: 5px;
            right: 5px;
            display: flex;
            justify-content: space-between;
        }
        .sepl-bot-eye {
            width: 5px;
            height: 5px;
            background: white;
            border-radius: 50%;
            animation: sepl-blink 4s infinite;
        }
        .sepl-bot-eye:nth-child(2) { animation-delay: 0.1s; }
        .sepl-bot-antenna {
            position: absolute;
            top: -6px;
            left: 50%;
            transform: translateX(-50%);
            width: 2px;
            height: 8px;
            background: ${config.colors.secondary};
        }
        .sepl-bot-antenna::after {
            content: '';
            position: absolute;
            top: -4px;
            left: -2.5px;
            width: 7px;
            height: 7px;
            background: ${config.colors.primary};
            border-radius: 50%;
            border: 1px solid white;
        }
        .sepl-bot-ear {
            position: absolute;
            top: 7px;
            width: 3px;
            height: 6px;
            background: ${config.colors.primary};
            border-radius: 2px;
        }
        .sepl-bot-ear.left { left: -2px; }
        .sepl-bot-ear.right { right: -2px; }

        @keyframes sepl-blink {
            0%, 48%, 52%, 100% { transform: scaleY(1); }
            50% { transform: scaleY(0.1); }
        }

        /* CSS Bot Icon overrides for Header (Dark Background) */
        #sepl-chatbot-header .sepl-bot-head { background-color: ${config.colors.white}; }
        #sepl-chatbot-header .sepl-bot-ear { background-color: ${config.colors.white}; }
        #sepl-chatbot-header .sepl-bot-eye { background-color: ${config.colors.primary}; }
        #sepl-chatbot-header .sepl-bot-antenna::after { background-color: ${config.colors.white}; border-color: ${config.colors.primary}; }

        .sepl-fab-options {
            display: flex;
            flex-direction: column;
            gap: 15px;
            align-items: center;
            position: absolute;
            bottom: 0;
            right: 0;
        }
        .sepl-fab-btn {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border: none;
            color: white;
            font-size: 28px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s ease-out;
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            position: relative; /* For tooltip */
        }
        .sepl-fab-btn:hover {
            transform: scale(1.1);
        }

        .sepl-fab-btn-chat { background-color: white; }
        .sepl-fab-btn-whatsapp { background-color: #25D366; }

        /* Tooltips */
        /* Tooltip Text */
        .sepl-fab-btn::after {
            content: attr(data-tooltip);
            position: absolute;
            bottom: 62px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 6px 10px;
            border-radius: 6px;
            font-size: 12px;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.2s, transform 0.2s;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        
        /* Tooltip Arrow */
        .sepl-fab-btn::before {
            content: '';
            position: absolute;
            bottom: 56px;
            left: 50%;
            transform: translateX(-50%);
            border-width: 6px 6px 0;
            border-style: solid;
            border-color: rgba(0,0,0,0.8) transparent transparent transparent;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.2s, transform 0.2s;
        }

        .sepl-fab-btn:hover::after { 
            opacity: 1; 
            transform: translateX(-50%) translateY(-2px); 
        }
        .sepl-fab-btn:hover::before { 
            opacity: 1; 
            transform: translateX(-50%) translateY(-2px); 
        }

        @media (max-width: 480px) {
            #sepl-chatbot-window {
                width: calc(100vw - 20px);
                height: 60vh;
                bottom: 10px;
                right: 10px;
            }
            .sepl-fab-options {
                gap: 10px;
            }
            .sepl-fab-btn {
                width: 50px;
                height: 50px;
                font-size: 24px;
            }
        }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // 2. Inject HTML Structure
    const container = document.createElement("div");
    container.id = "sepl-chatbot-container";
    container.innerHTML = `
        <div id="sepl-chatbot-window">
            <div id="sepl-chatbot-header">
                <span style="display:flex; align-items:center; gap:8px;">
                    <div class="sepl-css-bot" style="transform: scale(0.7);">
                        <div class="sepl-bot-antenna"></div>
                        <div class="sepl-bot-head">
                            <div class="sepl-bot-eyes"><div class="sepl-bot-eye"></div><div class="sepl-bot-eye"></div></div>
                            <div class="sepl-bot-ear left"></div><div class="sepl-bot-ear right"></div>
                        </div>
                    </div>
                    ${config.companyName}
                </span>
                <div>
                    <button id="sepl-chatbot-tts" title="Text to Speech" style="background:none;border:none;color:white;cursor:pointer;font-size:14px;margin-right:10px;opacity:0.7;"><i class="fa-solid fa-volume-xmark"></i></button>
                    <button id="sepl-chatbot-clear" title="Clear Chat" style="background:none;border:none;color:white;cursor:pointer;font-size:14px;margin-right:10px;"><i class="fa-solid fa-trash-can"></i></button>
                    <button id="sepl-chatbot-close" style="background:none;border:none;color:white;cursor:pointer;font-size:20px;">&times;</button>
                </div>
            </div>
            <div id="sepl-chatbot-messages"></div>
            <div id="sepl-chatbot-quick-actions">
                <button class="sepl-quick-btn" data-action="quote">Get Quote</button>
                <button class="sepl-quick-btn" data-action="rentals">Rental Options</button>
                <button class="sepl-quick-btn" data-action="catalog">Brochure</button>
                <button class="sepl-quick-btn" data-action="support">Support</button>
                <button class="sepl-quick-btn" data-action="whatsapp">WhatsApp</button>
                <button class="sepl-quick-btn" data-action="feedback">Feedback</button>
            </div>
            <div id="sepl-chatbot-input-area">
                <input type="text" id="sepl-chatbot-input" placeholder="Ask about machines, models...">
                <button type="button" id="sepl-chatbot-mic" title="Speak to Search"><i class="fa-solid fa-microphone"></i></button>
                <button id="sepl-chatbot-send"><i class="fa-solid fa-paper-plane"></i></button>
            </div>
        </div>
        
        <div class="sepl-fab-options" id="sepl-fab-options">
            <div id="sepl-chatbot-hint">Hi! Need help?</div>
            <button class="sepl-fab-btn sepl-fab-btn-chat" id="sepl-fab-chat" data-tooltip="Chat Assistant">
                <div class="sepl-css-bot" style="transform: scale(1);">
                    <div class="sepl-bot-antenna"></div>
                    <div class="sepl-bot-head">
                        <div class="sepl-bot-eyes"><div class="sepl-bot-eye"></div><div class="sepl-bot-eye"></div></div>
                        <div class="sepl-bot-ear left"></div><div class="sepl-bot-ear right"></div>
                    </div>
                </div>
            </button>
            <button class="sepl-fab-btn sepl-fab-btn-whatsapp" id="sepl-fab-whatsapp" data-tooltip="WhatsApp"><i class="fa-brands fa-whatsapp"></i></button>
        </div>
    `;
    document.body.appendChild(container);

    // 3. Chatbot Logic
    const chatWindow = document.getElementById("sepl-chatbot-window");
    const closeBtn = document.getElementById("sepl-chatbot-close");
    const ttsBtn = document.getElementById("sepl-chatbot-tts");
    const clearBtn = document.getElementById("sepl-chatbot-clear");
    const quickActionsDiv = document.getElementById("sepl-chatbot-quick-actions");
    const messagesDiv = document.getElementById("sepl-chatbot-messages");
    const inputField = document.getElementById("sepl-chatbot-input");
    const sendBtn = document.getElementById("sepl-chatbot-send");
    const micBtn = document.getElementById("sepl-chatbot-mic");
    
    const fabOptions = document.getElementById('sepl-fab-options');

    let isOpen = false;
    // Load history and context from session storage
    let chatHistory = JSON.parse(sessionStorage.getItem('sepl_chat_history')) || [];
    let lastContextProduct = JSON.parse(sessionStorage.getItem('sepl_chat_context_product')) || null;

    // Hint Rotation Logic
    const hintMessages = [
        "Hi! Need help?",
        "Looking for machinery?",
        "Get a quick quote",
        "Need spare parts?"
    ];
    let hintIndex = 0;
    let hintInterval;

    function rotateHint() {
        const hint = document.getElementById('sepl-chatbot-hint');
        if (!hint || isOpen || sessionStorage.getItem('sepl_chat_auto_opened')) {
            if (hintInterval) clearInterval(hintInterval);
            return;
        }

        hint.classList.remove('show');
        
        setTimeout(() => {
            if (isOpen || sessionStorage.getItem('sepl_chat_auto_opened')) return;
            
            hintIndex = (hintIndex + 1) % hintMessages.length;
            hint.textContent = hintMessages[hintIndex];
            hint.classList.add('show');
        }, 500);
    }

    // Show hint after delay
    setTimeout(() => {
        const hint = document.getElementById('sepl-chatbot-hint');
        if (hint && !isOpen && !sessionStorage.getItem('sepl_chat_auto_opened')) {
            hint.classList.add('show');
            hintInterval = setInterval(rotateHint, 4000);
        }
    }, 1500);

    function toggleChat() {
        isOpen = !isOpen;
        chatWindow.style.display = isOpen ? "flex" : "none";
        
        fabOptions.style.display = isOpen ? 'none' : 'flex';
        
        // Hide hint on interaction
        const hint = document.getElementById('sepl-chatbot-hint');
        if (hint) hint.classList.remove('show');
        if (hintInterval) clearInterval(hintInterval);
        
        // Mark as opened so auto-open doesn't trigger if user manually opens
        sessionStorage.setItem('sepl_chat_auto_opened', 'true');

        // Send welcome message on first open
        if (isOpen && messagesDiv.children.length === 0) {
            const isRentalPage = window.location.pathname.includes('rental_equipment');
            addMessage(
                "bot",
                isRentalPage
                    ? "Hello! I can help you explore the equipment listed for rental. Live availability and rental rates are not shown here, but I can guide you to the rental team."
                    : "Hello! I can help you find equipment, compare published specifications, and choose a machine for your bar size. What are you working on?",
                null,
                isRentalPage
                    ? ["Show rental options", "Ask about rental rates", "Contact Rental Desk"]
                    : ["Recommend a machine", "Compare SBB42 and SBB52", "Rental Options"]
            );
        }
    }

    document.getElementById('sepl-fab-chat').addEventListener('click', toggleChat);
    closeBtn.addEventListener("click", toggleChat);
    
    document.getElementById('sepl-fab-whatsapp').addEventListener('click', () => {
        const message = "Hi, I visited your website and would like to know more about your products.";
        window.open(`https://wa.me/919059239819?text=${encodeURIComponent(message)}`, '_blank');
    });
    
    // Attempt to remove standalone WhatsApp widgets to prevent duplicates
    const removeOldWidgets = () => {
        const potentialIds = ['whatsapp-widget', 'wa-widget', 'whatsapp_chat_widget', 'wa-chat-widget', 'whatsapp-btn', 'wa-btn'];
        potentialIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.remove();
        });
        // Also hide by class if common plugins are used
        const potentialClasses = document.querySelectorAll('.whatsapp-widget, .wa-widget, .whatsapp-float');
        potentialClasses.forEach(el => el.remove());
    };

    removeOldWidgets();
    setTimeout(removeOldWidgets, 500);
    setTimeout(removeOldWidgets, 2000);

    clearBtn.addEventListener("click", () => {
        messagesDiv.innerHTML = '';
        lastContextProduct = null;
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        chatHistory = [];
        sessionStorage.removeItem('sepl_chat_history');
        sessionStorage.removeItem('sepl_chat_context_product');
        sessionStorage.removeItem('sepl_chat_pending_requirement');
        sessionStorage.removeItem('sepl_chat_pending_comparison');
        addMessage("bot", "Chat history cleared. How can I help you?");
    });

    // Quick Actions Listener
    quickActionsDiv.addEventListener("click", (e) => {
        if (e.target.classList.contains("sepl-quick-btn")) {
            const action = e.target.dataset.action;
            let text = "";
            switch(action) {
                case 'quote': text = "How do I get a quote?"; break;
                case 'rentals': text = "What equipment can I rent?"; break;
                case 'catalog': text = "Download product brochure"; break;
                case 'support': text = "Contact support"; break;
                case 'whatsapp': text = "Connect on WhatsApp"; break;
                case 'feedback': text = "I want to give feedback"; break;
            }
            if (text) {
                inputField.value = text;
                processInput();
            }
        }
    });

    // Close chat when a link (product) is clicked
    messagesDiv.addEventListener("click", (e) => {
        const link = e.target.closest("a");
        if (link) {
            // Delay closing to allow navigation event to bubble/trigger properly
            setTimeout(() => {
                if (isOpen) toggleChat();
            }, 500);
        }
    });

    function addMessage(sender, text, html = null, suggestions = null, save = true) {
        const msgDiv = document.createElement("div");
        msgDiv.className = `sepl-message ${sender}`;
        if (html) {
            msgDiv.innerHTML = html;
        } else {
            msgDiv.textContent = text;
        }

        if (suggestions && Array.isArray(suggestions) && suggestions.length > 0) {
            const chipsDiv = document.createElement("div");
            chipsDiv.className = "sepl-suggestions";
            suggestions.forEach(s => {
                const chip = document.createElement("button");
                chip.className = "sepl-chip";
                chip.textContent = s;
                chip.onclick = () => {
                    inputField.value = s;
                    processInput();
                };
                chipsDiv.appendChild(chip);
            });
            msgDiv.appendChild(chipsDiv);
        }

        messagesDiv.appendChild(msgDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;

        if (save) {
            chatHistory.push({ sender, text, html, suggestions });
            sessionStorage.setItem('sepl_chat_history', JSON.stringify(chatHistory));
        }
    }

    // Restore chat history on load
    if (chatHistory.length > 0) {
        chatHistory.forEach(msg => {
            addMessage(msg.sender, msg.text, msg.html, msg.suggestions, false);
        });
    }

    function showTyping() {
        const div = document.createElement('div');
        div.className = 'sepl-typing';
        div.id = 'sepl-typing-indicator';
        div.innerHTML = '<div class="sepl-typing-dot"></div><div class="sepl-typing-dot"></div><div class="sepl-typing-dot"></div>';
        messagesDiv.appendChild(div);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    function hideTyping() {
        const div = document.getElementById('sepl-typing-indicator');
        if (div) div.remove();
    }

    let isTtsEnabled = false;

    function speakText(text) {
        if (!isTtsEnabled || !text || !('speechSynthesis' in window)) return;
        try {
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
        } catch (error) {
            console.error('Text-to-speech failed:', error);
        }
    }

    ttsBtn.setAttribute('aria-pressed', 'false');
    ttsBtn.addEventListener('click', () => {
        if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
            ttsBtn.title = 'Text-to-speech is not supported in this browser';
            return;
        }

        isTtsEnabled = !isTtsEnabled;
        ttsBtn.setAttribute('aria-pressed', String(isTtsEnabled));
        ttsBtn.title = isTtsEnabled ? 'Disable text-to-speech' : 'Enable text-to-speech';
        ttsBtn.style.opacity = isTtsEnabled ? '1' : '0.7';
        const icon = ttsBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-volume-high', isTtsEnabled);
            icon.classList.toggle('fa-volume-xmark', !isTtsEnabled);
        }
        if (!isTtsEnabled) window.speechSynthesis.cancel();
    });

    function processInput() {
        const text = inputField.value.trim();
        if (!text) return;
        
        addMessage("user", text);
        inputField.value = "";
        showTyping();

        // Simulate network delay for realism
        // Random delay between 1s and 2s to simulate "thinking"
        const delay = Math.floor(Math.random() * 1000) + 1000;
        
        setTimeout(async () => {
            try {
                const response = await generateResponse(text);
                addMessage("bot", response.text, response.html, response.suggestions);
                speakText(response.text);
            } catch (error) {
                console.error('Chatbot response failed:', error);
                addMessage("bot", "I ran into a problem while preparing that answer. Please try asking about a product model or contact our team.");
            } finally {
                hideTyping();
            }
        }, delay);
    }

    sendBtn.addEventListener("click", processInput);
    inputField.addEventListener("keypress", (e) => {
        if (e.key === "Enter") processInput();
    });

    // --- Voice Recognition Logic ---
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        recognition.maxAlternatives = 1;
        
        let isRecognizing = false;
        
        micBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (isRecognizing) {
                recognition.stop();
            } else {
                inputField.value = '';
                try { 
                    recognition.start(); 
                } catch(e) { 
                    console.error("Mic start error:", e);
                }
            }
        });

        recognition.onstart = () => {
            isRecognizing = true;
            micBtn.classList.add('listening');
            inputField.placeholder = "Listening... Speak now";
        };

        recognition.onend = () => {
            isRecognizing = false;
            micBtn.classList.remove('listening');
            inputField.placeholder = "Ask about machines, models...";
        };

        recognition.onerror = (event) => {
            isRecognizing = false;
            micBtn.classList.remove('listening');
            if (event.error === 'no-speech') {
                inputField.placeholder = "No speech detected. Try again.";
            } else if (event.error === 'not-allowed') {
                inputField.placeholder = "Mic permission denied.";
            } else {
                inputField.placeholder = "Error: " + event.error;
            }
        };

        recognition.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }

            if (finalTranscript) {
                inputField.value = finalTranscript;
                recognition.stop();
                processInput();
            } else if (interimTranscript) {
                inputField.value = interimTranscript;
            }
        };
    } else {
        micBtn.style.display = 'none';
    }

    function updateContext(product) {
        lastContextProduct = product;
        sessionStorage.setItem('sepl_chat_context_product', JSON.stringify(product));
    }

    function loadPendingRequirement() {
        const stored = sessionStorage.getItem('sepl_chat_pending_requirement');
        if (!stored) return null;

        try {
            const requirement = JSON.parse(stored);
            if (!requirement || typeof requirement !== 'object' || Array.isArray(requirement)) {
                throw new Error('Saved recommendation requirement is not an object.');
            }

            const capacity = Number(requirement.capacity);
            return {
                capacity: Number.isFinite(capacity) && capacity > 0 ? capacity : null,
                action: ['bend', 'cut'].includes(requirement.action) ? requirement.action : null,
                portable: requirement.portable === true,
                awaiting: ['task', 'capacity'].includes(requirement.awaiting) ? requirement.awaiting : null
            };
        } catch (error) {
            console.warn('Could not restore the pending recommendation requirement:', error);
            sessionStorage.removeItem('sepl_chat_pending_requirement');
            return null;
        }
    }

    function loadPendingComparison() {
        const stored = sessionStorage.getItem('sepl_chat_pending_comparison');
        if (!stored) return null;

        try {
            const comparison = JSON.parse(stored);
            if (
                !comparison ||
                typeof comparison.primary !== 'string' ||
                !Array.isArray(comparison.options) ||
                comparison.options.some(option => typeof option !== 'string')
            ) {
                throw new Error('Invalid comparison selection state');
            }
            return comparison;
        } catch (error) {
            console.warn('Could not restore the pending comparison:', error);
            sessionStorage.removeItem('sepl_chat_pending_comparison');
            return null;
        }
    }

    async function generateResponse(query) {
        query = query.toLowerCase();
        let pendingRequirement = loadPendingRequirement();
        let pendingComparison = loadPendingComparison();
        if (pendingComparison) {
            const selection = normalizeAssistantText(query)
                .replace(/^(?:compare\s+(?:with|against)?\s*|with\s+|and\s+|vs\s+|against\s+)/, '');
            const selectedOption = pendingComparison.options.find(option =>
                normalizeAssistantText(option) === selection
            );
            if (selectedOption) {
                pendingComparison.selectedOption = selectedOption;
            } else {
                sessionStorage.removeItem('sepl_chat_pending_comparison');
                pendingComparison = null;
            }
        }
        const diameterMatch = query.match(/\b(\d+(?:\.\d+)?)\s*(mm|millimeters?|inch(?:es)?|in|")(?![a-z])/i);
        const bareCapacityMatch = pendingRequirement && pendingRequirement.awaiting === 'capacity'
            ? query.match(/^\s*(\d+(?:\.\d+)?)\s*$/)
            : null;
        const cutIntent = /\b(cut|cutter|cutting|shear|shearing)\b/i.test(query);
        const bendIntent = /\b(bend|bender|bending)\b/i.test(query);
        const portableIntent = /\b(portable|mobile|on site)\b/i.test(query);
        const barIntent = /\b(bars?|rods?|rebar|reinforcing|reinforcement|steel|tmt)\b/i.test(query);
        const pendingFollowUp = !!(diameterMatch || bareCapacityMatch || cutIntent || bendIntent || portableIntent || barIntent);

        if (pendingRequirement && !pendingFollowUp) {
            sessionStorage.removeItem('sepl_chat_pending_requirement');
            pendingRequirement = null;
        }

        // 0.1 Name Recognition
        const nameMatch = query.match(/(?:my name is|i am|i'm|call me) ([a-zA-Z]+)/i);
        if (nameMatch && !query.includes('looking') && !query.includes('interested') && !query.includes('sending')) {
            const name = nameMatch[1].charAt(0).toUpperCase() + nameMatch[1].slice(1);
            sessionStorage.setItem('sepl_user_name', name);
            return { text: `Nice to meet you, ${name}! How can I assist you with our machinery today?` };
        }
        const userName = sessionStorage.getItem('sepl_user_name');

        // 0.2 Name Recall
        if (query.includes('what is my name') || query.includes('who am i') || query.includes('do you know my name')) {
            if (userName) {
                return { 
                    text: `You told me your name is ${userName}.`,
                    html: `You told me your name is <strong>${userName}</strong>.`
                };
            } else {
                return { text: "I don't know your name yet. You can tell me by saying 'My name is...'" };
            }
        }

        // 0.3 Help / Capabilities
        if (query === 'help' || query.includes('what can you do') || query.includes('capabilities')) {
            return {
                text: "I can search the product catalog, answer questions using published specifications, compare named models, guide bar-machine selection by operation and diameter, and help you find rental and contact options. I canâ€™t verify live stock or unpublished prices.",
                suggestions: ["Recommend a machine", "Compare SBB42 and SBB52", "Show rental options"]
            };
        }

        // 0.4 Selection from previous results (Contextual)
        const ordinalMatch = query.match(/\b(first|second|third|1st|2nd|3rd|number 1|number 2|number 3|top one|best one)\b/);
        const lastResults = JSON.parse(sessionStorage.getItem('sepl_chat_search_results')) || [];
        
        if (ordinalMatch && lastResults.length > 0) {
            let index = -1;
            const term = ordinalMatch[1];
            if (term.includes('1') || term.includes('first') || term.includes('top') || term.includes('best')) index = 0;
            else if (term.includes('2') || term.includes('second')) index = 1;
            else if (term.includes('3') || term.includes('third')) index = 2;

            if (index >= 0 && index < lastResults.length) {
                const p = lastResults[index];
                updateContext(p);
                return {
                    text: `Here are the details for the <strong>${p.name}</strong> (Option ${index + 1}):`,
                    html: getProductCardHTML(p),
                    suggestions: [`Price of ${p.model}`, `Specs of ${p.model}`, "Compare"]
                };
            }
        }

        // 0. Sentiment Analysis (Handle frustration)
        if (query.match(/\b(wrong|bad|incorrect|stupid|useless|hate|shut up)\b/)) {
            return {
                text: "I apologize if I wasn't helpful. I'm still learning! Would you like to connect with a human expert instead?",
                suggestions: ["Connect on WhatsApp", "Contact Support"]
            };
        }
        
        // 0.5. Utility: Calculator
        // Matches basic math expressions like "5 * 10", "100 / 4", "2.5 + 2.5"
        if (/^[\d\s\.\+\-\*\/\(\)]+$/.test(query) && /\d/.test(query) && /[\+\-\*\/]/.test(query)) {
            try {
                // Safe evaluation using Function constructor
                const result = Function('"use strict";return (' + query + ')')();
                if (isFinite(result)) {
                     return { 
                         text: `The result is <strong>${Number(result.toFixed(4))}</strong>.`,
                         suggestions: ["Clear Chat"]
                     };
                }
            } catch(e) {}
        }

        // 0.6. Utility: Unit Converter
        // Matches "10 m to ft", "25 mm to inch", etc.
        const conversionRegex = /^([\d\.]+)\s*(mm|cm|m|meter|meters|inch|inches|ft|feet|foot|kg|lbs)\s*(?:to|in|into)\s*(mm|cm|m|meter|meters|inch|inches|ft|feet|foot|kg|lbs)$/i;
        const convMatch = query.match(conversionRegex);
        if (convMatch) {
            const val = parseFloat(convMatch[1]);
            const from = convMatch[2].toLowerCase();
            const to = convMatch[3].toLowerCase();
            const result = convertUnits(val, from, to);
            if (result !== null) {
                 return { 
                     text: `${val} ${from} is approximately <strong>${result} ${to}</strong>.`,
                     suggestions: ["Convert another"]
                 };
            }
        }

        // 0.65. Utility: Time and Date
        if (query.match(/what.*time/) || query.match(/current.*time/) || query.includes('time now')) {
             return { text: `It is currently ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}.` };
        }
        if (query.match(/what.*date/) || query.match(/todays.*date/) || query.includes('date today')) {
             return { text: `Today is ${new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.` };
        }
        if (query.match(/what.*day/) || query.includes('day is it')) {
             return { text: `Today is ${new Date().toLocaleDateString(undefined, { weekday: 'long' })}.` };
        }

        // 0.62. Comparative Reasoning (Dynamic "Why X over Y")
        const reasonMatch = query.match(/why (.*?) (?:is |are |should be )?(?:better|preferred|chosen|more suitable|selected) (?:than|over|instead of) (.*)/i);
        if (reasonMatch) {
            const subject = reasonMatch[1].toLowerCase().trim();
            const object = reasonMatch[2].toLowerCase().trim();
            const response = generateComparativeReasoning(subject, object);
            if (response) return { text: response.replace(/<[^>]*>/g, ''), html: response };
        }

        // 0.67. Utility: Steel Weight Calculator
        const steelWeightMatch = query.match(/weight.*(\d+)\s*mm/i) || query.match(/(\d+)\s*mm.*weight/i);
        if (steelWeightMatch) {
            const d = parseFloat(steelWeightMatch[1]);
            const weight = (d * d) / 162;
            const responseText = `The unit weight of a <strong>${d}mm</strong> steel bar is approximately <strong>${weight.toFixed(3)} kg/meter</strong>.`;
            return {
                text: responseText.replace(/<[^>]*>/g, ''),
                html: responseText,
                suggestions: ["Calculate another", "Show Bar Benders"]
            };
        }

        // 0.69. Lead Capture (Phone/Email)
        const phoneMatch = query.match(/\b[6-9]\d{9}\b/);
        const emailMatch = query.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
        if (phoneMatch || emailMatch) {
            return {
                text: "I canâ€™t send or store contact details from this chat. Please contact sales directly using one of these options.",
                html: `<p>I canâ€™t send or store contact details from this chat. Contact sales directly:</p><a class="bot-action-btn" href="mailto:sales@srinithyaepl.in">Email Sales</a><a class="bot-action-btn" href="https://wa.me/919059239819" target="_blank" rel="noopener noreferrer">WhatsApp Sales</a>`
            };
        }

        // 0.66. Personality: Status
        if (query.match(/how.*are.*you/) || query === 'how are you') {
            return { text: "I'm functioning perfectly! Thanks for asking. How can I help you with your construction equipment needs today?", suggestions: ["Show me products", "Contact Support"] };
        }

        // 0.7. Personality: Jokes
        if (query.includes('joke')) {
            const jokes = [
                "Why did the scarecrow fall into the cement mixer? He wanted to become a hardened criminal!",
                "What kind of music do construction workers listen to? Heavy Metal!",
                "I have a joke about construction, but I'm still working on it."
            ];
            return { text: jokes[Math.floor(Math.random() * jokes.length)], suggestions: ["Tell another joke"] };
        }

        // 0.8. Contextual Action: Add to Cart / Estimate
        if ((query.includes('add') || query.includes('buy') || query.includes('cart') || query.includes('estimate')) && 
            (query.includes('it') || query.includes('this') || query.includes('that')) && 
            lastContextProduct) {
            
            const safeName = lastContextProduct.name.replace(/'/g, "\\'");
            return {
                text: `Would you like to add <strong>${lastContextProduct.name}</strong> to your estimate?`,
                html: `<div class="bot-product-card">
                        <h4>${lastContextProduct.name}</h4>
                        <button onclick="window.addToCart('${safeName}')" class="bot-action-btn"><i class="fa-solid fa-plus"></i> Add to Estimate</button>
                       </div>`,
                suggestions: ["Yes, add it", "No, show others"]
            };
        }

        // 0.9. Navigation & Cart Control
        if (query.includes('go to') || query.includes('open') || query.includes('navigate')) {
            const rootPath = (window.location.pathname.includes('/Product_details/') || window.location.pathname.includes('/Service_details/')) ? '../' : '';
            
            if (query.includes('home')) { setTimeout(() => window.location.href = rootPath + 'index.html', 1000); return { text: "Navigating to Home page..." }; }
            if (query.includes('about')) { setTimeout(() => window.location.href = rootPath + 'about.html', 1000); return { text: "Navigating to About Us..." }; }
            if (query.includes('contact')) { setTimeout(() => window.location.href = rootPath + 'index.html#contact', 1000); return { text: "Taking you to the Contact section..." }; }
            if (query.includes('service')) { setTimeout(() => window.location.href = rootPath + 'services.html', 1000); return { text: "Opening Services page..." }; }
        }
        
        if (query.includes('clear') && (query.includes('cart') || query.includes('estimate') || query.includes('tray'))) {
             if (typeof window.clearCart === 'function') {
                 window.clearCart();
                 return { text: "I have cleared your selection tray.", suggestions: ["Start Fresh"] };
             }
        }
        if (query.includes('show') && (query.includes('cart') || query.includes('estimate') || query.includes('tray'))) {
             if (typeof window.toggleCart === 'function') {
                 setTimeout(() => window.toggleCart(), 500);
                 return { text: "Opening your selection tray..." };
             }
        }

        // 0.96. Feedback
        if (query.includes('give feedback') || query.includes('rate experience')) {
             return {
                 text: "We value your feedback! How would you rate your experience?",
                 suggestions: ["â­â­â­â­â­ Great", "â­â­â­ Good", "â­ Needs Improvement"]
             };
        }
        if (query.includes('â­')) {
             return { text: "Thank you for your feedback! We are constantly improving." };
        }

        // 0.95. Small Talk
        if (query.includes('thank') || query.includes('thanks')) {
            return { text: "You're welcome! Let me know if you need anything else.", suggestions: ["Browse Products", "Contact Support"] };
        }
        if (query.includes('bye') || query.includes('goodbye')) {
            return { text: "Goodbye! Have a great day ahead.", suggestions: ["Close Chat"] };
        }
        if (query.includes('good bot') || query.includes('smart')) {
            return { text: "Thank you! I try my best to be helpful.", suggestions: ["Tell me a joke"] };
        }

        // 1. Basic Greetings & Contact
        if (query.match(/^(hi|hello|hey|greetings)/)) {
            const hour = new Date().getHours();
            const timeGreeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
            
            let contextMsg = "I'm here to optimize your search for construction machinery.";
            const path = window.location.pathname;
            if (path.includes('bar_bending')) contextMsg = "I see you're looking at Bar Bending machines. Need help comparing models?";
            else if (path.includes('bar_cutting')) contextMsg = "I see you're interested in Bar Cutting machines. Can I help you with specifications?";
            else if (path.includes('concrete_mixer')) contextMsg = "Looking for Concrete Mixers? I can help you choose the right capacity.";

            return { 
                text: `${timeGreeting}${userName ? ' ' + userName : ''}! I am the SEPL Intelligent Assistant. ${contextMsg} How can I help you today?`,
                suggestions: ["Show me Bar Benders", "I need a Mixer", "Download Brochure"]
            };
        }
        
        // 2. Knowledge Graph Engine (Dynamic Synthesis)
        // Structured data to allow the bot to "think" and construct answers based on intent
        const knowledgeGraph = {
            'single phase': { term: "Single Phase Power", def: "a standard electrical supply system using 220V-240V AC", usage: "powering smaller equipment like 2HP vibrators and mini lifts", context: "residential and light commercial sites" },
            'three phase': { term: "Three Phase Power", def: "an industrial electrical supply system using 415V AC", usage: "powering heavy-duty machinery like large bar benders and cutters", benefit: "consistent power delivery and higher efficiency for large motors" },
            'hp': { term: "Horsepower (HP)", def: "a unit of measurement for engine or motor power", rule: "higher HP generally means the machine can handle heavier loads or work faster" },
            'rpm': { term: "RPM", def: "Revolutions Per Minute, indicating speed or frequency", rule: "higher RPM in vibrators leads to better concrete consolidation" },
            'm20': { term: "M20 Concrete", def: "a standard concrete grade with 20 N/mmÂ² compressive strength", spec: "Mix Ratio 1:1.5:3 (Cement : Sand : Aggregate)" },
            'm25': { term: "M25 Concrete", def: "a standard concrete grade with 25 N/mmÂ² compressive strength", spec: "Mix Ratio 1:1:2 (Cement : Sand : Aggregate)" },
            'opc': { term: "Ordinary Portland Cement (OPC)", def: "the most common type of cement used in general construction", benefit: "fast setting and high initial strength" },
            'ppc': { term: "Pozzolana Portland Cement (PPC)", def: "a blended cement using pozzolanic materials", benefit: "better durability and resistance to cracks over time" },
            'tmt': { term: "TMT (Thermo Mechanically Treated) Bars", def: "high-strength reinforcement steel with a tough outer core and soft inner core", benefit: "superior ductility, weldability, and earthquake resistance" },
            'slump test': { term: "Slump Test", def: "a field test to measure the consistency and workability of fresh concrete", rule: "a higher slump value indicates more fluid (workable) concrete" },
            'cover block': { term: "Cover Block", def: "a spacer used to lift the rebar off the ground before pouring concrete", usage: "maintaining a specified distance between the TMT bar and the shuttering to prevent corrosion" },
            'needle': { term: "Vibrator Needle", def: "the vibrating head inserted into concrete", rule: "diameter should be chosen based on reinforcement spacing (e.g., 40mm is standard, 25mm for congested areas)" },
            'curing': { term: "Curing", def: "the process of maintaining moisture in concrete to promote hydration", rule: "minimum 7 days is required, though 28 days is recommended for full strength" },
            'fe500': { term: "Fe500 Grade", def: "steel bars with a yield strength of 500 N/mmÂ²", usage: "general construction of high-rise buildings" },
            'fe550': { term: "Fe550 Grade", def: "steel bars with a yield strength of 550 N/mmÂ²", usage: "projects requiring higher load-bearing capacity" }
        };

        // Dynamic Synthesis Logic
        for (const [key, data] of Object.entries(knowledgeGraph)) {
            // Check if query contains the concept key
            if (query.includes(key)) {
                const term = data.term || key.replace(/\b\w/g, l => l.toUpperCase());
                
                // Intent: Reason/Benefit ("Why use...", "Benefits of...")
                if (query.includes('why') || query.includes('benefit') || query.includes('advantage') || query.includes('better')) {
                    if (data.benefit) return { text: `The main advantage of <strong>${term}</strong> is ${data.benefit}.` };
                    if (data.rule) return { text: `Generally, ${data.rule}.` };
                    if (data.usage) return { text: `<strong>${term}</strong> is preferred because it is effective for ${data.usage}.` };
                }
                
                // Intent: Usage/Application ("What is X used for?", "Where to use X?")
                if (query.includes('use') || query.includes('application') || query.includes('work') || query.includes('purpose')) {
                    if (data.usage) return { text: `<strong>${term}</strong> is primarily used for ${data.usage}.` };
                    if (data.context) return { text: `<strong>${term}</strong> is commonly found in ${data.context}.` };
                }

                // Intent: Specifications ("Specs of...", "Ratio of...")
                if (query.includes('ratio') || query.includes('mix') || query.includes('spec') || query.includes('detail')) {
                    if (data.spec) return { text: `The standard specification for <strong>${term}</strong> is: ${data.spec}.` };
                }

                // Default: Definition + Contextual Synthesis
                let response = `<strong>${term}</strong> refers to ${data.def}.`;
                // Chain thoughts logically
                if (data.spec) response += ` It typically follows a ${data.spec}.`;
                else if (data.usage) response += ` It is widely used for ${data.usage}.`;
                else if (data.benefit) response += ` Key benefit: ${data.benefit}.`;
                else if (data.rule) response += ` Note that ${data.rule}.`;
                
                return { text: response };
            }
        }

        // 3. Static Fallback (Company Info & Phatic)
        const staticKnowledge = [
            { 
                keywords: ['open', 'time', 'hours'], 
                response: (() => {
                    const now = new Date();
                    const day = now.getDay(); // 0 = Sun
                    const hour = now.getHours();
                    const isOpen = day >= 1 && day <= 6 && hour >= 9 && hour < 18;
                    const status = isOpen ? "<span style='color:green; font-weight:bold;'>Open</span>" : "<span style='color:red; font-weight:bold;'>Closed</span>";
                    return `We are currently ${status}. Our working hours are Mon-Sat, 9:00 AM - 6:00 PM.`;
                })()
            },
            { keywords: ['who', 'are', 'you'], response: "I am the SEPL Intelligent Assistant, a virtual agent designed to help you navigate our extensive range of construction machinery and services." },
            { keywords: ['location'], response: "Our office is at 9-95/8 Jyothi Nagar Colony, Balaji Nagar, Jawahar Nagar Municipality, Kapra Mandal, Hyderabad, Telangana-87." },
            { keywords: ['located'], response: "Our office is at 9-95/8 Jyothi Nagar Colony, Balaji Nagar, Jawahar Nagar Municipality, Kapra Mandal, Hyderabad, Telangana-87." },
            { keywords: ['address'], response: "Our office is at 9-95/8 Jyothi Nagar Colony, Balaji Nagar, Jawahar Nagar Municipality, Kapra Mandal, Hyderabad, Telangana-87." },
            { keywords: ['warranty'], response: "We stand by our quality. Most of our heavy machinery comes with a 1-year comprehensive warranty. Specific details are available on individual product pages." },
            { keywords: ['guarantee'], response: "We stand by our quality. Most of our heavy machinery comes with a 1-year comprehensive warranty. Specific details are available on individual product pages." },
            { keywords: ['service'], response: "We offer comprehensive support including on-site repair, workshop service, and spare parts replacement. You can book a service directly through the 'Services' menu." },
            { keywords: ['repair'], response: "We offer comprehensive support including on-site repair, workshop service, and spare parts replacement. You can book a service directly through the 'Services' menu." },
            { keywords: ['delivery'], response: "We facilitate delivery across India. Shipping timelines vary based on your location and current stock availability. Please contact sales for a precise estimate." },
            { keywords: ['shipping'], response: "We facilitate delivery across India. Shipping timelines vary based on your location and current stock availability. Please contact sales for a precise estimate." },
            { keywords: ['catalog'], response: "You can download our complete product catalogue from the Contact section of our website." },
            { keywords: ['catalogue'], response: "You can download our complete product catalogue from the Contact section of our website." },
            { keywords: ['brochure'], response: "You can download our complete product catalogue from the Contact section of our website." },
            { keywords: ['who', 'created', 'you'], response: "I was developed by the tech team at Srinithya Engineering to assist customers like you!" },
            { keywords: ['who', 'made', 'you'], response: "I was developed by the tech team at Srinithya Engineering to assist customers like you!" },
            { keywords: ['cube', 'test'], response: "Compressive strength of concrete is determined by cube test on 150mm x 150mm x 150mm cubes after 7 and 28 days curing." },
            // Expanded Knowledge
            { keywords: ['safety', 'gear'], response: "Safety is paramount. We recommend using helmets, gloves, safety shoes, and ear protection when operating heavy machinery." },
            { keywords: ['oil', 'change', 'maintenance'], response: "Regular maintenance extends machine life. Check oil levels daily and change engine oil every 50-100 working hours depending on the model." },
            { keywords: ['payment', 'mode', 'pay'], response: "We accept various payment modes including Bank Transfer (NEFT/RTGS) and Cheques. Please contact our sales team for details." },
            { keywords: ['petrol', 'vs', 'diesel'], response: "Petrol engines are generally lighter and easier to start, while Diesel engines offer better fuel economy and torque for heavy-duty, continuous operation." },
            { keywords: ['warranty', 'claim'], response: "To claim warranty, please keep your purchase invoice handy and contact our support team with the machine's serial number." },
            { keywords: ['return', 'policy'], response: "Returns are subject to terms and conditions. Please contact our sales office immediately if you face issues with a delivered product." },
            // General Cleverness
            { keywords: ['boss', 'owner', 'ceo', 'director'], response: "Srinithya Engineering is led by a team of experienced directors dedicated to construction innovation." },
            { keywords: ['discount', 'offer'], response: "We offer competitive pricing! For bulk orders or specific discounts, please request a quote or contact our sales team directly." },
            { keywords: ['made', 'in'], response: "Our machines are proudly manufactured in India, adhering to strict quality standards." },
            { keywords: ['capital', 'india'], response: "The capital of India is New Delhi." },
            { keywords: ['are', 'you', 'robot'], response: "Yes, I am a virtual assistant powered by code, designed to help you navigate SEPL's products." },
            { keywords: ['are', 'you', 'human'], response: "No, I am a virtual assistant, but I can connect you with our human experts via WhatsApp!" },
            { keywords: ['weather'], response: "I don't have a window, but I hope the weather is good for construction today!" },
            { keywords: ['meaning', 'life'], response: "42. But for us, it's building strong foundations!" },
            // Expanded Knowledge Base
            { keywords: ['prime', 'minister', 'india'], response: "The current Prime Minister of India is Narendra Modi." },
            { keywords: ['president', 'india'], response: "The current President of India is Droupadi Murmu." },
            { keywords: ['portable', 'vs', 'stationary'], response: "Portable machines are ideal for sites with limited space or where rebar needs to be processed at multiple locations. Stationary machines offer higher capacity and speed for centralized processing yards." },
            { keywords: ['portable', 'vs', 'normal'], response: "Portable machines are lightweight and can be moved easily around the site, whereas normal (stationary) machines are heavy-duty, designed for high-volume production in a fixed location." },
            { keywords: ['email', 'mail'], response: "You can email us at sales@srinithyaepl.in for quotes and inquiries." },
            { keywords: ['phone', 'call', 'number', 'mobile'], response: "You can reach our sales team at +91 9059 239819." },
            { keywords: ['mission', 'vision'], response: "Our mission is to empower the construction industry with reliable, efficient, and affordable machinery." },
            { keywords: ['founded', 'established'], response: "Srinithya Engineering has been serving the construction industry with dedication and quality products for many years." }
        ];

        for (const item of staticKnowledge) {
            if (item.keywords.every(k => query.includes(k))) {
                return { text: item.response };
            }
        }

        if (query.includes("contact") || query.includes("email") || query.includes("phone") || query.includes("address") || query.includes("whatsapp")) {
            return { 
                text: "Contact sales by phone at +91 9059 239819, email sales@srinithyaepl.in, or WhatsApp the team.",
                html: `<p>Contact sales:</p><a class="bot-action-btn" href="tel:+919059239819">Call +91 9059 239819</a><a class="bot-action-btn" href="mailto:sales@srinithyaepl.in">Email Sales</a><a class="bot-action-btn" href="https://wa.me/919059239819" target="_blank" rel="noopener noreferrer">WhatsApp Sales</a>`
            };
        }
        if (query.includes("quote") || query.includes("price") || query.includes("estimate")) {
            return { 
                text: "To generate a quote, simply add products to your cart and use the 'Request Quote' feature. Our sales team will review your requirements and respond promptly.",
                suggestions: ["How to add to cart?", "Contact Sales"]
            };
        }

        // 2.5. Troubleshooting / Problem Solving
        if (query.includes('not working') || query.includes('wont start') || query.includes('broken') || query.includes('issue') || query.includes('problem') || query.includes('repair')) {
             return {
                 text: "I'm sorry to hear you're facing issues. Here are some quick checks:<br>1. Check fuel/power connection.<br>2. Ensure emergency stop is released.<br>3. Check oil levels.<br>If the issue persists, please book a repair service.",
                 suggestions: ["Book Repair", "Contact Support", "WhatsApp Us"]
             };
        }

        // 3. Intelligent Product Search
        if (!window.productData) {
            return { text: "I'm currently syncing with the product catalog. Please try again in a moment." };
        }

        const products = flattenProducts(window.productData);
        if (pendingComparison && pendingComparison.selectedOption) {
            const primary = products.find(product =>
                normalizeAssistantText(product.model || product.name) === normalizeAssistantText(pendingComparison.primary)
            );
            const selected = products.find(product =>
                normalizeAssistantText(product.model || product.name) === normalizeAssistantText(pendingComparison.selectedOption)
            );
            sessionStorage.removeItem('sepl_chat_pending_comparison');
            if (primary && selected) {
                return generateComparisonResponse(primary, selected);
            }
        }

        // Answer rental questions from the published rental list without claiming live stock.
        const rentalFollowUp = lastContextProduct &&
            lastContextProduct.category === 'rental-services' &&
            /\b(available|availability|rate|rates|price|cost|stock|how much)\b/i.test(query);
        const rentalIntent = /\b(rent|rental|renting|hire|hiring|lease|leasing)\b/i.test(query) || rentalFollowUp;
        if (rentalIntent) {
            const rentalProducts = products.filter(product => product.category === 'rental-services');
            const rentalMatches = findRentalMatches(query, rentalProducts);
            const mentionedProduct = findMentionedProduct(query, products);
            const refersToContext = /\b(it|this|that|same)\b/i.test(query);
            const contextualProduct = mentionedProduct || ((refersToContext || rentalFollowUp) ? lastContextProduct : null);

            if (rentalMatches.length === 0 && contextualProduct) {
                const relatedRental = findRentalListingForProduct(contextualProduct, rentalProducts);
                if (relatedRental) rentalMatches.push(relatedRental);
            }

            if (rentalProducts.length === 0) {
                return {
                    text: "I canâ€™t confirm rental options from the product data on this page. Please contact our team to check.",
                    suggestions: ["Contact Sales", "Open WhatsApp"]
                };
            }

            const showAllRentals = rentalMatches.length === 0 || rentalMatches.length > 1;
            const displayedRentals = showAllRentals ? rentalProducts : rentalMatches;
            const listedNames = displayedRentals.map(product => product.name).join(', ');
            const availabilityNote = "The website does not publish live rental availability or rates; our team can confirm those details.";
            const productNote = contextualProduct && contextualProduct.category !== 'rental-services'
                ? `The catalog lists ${contextualProduct.name} as a product, but does not confirm that exact model for rental. `
                : '';

            if (!showAllRentals) updateContext(displayedRentals[0]);

            return {
                text: showAllRentals
                    ? `The rental page lists: ${listedNames}. ${availabilityNote}`
                    : `${productNote}${displayedRentals[0].name} is listed as a rental option. ${availabilityNote}`,
                html: `<p>${escapeHtml(productNote)}${showAllRentals ? `Rental options listed on the site: ${escapeHtml(listedNames)}.` : `<strong>${escapeHtml(displayedRentals[0].name)}</strong> is listed as a rental option.`} ${escapeHtml(availabilityNote)}</p>${displayedRentals.map(getRentalCardHTML).join('')}`,
                suggestions: showAllRentals
                    ? ["Ask about Bar Bender rental", "Ask about Bar Cutter rental", "Contact Rental Desk"]
                    : ["Ask about rates", "Contact Rental Desk"]
            };
        }

        const recommendationIntent = /\b(recommend|recommendation|suggest|suitable|best|help me choose|which.*(?:machine|equipment)|what should i (?:use|buy|choose))\b/i.test(query);
        const hasKnownApplication = /\b(bars?|rods?|rebar|steel|tmt|bend|bender|bending|cut|cutter|cutting|mixer|mixing|concrete|compactor|compaction|soil|roller|vibrator|lift|hoist|crane|platform|pump|trowel|straightener|cabin|container|scissor|rent|rental|hire)\b/i.test(query);
        if (recommendationIntent && !hasKnownApplication && !findMentionedProduct(query, products)) {
            return {
                text: "Tell me what job you need to do, and Iâ€™ll narrow the catalog down. For bar work, include whether you need to bend or cut and the largest bar diameter.",
                suggestions: ["Bend or cut steel bars", "Recommend a concrete mixer", "Recommend a compactor", "Show lifting equipment"]
            };
        }

        const bareCapacityValue = bareCapacityMatch ? parseFloat(bareCapacityMatch[1]) : null;
        const diameterValue = diameterMatch ? parseFloat(diameterMatch[1]) : bareCapacityValue;
        const diameterUnit = diameterMatch ? diameterMatch[2].toLowerCase() : 'mm';
        let requestedCapacity = null;
        if (diameterValue) {
            const diameterInMillimeters = /^(?:inch(?:es)?|in|")$/.test(diameterUnit)
                ? diameterValue * 25.4
                : diameterValue;
            requestedCapacity = Math.round(diameterInMillimeters * 100) / 100;
        } else if (pendingRequirement && pendingRequirement.capacity) {
            requestedCapacity = pendingRequirement.capacity;
        }

        const explicitAction = cutIntent ? 'cut' : bendIntent ? 'bend' : null;
        let action = explicitAction || (pendingRequirement && pendingRequirement.action) || null;
        const mentionedProduct = findMentionedProduct(query, products);
        const refersToContext = /\b(it|this|that|same)\b|^\s*(?:and|what about|how about)\b/i.test(query);
        const referencedProduct = mentionedProduct || (refersToContext ? lastContextProduct : null);
        const contextualProduct = referencedProduct || (pendingRequirement ? lastContextProduct : null);
        const contextCategory = contextualProduct ? `${contextualProduct.category || ''} ${(contextualProduct.compare && contextualProduct.compare.category) || ''}`.toLowerCase() : '';

        if (!action && contextCategory) {
            if (contextCategory.includes('cut')) action = 'cut';
            else if (contextCategory.includes('bend')) action = 'bend';
        }
        if (!action && /bar_cutting_models/i.test(window.location.pathname)) action = 'cut';
        if (!action && /bar_bending_models/i.test(window.location.pathname)) action = 'bend';

        const isBarPage = /bar_(?:cutting|bending)_models/i.test(window.location.pathname);
        const isBarRequirement = barIntent ||
            /\b(machine|machinery|portable|bender|cutter)\b/i.test(query) ||
            !!pendingRequirement ||
            isBarPage ||
            !!(referencedProduct && getProductWorkTypes(referencedProduct).length);
        const selectionIntent = /\b(need|looking|recommend|suggest|choose|suitable|best|buy|purchase|want|required?|right|which|should i use)\b/i.test(query);

        if (referencedProduct && explicitAction && /\b(can|will|handle|support|operate|use)\b/i.test(query) &&
            !getProductWorkTypes(referencedProduct).includes(explicitAction)) {
            const referencedWorkTypes = getProductWorkTypes(referencedProduct);
            const mismatchText = `The catalog identifies ${referencedProduct.name} as a ${referencedWorkTypes.includes('bend') ? 'bending' : referencedWorkTypes.includes('cut') ? 'cutting' : 'different'} machine, not a ${explicitAction === 'cut' ? 'cutting' : 'bending'} machine.`;
            return {
                text: mismatchText,
                html: `<p>${escapeHtml(mismatchText)}</p>${getProductCardHTML(referencedProduct)}`,
                suggestions: explicitAction === 'cut' ? ["Show Bar Cutters", "Recommend a cutter"] : ["Show Bar Benders", "Recommend a bender"]
            };
        }

        if (requestedCapacity && isBarRequirement && !action) {
            sessionStorage.setItem('sepl_chat_pending_requirement', JSON.stringify({
                capacity: requestedCapacity,
                portable: portableIntent || !!(pendingRequirement && pendingRequirement.portable),
                awaiting: 'task'
            }));
            return {
                text: `I can recommend equipment for ${requestedCapacity} mm bars. Do you need to bend or cut them?`,
                suggestions: [`Bend ${requestedCapacity}mm bars`, `Cut ${requestedCapacity}mm bars`]
            };
        }

        if (isBarRequirement && action && !requestedCapacity && (selectionIntent || pendingRequirement)) {
            sessionStorage.setItem('sepl_chat_pending_requirement', JSON.stringify({
                action,
                portable: portableIntent || !!(pendingRequirement && pendingRequirement.portable),
                awaiting: 'capacity'
            }));
            return {
                text: `What is the largest bar diameter you need to ${action === 'cut' ? 'cut' : 'bend'}? You can reply in mm or inches.`,
                suggestions: ["20 mm", "32 mm", "40 mm"]
            };
        }

        if (requestedCapacity && action) {
            sessionStorage.removeItem('sepl_chat_pending_requirement');
            const asksAboutNamedProduct = !!(referencedProduct && (
                /\b(can|will|handle|support|suitable|capacity|rated|maximum|max|fit)\b/i.test(query) ||
                refersToContext
            ));
            const namedProductWorkTypes = referencedProduct ? getProductWorkTypes(referencedProduct) : [];
            const actionLabel = action === 'cut' ? 'cutting' : 'bending';

            if (asksAboutNamedProduct) {
                updateContext(referencedProduct);
                if (!namedProductWorkTypes.includes(action)) {
                    const mismatchText = `The catalog identifies ${referencedProduct.name} as a ${namedProductWorkTypes.includes('bend') ? 'bending' : namedProductWorkTypes.includes('cut') ? 'cutting' : 'different'} machine, not a ${actionLabel} machine. I can show suitable ${actionLabel} equipment instead.`;
                    return {
                        text: mismatchText,
                        html: `<p>${escapeHtml(mismatchText)}</p>${getProductCardHTML(referencedProduct)}`,
                        suggestions: action === 'cut' ? ["Show Bar Cutters", "Recommend a cutter"] : ["Show Bar Benders", "Recommend a bender"]
                    };
                }

                const namedCapacity = getProductCapacity(referencedProduct, action);
                if (!namedCapacity) {
                    const unverifiableText = `I canâ€™t verify a published ${actionLabel} capacity for ${referencedProduct.name}. Please confirm suitability with our sales team.`;
                    return {
                        text: unverifiableText,
                        html: `<p>${escapeHtml(unverifiableText)}</p>${getProductCardHTML(referencedProduct)}`,
                        suggestions: ["Contact Sales", "Show similar models"]
                    };
                }

                const capacityText = `${referencedProduct.name} has a published maximum ${actionLabel} capacity of ${namedCapacity} mm. The requested ${requestedCapacity} mm bar size ${namedCapacity >= requestedCapacity ? 'is within' : 'exceeds'} that limit. Confirm bar grade and site conditions with our team.`;
                return {
                    text: capacityText,
                    html: `<p>${escapeHtml(capacityText)}</p>${getProductCardHTML(referencedProduct)}`,
                    suggestions: [`Compare ${referencedProduct.model}`, "Contact Sales"]
                };
            }

            const needsPortable = portableIntent || !!(pendingRequirement && pendingRequirement.portable);
            const suitableProducts = products
                .filter(product => {
                    if (product.category === 'rental-services') return false;
                    const workTypes = getProductWorkTypes(product);
                    if (!workTypes.includes(action)) return false;
                    if (needsPortable && !isPortableProduct(product)) return false;
                    return getProductCapacity(product, action) >= requestedCapacity;
                })
                .sort((a, b) => getProductCapacity(a, action) - getProductCapacity(b, action));

            if (suitableProducts.length > 0) {
                const product = suitableProducts[0];
                const capacity = getProductCapacity(product, action);
                updateContext(product);
                const recommendationText = `For ${actionLabel} ${requestedCapacity} mm bars${needsPortable ? ' on site' : ''}, ${product.name} is the smallest listed model that meets the request, with capacity up to ${capacity} mm.`;
                return {
                    text: recommendationText,
                    html: `<p>${escapeHtml(recommendationText)}</p>${getProductCardHTML(product)}`,
                    suggestions: [`Specs of ${product.model}`, `Compare ${product.model}`, "Ask about portable options"]
                };
            }

            const categoryProducts = products.filter(product => getProductWorkTypes(product).includes(action));
            const maxCapacity = categoryProducts.reduce((max, product) => Math.max(max, getProductCapacity(product, action)), 0);
            return {
                text: maxCapacity
                    ? `I couldn't find a listed machine rated to ${actionLabel} ${requestedCapacity} mm bars. The largest published capacity in that category is ${maxCapacity} mm; please contact our team about a suitable solution.`
                    : `I couldn't find published ${actionLabel} capacity data for that request. Please contact our team to confirm a suitable machine.`,
                suggestions: ["Contact Sales", "Open WhatsApp"]
            };
        }

        // Synonyms map for better context understanding
        const synonyms = {
            'rod': 'bar', 'rebar': 'bar', 'iron': 'bar', 'steel': 'bar', 'tmt': 'bar', 'stirrup': 'bar',
            'cement': 'concrete', 'mortar': 'concrete',
            'mix': 'mixer', 'mixture': 'mixer',
            'compaction': 'compactor', 'rammer': 'compactor', 'soil': 'compactor', 'plate': 'compactor', 'earth': 'compactor',
            'breaker': 'cutter', 'shear': 'cutter', 'saw': 'cutter', 'cut': 'cutter', 'cutting': 'cutter',
            'lift': 'crane', 'hoist': 'crane', 'elevator': 'lift', 'winch': 'lift', 'genie': 'lift', 'scissor': 'lift', 'platform': 'lift',
            'pokers': 'poker', 'needle': 'poker', 'vibrating': 'vibrator', 'vibration': 'vibrator', 'shaft': 'poker',
            'tube': 'hose', 'pipe': 'hose',
            'bend': 'bender', 'bending': 'bender',
            'office': 'cabin', 'container': 'cabin', 'shed': 'cabin',
            'pump': 'dewatering', 'water': 'dewatering', 'motor': 'pump',
            'screed': 'smoothener', 'trowel': 'smoothener', 'floater': 'smoothener'
        };

        // Stop words to ignore for better search precision
        const stopWords = new Set([
            'what', 'is', 'the', 'of', 'for', 'and', 'a', 'an', 'in', 'on', 'to', 'with', 'at', 'by', 'from',
            'machine', 'machinery', 'equipment', 'tool', 'unit', 'device', 'product', 'item',
            'i', 'you', 'we', 'my', 'your', 'asked', 'about', 'act', 'according', 'previous', 'messages', 'chat', 
            'meant', 'actually', 'please', 'tell', 'me', 'show', 'find', 'search', 'looking', 'want', 'know',
            'model', 'type', 'version', 'series',
            'how', 'much', 'many', 'can', 'do', 'does', 'will', 'would', 'should',
            'who', 'where', 'when', 'why',
            'better', 'than', 'prefer', 'difference', 'vs', 'compare'
        ]);

        // Tokenize and expand query
        // Allow numbers (even single digit) or words length >= 2, filter stop words
        let rawTokens = query.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
        let tokens = rawTokens.filter(t => {
            if (stopWords.has(t)) return false;
            return /\d/.test(t) || t.length >= 2;
        });

        // Explicit Context Recall (Overrides search if user asks for "previous")
        if (query.includes('previous') || query.includes('last') || query.includes('earlier') || query.includes('back')) {
            if (lastContextProduct) {
                 return {
                     text: `Referring back to the <strong>${lastContextProduct.name}</strong>:`,
                     html: getProductCardHTML(lastContextProduct),
                     suggestions: [`Price of ${lastContextProduct.model}`, `Specs of ${lastContextProduct.model}`]
                 };
            }
        }

        const searchTokens = new Set(tokens);
        tokens.forEach(t => {
            if (synonyms[t]) searchTokens.add(synonyms[t]);
            // Handle plural/singular roughly
            if (t.endsWith('s')) searchTokens.add(t.slice(0, -1));
        });
        const finalTokens = Array.from(searchTokens);

        // Score products
        const scoredProducts = products.map(p => {
            let score = 0;
            const name = String(p.name || '').toLowerCase();
            const model = String(p.model || '').toLowerCase();
            const category = String(p.category || '').toLowerCase();
            const specsStr = p.specs ? p.specs.map(spec => spec.text || '').join(' ') : '';
            const searchStr = `${name} ${model} ${category} ${p.description || ''} ${specsStr}`.toLowerCase();
            // Create a set of words for exact matching of short tokens
            const searchWords = new Set(searchStr.split(/[\s\-\(\)\/]+/));
            
            finalTokens.forEach(token => {
                let matched = false;
                let tokenScore = 0;

                // 1. Numeric Match (Strongest) - Allow substring for models (e.g. "52" in "SBB52")
                if (/\d/.test(token)) {
                    if (model && model.includes(token)) {
                        tokenScore += 40; // High boost for model numbers
                        matched = true;
                    } else if (searchStr.includes(token)) {
                        tokenScore += 10;
                        matched = true;
                    }
                } 
                // 2. Text Match - Enforce Word Boundaries for short words (< 4 chars) to avoid "act" -> "compactor"
                else {
                    if (token.length < 4) {
                        if (searchWords.has(token)) {
                            tokenScore += 10;
                            matched = true;
                        }
                    } else {
                        // Longer words: allow substring (e.g. "bend" matches "bending")
                        if (searchStr.includes(token)) {
                            tokenScore += 10;
                            matched = true;
                        } else if (isFuzzyMatch(token, searchStr)) {
                            tokenScore += 5;
                            matched = true;
                        }
                    }
                }

                if (matched) {
                    score += tokenScore;
                    // Bonus for exact category match
                    if (category.includes(token)) score += 5;
                    // Bonus for name match
                    if (name.includes(token)) score += 5;
                }
            });
            return { product: p, score: score };
        });

        // Filter and sort matches (Keep scored items for context logic)
        const sortedScoredItems = scoredProducts
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score);
            
        const matches = sortedScoredItems.map(item => item.product);

        // Check for product-specific intent (attributes) to prevent Wiki takeover on specific questions
        const productKeywords = ['price', 'cost', 'spec', 'capacity', 'weight', 'power', 'motor', 'engine', 'warranty', 'usage', 'use', 'buy', 'rent', 'speed', 'rpm', 'detail'];
        const hasProductIntent = productKeywords.some(k => query.includes(k));

        // Prioritize Wikipedia for "Who" questions or low-confidence product matches
        const topScore = sortedScoredItems.length > 0 ? sortedScoredItems[0].score : 0;
        const isWhoQuestion = /^(who|what|where|when|define|why) /i.test(query);
        const isWhyQuestion = /^why /i.test(query);
        
        // Only try Wiki if: It's a 'Why' question OR (It's a 'Who' question AND (Score is low OR No specific product intent)) OR (Score is very low)
        if (isWhyQuestion || (isWhoQuestion && (topScore < 45 || !hasProductIntent)) || (matches.length > 0 && topScore < 25)) {
             try {
                const wikiData = await fetchWikipediaSummary(query);
                if (wikiData) {
                    return {
                        text: `Here is what I found on Wikipedia for "<strong>${wikiData.title}</strong>":<br>${wikiData.extract}`,
                        html: `<div class="bot-product-card">
                                <h4><i class="fa-brands fa-wikipedia-w"></i> ${wikiData.title}</h4>
                                <p>${wikiData.extract}</p>
                                <a href="${wikiData.url}" target="_blank" class="bot-action-btn" style="background-color: #f3f4f6; color: #333; border: 1px solid #ccc;">Read more on Wikipedia</a>
                               </div>`,
                        suggestions: ["Search Google", "Contact Support"]
                    };
                }
            } catch (e) { }
        }

        // CRITICAL FIX: If it was a general knowledge question (Who/What) and Wiki failed,
        // prevent weak product matches from showing up. Force fallback to Google Search.
        // Only clear if score is low (< 40) AND no product intent. (Model matches usually score >= 40)
        if (isWhoQuestion && topScore < 40 && !hasProductIntent) {
            matches.length = 0; 
        }

        // Special handling for "Why" questions to avoid irrelevant model comparisons
        // If user asks "Why X vs Y" (Category comparison) and we only match models of X, 
        // we shouldn't compare Model X1 vs Model X2.
        if (isWhyQuestion && topScore < 85) {
             matches.length = 0;
        }

        // --- Comparison Logic ---
        if (query.includes('compare') || query.includes(' vs ') || query.includes('difference') || query.includes('better') || query.includes('prefer')) {
            const namedProducts = findMentionedProducts(query, products);
            const contextualProduct = refersToContext ? lastContextProduct : null;

            if (namedProducts.length >= 2) {
                return generateComparisonResponse(namedProducts[0], namedProducts[1], query);
            }

            if (namedProducts.length === 1 && lastContextProduct && namedProducts[0].name !== lastContextProduct.name) {
                return generateComparisonResponse(
                    lastContextProduct,
                    namedProducts[0],
                    query,
                    `Comparing your previous selection <strong>${lastContextProduct.name}</strong> with <strong>${namedProducts[0].name}</strong>:`
                );
            }

            const comparisonProduct = namedProducts[0] || contextualProduct || (matches.length === 1 ? matches[0] : null);
            if (comparisonProduct) {
                const alternatives = products.filter(product =>
                    product.category === comparisonProduct.category &&
                    product.category !== 'rental-services' &&
                    (product.model || product.name) !== (comparisonProduct.model || comparisonProduct.name)
                ).slice(0, 3);

                if (alternatives.length > 0) {
                    sessionStorage.setItem('sepl_chat_pending_comparison', JSON.stringify({
                        primary: comparisonProduct.model || comparisonProduct.name,
                        options: alternatives.map(product => product.model || product.name)
                    }));
                    updateContext(comparisonProduct);
                    return {
                        text: `Which model should I compare with ${comparisonProduct.name}?`,
                        suggestions: alternatives.map(product => product.model || product.name)
                    };
                }

                return {
                    text: `I found ${comparisonProduct.name}, but there are no other models in the same catalog category to compare. Tell me the other model you have in mind.`
                };
            }

            const uniqueProducts = [...new Set(matches)];
            if (uniqueProducts.length >= 2) {
                return generateComparisonResponse(uniqueProducts[0], uniqueProducts[1], query);
            }
        }

        // --- Attribute & Usage Query ---
        const attributeMap = {
            'weight': ['weight', 'weighs', 'heavy', 'kg', 'mass', 'operating weight'],
            'power': ['power', 'motor', 'engine', 'hp', 'voltage', 'watts', 'electric', 'supply', 'phase', 'current', 'amp', 'frequency', 'hz', 'input', 'output'],
            'capacity': ['capacity', 'dimension', 'size', 'dia', 'diameter', 'mm', 'range', 'depth', 'width', 'height', 'output', 'volume', 'tank', 'lift', 'load', 'mesh', 'core', 'length', 'discharge'],
            'speed': ['speed', 'rpm', 'fast', 'velocity', 'rate', 'time', 'bends/min', 'times/min', 'vpm'],
            'warranty': ['warranty', 'guarantee'],
            'price': ['price', 'cost', 'rate', 'how much', 'quote'],
            'usage': ['usage', 'use', 'function', 'work', 'application', 'do', 'purpose', 'role', 'type'],
            'specs': ['spec', 'specification', 'feature', 'detail', 'config', 'data', 'info', 'description'],
            'safety': ['safety', 'emergency', 'guard', 'protection', 'shield'],
            'maintenance': ['maintenance', 'service', 'oil', 'lubrication', 'repair'],
            'control': ['control', 'pedal', 'pin', 'operation', 'drive', 'system', 'manual', 'auto', 'hydraulic', 'reversible'],
            'mobility': ['mobility', 'towable', 'chassis', 'wheel', 'portable', 'move', 'gradeability', 'climb'],
            'components': ['gearbox', 'gear', 'rope', 'blade', 'fan', 'drum', 'mount', 'insulation', 'vibration', 'force']
        };

        // Determine target product based on score confidence
        let targetProduct = null;
        let contextSwitch = false;

        if (matches.length > 0) {
            const topScore = sortedScoredItems[0].score;
            // Threshold 15: Requires at least one Name/Category match (10+5) or multiple keyword matches
            // This prevents generic words like "weight" (score 10) from switching context
            if (topScore >= 15) {
                targetProduct = matches[0];
                contextSwitch = true;
            } else {
                targetProduct = lastContextProduct || matches[0];
            }
        } else {
            targetProduct = lastContextProduct;
        }

        if (targetProduct) {
            for (const [attr, keywords] of Object.entries(attributeMap)) {
                if (keywords.some(k => query.includes(k))) {
                    // Update context if we switched topics or if establishing initial context
                    if (contextSwitch) updateContext(targetProduct);
                    if (!lastContextProduct && targetProduct) updateContext(targetProduct);
                    
                    return getAttributeResponse(targetProduct, attr, keywords);
                }
            }

            // Direct Spec Search (Catch-all for specific technical terms not in attributeMap)
            if (targetProduct.specs) {
                // Filter query tokens that are significant (length > 2) and not common verbs
                const significantTokens = tokens.filter(t => t.length > 2 && !['what', 'does', 'have', 'show', 'give', 'tell', 'is', 'are'].includes(t));
                
                if (significantTokens.length > 0) {
                    const directMatches = targetProduct.specs.filter(s => {
                        return significantTokens.some(token => s.text.toLowerCase().includes(token));
                    });

                    if (directMatches.length > 0) {
                        if (contextSwitch) updateContext(targetProduct);
                        if (!lastContextProduct && targetProduct) updateContext(targetProduct);

                        const specHtml = directMatches.map(s => `<p style="font-size: 13px; color: #374151; margin: 4px 0; border-bottom: 1px dashed #eee; padding-bottom: 2px;">${s.icon ? `<i class="${s.icon} text-secondary"></i> ` : ''}${s.text}</p>`).join('');
                        return {
                            text: `I found this information for <strong>${targetProduct.name}</strong>:`,
                            html: `<div class="bot-product-card"><h4>${targetProduct.name}</h4>${specHtml}<a href="${getProductLink(targetProduct)}" class="text-secondary font-bold text-xs mt-2 inline-block hover:underline">View Full Specs</a></div>`,
                            suggestions: ["View Details", "Get Quote"]
                        };
                    }
                }
            }
        }

        // --- Handle Empty Tokens (Context Fallback) ---
        // If we reached here, no attribute matched, and tokens might be empty due to stop words
        if (tokens.length === 0) {
             if (lastContextProduct) {
                 return {
                     text: `Referring back to the <strong>${lastContextProduct.name}</strong>:`,
                     html: getProductCardHTML(lastContextProduct),
                     suggestions: [`Price of ${lastContextProduct.model}`, `Specs of ${lastContextProduct.model}`]
                 };
             } else {
                 return {
                     text: "I'm not sure which product you're referring to. Could you please specify a model name (e.g., SBB52) or category?",
                     suggestions: ["Bar Bender", "Concrete Mixer", "View Catalogue"]
                 };
             }
        }

        // --- Standard Search Results ---
        if (matches.length > 0) {
            // Save results for context selection
            sessionStorage.setItem('sepl_chat_search_results', JSON.stringify(matches.slice(0, 5)));

            const p = matches[0];
            updateContext(p); // Update context

            // Determine intent for conversational response
            let responseText = "";
            const isSuggestion = query.includes("suggest") || query.includes("recommend") || query.includes("best");
            const topCategory = matches[0].category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

            if (isSuggestion) {
                responseText = `Based on your requirements, I highly recommend our <strong>${topCategory}</strong> range. Here are the best options for you:<br>`;
            } else if (matches.length === 1) {
                responseText = `I found exactly what you're looking for:<br>`;
            } else {
                responseText = `I found ${matches.length} products that match your search for "${query}":<br>`;
            }

            if (matches.length === 1) {
                return { 
                    text: "", 
                    html: `${responseText}${getProductCardHTML(p)}`,
                    suggestions: [`Price of ${p.model}`, `Specs of ${p.model}`, "Compare this"]
                };
            } else {
                // Show top 3 results
                let html = responseText;
                matches.slice(0, 3).forEach(p => {
                    const link = getProductLink(p);
                    html += `<div class="bot-product-card">
                        <h4>${p.name}</h4>
                        <p>${p.description ? p.description.substring(0, 60) + '...' : ''}</p>
                        <a href="${link}" class="text-secondary font-bold text-xs mt-1 inline-block hover:underline">View Details</a>
                    </div>`;
                });
                if (matches.length > 3) html += `<br><em>...and ${matches.length - 3} more. You can refine your search for more specific results.</em>`;
                return { 
                    text: "", 
                    html: html,
                    suggestions: ["View All Products", "Refine Search"]
                };
            }
        }

        // 4. External Source Fallback (Wikipedia + Google Search)
        
        // Try Wikipedia for general knowledge
        try {
            const wikiData = await fetchWikipediaSummary(query);
            if (wikiData) {
                return {
                    text: `Here is what I found on Wikipedia for "<strong>${wikiData.title}</strong>":<br>${wikiData.extract}`,
                    html: `<div class="bot-product-card">
                            <h4><i class="fa-brands fa-wikipedia-w"></i> ${wikiData.title}</h4>
                            <p>${wikiData.extract}</p>
                            <a href="${wikiData.url}" target="_blank" class="bot-action-btn" style="background-color: #f3f4f6; color: #333; border: 1px solid #ccc;">Read more on Wikipedia</a>
                           </div>`,
                    suggestions: ["Search Google", "Contact Support"]
                };
            }
        } catch (e) {
            console.warn("Wiki fetch failed", e);
        }

        const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        
        return { 
            text: "I couldn't find a direct match in our catalog. However, I can help you search for this information externally.",
            html: `<div class="bot-product-card">
                    <h4>External Search</h4>
                    <p>Find answers for: "<strong>${query}</strong>"</p>
                    <a href="${googleSearchUrl}" target="_blank" class="bot-action-btn" style="background-color: #4285F4;"><i class="fa-brands fa-google"></i> Search on Google</a>
                   </div>`,
            suggestions: ["Contact Support", "View All Products", "WhatsApp Us"]
        };
    }

    async function fetchWikipediaSummary(query) {
        // Clean query: remove common question phrases
        let cleanQuery = query.replace(/^(what|who|where|when|why|how)(?:'s|'re| is| are| was| were| do| does| did)\s+/i, '')
            .replace(/^(define|meaning of|tell me about)\s+/i, '')
            .replace(/^the\s+/i, '')
            .replace(/[?]/g, '') // Remove question marks
            .trim();
            
        if (cleanQuery.length < 2) return null;

        // Use standard Query API for better summaries (handles redirects and exact matches better than opensearch)
        const url = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${encodeURIComponent(cleanQuery)}&origin=*`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            
            // data.query.pages is an object with pageId keys
            const pages = data.query?.pages;
            if (!pages) return null;

            const pageId = Object.keys(pages)[0];
            if (pageId === "-1") return null; // No article found

            const page = pages[pageId];
            if (page.extract) {
                // Limit length to ~300 chars
                let extract = page.extract;
                if (extract.length > 300) {
                    extract = extract.substring(0, 300) + '...';
                }
                
                // Filter out "may refer to" disambiguation pages if they slipped through
                if (extract.includes("may refer to:")) return null;

                return { 
                    title: page.title, 
                    extract: extract, 
                    url: `https://en.wikipedia.org/wiki/${encodeURIComponent(page.title.replace(/ /g, '_'))}` 
                };
            }
        } catch (e) {
            console.error("Wiki fetch failed", e);
        }
        return null;
    }

    // Helper to generate product card HTML
    function getProductCardHTML(p) {
        const link = getProductLink(p);
        const safeName = p.name.replace(/'/g, "\\'");
        return `<div class="bot-product-card">
                    <h4>${p.name}</h4>
                    <p>${p.description}</p>
                    ${p.specs ? p.specs.slice(0, 2).map(s => `<small>â€¢ ${s.text}</small><br>`).join('') : ''}
                    <a href="${link}" class="text-secondary font-bold text-xs mt-2 inline-block hover:underline">View Product Details <i class="fa-solid fa-arrow-right"></i></a>
                    <button onclick="window.addToCart('${safeName}')" class="bot-action-btn"><i class="fa-solid fa-plus"></i> Add to Estimate</button>
                </div>`;
    }

    // Helper to generate attribute response
    function getAttributeResponse(p, attr, keywords) {
        const link = getProductLink(p);
        const safeName = p.name.replace(/'/g, "\\'");
        
        if (attr === 'price') {
             return { 
                 text: `To get the best price for the <strong>${p.name}</strong>, please add it to your cart and request a quote.`,
                 html: `<div class="bot-product-card">
                            <h4>${p.name}</h4>
                            <a href="${link}" class="text-secondary font-bold text-xs mt-1 inline-block hover:underline">View Product</a>
                            <button onclick="window.addToCart('${safeName}')" class="bot-action-btn"><i class="fa-solid fa-plus"></i> Add to Estimate</button>
                        </div>`
             };
        }

        if (attr === 'usage') {
            const categoryUsageMap = {
                'bending': "Bar Bending machines are used to bend TMT steel bars into various shapes (L, U, C, etc.) required for construction reinforcement.",
                'cutting': "Bar Cutting machines are designed to cut TMT steel bars and rods to precise lengths with high efficiency.",
                'mixer': "Concrete Mixers are used to homogeneously combine cement, aggregate, sand, and water to form concrete.",
                'compactor': "Plate Compactors are used to compress soil, gravel, or asphalt to create a solid, level foundation.",
                'vibrator': "Vibrators are used to eliminate air bubbles from freshly poured concrete, ensuring structural strength and a smooth finish.",
                'lift': "Mini Lifts and Cranes are used to hoist construction materials like bricks, cement, and sand to upper floors.",
                'roller': "Road Rollers are used to compact concrete, soil, gravel, or asphalt in the construction of roads and foundations.",
                'straightener': "Scrap Straighteners are used to straighten used or bent steel bars so they can be reused, reducing wastage.",
                'trowel': "Power Trowels are used to create a smooth, level finish on large, flat concrete areas.",
                'excavator': "Excavator Drum Compactors are attachments used for soil compaction in trenches and slopes where standard rollers cannot reach.",
                'converter': "High Frequency Converters are used to power high-frequency vibrators for efficient concrete compaction."
            };

            let usageText = p.description || "This machine is designed for heavy-duty construction tasks.";
            // Check category map for better explanation
            for (const [cat, text] of Object.entries(categoryUsageMap)) {
                if ((p.category || '').toLowerCase().includes(cat) || (p.name || '').toLowerCase().includes(cat)) {
                    usageText = text;
                    break;
                }
            }
            
            return {
                text: `<strong>Usage of ${p.name}:</strong> ${usageText}`,
                html: getProductCardHTML(p),
                suggestions: ["View Specs", "Get Quote"]
            };
        }

        if (attr === 'specs') {
             return {
                 text: `Here are the specifications for <strong>${p.name}</strong>:`,
                 html: getProductCardHTML(p), // Card already contains specs list
                 suggestions: ["Compare", "Get Quote"]
             };
        }

        // Search in specs
        if (p.specs) {
            const matchingSpecs = p.specs.filter(s => {
                const specText = s.text.toLowerCase();
                return keywords.some(k => specText.includes(k));
            });
            
            if (matchingSpecs.length > 0) {
                const specHtml = matchingSpecs.map(s => `<p style="font-size: 13px; color: #374151; margin: 4px 0; border-bottom: 1px dashed #eee; padding-bottom: 2px;">${s.icon ? `<i class="${s.icon} text-secondary"></i> ` : ''}${s.text}</p>`).join('');
                
                return {
                    text: `Here is the ${attr} detail for <strong>${p.name}</strong>:`,
                    html: `<div class="bot-product-card">
                            <h4>${p.name}</h4>
                            ${specHtml}
                            <a href="${link}" class="text-secondary font-bold text-xs mt-2 inline-block hover:underline">View Full Specs</a>
                            <button onclick="window.addToCart('${safeName}')" class="bot-action-btn"><i class="fa-solid fa-plus"></i> Add to Estimate</button>
                           </div>`,
                    suggestions: ["Get Quote", "Compare"]
                };
            }
        }

        // Search in Compare object (often has structured data like weight/power)
        if (p.compare) {
            const matchingKeys = Object.keys(p.compare).filter(k => keywords.some(kw => k.toLowerCase().includes(kw)));
            if (matchingKeys.length > 0) {
                const compareHtml = matchingKeys.map(key => `<p style="font-size: 13px; color: #374151; margin: 4px 0;"><strong>${key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g, ' ')}:</strong> ${p.compare[key]}</p>`).join('');
                return {
                    text: `Here is the information for <strong>${p.name}</strong>:`,
                    html: `<div class="bot-product-card">
                            <h4>${p.name}</h4>
                            ${compareHtml}
                            <button onclick="window.addToCart('${safeName}')" class="bot-action-btn"><i class="fa-solid fa-plus"></i> Add to Estimate</button>
                           </div>`,
                    suggestions: ["View Full Specs", "Compare"]
                };
            }
        }
        
        // Fallback if spec not found
        return {
            text: `I found the <strong>${p.name}</strong>, but I couldn't find specific details about its ${attr} in my quick summary. Please check the full details page.`,
            html: `<div class="bot-product-card">
                    <h4>${p.name}</h4>
                    <a href="${link}" class="text-secondary font-bold text-xs mt-1 inline-block hover:underline">View Product Details</a>
                    <button onclick="window.addToCart('${safeName}')" class="bot-action-btn"><i class="fa-solid fa-plus"></i> Add to Estimate</button>
                   </div>`,
            suggestions: ["View Details", "Contact Support"]
        };
    }

    // Helper for Dynamic Reasoning
    function generateComparativeReasoning(subject, object) {
        // 1. Define Abstract Traits & Knowledge
        const traits = {
            portable: { keywords: ['portable', 'handy', 'small', 'light', 'mini'], pros: "mobility, ease of transport, and single-phase power usage", cons: "lower capacity" },
            stationary: { keywords: ['stationary', 'heavy', 'standard', 'normal', 'big', 'yard', 'sbb', 'sbc', 'machine', 'bender', 'cutter'], pros: "high capacity, durability, and speed for heavy-duty tasks", cons: "lack of mobility" },
            diesel: { keywords: ['diesel', 'engine'], pros: "operation in areas without electricity and high torque", cons: "noise and fumes" },
            electric: { keywords: ['electric', 'motor'], pros: "low noise, low maintenance, and zero emissions", cons: "dependency on power supply" },
            manual: { keywords: ['manual', 'hand'], pros: "low cost and simplicity", cons: "labor intensity and slowness" },
            automatic: { keywords: ['auto', 'cnc', 'program'], pros: "precision, speed, and automation", cons: "higher cost" }
        };

        function getTrait(phrase) {
            for (const [key, data] of Object.entries(traits)) {
                if (data.keywords.some(k => phrase.includes(k))) return key;
            }
            // Contextual Defaults: If 'bender' or 'cutter' is mentioned without 'portable', assume stationary
            if ((phrase.includes('bender') || phrase.includes('cutter')) && !phrase.includes('portable')) {
                return 'stationary';
            }
            return null;
        }

        const sTrait = getTrait(subject);
        const oTrait = getTrait(object);

        // 2. Trait-based Comparison
        if (sTrait && oTrait && sTrait !== oTrait) {
            const sData = traits[sTrait];
            const oData = traits[oTrait];
            return `<strong>${subject.charAt(0).toUpperCase() + subject.slice(1)}</strong> is generally preferred over <strong>${object}</strong> when you need <strong>${sData.pros}</strong>. Conversely, ${object} is chosen for ${oData.pros}.`;
        }

        // 3. Dynamic Category Comparison (Intelligent Aggregation)
        if (window.productData) {
            // Map common terms to data keys
            const categoryMap = {
                'portable': ['portable-bar-processing-models'],
                'handy': ['handy-vibration-models', 'mechanical-poker-models'],
                'bender': ['bar-bending-models', 'portable-bar-processing-models'],
                'bar bender': ['bar-bending-models'],
                'stationary': ['bar-bending-models', 'bar-cutting-models'],
                'cutter': ['bar-cutting-models', 'industrial-cutting-tools'],
                'bar cutter': ['bar-cutting-models'],
                'mixer': ['concrete-mixer-models'],
                'compactor': ['plate-compactor-models'],
                'roller': ['road-roller-models'],
                'vibrator': ['vibrators', 'handy-vibration-models', 'shutter-vibrator-models'],
                'lift': ['mini-lift-models', 'scissor-lift-models']
            };

            const getCategoryKey = (text) => {
                for (const [keyword, keys] of Object.entries(categoryMap)) {
                    if (text.includes(keyword)) {
                        // Refine: if text is "portable bender", prioritize portable key
                        if (text.includes('portable') && keys.some(k => k.includes('portable'))) return keys.find(k => k.includes('portable'));
                        return keys[0]; // Default to first key (usually the main/stationary one)
                    }
                }
                return null;
            };

            const catKey1 = getCategoryKey(subject);
            const catKey2 = getCategoryKey(object);

            if (catKey1 && catKey2 && catKey1 !== catKey2) {
                // Helper to get max capacity/power from a category dynamically
                const getCategoryStats = (key) => {
                    const items = flattenProducts({ [key]: window.productData[key] });
                    let maxCap = 0;
                    items.forEach(p => {
                        if (p.compare) {
                            const capStr = p.compare.capacity || p.compare['bend-dia'] || '';
                            const capMatch = capStr.match(/(\d+(\.\d+)?)/);
                            if (capMatch) maxCap = Math.max(maxCap, parseFloat(capMatch[1]));
                        }
                    });
                    return { maxCap, name: key.replace(/-/g, ' ').replace('models', '').trim() };
                };

                const stats1 = getCategoryStats(catKey1);
                const stats2 = getCategoryStats(catKey2);

                if (stats1.maxCap > 0 && stats2.maxCap > 0) {
                    if (stats1.maxCap > stats2.maxCap) {
                        return `<strong>${subject}</strong> (Category: ${stats1.name}) offers higher capacity (up to ${stats1.maxCap}mm) compared to <strong>${object}</strong> (up to ${stats2.maxCap}mm), making it better for heavy-duty tasks.`;
                    } else {
                        return `<strong>${object}</strong> offers higher capacity (up to ${stats2.maxCap}mm) compared to <strong>${subject}</strong> (up to ${stats1.maxCap}mm). Choose ${subject} if you prioritize portability or lower power consumption.`;
                    }
                }
            }
        }

        // 4. Product Spec Comparison (Fallback to specific models with improved scoring)
        if (window.productData) {
            const products = flattenProducts(window.productData);
            
            // Improved Finder: Score based on match quality to find the BEST product, not just the first
            const findProduct = (text) => {
                return products.map(p => {
                    let score = 0;
                    const model = String(p.model || '').toLowerCase();
                    const name = String(p.name || '').toLowerCase();
                    if (model && text.includes(model)) score += 100;
                    if (name && text.includes(name)) score += 50;
                    // Partial match for words > 3 chars
                    text.split(' ').forEach(w => {
                        if (w.length > 3 && (name.includes(w) || model.includes(w))) score += 10;
                    });
                    return { p, score };
                })
                .filter(x => x.score > 0)
                .sort((a, b) => b.score - a.score)[0]?.p;
            };
            
            const p1 = findProduct(subject);
            const p2 = findProduct(object);

            if (p1 && p2) {
                // Compare Capacity/Power
                const getVal = (p) => { if(p.compare) { const v = p.compare.capacity || p.compare['bend-dia'] || p.compare.power || ''; const m = v.match(/(\d+(\.\d+)?)/); return m ? parseFloat(m[1]) : 0; } return 0; };
                const v1 = getVal(p1);
                const v2 = getVal(p2);
                
                if (v1 > v2 && v2 > 0) return `<strong>${p1.name}</strong> is preferred over <strong>${p2.name}</strong> if you need higher capacity/power (${v1} vs ${v2}).`;
                if (v2 > v1 && v1 > 0) return `<strong>${p1.name}</strong> has lower capacity than <strong>${p2.name}</strong> (${v1} vs ${v2}), so it might be preferred for lighter tasks or lower cost.`;
            }
        }
        return null;
    }

    function generateComparisonResponse(p1, p2, query = '', introText = null) {
        const isBetterQuery = query.includes('better') || query.includes('prefer');
        const intro = introText || (isBetterQuery
            ? `To help you decide whether <strong>${p1.name}</strong> is better than <strong>${p2.name}</strong>, here is a comparison:`
            : `Here is a comparison between <strong>${p1.name}</strong> and <strong>${p2.name}</strong>:`);
        return {
            text: intro,
            html: `<p>${intro}</p>${generateComparisonHTML(p1, p2)}`,
            suggestions: [`Price of ${p1.model}`, `Price of ${p2.model}`, "Add both to Estimate"]
        };
    }

    // Helper to generate comparison HTML
    function generateComparisonHTML(p1, p2) {
        const getFields = product => {
            const fields = {};
            Object.entries(product.compare || {}).forEach(([key, value]) => {
                if (!['model', 'category', 'image'].includes(key) && value !== null && value !== undefined && value !== '') {
                    const normalizedKey = normalizeAssistantText(key).replace(/\s+/g, '-');
                    fields[normalizedKey] = value;
                }
            });
            (product.specs || []).forEach(spec => {
                const separator = (spec.text || '').indexOf(':');
                if (separator > 0) {
                    const label = normalizeAssistantText(spec.text.slice(0, separator)).replace(/\s+/g, '-');
                    fields[label] = spec.text.slice(separator + 1).trim();
                }
            });
            return fields;
        };
        const fields1 = getFields(p1);
        const fields2 = getFields(p2);
        const keys = [...new Set([...Object.keys(fields1), ...Object.keys(fields2)])];
        let html = `<div class="bot-product-card" style="font-size:12px;">
            <table style="width:100%; border-collapse: collapse;">
                <tr style="border-bottom:1px solid #eee;">
                    <th style="text-align:left; padding:4px;">Feature</th>
                    <th style="text-align:left; padding:4px;">${escapeHtml(p1.model || 'Product 1')}</th>
                    <th style="text-align:left; padding:4px;">${escapeHtml(p2.model || 'Product 2')}</th>
                </tr>`;
        
        if (keys.length > 0) {
            keys.slice(0, 8).forEach(key => {
                const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g, ' ');
                html += `<tr style="border-bottom:1px solid #f9f9f9;">
                    <td style="padding:4px; font-weight:bold; color:#555;">${escapeHtml(label)}</td>
                    <td style="padding:4px;">${escapeHtml(fields1[key] || '-')}</td>
                    <td style="padding:4px;">${escapeHtml(fields2[key] || '-')}</td>
                </tr>`;
            });
        } else {
            html += `<tr><td colspan="3" style="padding:8px;">Detailed comparison data not available.</td></tr>`;
        }
        
        html += `</table></div>`;
        
        const link1 = getProductLink(p1);
        const link2 = getProductLink(p2);
        
        html += `<div style="margin-top:8px; display:flex; justify-content:space-between;">
            <a href="${link1}" class="text-secondary font-bold text-xs hover:underline">${escapeHtml(p1.name)}</a>
            <a href="${link2}" class="text-secondary font-bold text-xs hover:underline">${escapeHtml(p2.name)}</a>
        </div>`;
        
        return html;
    }

    function escapeHtml(value) {
        return String(value || '').replace(/[&<>"']/g, character => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        })[character]);
    }

    function normalizeAssistantText(value) {
        return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    }

    function findRentalMatches(query, rentalProducts) {
        const normalizedQuery = normalizeAssistantText(query);
        const aliases = {
            'bar bender': ['bar bending', 'bender'],
            'bar cutter': ['bar cutting', 'cutter', 'shear'],
            'walk behind roller': ['road roller', 'roller'],
            'suspended rope platform': ['suspended platform', 'rope platform', 'gondola']
        };

        return rentalProducts.filter(product => {
            const name = normalizeAssistantText(product.name);
            const productAliases = aliases[name] || [];
            return normalizedQuery.includes(name) ||
                productAliases.some(alias => normalizedQuery.includes(normalizeAssistantText(alias)));
        });
    }

    function findMentionedProducts(query, products) {
        const normalizedQuery = normalizeAssistantText(query);
        const compactQuery = normalizedQuery.replace(/\s+/g, '');
        return products
            .filter(product => product.category !== 'rental-services')
            .map(product => {
                const identifiers = [product.model, product.name]
                    .map(normalizeAssistantText)
                    .filter(identifier => identifier.length >= 4);
                const matches = identifiers
                    .map(identifier => {
                        const directPosition = normalizedQuery.indexOf(identifier);
                        const compactPosition = compactQuery.indexOf(identifier.replace(/\s+/g, ''));
                        return {
                            position: directPosition >= 0 ? directPosition : compactPosition,
                            length: identifier.length
                        };
                    })
                    .filter(match => match.position >= 0)
                    .sort((a, b) => a.position - b.position || b.length - a.length);
                return matches.length
                    ? { product, position: matches[0].position, length: matches[0].length }
                    : null;
            })
            .filter(Boolean)
            .sort((a, b) => a.position - b.position || b.length - a.length)
            .map(match => match.product);
    }

    function findMentionedProduct(query, products) {
        return findMentionedProducts(query, products)[0] || null;
    }

    function findRentalListingForProduct(product, rentalProducts) {
        if (product.category === 'rental-services') {
            const name = normalizeAssistantText(product.name);
            return rentalProducts.find(item => normalizeAssistantText(item.name) === name) || null;
        }

        const workTypes = getProductWorkTypes(product);
        if (workTypes.includes('bend')) {
            return rentalProducts.find(item => normalizeAssistantText(item.name).includes('bender')) || null;
        }
        if (workTypes.includes('cut')) {
            return rentalProducts.find(item => normalizeAssistantText(item.name).includes('cutter')) || null;
        }

        const category = normalizeAssistantText(`${product.category || ''} ${(product.compare && product.compare.category) || ''}`);
        if (category.includes('roller')) {
            return rentalProducts.find(item => normalizeAssistantText(item.name).includes('roller')) || null;
        }
        if (category.includes('suspended') || category.includes('platform')) {
            return rentalProducts.find(item => normalizeAssistantText(item.name).includes('platform')) || null;
        }
        return null;
    }

    function getRentalCardHTML(product) {
        const link = getProductLink(product);
        const message = encodeURIComponent(`Hi, I would like to enquire about renting ${product.name}.`);
        return `<div class="bot-product-card">
                    <h4>${escapeHtml(product.name)}</h4>
                    <p>Rates and live availability are confirmed by our rental team.</p>
                    <a href="${link}" class="text-secondary font-bold text-xs mt-2 inline-block hover:underline">View Rental Options</a>
                    <a href="https://wa.me/919059239819?text=${message}" target="_blank" rel="noopener noreferrer" class="bot-action-btn">Ask about this rental</a>
                </div>`;
    }

    function getProductWorkTypes(product) {
        const compareType = product.compare && product.compare.type ? product.compare.type : '';
        const searchable = normalizeAssistantText(`${product.category || ''} ${product.name || ''} ${product.description || ''} ${compareType}`);
        const workTypes = [];
        if (/\b(bend|bender|bending)\b/.test(searchable)) workTypes.push('bend');
        if (/\b(cut|cutter|cutting|shear|shearing)\b/.test(searchable)) workTypes.push('cut');
        return workTypes;
    }

    function isPortableProduct(product) {
        const compareType = product.compare && product.compare.type ? product.compare.type : '';
        return /\b(portable|mobile|on site)\b/.test(
            normalizeAssistantText(`${product.category || ''} ${product.name || ''} ${compareType}`)
        );
    }

    function getProductCapacity(product, action) {
        const capacityPattern = action === 'cut'
            ? /\b(capacity|cutting|cutter|diameter|dia)\b/i
            : /\b(capacity|bend|bending|diameter|dia)\b/i;
        const matchingSpec = (product.specs || []).find(spec =>
            capacityPattern.test(spec.text || '') && /\d/.test(spec.text || '')
        );
        const compare = product.compare || {};
        const compareValue = action === 'cut'
            ? compare.capacity
            : (compare['bend-dia'] || compare.capacity);
        const value = matchingSpec ? matchingSpec.text : (compareValue || '');
        const numbers = String(value).match(/\d+(?:\.\d+)?/g) || [];
        return numbers.reduce((max, number) => Math.max(max, parseFloat(number)), 0);
    }

    // Helper to flatten the nested productData structure
    function flattenProducts(data) {
        let all = [];
        for (const [category, items] of Object.entries(data)) {
            if (Array.isArray(items)) {
                items.forEach(item => {
                    item.category = category;
                    all.push(item);
                });
            } else if (typeof items === 'object' && items !== null) {
                // Handle nested categories (e.g. handy-vibration-models -> standard/highFrequency)
                for (const [subCat, subItems] of Object.entries(items)) {
                    if (Array.isArray(subItems)) {
                        subItems.forEach(item => {
                            item.category = `${category} - ${subCat}`;
                            all.push(item);
                        });
                    }
                }
            }
        }
        return all;
    }

    function getProductLink(product) {
        const rootPath = (window.location.pathname.includes('/Product_details/') || window.location.pathname.includes('/Service_details/')) ? '../' : '';
        const cat = (product.category || '').toLowerCase();
        let page = 'index.html';
        
        if (cat.includes('rental')) return `${rootPath}Service_details/rental_equipment.html#rental-grid`;
        else if (cat.includes('maintenance')) page = 'Service_details/maintenance_services.html';
        else if (cat.includes('repair')) page = 'Service_details/repair_services.html';
        else if (cat.includes('heavy-lifting-equipment')) page = 'Product_details/heavy_lifting_equipment.html';
        else if (cat.includes('suspended')) page = 'Product_details/suspended_rope_platform.html';
        else if (cat.includes('bending')) page = 'Product_details/bar_bending_models.html';
        else if (cat.includes('cutting') && !cat.includes('industrial')) page = 'Product_details/bar_cutting_models.html';
        else if (cat.includes('mixer')) page = 'Product_details/concrete_handling_equipment.html';
        else if (cat.includes('compactor')) page = 'Product_details/plate_compactor_models.html';
        else if (cat.includes('trowel')) page = 'Product_details/power_trowel_models.html';
        else if (cat.includes('converter')) page = 'Product_details/high_frequency_converter_models.html';
        else if (cat.includes('vibrator')) page = 'Product_details/Vibrators.html';
        else if (cat.includes('straightener')) page = 'Product_details/scrap_straightener_models.html';
        else if (cat.includes('excavator') || cat.includes('drum compactor')) page = 'Product_details/excavator_drum_compactor.html';
        
        const productId = (product.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return `${rootPath}${page}#${productId}`;
    }

    // Allow a small number of edit mistakes when matching catalog terms.
    function isFuzzyMatch(token, text) {
        if (token.length < 4) return false;
        const maxDistance = token.length >= 8 ? 2 : 1;
        const words = text.toLowerCase().split(/[^a-z0-9]+/);
        return words.some(w => {
            if (!w || Math.abs(w.length - token.length) > maxDistance) return false;
            let previous = Array.from({ length: token.length + 1 }, (_, index) => index);
            for (let row = 1; row <= w.length; row++) {
                const current = [row];
                let rowMinimum = row;
                for (let column = 1; column <= token.length; column++) {
                    const cost = w[row - 1] === token[column - 1] ? 0 : 1;
                    current[column] = Math.min(
                        current[column - 1] + 1,
                        previous[column] + 1,
                        previous[column - 1] + cost
                    );
                    rowMinimum = Math.min(rowMinimum, current[column]);
                }
                if (rowMinimum > maxDistance) return false;
                previous = current;
            }
            return previous[token.length] <= maxDistance;
        });
    }

    // Helper for Unit Conversion
    function convertUnits(val, from, to) {
        // Normalize units
        const map = {
            'mm': 'mm', 'millimeter': 'mm', 'millimeters': 'mm',
            'cm': 'cm', 'centimeter': 'cm', 'centimeters': 'cm',
            'm': 'm', 'meter': 'm', 'meters': 'm',
            'inch': 'inch', 'inches': 'inch', 'in': 'inch',
            'ft': 'ft', 'feet': 'ft', 'foot': 'ft',
            'kg': 'kg', 'kilogram': 'kg', 'kgs': 'kg',
            'lbs': 'lbs', 'pound': 'lbs', 'pounds': 'lbs'
        };
        
        from = map[from] || from;
        to = map[to] || to;

        if (from === to) return val;

        // Length to Base (mm)
        let mm = 0;
        if (from === 'mm') mm = val;
        else if (from === 'cm') mm = val * 10;
        else if (from === 'm') mm = val * 1000;
        else if (from === 'inch') mm = val * 25.4;
        else if (from === 'ft') mm = val * 304.8;
        
        // Weight to Base (kg)
        let kg = 0;
        if (from === 'kg') kg = val;
        else if (from === 'lbs') kg = val * 0.453592;

        // Convert Back
        if (['mm', 'cm', 'm', 'inch', 'ft'].includes(to) && ['mm', 'cm', 'm', 'inch', 'ft'].includes(from)) {
            if (to === 'mm') return mm.toFixed(2);
            if (to === 'cm') return (mm / 10).toFixed(2);
            if (to === 'm') return (mm / 1000).toFixed(4);
            if (to === 'inch') return (mm / 25.4).toFixed(2);
            if (to === 'ft') return (mm / 304.8).toFixed(2);
        }
        
        if (['kg', 'lbs'].includes(to) && ['kg', 'lbs'].includes(from)) {
            if (to === 'kg') return kg.toFixed(2);
            if (to === 'lbs') return (kg / 0.453592).toFixed(2);
        }

        return null;
    }


});
