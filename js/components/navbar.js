// Automatically inject the Outfit font with all weights (including 900 for extra thickness)
(function() {
    // We append the link to ensure weight 900 is available, even if a previous link exists
    var link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
})();

function getRootPath() {
    // A simpler, more direct approach based on the URL path. If the path contains '/Product_details/', we are in a subdirectory.
    return (window.location.pathname.includes('/Product_details/') || window.location.pathname.includes('/Service_details/')) ? '../' : './';
}

window.updateNavbarLinks = function() {
    const newRootPath = getRootPath();
    const navLinks = document.getElementById('nav-links');
    const mobileMenu = document.getElementById('mobile-menu');
    const brandWrapper = document.getElementById('brand-wrapper');
    const logo = document.getElementById('nav-logo');

    // Helper to update a single link
    const updateLink = (anchor) => {
        const href = anchor.getAttribute('href');
        if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
        
        // Strip existing prefix (./ or ../)
        const cleanHref = href.replace(/^(\.\/|\.\.\/)/, '');
        anchor.setAttribute('href', newRootPath + cleanHref);
    };

    // Update Logo Link
    if (brandWrapper) updateLink(brandWrapper);
    
    // Update Logo Image Src
    if (logo) {
        const src = logo.getAttribute('src');
        const cleanSrc = src.replace(/^(\.\/|\.\.\/)/, '');
        logo.setAttribute('src', newRootPath + cleanSrc);
        
        // Also update the source tag if it exists (for WebP)
        const picture = logo.closest('picture');
        if (picture) {
            const source = picture.querySelector('source');
            if (source && source.srcset) {
                const cleanSrcset = source.srcset.replace(/^(\.\/|\.\.\/)/, '');
                source.srcset = newRootPath + cleanSrcset;
            }
        }
    }

    // Update Desktop Links
    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(updateLink);
    }

    // Update Mobile Links
    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(updateLink);
    }
};

