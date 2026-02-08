/**
 * Universal Compare Logic (Category-based)
 * Save this file as compare.js in your root folder.
 */

(function() {
// UI Templates for dynamic injection
const COMPARE_BAR_HTML = `
<div id="compare-bar" class="fixed bottom-0 left-0 w-full bg-white border-t-4 border-secondary shadow-[0_-4px_20px_rgba(0,0,0,0.15)] z-40 transform translate-y-full transition-transform duration-300 hidden">
    <div class="w-full px-4 py-3 pr-32 md:pr-48 flex flex-wrap items-center gap-4">
        <div class="flex items-center gap-2">
            <div class="bg-primary text-white font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0" id="compare-count">0</div>
            <span class="font-semibold text-gray-700">Models Selected</span>
            <div class="h-6 w-px bg-gray-300 mx-2 hidden md:block"></div>
        </div>
        <div id="compare-items-preview" class="flex flex-wrap gap-2"></div>
        <div class="flex items-center gap-3">
            <button onclick="clearCompare()" class="text-red-600 hover:text-red-800 font-medium text-sm flex items-center gap-1 transition-colors whitespace-nowrap" title="Clear All">
                <i class="fa-solid fa-xmark"></i> Clear All
            </button>
            <button id="compare-now-btn" onclick="showCompareModal()" class="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-sm">
                Compare
            </button>
        </div>
    </div>
</div>`;

const COMPARE_MODAL_HTML = `
<div id="compare-modal" class="fixed inset-0 z-[100] hidden flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-opacity duration-300" onclick="if(event.target === this) closeCompareModal()">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden relative animate-fade-in-up">
        <div class="p-4 border-b flex justify-between items-center bg-gray-50">
            <h3 class="text-xl font-bold text-gray-800"><i class="fa-solid fa-scale-balanced text-secondary mr-2"></i>Compare Models</h3>
            <button onclick="closeCompareModal()" class="text-gray-500 hover:text-red-500 transition focus:outline-none">
                <i class="fa-solid fa-xmark text-2xl"></i>
            </button>
        </div>
        <div class="p-6 overflow-auto flex-grow" id="compare-modal-body">
            <!-- Table injected here -->
        </div>
        <div class="p-4 border-t bg-gray-50 text-right">
            <button onclick="closeCompareModal()" class="px-6 py-2 bg-gray-200 text-gray-700 font-bold rounded hover:bg-gray-300 transition">Close</button>
        </div>
    </div>
</div>`;

const COMPARE_STORAGE_KEY = 'srinithya_compare_storage';

// Expose init function for Router to call
window.initCompare = function() {
    // Cleanup old elements to ensure we render the latest version on init
    const existingBar = document.getElementById('compare-bar');
    if (existingBar) existingBar.remove();
    const existingModal = document.getElementById('compare-modal');
    if (existingModal) existingModal.remove();

    injectCompareUI();
    updateCompareBar();
    // Re-attach observer if needed (though the global one persists)
    if (window.compareObserver && document.body) {
        window.compareObserver.disconnect();
        window.compareObserver.observe(document.body, { childList: true, subtree: true });
    }
}
 
function injectCompareUI() {
    if (!document.getElementById('compare-bar')) {
        document.body.insertAdjacentHTML('beforeend', COMPARE_BAR_HTML);
    }
    if (!document.getElementById('compare-modal')) {
        document.body.insertAdjacentHTML('beforeend', COMPARE_MODAL_HTML);
    }
}

function getStorageData() {
    try {
        const data = JSON.parse(localStorage.getItem(COMPARE_STORAGE_KEY));
        return (data && typeof data === 'object' && !Array.isArray(data)) ? data : {};
    } catch (e) {
        return {};
    }
}

function getCompareList(category) {
    if (!category) return [];
    const data = getStorageData();
    return Array.isArray(data[category]) ? data[category] : [];
}

function saveCompareList(category, list) {
    if (!category) return;
    const data = getStorageData();
    data[category] = list;
    localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(data));
}

function getCurrentPageCategory() {
    // Find all unique categories on the page
    const elements = document.querySelectorAll('[data-category]');
    if (elements.length === 0) return null;

    const categories = [...new Set(Array.from(elements).map(el => el.dataset.category))];

    // If multiple categories, prioritize the one with active items
    if (categories.length > 1) {
        const data = getStorageData();
        const active = categories.find(cat => data[cat] && data[cat].length > 0);
        if (active) return active;
    }

    return categories[0];
}

// 1. Toggle Compare (Attached to Checkboxes)
window.toggleCompare = function(checkbox) {
    const card = checkbox.closest('[data-model]');
    if (!card) return;
    const model = card.dataset.model;
    if (!model) return;
    
    // Use the category from the card, or fallback to page category
    const category = card.dataset.category || getCurrentPageCategory();
    if (!category) return;

    let compareItems = getCompareList(category);

    if (checkbox.checked) {
        if (compareItems.length >= 4) {
            alert("You can only compare up to 4 models at a time.");
            checkbox.checked = false;
            return;
        }
        
        const specs = { 'Model': model, 'Category': category };
        // Get Image for preview
        const img = card.querySelector('img');
        if(img && card.dataset.previewImage !== 'false') specs['Image'] = img.src;

        // Get all data attributes dynamically
        for (const key in card.dataset) {
            if (key === 'model' || key === 'previewImage' || key === 'category') continue;
            // Format key: camelCase to Title Case
            const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            specs[label] = card.dataset[key];
        }
        
        // Prevent duplicates
        if (!compareItems.some(item => item.Model === model)) {
            compareItems.push(specs);
        }
    } else {
        compareItems = compareItems.filter(item => item.Model !== model);
    }
    
    saveCompareList(category, compareItems);
    updateCompareBar();
};

window.removeCompareItem = function(model) {
    const category = getCurrentPageCategory();
    if (!category) return;

    let compareItems = getCompareList(category);
    compareItems = compareItems.filter(item => item.Model !== model);
    
    saveCompareList(category, compareItems);
    updateCompareBar();

    // Refresh modal if open
    const modal = document.getElementById('compare-modal');
    if (modal && !modal.classList.contains('hidden')) {
        if (compareItems.length < 2) {
            closeCompareModal();
        } else {
            showCompareModal();
        }
    }
};

window.removeRowWithAnimation = function(btn) {
    const row = btn.closest('tr');
    if (row) {
        row.style.transition = 'all 0.3s ease-out';
        row.style.opacity = '0';
        row.style.transform = 'translateX(-10px)';
        setTimeout(() => row.remove(), 300);
    }
};

// 2. Update Floating Bar UI
window.updateCompareBar = function() {
    injectCompareUI(); // Ensure UI exists before trying to access it

    const category = getCurrentPageCategory();
    const compareBar = document.getElementById('compare-bar');
    const compareCount = document.getElementById('compare-count');
    const compareNowBtn = document.getElementById('compare-now-btn');
    const previewContainer = document.getElementById('compare-items-preview');

    // If not on a category page, hide the bar
    if (!category || !compareBar) {
        if (compareBar) {
            compareBar.classList.add('hidden');
            compareBar.classList.add('translate-y-full');
        }
        return;
    }

    const compareItems = getCompareList(category);

    // Sync checkboxes
    document.querySelectorAll('.compare-checkbox').forEach(cb => {
        const card = cb.closest('[data-model]');
        if (card) {
            const model = card.dataset.model;
            cb.checked = compareItems.some(item => item.Model === model);
        }
    });

    if (compareItems.length > 0) {
        compareBar.classList.remove('hidden');
        setTimeout(() => compareBar.classList.remove('translate-y-full'), 10);
    } else {
        compareBar.classList.add('translate-y-full');
        setTimeout(() => compareBar.classList.add('hidden'), 300);
    }

    if (compareCount) compareCount.textContent = compareItems.length;
    
    if (previewContainer) {
        previewContainer.innerHTML = compareItems.map(item => `
            <span class="bg-gray-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center">
                ${item.Model}
                <button onclick="removeCompareItem('${item.Model}')" class="ml-2 hover:text-red-300 focus:outline-none font-bold" title="Remove">&times;</button>
            </span>
        `).join('');
    }

    if (compareNowBtn) compareNowBtn.disabled = compareItems.length < 2;
};

window.clearCompare = function() {
    const category = getCurrentPageCategory();
    if (category) {
        saveCompareList(category, []);
        document.querySelectorAll('.compare-checkbox').forEach(cb => cb.checked = false);
        updateCompareBar();
    }
};

window.showCompareModal = function() {
    const category = getCurrentPageCategory();
    if (!category) return;
    
    const compareItems = getCompareList(category);
    if (compareItems.length < 2) return;

    const modal = document.getElementById('compare-modal');
    const modalBody = document.getElementById('compare-modal-body');
    
    // Extract all unique keys
    let allKeys = [];
    compareItems.forEach(item => {
        Object.keys(item).forEach(key => {
            if (key !== 'Model' && key !== 'Image' && key !== 'Category' && !allKeys.includes(key)) {
                allKeys.push(key);
            }
        });
    });

    let html = `
        <div class="flex justify-end mb-2">
            <button onclick="showCompareModal()" class="text-sm text-gray-500 hover:text-primary transition-colors flex items-center gap-1">
                <i class="fa-solid fa-rotate-left"></i> Restore Hidden Rows
            </button>
        </div>
        <div class="overflow-x-auto"><table class="w-full border-collapse text-left text-sm">`;
    
    // Header (Models)
    html += '<thead><tr><th class="p-3 border-b-2 border-gray-200 font-bold text-primary bg-gray-50">Feature</th>';
    compareItems.forEach(item => {
        html += `<th class="p-3 border-b-2 border-gray-200 font-bold text-primary text-center bg-gray-50 relative">
            <button onclick="removeCompareItem('${item.Model}')" class="absolute top-1 right-1 text-gray-400 hover:text-red-500 p-1" title="Remove">
                <i class="fa-solid fa-circle-xmark text-lg"></i>
            </button>
            ${item.Image ? `<img src="${item.Image}" class="h-16 mx-auto mb-2 object-contain">` : ''}
            <div class="mt-2">${item.Model}</div>
        </th>`;
    });
    html += '</tr></thead><tbody>';

    // Rows
    allKeys.forEach(key => {
        html += `<tr class="hover:bg-gray-50 even:bg-gray-50 group">
            <td class="p-3 border-b border-gray-200 font-semibold text-gray-700 relative pl-8">
                <button onclick="removeRowWithAnimation(this)" class="absolute left-2 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700 transition-colors" title="Remove attribute">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                ${key}
            </td>`;
        compareItems.forEach(item => {
            html += `<td class="p-3 border-b border-gray-200 text-center text-gray-600">${item[key] || '-'}</td>`;
        });
        html += '</tr>';
    });

    html += '</tbody></table></div>';
    
    if (modalBody) modalBody.innerHTML = html;
    if (modal) modal.classList.remove('hidden');
};

window.closeCompareModal = function() {
    const modal = document.getElementById('compare-modal');
    if (modal) modal.classList.add('hidden');
};

// 3. Auto-Sync with DOM Changes (MutationObserver)
// This ensures the compare bar updates whenever new products are injected (Router, Search, etc.)
window.compareObserver = new MutationObserver((mutations) => {
    // Filter out mutations happening inside the compare bar or modal to avoid loops
    const relevantMutations = mutations.filter(m => {
        const target = m.target;
        // Ensure target is an element for .closest() check
        const el = target.nodeType === 1 ? target : target.parentElement;
        return el && !el.closest('#compare-bar') && !el.closest('#compare-modal');
    });

    if (relevantMutations.length > 0) {
        if (window.compareDebounceTimer) clearTimeout(window.compareDebounceTimer);
        window.compareDebounceTimer = setTimeout(() => {
            window.updateCompareBar();
        }, 200);
    }
});

if (document.body) {
    window.compareObserver.observe(document.body, { childList: true, subtree: true });
}

// Listen for Router navigation events (Ensures sync after page swap)
window.addEventListener('router:navigation-complete', () => {
    updateCompareBar();
});

// Listen for Product Renderer events (The most reliable trigger)
window.addEventListener('products-rendered', () => {
    updateCompareBar();
});

// Initialize if already loaded (Router scenario)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.initCompare());
} else {
    window.initCompare();
}

})();