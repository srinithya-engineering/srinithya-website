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

    // 1. Inject CSS Styles
    const styles = `
        #sepl-chatbot-container {
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 9999;
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }
        #sepl-chatbot-toggle {
            background-color: ${config.colors.secondary};
            color: ${config.colors.white};
            border: none;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            transition: transform 0.3s, background-color 0.3s;
        }
        #sepl-chatbot-toggle:hover {
            transform: scale(1.1);
            background-color: #b45309;
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
            position: absolute;
            bottom: 80px;
            left: 0;
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
        }
        .sepl-quick-btn:hover {
            background-color: ${config.colors.secondary};
            color: ${config.colors.white};
            border-color: ${config.colors.secondary};
        }
        #sepl-chatbot-hint {
            position: absolute;
            left: 70px;
            bottom: 18px;
            background-color: ${config.colors.white};
            color: ${config.colors.text};
            padding: 6px 12px;
            border-radius: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            font-size: 13px;
            font-weight: 600;
            white-space: nowrap;
            opacity: 1;
            transition: opacity 0.3s;
            pointer-events: none;
        }
        #sepl-chatbot-hint::before {
            content: '';
            position: absolute;
            left: -6px;
            top: 50%;
            transform: translateY(-50%);
            border-width: 6px 6px 6px 0;
            border-style: solid;
            border-color: transparent ${config.colors.white} transparent transparent;
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
                <span><i class="fa-solid fa-robot"></i> ${config.companyName}</span>
                <div>
                    <button id="sepl-chatbot-clear" title="Clear Chat" style="background:none;border:none;color:white;cursor:pointer;font-size:14px;margin-right:10px;"><i class="fa-solid fa-trash-can"></i></button>
                    <button id="sepl-chatbot-close" style="background:none;border:none;color:white;cursor:pointer;font-size:20px;">&times;</button>
                </div>
            </div>
            <div id="sepl-chatbot-messages"></div>
            <div id="sepl-chatbot-quick-actions">
                <button class="sepl-quick-btn" data-action="quote">Get Quote</button>
                <button class="sepl-quick-btn" data-action="catalog">Brochure</button>
                <button class="sepl-quick-btn" data-action="support">Support</button>
                <button class="sepl-quick-btn" data-action="whatsapp">WhatsApp</button>
            </div>
            <div id="sepl-chatbot-input-area">
                <input type="text" id="sepl-chatbot-input" placeholder="Ask about machines, models...">
                <button id="sepl-chatbot-send"><i class="fa-solid fa-paper-plane"></i></button>
            </div>
        </div>
        <button id="sepl-chatbot-toggle" title="Chat with us"><i class="fa-solid fa-comments"></i></button>
        <div id="sepl-chatbot-hint">Chat with AI</div>
    `;
    document.body.appendChild(container);

    // 3. Chatbot Logic
    const toggleBtn = document.getElementById("sepl-chatbot-toggle");
    const chatWindow = document.getElementById("sepl-chatbot-window");
    const closeBtn = document.getElementById("sepl-chatbot-close");
    const clearBtn = document.getElementById("sepl-chatbot-clear");
    const hintDiv = document.getElementById("sepl-chatbot-hint");
    const quickActionsDiv = document.getElementById("sepl-chatbot-quick-actions");
    const messagesDiv = document.getElementById("sepl-chatbot-messages");
    const inputField = document.getElementById("sepl-chatbot-input");
    const sendBtn = document.getElementById("sepl-chatbot-send");

    let isOpen = false;
    let lastContextProduct = null; // Stores the last product discussed for context awareness

    function toggleChat() {
        isOpen = !isOpen;
        chatWindow.style.display = isOpen ? "flex" : "none";
        toggleBtn.style.display = isOpen ? "none" : "flex";
        if (hintDiv) hintDiv.style.opacity = isOpen ? "0" : "1";
        
        // Mark as opened so auto-open doesn't trigger if user manually opens
        sessionStorage.setItem('sepl_chat_auto_opened', 'true');

        // Send welcome message on first open
        if (isOpen && messagesDiv.children.length === 0) {
            addMessage("bot", 
                "Hello! I am the SEPL Assistant. I can help you find information about our construction equipment. Try asking for 'Bar Bender', 'SBB52', or 'Compactor'.",
                null,
                ["Bar Bending Machine", "Concrete Mixer", "Download Brochure"]
            );
        }
    }

    toggleBtn.addEventListener("click", toggleChat);
    closeBtn.addEventListener("click", toggleChat);

    clearBtn.addEventListener("click", () => {
        messagesDiv.innerHTML = '';
        lastContextProduct = null;
        addMessage("bot", "Chat history cleared. How can I help you?");
    });

    // Quick Actions Listener
    quickActionsDiv.addEventListener("click", (e) => {
        if (e.target.classList.contains("sepl-quick-btn")) {
            const action = e.target.dataset.action;
            let text = "";
            switch(action) {
                case 'quote': text = "How do I get a quote?"; break;
                case 'catalog': text = "Download product brochure"; break;
                case 'support': text = "Contact support"; break;
                case 'whatsapp': text = "Connect on WhatsApp"; break;
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

    // Auto-open chatbot on first visit (Session based)
    if (!sessionStorage.getItem('sepl_chat_auto_opened')) {
        setTimeout(() => {
            if (!isOpen && !sessionStorage.getItem('sepl_chat_auto_opened')) {
                toggleChat();
            }
        }, 3000);
    }

    function addMessage(sender, text, html = null, suggestions = null) {
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

    function processInput() {
        const text = inputField.value.trim();
        if (!text) return;
        
        addMessage("user", text);
        inputField.value = "";
        showTyping();

        // Simulate network delay for realism
        // Random delay between 1s and 2s to simulate "thinking"
        const delay = Math.floor(Math.random() * 1000) + 1000;
        
        setTimeout(() => {
            hideTyping();
            const response = generateResponse(text);
            addMessage("bot", response.text, response.html, response.suggestions);
        }, delay);
    }

    sendBtn.addEventListener("click", processInput);
    inputField.addEventListener("keypress", (e) => {
        if (e.key === "Enter") processInput();
    });

    function generateResponse(query) {
        query = query.toLowerCase();

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
                text: `${timeGreeting}! I am the SEPL Intelligent Assistant. ${contextMsg} How can I help you today?`,
                suggestions: ["Show me Bar Benders", "I need a Mixer", "Download Brochure"]
            };
        }
        
        // 2. Smart General Knowledge (Simulated AI)
        const aiKnowledge = [
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
            { keywords: ['location'], response: "Our headquarters are located in Hyderabad, Telangana. You can find our full address and location map in the Contact section at the bottom of the page." },
            { keywords: ['located'], response: "Our headquarters are located in Hyderabad, Telangana. You can find our full address and location map in the Contact section at the bottom of the page." },
            { keywords: ['address'], response: "Our headquarters are located in Hyderabad, Telangana. You can find our full address and location map in the Contact section at the bottom of the page." },
            { keywords: ['warranty'], response: "We stand by our quality. Most of our heavy machinery comes with a 1-year comprehensive warranty. Specific details are available on individual product pages." },
            { keywords: ['guarantee'], response: "We stand by our quality. Most of our heavy machinery comes with a 1-year comprehensive warranty. Specific details are available on individual product pages." },
            { keywords: ['service'], response: "We offer comprehensive support including on-site repair, workshop service, and spare parts replacement. You can book a service directly through the 'Services' menu." },
            { keywords: ['repair'], response: "We offer comprehensive support including on-site repair, workshop service, and spare parts replacement. You can book a service directly through the 'Services' menu." },
            { keywords: ['delivery'], response: "We facilitate delivery across India. Shipping timelines vary based on your location and current stock availability. Please contact sales for a precise estimate." },
            { keywords: ['shipping'], response: "We facilitate delivery across India. Shipping timelines vary based on your location and current stock availability. Please contact sales for a precise estimate." },
            { keywords: ['catalog'], response: "You can download our complete product catalogue from the Contact section of our website." },
            { keywords: ['catalogue'], response: "You can download our complete product catalogue from the Contact section of our website." },
            { keywords: ['brochure'], response: "You can download our complete product catalogue from the Contact section of our website." },
            // General Construction Knowledge
            { keywords: ['m20'], response: "The mix ratio for M20 grade concrete is typically 1:1.5:3 (Cement : Sand : Aggregate)." },
            { keywords: ['m25'], response: "The mix ratio for M25 grade concrete is typically 1:1:2 (Cement : Sand : Aggregate)." },
            { keywords: ['curing'], response: "Concrete typically requires a minimum curing period of 7 days, but 28 days is recommended for full strength." },
            { keywords: ['tmt', 'full', 'form'], response: "TMT stands for Thermo Mechanically Treated bars, known for high strength and ductility." },
            { keywords: ['weight', 'steel'], response: "The unit weight of steel bars can be calculated as D²/162 (kg/m), where D is the diameter in mm." },
            { keywords: ['cube', 'test'], response: "Compressive strength of concrete is determined by cube test on 150mm x 150mm x 150mm cubes after 7 and 28 days curing." }
        ];

        for (const item of aiKnowledge) {
            if (item.keywords.every(k => query.includes(k))) {
                return { text: item.response };
            }
        }

        if (query.includes("contact") || query.includes("email") || query.includes("phone") || query.includes("address") || query.includes("whatsapp")) {
            return { 
                text: "You can reach our team via the 'Get in Touch' form, or email us at sales@srinithyaepl.in. For instant support, use the WhatsApp button!",
                suggestions: ["Open WhatsApp", "Call Now"]
            };
        }
        if (query.includes("quote") || query.includes("price") || query.includes("estimate")) {
            return { 
                text: "To generate a quote, simply add products to your cart and use the 'Request Quote' feature. Our sales team will review your requirements and respond promptly.",
                suggestions: ["How to add to cart?", "Contact Sales"]
            };
        }

        // 3. Intelligent Product Search
        if (!window.productData) {
            return { text: "I'm currently syncing with the product catalog. Please try again in a moment." };
        }

        const products = flattenProducts(window.productData);
        
        // --- Comparison Logic ---
        if (query.includes('compare') || query.includes(' vs ') || query.includes('difference')) {
            // Try to find mentioned products
            const mentionedProducts = products.filter(p => {
                const name = p.name.toLowerCase();
                const model = p.model.toLowerCase();
                return query.includes(name) || query.includes(model);
            });

            // If we have 2 distinct products
            const uniqueProducts = [...new Set(mentionedProducts)];
            if (uniqueProducts.length >= 2) {
                const p1 = uniqueProducts[0];
                const p2 = uniqueProducts[1];
                return {
                    text: `Here is a comparison between <strong>${p1.name}</strong> and <strong>${p2.name}</strong>:`,
                    html: generateComparisonHTML(p1, p2),
                    suggestions: [`Price of ${p1.model}`, `Price of ${p2.model}`, "Add both to Estimate"]
                };
            }
            // If only 1 mentioned and we have context
            if (uniqueProducts.length === 1 && lastContextProduct && uniqueProducts[0].name !== lastContextProduct.name) {
                 const p1 = lastContextProduct;
                 const p2 = uniqueProducts[0];
                 return {
                    text: `Comparing your previous selection <strong>${p1.name}</strong> with <strong>${p2.name}</strong>:`,
                    html: generateComparisonHTML(p1, p2),
                    suggestions: [`Price of ${p2.model}`, "Add to Estimate"]
                };
            }
        }

        // --- Contextual Attribute Query ---
        const attributeMap = {
            'weight': ['weight', 'weighs', 'heavy', 'kg'],
            'power': ['power', 'motor', 'engine', 'hp', 'voltage', 'watts', 'electric', 'supply'],
            'capacity': ['capacity', 'dimension', 'size', 'dia', 'diameter', 'mm', 'range', 'depth', 'width', 'height', 'output', 'volume', 'tank'],
            'speed': ['speed', 'rpm', 'fast', 'velocity', 'rate'],
            'warranty': ['warranty', 'guarantee'],
            'price': ['price', 'cost', 'rate', 'how much', 'quote']
        };

        // Check if query contains a product name/model
        const hasProductMention = products.some(p => query.includes(p.name.toLowerCase()) || query.includes(p.model.toLowerCase()));

        // If no product mentioned but we have context, check if user is asking about the context product
        if (!hasProductMention && lastContextProduct) {
            for (const [attr, keywords] of Object.entries(attributeMap)) {
                if (keywords.some(k => query.includes(k))) {
                    return getAttributeResponse(lastContextProduct, attr, keywords);
                }
            }
            // Handle generic "it" references
            if (query.includes('it') || query.includes('this') || query.includes('that')) {
                return {
                    text: `Are you referring to the <strong>${lastContextProduct.name}</strong>?`,
                    html: getProductCardHTML(lastContextProduct),
                    suggestions: [`Price of ${lastContextProduct.model}`, `Specs of ${lastContextProduct.model}`]
                };
            }
        }

        // --- Standard Search Logic ---
        // Synonyms map for better context understanding
        const synonyms = {
            'rod': 'bar', 'rebar': 'bar', 'iron': 'bar', 'steel': 'bar', 'tmt': 'bar',
            'cement': 'concrete', 'mortar': 'concrete',
            'mix': 'mixer',
            'compaction': 'compactor', 'rammer': 'compactor', 'soil': 'compactor',
            'breaker': 'cutter', 'shear': 'cutter', 'saw': 'cutter', 'cut': 'cutter',
            'lift': 'crane', 'hoist': 'crane', 'elevator': 'lift',
            'pokers': 'poker', 'needle': 'poker', 'vibrating': 'vibrator',
            'tube': 'hose', 'pipe': 'hose',
            'bend': 'bender', 'bending': 'bender'
        };

        // Tokenize and expand query
        let tokens = query.split(/\s+/).filter(t => t.length > 2);
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
            const specsStr = p.specs ? p.specs.map(s => s.text).join(' ') : '';
            const searchStr = `${p.name} ${p.model} ${p.category} ${p.description || ''} ${specsStr}`.toLowerCase();
            
            finalTokens.forEach(token => {
                if (searchStr.includes(token) || isFuzzyMatch(token, searchStr)) {
                    score += 10;
                    // Bonus for exact category match
                    if (p.category.toLowerCase().includes(token)) score += 5;
                    // Bonus for name match
                    if (p.name.toLowerCase().includes(token)) score += 5;
                }
            });
            return { product: p, score: score };
        });

        // Filter and sort
        const matches = scoredProducts
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .map(item => item.product);

        if (matches.length > 0) {
            const p = matches[0];
            lastContextProduct = p; // Update context

            // Check for specific attribute questions in the current query (e.g. "weight of SBB52")
            for (const [attr, keywords] of Object.entries(attributeMap)) {
                if (keywords.some(k => query.includes(k))) {
                     return getAttributeResponse(p, attr, keywords);
                }
            }

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

        // 4. External Source Fallback (Google Search)
        const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        
        return { 
            text: "I couldn't find a direct match in our catalog or knowledge base. However, I can help you search for this information externally.",
            html: `<div class="bot-product-card">
                    <h4>External Search</h4>
                    <p>Find answers for: "<strong>${query}</strong>"</p>
                    <a href="${googleSearchUrl}" target="_blank" class="bot-action-btn" style="background-color: #4285F4;"><i class="fa-brands fa-google"></i> Search on Google</a>
                   </div>`,
            suggestions: ["Contact Support", "View All Products", "WhatsApp Us"]
        };
    }

    // Helper to generate product card HTML
    function getProductCardHTML(p) {
        const link = getProductLink(p);
        const safeName = p.name.replace(/'/g, "\\'");
        return `<div class="bot-product-card">
                    <h4>${p.name}</h4>
                    <p>${p.description}</p>
                    ${p.specs ? p.specs.slice(0, 2).map(s => `<small>• ${s.text}</small><br>`).join('') : ''}
                    <a href="${link}" class="text-secondary font-bold text-xs mt-2 inline-block hover:underline">View Product Details <i class="fa-solid fa-arrow-right"></i></a>
                    <button onclick="window.addToCart('${safeName}')" class="bot-action-btn"><i class="fa-solid fa-plus"></i> Add to Estimate</button>
                </div>`;
    }

    // Helper to generate attribute response
    function getAttributeResponse(p, attr, keywords) {
        const link = getProductLink(p);
        
        if (attr === 'price') {
             return { 
                 text: `To get the best price for the <strong>${p.name}</strong>, please add it to your cart and request a quote.`,
                 html: `<div class="bot-product-card">
                            <h4>${p.name}</h4>
                            <a href="${link}" class="text-secondary font-bold text-xs mt-1 inline-block hover:underline">View Product</a>
                            <button onclick="window.addToCart('${p.name.replace(/'/g, "\\'")}')" class="bot-action-btn"><i class="fa-solid fa-plus"></i> Add to Estimate</button>
                        </div>`
             };
        }

        // Search in specs
        if (p.specs) {
            const foundSpec = p.specs.find(s => {
                const specText = s.text.toLowerCase();
                return keywords.some(k => specText.includes(k));
            });
            
            if (foundSpec) {
                return {
                    text: `Here is the ${attr} detail for <strong>${p.name}</strong>:`,
                    html: `<div class="bot-product-card">
                            <h4>${p.name}</h4>
                            <p style="font-size: 14px; color: #1f2937;">${foundSpec.text}</p>
                            <a href="${link}" class="text-secondary font-bold text-xs mt-2 inline-block hover:underline">View Full Specs</a>
                            <button onclick="window.addToCart('${p.name.replace(/'/g, "\\'")}')" class="bot-action-btn"><i class="fa-solid fa-plus"></i> Add to Estimate</button>
                           </div>`,
                    suggestions: ["Get Quote", "Compare"]
                };
            }
        }
        
        // Fallback if spec not found
        return {
            text: `I found the <strong>${p.name}</strong>, but I couldn't find specific details about its ${attr} in my quick summary. Please check the full details page.`,
            html: `<div class="bot-product-card">
                    <h4>${p.name}</h4>
                    <a href="${link}" class="text-secondary font-bold text-xs mt-1 inline-block hover:underline">View Product Details</a>
                    <button onclick="window.addToCart('${p.name.replace(/'/g, "\\'")}')" class="bot-action-btn"><i class="fa-solid fa-plus"></i> Add to Estimate</button>
                   </div>`,
            suggestions: ["View Details", "Contact Support"]
        };
    }

    // Helper to generate comparison HTML
    function generateComparisonHTML(p1, p2) {
        let html = `<div class="bot-product-card" style="font-size:12px;">
            <table style="width:100%; border-collapse: collapse;">
                <tr style="border-bottom:1px solid #eee;">
                    <th style="text-align:left; padding:4px;">Feature</th>
                    <th style="text-align:left; padding:4px;">${p1.model || 'Prod 1'}</th>
                    <th style="text-align:left; padding:4px;">${p2.model || 'Prod 2'}</th>
                </tr>`;
        
        if (p1.compare && p2.compare) {
            const keys = Object.keys(p1.compare).filter(k => k !== 'model' && k !== 'category' && k !== 'image');
            keys.slice(0, 5).forEach(key => {
                const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g, ' ');
                html += `<tr style="border-bottom:1px solid #f9f9f9;">
                    <td style="padding:4px; font-weight:bold; color:#555;">${label}</td>
                    <td style="padding:4px;">${p1.compare[key] || '-'}</td>
                    <td style="padding:4px;">${p2.compare[key] || '-'}</td>
                </tr>`;
            });
        } else {
            html += `<tr><td colspan="3" style="padding:8px;">Detailed comparison data not available.</td></tr>`;
        }
        
        html += `</table></div>`;
        
        const link1 = getProductLink(p1);
        const link2 = getProductLink(p2);
        
        html += `<div style="margin-top:8px; display:flex; justify-content:space-between;">
            <a href="${link1}" class="text-secondary font-bold text-xs hover:underline">${p1.name}</a>
            <a href="${link2}" class="text-secondary font-bold text-xs hover:underline">${p2.name}</a>
        </div>`;
        
        return html;
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
        
        if (cat.includes('bending')) page = 'Product_details/bar_bending_models.html';
        else if (cat.includes('cutting') && !cat.includes('industrial')) page = 'Product_details/bar_cutting_models.html';
        else if (cat.includes('mixer')) page = 'Product_details/concrete_mixer_models.html';
        else if (cat.includes('compactor')) page = 'Product_details/plate_compactor_models.html';
        else if (cat.includes('trowel')) page = 'Product_details/power_trowel_models.html';
        else if (cat.includes('converter')) page = 'Product_details/high_frequency_converter_models.html';
        else if (cat.includes('vibrator')) page = 'Product_details/Vibrators.html';
        else if (cat.includes('straightener')) page = 'Product_details/scrap_straightener_models.html';
        
        const productId = (product.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return `${rootPath}${page}#${productId}`;
    }

    // Helper for fuzzy matching (simple check for now, can be expanded to Levenshtein if needed)
    function isFuzzyMatch(token, text) {
        if (token.length < 4) return false;
        // Check if text contains a word that is very similar to token
        const words = text.split(/[\s\-\(\)]+/);
        return words.some(w => {
            if (Math.abs(w.length - token.length) > 1) return false;
            let diff = 0;
            for (let i = 0; i < Math.min(w.length, token.length); i++) {
                if (w[i] !== token[i]) diff++;
            }
            return diff <= 1; // Allow 1 char difference
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