const rootPath = getRootPath(),
    navbarHTML = `
    <nav class="bg-white/90 backdrop-blur-md border-b border-gray-200/50 fixed w-full z-50 transition-all duration-300 ease-in-out will-change-transform transform-gpu" id="navbar">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:grid md:grid-cols-1 transition-all duration-300 ease-in-out" id="nav-container">
                <div class="flex justify-between items-center py-2 transition-all duration-300 ease-in-out w-full" id="top-bar">
                <a href="${rootPath}index.html" class="flex items-center relative group flex-1 transition-all duration-300 ease-in-out cursor-pointer min-w-0" id="brand-wrapper">
                    <picture class="mr-1 relative z-20 flex-shrink-0">
                        <source srcset="${rootPath}Assets/Others/logo.webp" type="image/webp">
                        <img src="${rootPath}Assets/Others/logo.png" alt="Srinithya Engineering Logo" class="h-12 md:h-16 w-auto transition-all duration-300 ease-in-out" width="64" height="64" id="nav-logo">
                    </picture>
                    <div class="relative pl-0 pr-1 py-1 flex-grow text-center transition-all duration-300 ease-in-out min-w-0" id="name-strip">
                        <!-- Updated to font-black (weight 900) for maximum thickness -->
                        <span class="text-[clamp(11px,3.5vw,30px)] text-primary relative z-10 transition-all duration-300 ease-in-out whitespace-normal md:whitespace-nowrap drop-shadow-sm block mb-0 md:mb-2 leading-tight md:leading-none w-full pr-1" id="company-name">SRINITHYA ENGINEERING PRIVATE LIMITED</span>
                        
                        <!-- Construction Animations Layer -->
                        <div class="hidden md:block absolute inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-300 ease-in-out" id="animation-layer">
                            <!-- 3D Road Surface -->
                            <div class="absolute bottom-0 left-0 w-full h-4 bg-gray-600 opacity-60 transform origin-bottom" style="transform: perspective(100px) rotateX(30deg);">
                                <div class="absolute top-1/2 left-0 w-full border-t border-dashed border-white opacity-70"></div>
                            </div>

                            <!-- Building Construction -->
                            <div class="absolute bottom-2 left-1 md:left-6 flex items-end z-20">
                                <img src="${rootPath}Assets/Custom%20Icons/building-construction1.png" alt="Building Construction1" class="h-8 opacity-40">
                                <img src="${rootPath}Assets/Custom%20Icons/building-construction2.png" alt="Building Construction2" class="h-10 opacity-40 transform scale-x-[-1]">
                                <div class="animate-bounce-subtle -ml-2">
                                    <img src="${rootPath}Assets/Custom%20Icons/worker.png" alt="Worker" class="h-5 opacity-60">
                                </div>
                                <div class="animate-bounce-subtle" style="animation-delay: 1s;">
                                    <img src="${rootPath}Assets/Custom%20Icons/worker.png" alt="Worker" class="h-5 opacity-60 transform scale-x-[-1]">
                                </div>
                            </div>

                            <!-- Crane Truck with Smoke -->
                            <div class="animate-roll bottom-1 opacity-90 flex items-end z-30" style="animation-duration: 38s;">
                                <div class="w-16 h-2 bg-gradient-to-r from-transparent to-gray-400 opacity-50 mb-2 rounded-l-full"></div>
                                <img src="${rootPath}Assets/Custom%20Icons/crane-truck.png" alt="Crane Truck" class="h-6 w-auto transform scale-x-[-1]">
                            </div>

                            <!-- Road Roller (Opposite Direction) -->
                            <div class="animate-roll bottom-1 opacity-90 flex items-end z-20" style="animation-duration: 45s; animation-direction: reverse;">
                                <img src="${rootPath}Assets/Custom%20Icons/RR-Icon.png" alt="Road Roller" class="h-6 w-auto transform scale-x-[-1]">
                            </div>
                        </div>
                    </div>
                </a>
                
                <div class="md:hidden flex items-center flex-shrink-0 ml-1">
                    <button id="mobile-menu-button" class="text-gray-700 hover:text-primary focus:outline-none p-1">
                        <i class="fa-solid fa-bars text-lg"></i>
                    </button>
                </div>
                </div>
                <div class="hidden md:flex items-center justify-center w-full py-2 border-t border-gray-100 gap-4 lg:gap-8 transition-all duration-300 ease-in-out" id="nav-links">
                    <a href="${rootPath}index.html#home" class="text-gray-700 hover:text-secondary font-medium px-2 py-1">Home</a>
                    <a href="${rootPath}about.html" class="text-gray-700 hover:text-secondary font-medium px-2 py-1">About Us</a>
                    
                    <!-- Megamenu Trigger -->
                    <div class="group" id="products-menu-container">
                        <button type="button" class="relative text-gray-700 group-hover:text-secondary font-medium px-2 py-1 flex items-center gap-1 outline-none focus:outline-none">
                            <span>Products</span>
                            <i class="fa-solid fa-chevron-down text-xs transition-transform duration-200 group-hover:rotate-180"></i>
                        </button>
                        
                        <div class="absolute top-full left-0 w-full flex justify-center mt-1 invisible group-hover:visible opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-in-out delay-200 group-hover:delay-0 z-[-1] group-hover:z-10 pointer-events-none">
                            <div class="w-full max-w-5xl bg-white shadow-2xl rounded-lg border border-gray-200/50 overflow-hidden pointer-events-auto">
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 p-8">
                                    
                                    <div class="space-y-3">
                                        <h3 class="text-sm font-bold text-primary uppercase tracking-wider border-b pb-2 mb-3">Heavy Machinery</h3>
                                        <a href="${rootPath}Product_details/bar_cutting_models.html" class="megamenu-link"><i class="fa-solid fa-scissors w-6 text-secondary"></i> Bar Cutting Machines</a>
                                        <a href="${rootPath}Product_details/bar_bending_models.html" class="megamenu-link"><i class="fa-solid fa-rotate-left w-6 text-secondary"></i> Bar Bending Machines</a>
                                        <a href="${rootPath}Product_details/scrap_straightener_models.html" class="megamenu-link"><i class="fa-solid fa-recycle w-6 text-secondary"></i> Scrap Straighteners</a>
                                        <a href="${rootPath}Product_details/road_roller_models.html" class="megamenu-link"><i class="fa-solid fa-road w-6 text-secondary"></i> Road Rollers</a>
                                        <a href="${rootPath}Product_details/suspended_rope_platform.html" class="megamenu-link"><i class="fa-solid fa-elevator w-6 text-secondary"></i> Suspended Platforms</a>
                                        <a href="${rootPath}Product_details/mini_lift_models.html" class="megamenu-link"><i class="fa-solid fa-dolly w-6 text-secondary"></i> Mini Lifts / Cranes</a>
                                        <a href="${rootPath}Product_details/industrial_cutting_tools.html" class="megamenu-link"><i class="fa-solid fa-crosshairs w-6 text-secondary"></i> Industrial Cutters</a>
                                    </div>
                                    
                                    <div class="md:col-span-2">
                                        <h3 class="text-sm font-bold text-primary uppercase tracking-wider border-b pb-2 mb-3">Light Equipment</h3>
                                        <div class="grid grid-cols-2 gap-x-8 gap-y-3">
                                            <a href="${rootPath}Product_details/plate_compactor_models.html" class="megamenu-link"><i class="fa-solid fa-compress w-6 text-secondary"></i> Plate Compactors</a>
                                            <a href="${rootPath}Product_details/surface_smootheners.html" class="megamenu-link"><i class="fa-solid fa-ruler-horizontal w-6 text-secondary"></i> Surface Smootheners</a>
                                            <a href="${rootPath}Product_details/concrete_mixer_models.html" class="megamenu-link"><i class="fa-solid fa-blender w-6 text-secondary"></i> Concrete Mixers</a>
                                            <a href="${rootPath}Product_details/Vibrators.html" class="megamenu-link"><i class="fa-solid fa-bolt w-6 text-secondary"></i> Vibrators</a>
                                            <a href="${rootPath}Product_details/shutter_vibrator_models.html" class="megamenu-link"><i class="fa-solid fa-industry w-6 text-secondary"></i> Shutter Vibrators</a>
                                            <a href="${rootPath}Product_details/high_frequency_converter_models.html" class="megamenu-link"><i class="fa-solid fa-wave-square w-6 text-secondary"></i> HF Converters</a>
                                            <a href="${rootPath}Product_details/high_frequency_poker_models.html" class="megamenu-link"><i class="fa-solid fa-plug w-6 text-secondary"></i> HF Pokers</a>
                                            <a href="${rootPath}Product_details/handy_vibration_models.html" class="megamenu-link"><i class="fa-solid fa-hand-fist w-6 text-secondary"></i> Handy Vibrators</a>
                                            <a href="${rootPath}Product_details/mechanical_poker_models.html" class="megamenu-link"><i class="fa-solid fa-gears w-6 text-secondary"></i> Mechanical Pokers</a>
                                            <a href="${rootPath}Product_details/dewatering_pump.html" class="megamenu-link"><i class="fa-solid fa-droplet w-6 text-secondary"></i> Dewatering Pumps</a>
                                            <a href="${rootPath}Product_details/portable_bar_processing_models.html" class="megamenu-link"><i class="fa-solid fa-toolbox w-6 text-secondary"></i> Portable Bar Tools</a>
                                            <a href="${rootPath}Product_details/scissorlift_models.html" class="megamenu-link"><i class="fa-solid fa-arrows-up-down w-6 text-secondary"></i> Scissor Lifts</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-gray-50 p-4 text-center border-t">
                                    <a href="${rootPath}index.html#products" class="text-sm font-semibold text-primary hover:text-secondary transition-colors">View Full Product Catalogue <i class="fa-solid fa-arrow-right ml-1"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Services Dropdown -->
                    <div class="group relative" id="services-menu-container">
                        <button type="button" class="text-gray-700 group-hover:text-secondary font-medium px-2 py-1 flex items-center gap-1 outline-none focus:outline-none">
                            <span>Services</span>
                            <i class="fa-solid fa-chevron-down text-xs transition-transform duration-200 group-hover:rotate-180"></i>
                        </button>
                        <div class="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 invisible group-hover:visible opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-in-out delay-200 group-hover:delay-0 z-50 w-[500px]">
                            <div class="bg-white shadow-2xl rounded-lg border border-gray-200/50 overflow-hidden">
                                <div class="grid grid-cols-3 p-4 gap-2">
                                    <a href="${rootPath}Service_details/repair_services.html" class="flex flex-col items-center text-center p-3 hover:bg-gray-50 rounded-lg transition group/item">
                                        <div class="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mb-2 group-hover/item:bg-secondary group-hover/item:text-white transition text-secondary">
                                            <i class="fa-solid fa-gears text-lg"></i>
                                        </div>
                                        <span class="font-bold text-gray-800 text-sm">Repair Services</span>
                                    </a>
                                    <a href="${rootPath}Service_details/rental_equipment.html" class="flex flex-col items-center text-center p-3 hover:bg-gray-50 rounded-lg transition group/item">
                                        <div class="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mb-2 group-hover/item:bg-secondary group-hover/item:text-white transition text-secondary">
                                            <i class="fa-solid fa-truck-ramp-box text-lg"></i>
                                        </div>
                                        <span class="font-bold text-gray-800 text-sm">Equipment Rental</span>
                                    </a>
                                    <a href="${rootPath}Service_details/maintenance_services.html" class="flex flex-col items-center text-center p-3 hover:bg-gray-50 rounded-lg transition group/item">
                                        <div class="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mb-2 group-hover/item:bg-secondary group-hover/item:text-white transition text-secondary">
                                            <i class="fa-solid fa-screwdriver-wrench text-lg"></i>
                                        </div>
                                        <span class="font-bold text-gray-800 text-sm">Maintenance</span>
                                    </a>
                                </div>
                                <div class="bg-gray-50 p-3 text-center border-t border-gray-100">
                                    <a href="${rootPath}services.html" class="text-sm font-bold text-primary hover:text-secondary transition flex items-center justify-center gap-2">
                                        View All Services <i class="fa-solid fa-arrow-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <a href="${rootPath}index.html#contact" class="bg-primary text-white px-5 py-2 rounded hover:bg-blue-800 transition">Get in Touch</a>
                    <button onclick="toggleCart()" class="relative text-gray-700 hover:text-secondary font-medium px-2 py-1 ml-2" title="View Selection Tray">
                        <i class="fa-solid fa-shopping-cart text-2xl"></i>
                        <span id="cart-badge" class="absolute -top-1 -right-1 bg-secondary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center hidden">0</span>
                    </button>
                </div>
            </div>
        </div>
        <div id="scroll-progress" class="h-1 bg-secondary w-0 transition-all duration-100 ease-out"></div>

        <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-gray-100 w-full shadow-lg absolute left-0 top-full max-h-[calc(100vh-100%)] overflow-y-auto overscroll-contain">
            <div class="px-4 pt-2 pb-4 space-y-1 flex flex-col">
                <a href="${rootPath}index.html#home" class="block text-gray-700 hover:text-secondary hover:bg-gray-50 font-medium px-3 py-3 rounded mobile-link">Home</a>
                <a href="${rootPath}about.html" class="block text-gray-700 hover:text-secondary hover:bg-gray-50 font-medium px-3 py-3 rounded mobile-link">About Us</a>
                <div>
                    <button id="mobile-products-trigger" class="w-full flex justify-between items-center text-gray-700 hover:text-secondary hover:bg-gray-50 font-medium px-3 py-3 rounded">
                        <span>Products</span>
                        <i class="fa-solid fa-chevron-down transition-transform duration-200"></i>
                    </button>
                    <div id="mobile-products-menu" class="hidden pl-4 pt-2 pb-2 border-l-2 border-gray-200 ml-3 space-y-1">
                        <a href="${rootPath}index.html#products" class="mobile-submenu-link font-bold text-primary">View All Products</a>
                        <h4 class="font-semibold text-gray-500 pt-2 text-sm">Heavy Machinery</h4>
                        <a href="${rootPath}Product_details/bar_cutting_models.html" class="mobile-submenu-link"><i class="fa-solid fa-scissors w-6 text-secondary"></i> Bar Cutting</a>
                        <a href="${rootPath}Product_details/bar_bending_models.html" class="mobile-submenu-link"><i class="fa-solid fa-rotate-left w-6 text-secondary"></i> Bar Bending</a>
                        <a href="${rootPath}Product_details/scrap_straightener_models.html" class="mobile-submenu-link"><i class="fa-solid fa-recycle w-6 text-secondary"></i> Scrap Straighteners</a>
                        <a href="${rootPath}Product_details/road_roller_models.html" class="mobile-submenu-link"><i class="fa-solid fa-road w-6 text-secondary"></i> Road Rollers</a>
                        <a href="${rootPath}Product_details/suspended_rope_platform.html" class="mobile-submenu-link"><i class="fa-solid fa-elevator w-6 text-secondary"></i> Suspended Platforms</a>
                        <a href="${rootPath}Product_details/mini_lift_models.html" class="mobile-submenu-link"><i class="fa-solid fa-dolly w-6 text-secondary"></i> Mini Lifts / Cranes</a>
                        <a href="${rootPath}Product_details/industrial_cutting_tools.html" class="mobile-submenu-link"><i class="fa-solid fa-crosshairs w-6 text-secondary"></i> Industrial Cutters</a>
                        <h4 class="font-semibold text-gray-500 pt-2 text-sm">Light Equipment</h4>
                        <a href="${rootPath}Product_details/plate_compactor_models.html" class="mobile-submenu-link"><i class="fa-solid fa-compress w-6 text-secondary"></i> Plate Compactors</a>
                        <a href="${rootPath}Product_details/surface_smootheners.html" class="mobile-submenu-link"><i class="fa-solid fa-ruler-horizontal w-6 text-secondary"></i> Surface Smootheners</a>
                        <a href="${rootPath}Product_details/concrete_mixer_models.html" class="mobile-submenu-link"><i class="fa-solid fa-blender w-6 text-secondary"></i> Concrete Mixers</a>
                        <a href="${rootPath}Product_details/Vibrators.html" class="mobile-submenu-link"><i class="fa-solid fa-bolt w-6 text-secondary"></i> Vibrators</a>
                        <a href="${rootPath}Product_details/shutter_vibrator_models.html" class="mobile-submenu-link"><i class="fa-solid fa-industry w-6 text-secondary"></i> Shutter Vibrators</a>
                        <a href="${rootPath}Product_details/high_frequency_converter_models.html" class="mobile-submenu-link"><i class="fa-solid fa-wave-square w-6 text-secondary"></i> HF Converters</a>
                        <a href="${rootPath}Product_details/high_frequency_poker_models.html" class="mobile-submenu-link"><i class="fa-solid fa-plug w-6 text-secondary"></i> HF Pokers</a>
                        <a href="${rootPath}Product_details/handy_vibration_models.html" class="mobile-submenu-link"><i class="fa-solid fa-hand-fist w-6 text-secondary"></i> Handy Vibrators</a>
                        <a href="${rootPath}Product_details/mechanical_poker_models.html" class="mobile-submenu-link"><i class="fa-solid fa-gears w-6 text-secondary"></i> Mechanical Pokers</a>
                        <a href="${rootPath}Product_details/dewatering_pump.html" class="mobile-submenu-link"><i class="fa-solid fa-droplet w-6 text-secondary"></i> Dewatering Pumps</a>
                        <a href="${rootPath}Product_details/portable_bar_processing_models.html" class="mobile-submenu-link"><i class="fa-solid fa-toolbox w-6 text-secondary"></i> Portable Equipment</a>
                        <a href="${rootPath}Product_details/scissorlift_models.html" class="mobile-submenu-link"><i class="fa-solid fa-arrows-up-down w-6 text-secondary"></i> Scissor Lifts</a>
                    </div>
                </div>
                <div>
                    <button id="mobile-services-trigger" class="w-full flex justify-between items-center text-gray-700 hover:text-secondary hover:bg-gray-50 font-medium px-3 py-3 rounded">
                        <span>Services</span>
                        <i class="fa-solid fa-chevron-down transition-transform duration-200"></i>
                    </button>
                    <div id="mobile-services-menu" class="hidden pl-4 pt-2 pb-2 border-l-2 border-gray-200 ml-3 space-y-1">
                        <a href="${rootPath}services.html" class="mobile-submenu-link font-bold text-primary">View All Services</a>
                        <a href="${rootPath}Service_details/repair_services.html" class="mobile-submenu-link"><i class="fa-solid fa-gears w-6 text-secondary"></i> Repair Services</a>
                        <a href="${rootPath}Service_details/rental_equipment.html" class="mobile-submenu-link"><i class="fa-solid fa-truck-ramp-box w-6 text-secondary"></i> Equipment Rental</a>
                        <a href="${rootPath}Service_details/maintenance_services.html" class="mobile-submenu-link"><i class="fa-solid fa-screwdriver-wrench w-6 text-secondary"></i> Maintenance</a>
                    </div>
                </div>
                <a href="${rootPath}index.html#contact" class="block text-primary font-bold hover:bg-gray-50 px-3 py-3 rounded mobile-link">Get in Touch</a>
                <button onclick="toggleCart()" class="w-full flex items-center justify-between text-gray-700 hover:text-secondary hover:bg-gray-50 font-medium px-3 py-3 rounded mobile-link">
                    <span>View Selection Tray</span>
                    <div class="relative mr-2">
                        <i class="fa-solid fa-shopping-cart text-xl"></i>
                        <span id="mobile-cart-badge" class="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center hidden">0</span>
                    </div>
                </button>
            </div>
        </div>
    </nav>
`,
    cartHTML = `
    <!-- Cart/Selection Tray Modal -->
    <div id="cart-modal" class="fixed inset-0 z-[70] hidden">
        <div class="absolute inset-0 bg-black opacity-50 transition-opacity" onclick="toggleCart()"></div>
        <div class="absolute right-0 top-0 h-full w-full md:w-[500px] bg-white shadow-2xl transform transition-transform duration-300 translate-x-full flex flex-col" id="cart-panel">
            <div class="p-4 border-b flex justify-between items-center bg-primary text-white">
                <h2 class="text-xl font-bold"><i class="fa-solid fa-shopping-cart mr-2"></i>Selection Tray</h2>
                <div>
                    <button id="clear-cart-btn" onclick="openClearCartModal()" class="text-white hover:text-red-400 focus:outline-none mr-4 disabled:opacity-50 disabled:cursor-not-allowed" title="Clear Tray">
                        <i class="fa-solid fa-trash-can"></i> Clear
                    </button>
                    <button onclick="toggleCart()" class="text-white hover:text-gray-200 focus:outline-none"><i class="fa-solid fa-xmark text-2xl"></i></button>
                </div>
            </div>
            <div class="p-4 overflow-y-auto flex-grow bg-gray-50" id="cart-items">
                <!-- Cart Items will be injected here -->
            </div>
            <div class="p-4 border-t bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <button onclick="sendRequirementToWhatsapp()" class="w-full bg-secondary text-white font-bold py-3 rounded-lg hover:bg-yellow-600 transition shadow-md flex items-center justify-center gap-2">
                    <i class="fa-brands fa-whatsapp"></i> Send Requirement
                </button>
            </div>
        </div>
    </div>
`,
    clearCartModalHTML = `
    <div id="clear-cart-modal" class="fixed inset-0 z-[80] hidden flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
        <div class="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4 transform scale-100 transition-transform duration-300">
            <div class="text-center">
                <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fa-solid fa-triangle-exclamation text-2xl text-red-600"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Clear Tray?</h3>
                <p class="text-gray-600 mb-6">Are you sure you want to remove all items from your Tray? This action cannot be undone.</p>
                <div class="flex gap-3 justify-center">
                    <button onclick="closeClearCartModal()" class="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition focus:outline-none">Cancel</button>
                    <button onclick="confirmClearCartAction()" class="px-5 py-2.5 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition shadow-lg focus:outline-none">Yes, Clear It</button>
                </div>
            </div>
        </div>
    </div>
`,
    nameInputModalHTML = `
    <div id="name-input-modal" class="fixed inset-0 z-[90] hidden flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
        <div class="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4 transform scale-100 transition-transform duration-300">
            <div class="text-center">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fa-brands fa-whatsapp text-3xl text-green-600"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Enter Your Name</h3>
                <p class="text-gray-600 mb-4 text-sm">Please enter your name to personalize the requirement message.</p>
                <input type="text" id="whatsapp-name-input" class="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" placeholder="Your Name" oninput="validateNameInput()" onkeydown="if(event.key === 'Enter' && !document.getElementById('confirm-whatsapp-btn').disabled) confirmSendWhatsapp()">
                <div class="flex gap-3 justify-center">
                    <button onclick="closeNameInputModal()" class="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition focus:outline-none w-1/2">Cancel</button>
                    <button id="confirm-whatsapp-btn" onclick="confirmSendWhatsapp()" class="px-5 py-2.5 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 transition shadow-lg focus:outline-none w-1/2 disabled:bg-green-300 disabled:cursor-not-allowed" disabled>Send</button>
                </div>
            </div>
        </div>
    </div>
`,
    emptyCartModalHTML = `
    <div id="empty-cart-modal" class="fixed inset-0 z-[90] hidden flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
        <div class="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4 transform scale-100 transition-transform duration-300">
            <div class="text-center">
                <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fa-solid fa-basket-shopping text-2xl text-yellow-600"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Selection Tray is Empty</h3>
                <p class="text-gray-600 mb-6">Please add items to your selection tray before sending a requirement.</p>
                <button onclick="closeEmptyCartModal()" class="px-6 py-2.5 rounded-lg bg-primary text-white font-bold hover:bg-blue-800 transition shadow-lg focus:outline-none w-full">Okay, Got it</button>
            </div>
        </div>
    </div>
`,
    scrollButtonsHTML = `
    <div id="back-to-top-container" class="fixed bottom-24 right-7 z-40 hidden md:flex flex-col gap-3 transition-opacity duration-300 opacity-0 pointer-events-none">
        <div class="relative group">
            <button id="scroll-up-btn" class="bg-primary text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-700 transition flex items-center justify-center opacity-90 hover:opacity-100 border-2 border-white">
                <i class="fa-solid fa-arrow-up"></i>
            </button>
            <span class="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">Back to Top</span>
        </div>
        <div class="relative group">
            <button id="scroll-down-btn" class="bg-primary text-white w-12 h-12 rounded-full shadow-lg hover:bg-blue-700 transition flex items-center justify-center opacity-90 hover:opacity-100 border-2 border-white">
                <i class="fa-solid fa-arrow-down"></i>
            </button>
            <span class="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">Scroll Down</span>
        </div>
    </div>
`;

