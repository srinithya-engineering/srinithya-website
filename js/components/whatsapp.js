document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject CSS for animations
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes total-flash {
            50% { transform: scale(1.1); color: #d97706; }
        }
        .flash-animation {
            animation: total-flash 0.5s ease-in-out;
        }
    `;
    document.head.appendChild(style);

    // 2. Inject HTML for Button and Modal
    const whatsappHTML = `
        <!-- Callback Success Modal -->
        <div id="callback-modal" class="fixed inset-0 flex items-center justify-center z-[60] hidden">
            <div class="absolute inset-0 bg-black opacity-50"></div>
            <div class="bg-white p-6 rounded-lg shadow-2xl z-10 max-w-sm mx-4 text-center transform transition-all scale-100">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fa-solid fa-check text-2xl text-green-600"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Request Submitted!</h3>
                <p class="text-gray-600 mb-6">Your callback request has been submitted.<br>Please wait for one of our representatives to call you.</p>
                <div class="w-full bg-gray-200 rounded-full h-1.5 mb-4 overflow-hidden">
                    <div id="modal-progress-bar" class="bg-green-500 h-1.5 rounded-full w-full"></div>
                </div>
                <button id="close-modal-btn" class="bg-primary text-white px-6 py-2 rounded hover:bg-blue-800 transition w-full">Okay</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', whatsappHTML);

    // 3. Event Listeners for Modal
    const closeModalBtn = document.getElementById('close-modal-btn');
    const callbackModal = document.getElementById('callback-modal');
    
    if (closeModalBtn && callbackModal) {
        closeModalBtn.addEventListener('click', () => {
            callbackModal.classList.add('hidden');
        });
        
        // Close on background click
        callbackModal.addEventListener('click', (e) => {
            if (e.target.classList.contains('bg-black') || e.target === callbackModal) {
                callbackModal.classList.add('hidden');
            }
        });
    }
});