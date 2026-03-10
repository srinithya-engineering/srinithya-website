// --- Inject Styles for Product Highlight ---
(function() {
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes productPulse {
            0% { box-shadow: 0 0 0 0 rgba(217, 119, 6, 0.7); transform: scale(1); }
            50% { transform: scale(1.02); }
            70% { box-shadow: 0 0 0 10px rgba(217, 119, 6, 0); transform: scale(1); }
            100% { box-shadow: 0 0 0 0 rgba(217, 119, 6, 0); transform: scale(1); }
        }
        .product-highlight-pulse {
            animation: productPulse 2s infinite;
            z-index: 20;
            position: relative;
            border-color: #d97706 !important;
        }
        @keyframes iconSwap1 {
            0%, 45% { opacity: 1; transform: scale(1); }
            50%, 95% { opacity: 0; transform: scale(0.5); }
            100% { opacity: 1; transform: scale(1); }
        }
        @keyframes iconSwap2 {
            0%, 45% { opacity: 0; transform: scale(0.5); }
            50%, 95% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0.5); }
        }
        .icon-swap-primary { animation: iconSwap1 3s infinite; }
        .icon-swap-secondary { animation: iconSwap2 3s infinite; }
    `;
    document.head.appendChild(style);
})();

/**
 * Creates the HTML for a single product card.
 * @param {object} product - The product data object.
 * @returns {string} - The HTML string for the product card.
 */
window.createProductCard = function(product) {
    if (!product) return '';

    const rootPath = (window.location.pathname.includes('/Product_details/') || window.location.pathname.includes('/Service_details/')) ? '../' : './';

    // Generate unique ID for deep linking
    const productId = (product.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Generate data attributes for the compare functionality
    let compareDataAttributes = product.compare ? Object.entries(product.compare)
        .map(([key, value]) => `data-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}="${value}"`)
        .join(' ') : '';

    // Ensure category is present for compare logic
    if (product.category && (!product.compare || !product.compare.category)) {
        compareDataAttributes += ` data-category="${product.category}"`;
    }

    // Generate badge if it exists
    const badgeHTML = product.badge ? `<span class="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-2 py-1 rounded">${product.badge}</span>` : '';

    // Generate Share Button
    const shareHTML = `
        <button onclick="shareProduct('${product.name.replace(/'/g, "\\'")}')" class="absolute top-4 left-4 bg-white/90 hover:bg-white text-gray-600 hover:text-secondary p-2 rounded-full shadow-md transition-all duration-200 z-10" title="Share this product">
            <i class="fa-solid fa-share-nodes"></i>
        </button>`;

    // Generate feature list
    const specsHTML = (product.specs || []).map(spec => `
        <li class="flex items-center">
            <i class="${spec.icon || 'fa-solid fa-check'} text-primary w-6" aria-hidden="true"></i>
            <span>${spec.text}</span>
        </li>
    `).join('');

    // Generate action buttons
    const actionsHTML = (product.actions || []).map(action => {
        if (action.type === 'cart') {
            const safeName = action.name.replace(/'/g, "\\'");
            const params = `'${safeName}', ${action.price}, '${action.hsn}', ${action.gst}`;
            return `<button onclick="addToCart(${params})" class="w-full bg-secondary text-white py-1.5 md:py-2 rounded font-bold hover:bg-yellow-600 transition text-xs md:text-sm" aria-label="Add ${action.name} to Estimate"><i class="fa-solid fa-plus" aria-hidden="true"></i> Add</button>`;
        }
        if (action.type === 'enquire') {
            const productName = product.name || 'Product';
            const safeName = productName.replace(/'/g, "\\'");
            return `<button onclick="initiateSingleProductEnquiry('${safeName}')" class="w-full bg-primary text-white font-bold py-1.5 md:py-2 rounded hover:bg-blue-800 text-xs md:text-sm transition" aria-label="Enquire about ${productName}">Enquire</button>`;
        }
        if (action.type === 'rent') {
            const productName = product.name || 'Product';
            const safeName = productName.replace(/'/g, "\\'");
            return `<button onclick="initiateSingleProductEnquiry('${safeName}')" class="w-full bg-primary text-white font-bold py-1.5 md:py-2 rounded hover:bg-blue-800 text-xs md:text-sm transition" aria-label="Rent ${productName}">Rent Now</button>`;
        }
        if (action.type === 'repair') {
            const productName = product.name || 'Service';
            const safeName = productName.replace(/'/g, "\\'");
            return `<button onclick="initiateSingleProductEnquiry('${safeName}')" class="w-full bg-primary text-white font-bold py-1.5 md:py-2 rounded hover:bg-blue-800 text-xs md:text-sm transition" aria-label="Book ${productName}">Book Service</button>`;
        }
        if (action.type === 'enquire-link') {
            return `<a href="${rootPath}${action.href}" class="w-full bg-secondary text-white py-1.5 md:py-2 rounded font-bold hover:bg-yellow-600 transition mt-auto text-xs md:text-sm" aria-label="Enquire now about ${product.name}"><i class="fa-solid fa-headset" aria-hidden="true"></i> Enquire</a>`;
        }
        return '';
    }).join('');

    // Generate PDF Download Button
    const safeIdentifier = (product.model || product.name).replace(/'/g, "\\'");
    const pdfButtonHTML = `
        <button onclick="window.downloadProductCatalogue(event, '${safeIdentifier}')" class="absolute top-16 left-4 bg-white/90 hover:bg-white text-gray-600 hover:text-secondary p-2 rounded-full shadow-md transition-all duration-200 z-10" title="Download this product">
            <div class="relative w-4 h-4 flex items-center justify-center">
                <i class="fa-solid fa-file-pdf absolute icon-swap-primary"></i>
                <i class="fa-solid fa-download absolute icon-swap-secondary"></i>
            </div>
        </button>`;

    // Determine if compare functionality should be enabled for this card
    const compareCheckboxHTML = product.compare ? `
        <div class="flex justify-end -mt-2 -mr-2">
            <label class="flex items-center space-x-2 text-sm font-medium text-gray-600 cursor-pointer p-2 hover:bg-gray-100 rounded-full">
                <input type="checkbox" class="compare-checkbox h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" onchange="toggleCompare(this)">
                <span>Compare</span>
            </label>
        </div>` : '';

    // Card classes and structure
    const imageClass = product.imageClass || 'object-contain';
    const imageContainerClass = product.imageContainerClass || 'h-32 md:h-64';
    const cardWrapperClass = product.cardWrapperClass || 'bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-[0_0_20px_rgba(30,58,138,0.6)] transition-all duration-300 group flex flex-col h-full';
    const contentClass = product.contentClass || 'p-2 md:p-6 text-center flex flex-col flex-grow';

    let mediaHTML;
    if (product.placeholderText) {
        mediaHTML = `<div class="w-full h-full flex items-center justify-center bg-gray-50 text-gray-500 font-bold text-xl p-4 text-center group-hover:text-secondary transition-colors duration-300">${product.placeholderText}</div>`;
    } else if (product.image && typeof product.image === 'string') {
        const imageSrc = product.image.startsWith('http') ? product.image : rootPath + product.image.replace('./', '');
        
        // Try to use explicit WebP or infer it from the image path
        let webpSrc = product.imageWebp ? (product.imageWebp.startsWith('http') ? product.imageWebp : rootPath + product.imageWebp.replace('./', '')) : null;
        
        if (!webpSrc && !imageSrc.startsWith('http')) {
            // Infer WebP path: replace extension with .webp
            webpSrc = imageSrc.replace(/\.(png|jpg|jpeg)$/i, '.webp');
        }

        // Determine click action: Service pages trigger enquiry, others open image modal
        let clickAction = `openImageModal('${imageSrc}')`;
        if (window.location.pathname.includes('/Service_details/')) {
            const safeName = (product.name || '').replace(/'/g, "\\'");
            clickAction = `initiateSingleProductEnquiry('${safeName}')`;
        }

        const imgTag = `<img onclick="${clickAction}" src="${imageSrc}" alt="${product.name}" width="600" height="400" loading="lazy" decoding="async" class="w-full h-full ${imageClass} transition-transform duration-300 group-hover:scale-110 cursor-pointer">`;
        
        // Wrap in picture tag if WebP source is available (or inferred)
        mediaHTML = webpSrc ? `<picture class="w-full h-full block"><source srcset="${webpSrc.replace(/ /g, '%20')}" type="image/webp">${imgTag}</picture>` : imgTag;
    } else if (product.icon) {
        mediaHTML = `<div class="w-full h-full flex items-center justify-center bg-gray-50"><i class="${product.icon} text-6xl md:text-7xl text-gray-400 group-hover:text-secondary transition-colors duration-300"></i></div>`;
    } else {
        // Fallback for items with neither image nor icon
        mediaHTML = `<div class="w-full h-full flex items-center justify-center bg-gray-50"><i class="fa-solid fa-image text-4xl text-gray-200"></i></div>`;
    }

    return `
        <div id="${productId}" class="${cardWrapperClass}" ${compareDataAttributes}>
            <div class="${imageContainerClass} bg-white flex items-center justify-center relative overflow-hidden">
                ${mediaHTML}
                ${badgeHTML}
                ${shareHTML}
                ${pdfButtonHTML}
            </div>
            <div class="${contentClass}">
                ${compareCheckboxHTML}
                <h3 class="text-sm md:text-2xl font-bold text-gray-900 mb-1 md:mb-2 leading-tight">${product.name}</h3>
                ${product.description ? `<p class="text-xs md:text-sm text-gray-600 mb-2 md:mb-4 line-clamp-2">${product.description}</p>` : ''}
                <div class="relative group/specs w-full mb-1">
                    <button onclick="window.copyProductSpecs(this)" class="absolute top-0 right-0 md:right-2 text-gray-400 hover:text-secondary p-1.5 opacity-100 transition-opacity duration-200 z-10 bg-white/80 md:bg-transparent rounded-full md:rounded-none shadow-sm md:shadow-none" title="Copy Specifications">
                        <i class="fa-regular fa-copy"></i>
                    </button>
                    <ul oncontextmenu="return window.handleSpecsLongPress(this, event)" class="text-xs md:text-sm text-left text-gray-700 space-y-1 md:space-y-2 inline-block w-full px-1 md:px-4 hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer" title="Right Click/Long press to copy specifications">
                        ${specsHTML}
                    </ul>
                </div>
                <div class="text-[10px] text-gray-400 text-center mb-3 md:mb-6 italic select-none">
                    <i class="fa-regular fa-copy mr-1"></i> Right-click / Long-press to copy
                </div>
                <div class="flex flex-col gap-2 mt-auto product-actions-container">
                    ${actionsHTML}
                </div>
            </div>
        </div>
    `;
};

/**
 * Renders product cards into a specified container.
 * @param {string} containerId - The ID of the element to render cards into.
 * @param {Array<object>} products - An array of product data objects.
 */
window.renderProductCards = function(containerId, products) {
    const container = document.getElementById(containerId);
    if (container && products && Array.isArray(products)) {
        container.innerHTML = products.map(createProductCard).join('');
        
        // Check if any product has compare data
        const hasCompare = products.some(p => p.compare);

        if (hasCompare) {
            // After rendering cards, update the compare bar to find the new checkboxes and category.
            if (typeof window.updateCompareBar === 'function') {
                window.updateCompareBar();
            } else {
                // Dynamically load compare.js if it's missing (Router navigation case)
                const rootPath = (window.location.pathname.includes('/Product_details/') || window.location.pathname.includes('/Service_details/')) ? '../' : './';
                const script = document.createElement('script');
                script.src = `${rootPath}js/core/compare.js`;
                script.onload = () => {
                    if (typeof window.updateCompareBar === 'function') {
                        window.updateCompareBar();
                        // Also dispatch event after script load to be sure
                        window.dispatchEvent(new Event('products-rendered'));
                    }
                };
                document.body.appendChild(script);
            }
        }

        // Check for shared product highlight
        if (window.location.hash) {
            setTimeout(window.highlightSharedProduct, 500);
        }

        // Announce that products have been rendered so other components (like Compare Bar) can sync
        window.dispatchEvent(new Event('products-rendered'));
    }
};

// --- Auto-Render Logic (MutationObserver) ---
window.autoRenderProducts = function() {
    // Find all containers that have a key but haven't been rendered yet
    const containers = document.querySelectorAll('[data-product-key]:not([data-rendered])');
    
    containers.forEach(container => {
        if (!window.productData) return; // Data not ready yet

        const keyPath = container.getAttribute('data-product-key');
        // Resolve nested keys (e.g., "industrial-cutting-tools.grooveCutters")
        const data = keyPath.split('.').reduce((acc, part) => acc && acc[part], window.productData);

        if (data && container.id) {
            window.renderProductCards(container.id, data);
            container.setAttribute('data-rendered', 'true'); // Mark as done to prevent re-rendering
        }
    });
};

// Watch for DOM changes (Router navigation)
const observer = new MutationObserver((mutations) => {
    // If nodes were added, try to render
    if (mutations.some(m => m.addedNodes.length > 0)) {
        window.autoRenderProducts();
    }
});

// --- Image Modal Logic ---
document.addEventListener('DOMContentLoaded', () => {
    // Inject Modal HTML if not present
    if (!document.getElementById('image-modal')) {
        const modalHTML = `
            <div id="image-modal" class="fixed inset-0 z-[100] hidden bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300" onclick="if(event.target === this) closeImageModal()">
                <button onclick="closeImageModal()" class="absolute top-4 right-4 text-white/70 hover:text-white focus:outline-none z-50 transition-colors">
                    <i class="fa-solid fa-xmark text-4xl"></i>
                </button>
                <img id="modal-image" src="" alt="Product Preview" class="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl">
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // Start observing and run initial render
    window.autoRenderProducts();
    observer.observe(document.body, { childList: true, subtree: true });
});