window.openClearCartModal = function() {
    const modal = document.getElementById('clear-cart-modal');
    if (modal) modal.classList.remove('hidden');
}

window.closeClearCartModal = function() {
    const modal = document.getElementById('clear-cart-modal');
    if (modal) modal.classList.add('hidden');
}

window.confirmClearCartAction = function() {
    closeClearCartModal();
    // Temporarily override confirm to avoid double confirmation for pages using cart.js
    const originalConfirm = window.confirm;
    window.confirm = () => true;
    try {
        if (typeof window.clearCart === 'function') window.clearCart();
    } finally {
        window.confirm = originalConfirm;
    }
}

window.openEmptyCartModal = function() {
    const modal = document.getElementById('empty-cart-modal');
    if (modal) modal.classList.remove('hidden');
}

window.closeEmptyCartModal = function() {
    const modal = document.getElementById('empty-cart-modal');
    if (modal) modal.classList.add('hidden');
}

function initScrollButtons() {
    const container = document.getElementById("back-to-top-container");
    const t = document.getElementById("scroll-up-btn"),
        e = document.getElementById("scroll-down-btn");

    if (container) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                container.classList.remove("opacity-0", "pointer-events-none");
            } else {
                container.classList.add("opacity-0", "pointer-events-none");
            }
        });
    }

    t && t.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }), e && e.addEventListener("click", () => {
        window.scrollBy({
            top: window.innerHeight / 2,
            behavior: "smooth"
        })
    })
}

