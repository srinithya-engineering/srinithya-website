// cart.js - Centralized Cart Logic

// Initialize cart from local storage
let cart = JSON.parse(localStorage.getItem('sepl_cart')) || [];

// --- Core Cart Functions ---

function saveCart() {
    localStorage.setItem('sepl_cart', JSON.stringify(cart));
}

function updateCartBadge() {
    const count = cart.reduce((acc, item) => acc + item.qty, 0);
    
    ['cart-badge', 'mobile-cart-badge'].forEach(id => {
        const badge = document.getElementById(id);
        if (badge) {
            if (count > 0) {
                badge.textContent = count;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }
    });
}

function addToCart(name) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ name, qty: 1 });
    }
    saveCart();
    updateCartBadge();
    renderCart();
    updateCardQuantities();
    
    // Optional: Toast notification logic if showToast is defined
    if (typeof showToast === 'function') {
        showToast(`${name} added to tray`);
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
    updateCartBadge();
    updateCardQuantities();
}

function clearCart() {
    cart = [];
    saveCart();
    renderCart();
    updateCartBadge();
    updateCardQuantities();
}

function updateQty(index, change) {
    if (cart[index].qty + change > 0) {
        cart[index].qty += change;
    } else {
        cart.splice(index, 1);
    }
    saveCart();
    renderCart();
    updateCartBadge();
    updateCardQuantities();
}

// --- UI Update Functions ---

function updateItemQty(name, change) {
    const itemIndex = cart.findIndex(i => i.name === name);
    if (itemIndex !== -1) {
        if (cart[itemIndex].qty + change > 0) {
            cart[itemIndex].qty += change;
        } else {
            cart.splice(itemIndex, 1);
        }
        saveCart();
        renderCart();
        updateCartBadge();
        updateCardQuantities();
    }
}