window.openImageModal = function(src) {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    if (modal && modalImage) {
        modalImage.src = src;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
};

window.closeImageModal = function() {
    const modal = document.getElementById('image-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
};

document.addEventListener('keydown', function (event) {
    const modal = document.getElementById('image-modal');
    if (event.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
        closeImageModal();
    }
});

// --- Page Specific Logic: Handy Vibrators ---
// This ensures the layout is injected and data is pulled from product_data.js
(function() {
    window.initHandyVibratorPage = function() {
        if (window.location.pathname.includes('handy_vibration_models.html')) {
            const mainContainer = document.querySelector('main .max-w-7xl') || document.querySelector('.max-w-7xl.mx-auto.px-4.py-12');
            
            if (mainContainer && !document.getElementById('hv-standard')) {
                // Hide any existing static grids to avoid duplication
                const existingGrids = mainContainer.querySelectorAll('.grid');
                existingGrids.forEach(g => g.style.display = 'none');

                const html = `
                    <div class="animate-fade-in-up">
                        <div class="mb-12">
                            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3 border-b pb-2 border-gray-200">
                                <i class="fa-solid fa-bolt text-secondary"></i> Standard Handy Vibrators
                            </h2>
                            <div id="hv-standard" class="flex flex-wrap justify-center gap-6 [&>*]:w-full [&>*]:sm:w-[22rem]" data-product-key="handy-vibration-models.standard"></div>
                        </div>
                        
                        <div class="mb-12">
                            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3 border-b pb-2 border-gray-200">
                                <i class="fa-solid fa-wave-square text-secondary"></i> High Frequency Hand-Held Vibrator
                            </h2>
                            <div id="hv-hf" class="flex flex-wrap justify-center gap-6 [&>*]:w-full [&>*]:sm:w-[22rem]" data-product-key="handy-vibration-models.highFrequency"></div>
                        </div>
                    </div>
                `;
                mainContainer.insertAdjacentHTML('beforeend', html);
                
                // Trigger auto-render to fill the new containers using data from product_data.js
                if (typeof window.autoRenderProducts === 'function') {
                    window.autoRenderProducts();
                }
            }
        }
    };

    // Initialize on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.initHandyVibratorPage);
    } else {
        window.initHandyVibratorPage();
    }

    // Initialize on Router navigation
    window.addEventListener('router:navigation-complete', window.initHandyVibratorPage);
})();

// --- Specs Copy Logic ---
window.handleSpecsLongPress = function(element, event) {
    event.preventDefault();
    
    // Extract text from list items
    const specs = Array.from(element.querySelectorAll('li span'))
        .map(span => span.textContent.trim())
        .join('\n');

    if (specs) {
        navigator.clipboard.writeText(specs).then(() => {
            showCopyToast();
        }).catch(err => {
            console.error('Failed to copy specs:', err);
        });
    }
    return false;
};

// --- Copy Specs Button Logic ---
window.copyProductSpecs = function(button) {
    const container = button.closest('.relative');
    if (!container) return;
    
    const ul = container.querySelector('ul');
    if (ul) {
        const specs = Array.from(ul.querySelectorAll('li span'))
            .map(span => span.textContent.trim())
            .join('\n');

        if (specs) {
            navigator.clipboard.writeText(specs).then(() => {
                showCopyToast();
            }).catch(err => console.error('Failed to copy specs:', err));
        }
    }
};

function showCopyToast() {
    let toast = document.getElementById('specs-copy-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'specs-copy-toast';
        toast.className = 'fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg z-[100] transition-all duration-300 opacity-0 translate-y-4 flex items-center gap-2 text-sm font-bold pointer-events-none';
        toast.innerHTML = '<i class="fa-solid fa-check text-green-400"></i> Specs Copied!';
        document.body.appendChild(toast);
    }
    toast.classList.remove('opacity-0', 'translate-y-4');
    if (window.copyToastTimeout) clearTimeout(window.copyToastTimeout);
    window.copyToastTimeout = setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-4');
    }, 2000);
}