function initSmoothScroll() {
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link || link.target === '_blank') return;
        
        // Use getAttribute to check for non-navigation links, but use .href for URL parsing
        const rawHref = link.getAttribute('href');
        if (!rawHref || rawHref.startsWith('javascript:') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) return;

        try {
            const targetUrl = new URL(link.href);
            const currentUrl = new URL(window.location.href);
            
            // Normalize paths: remove /index.html and trailing slashes to ensure / and /index.html match
            const cleanPath = (path) => path.replace(/\/index\.html$/, '').replace(/\/$/, '');
            const currentPath = cleanPath(currentUrl.pathname);
            const targetPath = cleanPath(targetUrl.pathname);

            // Check if it's the same page (origin and normalized path match)
            if (targetUrl.origin === currentUrl.origin && currentPath === targetPath) {
                e.preventDefault();
                
                if (targetUrl.hash) {
                    const targetId = targetUrl.hash.substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        // Account for fixed header
                        const headerOffset = 80;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.scrollY - headerOffset;
                        
                        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                        history.pushState(null, null, targetUrl.hash);
                    }
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    if (targetUrl.search !== currentUrl.search) {
                        history.pushState(null, null, targetUrl.pathname + targetUrl.search);
                    }
                }
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        } catch (err) {
            // Ignore invalid URLs
        }
    });
}