function updateCardQuantities() {
    const buttons = document.querySelectorAll('button[onclick^="addToCart"]');
    buttons.forEach(btn => {
        const match = btn.getAttribute('onclick').match(/addToCart\(['"]((?:[^'"]|\\.)*)['"]/);
        if (match) {
            // Unescape the name captured from the onclick string to match the stored name
            const name = match[1].replace(/\\'/g, "'");
            // Escape single quotes for the inline onclick handler to prevent syntax errors
            const safeName = name.replace(/'/g, "\\'");
            const item = cart.find(i => i.name === name);
            const qty = item ? item.qty : 0;
            
            // Find or create wrapper
            let wrapper = btn.closest('.action-wrapper');
            if (!wrapper) {
                wrapper = document.createElement('div');
                wrapper.className = 'action-wrapper w-full mt-auto';
                btn.parentNode.insertBefore(wrapper, btn);
                wrapper.appendChild(btn);
            }
            
            let control = wrapper.querySelector('.qty-control');
            
            if (qty > 0) {
                btn.classList.add('hidden');
                if (!control) {
                    control = document.createElement('div');
                    control.className = 'qty-control flex items-center justify-between w-full border border-secondary rounded overflow-hidden bg-white shadow-sm';
                    // Use updateItemQty for both + and - to ensure consistent behavior and no limits
                    control.innerHTML = `<button onclick="updateItemQty('${safeName}', -1)" class="px-4 py-2 bg-gray-50 hover:bg-gray-200 text-gray-700 transition font-bold border-r border-gray-200">-</button><span class="font-bold text-primary flex-grow text-center qty-display bg-white py-2">${qty}</span><button onclick="updateItemQty('${safeName}', 1)" class="px-4 py-2 bg-secondary text-white hover:bg-yellow-600 transition font-bold border-l border-secondary">+</button>`;
                    wrapper.appendChild(control);
                } else { 
                    control.querySelector('.qty-display').textContent = qty; 
                    control.classList.remove('hidden'); 
                }
            } else { 
                btn.classList.remove('hidden'); 
                if (control) control.classList.add('hidden'); 
            }
            // Remove old badge if exists
            const oldBadge = btn.parentNode.querySelector('.cart-qty-display'); 
            if(oldBadge) oldBadge.remove();
        }
    });
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    const panel = document.getElementById('cart-panel');
    if (modal && panel) {
        if (modal.classList.contains('hidden')) {
            modal.classList.remove('hidden');
            renderCart();
            setTimeout(() => panel.classList.remove('translate-x-full'), 10);
        } else {
            panel.classList.add('translate-x-full');
            setTimeout(() => modal.classList.add('hidden'), 300);
        }
    }
}

function renderCart() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    if (!container) return;
    
    // Update Clear Button State
    const clearBtn = document.getElementById('clear-cart-btn');
    if (clearBtn) {
        clearBtn.disabled = cart.length === 0;
    }
    
    if (cart.length === 0) {
        container.innerHTML = '<div class="flex flex-col items-center justify-center h-full text-gray-400"><i class="fa-solid fa-basket-shopping text-6xl mb-4"></i><p>Your selection tray is empty.</p></div>';
        return;
    }
    
    let html = '';
    cart.forEach((item, index) => {
        html += `<div class="bg-white p-4 rounded-lg shadow-sm mb-3 border border-gray-100"><div class="flex justify-between items-start mb-2"><h3 class="font-bold text-gray-800">${item.name}</h3><button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-700"><i class="fa-solid fa-trash"></i></button></div><div class="flex justify-end items-center"><div class="flex items-center border rounded"><button onclick="updateQty(${index}, -1)" class="px-2 py-1 hover:bg-gray-100 text-gray-600">-</button><span class="px-2 py-1 font-medium text-sm w-8 text-center">${item.qty}</span><button onclick="updateQty(${index}, 1)" class="px-2 py-1 hover:bg-gray-100 text-gray-600">+</button></div></div></div>`;
    });
    container.innerHTML = html;
}

let pendingEnquiryProduct = null;

window.initiateSingleProductEnquiry = function(productName) {
    pendingEnquiryProduct = productName;
    const modal = document.getElementById('name-input-modal');
    if (modal) {
        modal.classList.remove('hidden');
        const input = document.getElementById('whatsapp-name-input');
        if (input) {
            input.focus();
            validateNameInput(); // Validate on open to ensure button is disabled
        }
    }
}

function sendRequirementToWhatsapp() {
    pendingEnquiryProduct = null; // Reset to ensure we are sending cart
    if (cart.length === 0) {
        if (typeof openEmptyCartModal === 'function') {
            openEmptyCartModal();
        } else {
            if(typeof showToast === 'function') showToast("Please add items to the estimate first.", "error");
        }
        return;
    }
    const modal = document.getElementById('name-input-modal');
    if (modal) {
        modal.classList.remove('hidden');
        const input = document.getElementById('whatsapp-name-input');
        if (input) {
            input.focus();
            validateNameInput(); // Validate on open to ensure button is disabled
        }
    }
}

window.validateNameInput = function() {
    const input = document.getElementById('whatsapp-name-input');
    const sendBtn = document.getElementById('confirm-whatsapp-btn');
    if (input && sendBtn) {
        sendBtn.disabled = input.value.trim() === '';
    }
}

window.closeNameInputModal = function() {
    const modal = document.getElementById('name-input-modal');
    if (modal) {
        modal.classList.add('hidden');
        const input = document.getElementById('whatsapp-name-input');
        if (input) input.value = ''; // Clear input
        validateNameInput(); // Re-disable button
    }
}

window.confirmSendWhatsapp = function() {
    const input = document.getElementById('whatsapp-name-input');
    let userName = input ? input.value.trim() : "";
    if (userName === "") {
        // This should not happen if the button is disabled, but it's a good fallback.
        if(typeof showToast === 'function') showToast("Please enter your name.", "error");
        return;
    }

    let message = "";
    if (pendingEnquiryProduct) {
        // Single Product Enquiry
        message = `Hi There, I am "${userName}" we have requirement of ${pendingEnquiryProduct}.`;
    } else {
        // Cart Enquiry
        message = `Hi Srinithya! I am ${userName} and I am sending this message from your website, we have requirement for the items below:\n`;
        cart.forEach((item, index) => {
            message += `${index + 1}. ${item.name} - ${item.qty}Nos\n`;
        });
    }

    const phoneNumber = "919059239819";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    
    // If this was a cart enquiry (not single product), close the cart sidebar as well
    if (!pendingEnquiryProduct) {
        const cartModal = document.getElementById('cart-modal');
        if (cartModal && !cartModal.classList.contains('hidden')) {
            toggleCart();
        }
    }

    pendingEnquiryProduct = null; // Reset
    closeNameInputModal();
}

// --- Initialization ---
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        updateCartBadge();
        updateCardQuantities();
    }, 500);
});

// Expose core cart functions to global scope
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQty = updateQty;
window.updateItemQty = updateItemQty;
window.toggleCart = toggleCart;
window.clearCart = clearCart;
window.sendRequirementToWhatsapp = sendRequirementToWhatsapp;