// --- Share Logic ---
window.shareProduct = function(productName) {
    const productId = productName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const shareData = {
        title: 'Check out this product from Srinithya Engineering',
        text: `I found this ${productName} interesting:`,
        url: `${window.location.origin}${window.location.pathname}#${productId}`
    };

    if (navigator.share) {
        navigator.share(shareData).catch(console.error);
    } else {
        // Fallback to clipboard
        navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        window.showToast('Link copied to clipboard!', 'info');
    }
};

// --- Highlight Shared Product Logic ---
window.highlightSharedProduct = function() {
    const hash = window.location.hash.substring(1);
    if (!hash) return;

    const element = document.getElementById(hash);
    if (element) {
        // Scroll with offset for fixed header
        const headerOffset = 120;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });

        // Add highlight effect
        element.classList.add('product-highlight-pulse');
        
        // Clean URL to hide the hash while keeping the user on the page
        history.replaceState(null, null, window.location.pathname + window.location.search);

        // Remove after 5 seconds
        setTimeout(() => {
            element.classList.remove('product-highlight-pulse');
        }, 5000);
    }
};

// --- Recently Viewed Logic ---
window.initRecentlyViewed = function() {
    const path = window.location.pathname;
    // Only track product detail pages
    if (!path.includes('/Product_details/')) return;

    // Get Page Title (Clean up the document title)
    const title = document.title.split('|')[0].replace('Srinithya Engineering', '').trim() || 'Machinery';

    // 1. Update History in LocalStorage
    let history = JSON.parse(localStorage.getItem('sepl_history') || '[]');
    
    // Remove current page if it exists (to move it to the top)
    history = history.filter(h => h.path !== path);
    
    // Add current page to top
    history.unshift({ title: title, path: path });
    
    // Keep only last 5 items
    if (history.length > 5) history.pop();
    
    localStorage.setItem('sepl_history', JSON.stringify(history));

    // 2. Render "Recently Viewed" Section
    const others = history.filter(h => h.path !== path);
    if (others.length === 0) return;

    const container = document.createElement('div');
    container.className = 'max-w-7xl mx-auto px-4 py-8 border-t border-gray-200 mt-12 animate-fade-in-up';
    container.innerHTML = `
        <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><i class="fa-solid fa-clock-rotate-left text-secondary"></i> Recently Viewed</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            ${others.map(item => `
                <a href="${item.path}" class="block p-3 bg-white border border-gray-100 rounded-lg hover:border-primary hover:shadow-md transition group">
                    <div class="text-xs font-bold text-gray-700 group-hover:text-primary truncate">${item.title}</div>
                    <div class="text-[10px] text-gray-500 mt-1 flex items-center gap-1">View <i class="fa-solid fa-arrow-right text-[8px]"></i></div>
                </a>
            `).join('')}
        </div>
    `;
    
    const main = document.querySelector('main');
    if (main) main.appendChild(container);
};

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initRecentlyViewed);
} else {
    window.initRecentlyViewed();
}