function initCartAnimation() {
    const badges = ['cart-badge', 'mobile-cart-badge'];
    
    badges.forEach(id => {
        const badge = document.getElementById(id);
        if (!badge) return;

        // Find the icon relative to the badge (works for both desktop button and mobile div wrapper)
        const wrapper = badge.parentElement.closest('button') || badge.parentElement;
        const icon = wrapper ? wrapper.querySelector('i') : null;

        if (!icon) return;

        const observer = new MutationObserver((mutations) => {
            let triggered = false;
            for (const m of mutations) {
                if (m.type === 'childList' || (m.type === 'attributes' && m.attributeName === 'class')) {
                    if (!badge.classList.contains('hidden')) {
                        triggered = true;
                        break;
                    }
                }
            }

            if (triggered) {
                icon.classList.remove('cart-animate');
                void icon.offsetWidth; // Trigger reflow to restart animation
                icon.classList.add('cart-animate');
            }
        });

        observer.observe(badge, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
        
        icon.addEventListener('animationend', () => {
            icon.classList.remove('cart-animate');
        });
    });
}

// --- Toast Notification System ---
window.showToast = function(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-circle-xmark';
    if (type === 'info') icon = 'fa-circle-info';

    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        toast.addEventListener('transitionend', () => {
            toast.remove();
            if (container.children.length === 0) {
                container.remove();
            }
        });
    }, 3000);
};

