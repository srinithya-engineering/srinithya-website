(function() {
    window.initFooter = function() {
        // Prevent duplicate footers if one already exists
        if (document.querySelector('footer')) return;

        // Determine path prefix based on current location
        const isProductPage = window.location.pathname.includes('/Product_details/') || window.location.pathname.includes('/Service_details/');
        const rootPath = isProductPage ? '../' : './';
        
        // Using bg-gray-900 (standard Tailwind) instead of bg-dark to ensure visibility
        const footerHTML = `
        <footer class="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
            <div class="max-w-7xl mx-auto px-4 grid md:grid-cols-12 gap-8 mb-8">
                <div class="md:col-span-3">
                    <h4 class="text-white text-lg font-bold mb-4">Srinithya Engineering</h4>
                    <p class="text-sm text-gray-400">Manufacturer and trader of Heavy-duty Construction Machinery and Light Construction Equipment.</p>
                </div>
                <div class="md:col-span-2">
                    <h4 class="text-white text-lg font-bold mb-4">Quick Links</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="${rootPath}index.html" class="hover:text-secondary transition">Home</a></li>
                        <li><a href="${rootPath}about.html" class="hover:text-secondary transition">About Us</a></li>
                        <li><a href="${rootPath}index.html#products" class="hover:text-secondary transition">Products</a></li>
                        <li><a href="${rootPath}services.html" class="hover:text-secondary transition">Services</a></li>
                    </ul>
                </div>
                <div class="md:col-span-4">
                    <h4 class="text-white text-lg font-bold mb-4">Contact</h4>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><i class="fa-solid fa-phone mr-2 text-secondary"></i> <a href="tel:+919059239819" class="hover:text-white transition">+91 9059-23-9819</a></li>
                        <li><i class="fa-solid fa-envelope mr-2 text-secondary"></i> <a href="mailto:sales@srinithyaepl.in" class="text-secondary hover:text-white transition">sales@srinithyaepl.in</a></li>
                        <li class="flex items-start"><i class="fa-solid fa-location-dot mr-3 text-secondary mt-1"></i> <span># 9-95/8 Jyothi Nagar Colony,Balaji Nagar,<br>Jawahar Nagar Municipality, Kapra Mandal,<br>Hyderabad, Telangana - 500087, India. <a href="https://maps.app.goo.gl/DXrXoucK7vEquaW98" target="_blank" class="ml-1 text-secondary hover:text-white transition" title="View on Map"><i class="fa-solid fa-map-location-dot"></i></a></span></li>
                        <li><i class="fa-solid fa-id-card mr-1 text-secondary"></i> CIN: U51909TG2020PTC139942</li>
                        <li><i class="fa-solid fa-receipt mr-2 text-secondary"></i> GSTIN: 36ABDCS5864M1ZP</li>
                    </ul>
                </div>
                <div class="md:col-span-3">
                    <h4 class="text-white text-lg font-bold mb-4">Follow Us</h4>
                    <div class="flex space-x-4">
                        <a href="https://www.facebook.com/SRINITHYAEPL/" target="_blank" aria-label="Follow us on Facebook" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition"><i class="fa-brands fa-facebook-f" aria-hidden="true"></i></a>
                        <a href="https://www.linkedin.com/company/srinithyaepl/" target="_blank" aria-label="Follow us on LinkedIn" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-500 hover:text-white transition"><i class="fa-brands fa-linkedin-in" aria-hidden="true"></i></a>
                        <a href="https://www.instagram.com/srinithyaepl/" target="_blank" aria-label="Follow us on Instagram" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white transition"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a>
                        <a href="https://www.youtube.com/@srinithyaengineering" target="_blank" aria-label="Follow us on YouTube" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition"><i class="fa-brands fa-youtube" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
            <div class="max-w-7xl mx-auto px-4 text-center border-t border-gray-800 pt-8 text-sm text-gray-500">
                <p>&copy; 2025 SRINITHYA ENGINEERING PRIVATE LIMITED. All rights reserved.</p>
            </div>
        </footer>
        `;

        // Insert before the WhatsApp button if it exists, otherwise at the end of body
        const whatsappBtn = document.getElementById('whatsapp-btn');
        if (whatsappBtn) {
            whatsappBtn.insertAdjacentHTML('beforebegin', footerHTML);
        } else {
            document.body.insertAdjacentHTML('beforeend', footerHTML);
        }
    }

    // Ensure DOM is ready before running
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.initFooter);
    } else {
        window.initFooter();
    }
})();