// Listen for hash changes to trigger highlight (e.g. same-page navigation)
window.addEventListener('hashchange', () => {
    setTimeout(window.highlightSharedProduct, 500);
});

// --- PDF Generation for Single Product Catalogue ---

function loadPdfLibs() {
    // Check if both jspdf and autotable plugin are loaded
    if (window.jspdf && window.jspdf.jsPDF && typeof window.jspdf.jsPDF.API.autoTable === 'function') {
        return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
        const script1 = document.createElement('script');
        script1.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
        script1.onload = () => {
            const script2 = document.createElement('script');
            script2.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js";
            script2.onload = resolve;
            script2.onerror = reject;
            document.head.appendChild(script2);
        };
        script1.onerror = reject;
        document.head.appendChild(script1);
    });
}

function flattenProductsForCatalogue(data) {
    let all = [];
    for (const [category, items] of Object.entries(data)) {
        if (Array.isArray(items)) {
            items.forEach(item => {
                item.category = category;
                all.push(item);
            });
        } else if (typeof items === 'object' && items !== null) {
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

window.downloadProductCatalogue = async function(event, productIdentifier) {
    const btn = event.target.closest('button');
    if (!btn) return;

    const originalText = btn.innerHTML;
    const isIconBtn = btn.classList.contains('rounded-full');
    btn.innerHTML = isIconBtn ? '<i class="fa-solid fa-spinner fa-spin"></i>' : '<i class="fa-solid fa-spinner fa-spin"></i> Generating...';
    btn.disabled = true;

    try {
        await loadPdfLibs();
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const products = flattenProductsForCatalogue(window.productData);
        const product = products.find(p => p.model === productIdentifier || p.name === productIdentifier);

        if (!product) {
            alert("Could not find product data to generate PDF.");
            throw new Error("Product not found");
        }

        const rootPath = (window.location.pathname.includes('/Product_details/') || window.location.pathname.includes('/Service_details/')) ? '../' : './';

        // 1. Header: Logo & Company Name
        const logoUrl = rootPath + "Assets/Others/logo.png";
        const companyName = "SRINITHYA ENGINEERING PRIVATE LIMITED";
        let yPos = 20;

        const loadImage = (url) => new Promise(resolve => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
            img.src = url;
        });

        const logoImg = await loadImage(logoUrl);
        if (logoImg) {
            doc.addImage(logoImg, 'PNG', 15, 15, 30, 15);
        }

        doc.setFont("times", "bold");
        doc.setFontSize(20);
        doc.setTextColor('#1e3a8a');
        doc.text(companyName, doc.internal.pageSize.getWidth() / 2, 25, { align: "center" });
        yPos = 45;

        // 2. Product Photo (Centered)
        if (product.image) {
            const productImageUrl = product.image.startsWith('http') ? product.image : rootPath + product.image.replace('./', '');
            const pImg = await loadImage(productImageUrl);
            if (pImg) {
                const maxW = 100;
                const maxH = 80;
                const ratio = Math.min(maxW / pImg.width, maxH / pImg.height);
                const imgW = pImg.width * ratio;
                const imgH = pImg.height * ratio;
                const xPos = (doc.internal.pageSize.getWidth() - imgW) / 2;
                doc.addImage(pImg, 'JPEG', xPos, yPos, imgW, imgH);
                yPos += imgH + 15;
            }
        }

        // 3. Product Name & Specs Table
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text(product.name, doc.internal.pageSize.getWidth() / 2, yPos, { align: "center" });
        yPos += 10;

        const tableBody = (product.specs || []).map(spec => [spec.text.replace(/<[^>]*>/g, '')]); // Strip any HTML from spec text
        doc.autoTable({
            startY: yPos,
            head: [['Specifications']],
            body: tableBody,
            theme: 'grid',
            headStyles: { fillColor: '#1e3a8a', halign: 'center' },
            styles: { fontSize: 11, cellPadding: 3 },
        });

        const fileName = `${product.name.replace(/[^a-z0-9]/gi, '_')}_Catalogue.pdf`;
        doc.save(fileName);

    } catch (error) {
        console.error("PDF Generation Failed:", error);
        alert("Sorry, there was an error generating the PDF catalogue.");
    } finally {
        if (btn) {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    }
}