// --- Active Scroll Spy (Highlight Navbar Links) ---
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#nav-links a');

    if (sections.length === 0) return;

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            // Reset classes
            link.classList.remove('text-secondary', 'font-bold');
            link.classList.add('text-gray-700', 'font-medium');
            
            // Check if link href contains the current section ID
            if (current && link.getAttribute('href').includes(`#${current}`)) {
                link.classList.remove('text-gray-700', 'font-medium');
                link.classList.add('text-secondary', 'font-bold');
            }
        });
    });
}

function initNavbar() {
    const t = document.getElementById("mobile-menu-button"),
        e = document.getElementById("mobile-menu");
    t && e && t.addEventListener("click", () => {
        e.classList.toggle("hidden")
    });
    const a = document.getElementById("mobile-products-trigger"),
        s = document.getElementById("mobile-products-menu");
    a && s && a.addEventListener("click", t => {
        t.preventDefault(), s.classList.toggle("hidden"), a.querySelector("i").classList.toggle("rotate-180")
    });
    const svT = document.getElementById("mobile-services-trigger"),
        svM = document.getElementById("mobile-services-menu");
    svT && svM && svT.addEventListener("click", t => {
        t.preventDefault(), svM.classList.toggle("hidden"), svT.querySelector("i").classList.toggle("rotate-180")
    });

    // Close Megamenus on Click (Desktop)
    ['products-menu-container', 'services-menu-container'].forEach(id => {
        const container = document.getElementById(id);
        if (container) {
            const dropdown = container.querySelector('.absolute');
            if (dropdown) {
                // Restore display on mouseleave so it works again next time
                container.addEventListener('mouseleave', () => {
                    dropdown.style.display = '';
                });

                container.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        dropdown.style.display = 'none';
                    });
                });
            }
        }
    });

    // Close Mobile Menu on Link Click
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            const button = e.target.closest('button');

            if (link && link.getAttribute('href') && link.getAttribute('href') !== '#' && !link.getAttribute('href').startsWith('javascript:')) {
                mobileMenu.classList.add('hidden');
            } else if (button && !button.id.includes('trigger')) {
                // Close for buttons like "View Selection Tray" but not submenu triggers
                mobileMenu.classList.add('hidden');
            }
        });
    }

    const o = document.getElementById("navbar"),
        n = document.getElementById("nav-container"),
        i = document.getElementById("top-bar"),
        r = document.getElementById("nav-logo"),
        l = document.getElementById("name-strip"),
        d = document.getElementById("company-name"),
        c = document.getElementById("animation-layer"),
        m = document.getElementById("nav-links"),
        u = document.getElementById("scroll-progress");

    window.addEventListener("scroll", () => {
        const isScrolled = window.scrollY > 50;

        if (isScrolled) {
            // Scrolled State
            o.classList.add("shadow-md");
            n.classList.remove("md:grid", "md:grid-cols-1");
            n.classList.add("md:flex", "md:flex-row", "md:items-center", "md:justify-between", "gap-2");
            i.classList.remove("w-full");
            i.classList.add("md:w-auto", "flex-shrink", "min-w-0");
            r.classList.remove("h-12", "md:h-16");
            r.classList.add("h-10");
            l.classList.remove("flex-grow", "text-center", "pl-0", "pr-1");
            l.classList.add("ml-2", "text-left");
            c.classList.add("opacity-0");
            d.classList.remove("text-[clamp(11px,3.5vw,30px)]", "md:mb-2");
            d.classList.add("text-[clamp(10px,2.9vw,20px)]");
            m.classList.remove("w-full", "border-t", "justify-center", "py-2", "lg:gap-8");
            m.classList.add("py-1", "flex-shrink-0", "text-sm");
        } else {
            // Top State
            o.classList.remove("shadow-md");
            n.classList.add("md:grid", "md:grid-cols-1");
            n.classList.remove("md:flex", "md:flex-row", "md:items-center", "md:justify-between", "gap-2");
            i.classList.add("w-full");
            i.classList.remove("md:w-auto", "flex-shrink", "min-w-0");
            r.classList.add("h-12", "md:h-16");
            r.classList.remove("h-10");
            l.classList.add("flex-grow", "text-center", "pl-0", "pr-1");
            l.classList.remove("ml-2", "text-left");
            c.classList.remove("opacity-0");
            d.classList.remove("text-[clamp(10px,2.9vw,20px)]");
            d.classList.add("text-[clamp(11px,3.5vw,30px)]", "md:mb-2");
            m.classList.add("w-full", "border-t", "justify-center", "py-2", "lg:gap-8");
            m.classList.remove("py-1", "flex-shrink-0", "text-sm");
        }

        if (u) {
            const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
            u.style.width = scrollPercent + "%";
        }
    })
}
document.addEventListener("DOMContentLoaded", () => {
    document.body.insertAdjacentHTML("afterbegin", navbarHTML), document.body.insertAdjacentHTML("beforeend", cartHTML), document.body.insertAdjacentHTML("beforeend", clearCartModalHTML), document.body.insertAdjacentHTML("beforeend", emptyCartModalHTML), document.body.insertAdjacentHTML("beforeend", nameInputModalHTML), document.body.insertAdjacentHTML("beforeend", scrollButtonsHTML), initNavbar(), initScrollButtons(), initSmoothScroll(), initCartAnimation(), initScrollSpy();
});

// Loader Logic

document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader-wrapper');

    if (loader) {
        // Use sessionStorage so the intro plays once per tab/session
        const hasSeenIntro = sessionStorage.getItem('sepl_intro_shown');

        if (hasSeenIntro) {
            // SUBSEQUENT VISITS: Hide immediately (don't wait for load)
            loader.style.display = 'none';
            document.body.classList.add('loaded');
        } else {
            // FIRST VISIT: Wait for load, then play animation
            window.addEventListener('load', () => {
                setTimeout(() => {
                    document.body.classList.add('loaded'); // Triggers CSS 3D Lid transform
                    setTimeout(() => { loader.style.display = 'none'; }, 1000);
                    sessionStorage.setItem('sepl_intro_shown', 'true');
                }, 500);
            });
        }
    }
});