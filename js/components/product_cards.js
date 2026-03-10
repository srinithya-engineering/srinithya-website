(function() {
    // --- Phase 1: Soil & Foundation ---
    const soilFoundation = [
        {
            title: "Road Rollers",
            image: ["./Assets/Product Images/srr.png", "./Assets/Product Images/swr.png", "./Assets/Product Images/swr fh.png"],
            imageWebp: ["./Assets/Product Images/srr.webp", "./Assets/Product Images/swr.webp", "./Assets/Product Images/swr fh.webp"],
            description: "Ride-on and Walk-behind rollers for road construction.",
            models: ["Ride-on", "Walk-behind", "Fully-Hydraulic"],
            link: "Product_details/road_roller_models.html"
        },
        {
            title: "Excavator Drum Compactor",
            image: "./Assets/Product Images/drum compactor.png",
            imageWebp: "./Assets/Product Images/drum compactor.webp",
            description: "High-performance compaction attachment for excavators.",
            models: ["Drum Compactor"],
            link: "Product_details/excavator_drum_compactor.html"
        },
        {
            title: "Plate Compactors",
            image: ["./Assets/Product Images/sfpc-2p.png", "./Assets/Product Images/srpc-3d.png", "./Assets/Product Images/srpc-3e.png","./Assets/Product Images/sfpc-5e.png", "./Assets/Product Images/sfpc-5d.png"],
            imageWebp: ["./Assets/Product Images/sfpc-2p.webp", "./Assets/Product Images/srpc-3d.webp", "./Assets/Product Images/srpc-3e.webp", "./Assets/Product Images/sfpc-5e.webp", "./Assets/Product Images/sfpc-5d.webp"],
            description: "For soil, asphalt, and paving stone compaction.",
            models: ["Forward", "Reversible", "Electric", "Diesel"],
            link: "Product_details/plate_compactor_models.html"
        }
    ];

    // --- Phase 2: Rebar Processing ---
    const rebarProcessing = [
        {
            title: "Bar Bending Machine",
            image: "./Assets/Product Images/bender.png",
            imageWebp: "./Assets/Product Images/bender.webp",
            description: "Automatic bending with digital control panel. Angles range 0-360 degrees.",
            models: ["SBB 42", "SBB 52", "SBB 55"],
            link: "Product_details/bar_bending_models.html"
        },
        {
            title: "Bar Cutting Machine",
            image: "./Assets/Product Images/sbc.png",
            imageWebp: "./Assets/Product Images/sbc.webp",
            description: "Precise cutting for TMT bars up to 40mm. Low noise, high efficiency.",
            models: ["SBC 42", "SBC 52", "SBC 55"],
            link: "Product_details/bar_cutting_models.html"
        },
        {
            title: "Scrap Straightener",
            image: "./Assets/Product Images/sss.png",
            imageWebp: "./Assets/Product Images/sss.webp",
            description: "Now your scrap is no more scrap.",
            models: ["SSS 6-14", "SSS 8-25"],
            link: "Product_details/scrap_straightener_models.html"
        },
        {
            title: "Portable Bar Equipment",
            image: ["./Assets/Product Images/spb.png", "./Assets/Product Images/spc.png"],
            imageWebp: ["./Assets/Product Images/spb.webp", "./Assets/Product Images/spc.webp"],
            description: "Lightweight, on-site solutions for rebar cutting and bending.",
            models: ["Portable Bender", "Portable Cutter"],
            link: "Product_details/portable_bar_processing_models.html"
        }
    ];

    // --- Phase 3: Lifting Solutions ---
    const liftingSolutions = [
        {
            title: "Suspended Scaffold Solution",
            image: ["./Assets/Product Images/srp.png", "./Assets/Product Images/srp2.webp"],
            imageWebp: ["./Assets/Product Images/srp.webp", "./Assets/Product Images/srp2.webp"],
            description: "Customizable high-safety suspended platforms for facade work.",
            models: ["ZLP 800"],
            link: "Product_details/suspended_rope_platform.html"
        },
        {
            title: "Mini Lift / Crane",
            image: ["./Assets/Product Images/sml.png","./Assets/Product Images/sml-500.png"],
            imageWebp: ["./Assets/Product Images/sml.webp", "./Assets/Product Images/sml-500.webp"],
            description: "Compact mini crane for lifting materials up to 30m.",
            models: ["300 Kg", "500 Kg"],
            link: "Product_details/mini_lift_models.html"
        },
        {
            title: "Scissor Lifts",
            image: "./Assets/Product Images/scissorlift.png",
            imageWebp: "./Assets/Product Images/scissorlift.webp",
            description: "Safe and stable platforms for elevated work.",
            models: ["6m - 14m"],
            link: "Product_details/scissorlift_models.html"
        }
    ];

    // --- Phase 4: Concreting ---
    const concretingEquipment = [
        {
            title: "Concrete Handling Equipment",
            image: ["./Assets/Product Images/scme.png", "./Assets/Product Images/scpb.png", "./Assets/Product Images/scme-220.png"],
            imageWebp: ["./Assets/Product Images/scme.webp", "./Assets/Product Images/scpb.webp", "./Assets/Product Images/scme-220.webp"],
            description: "Portable 1-bag and 2-bag mixers for any site.",
            models: ["1 Bag Mixer", "2 Bag Mixer", "Buckets"],
            link: "Product_details/concrete_mixer_models.html"
        },
        {
            title: "High Frequency Converters",
            image: ["./Assets/Product Images/shfc35.png", "./Assets/Product Images/shfc90.png"],
            imageWebp: ["./Assets/Product Images/shfc35.webp", "./Assets/Product Images/shfc90.webp"],
            description: "Reliable power conversion for high-frequency concrete vibrators.",
            models: ["2 Outlet", "4 Outlet"],
            link: "Product_details/high_frequency_converter_models.html"
        },
        {
            title: "Vibrators",
            image: ["./Assets/Product Images/sdv.png", "./Assets/Product Images/sev33.png", "./Assets/Product Images/spv.png", "./Assets/Product Images/sev31.png"],
            imageWebp: ["./Assets/Product Images/sdv.webp", "./Assets/Product Images/sev33.webp", "./Assets/Product Images/spv.webp", "./Assets/Product Images/sev31.webp"],
            description: "A wide range of concrete vibrators for perfect consolidation.",
            models: ["Electric", "Petrol", "Diesel"],
            link: "Product_details/Vibrators.html"
        },
        {
            title: "High Frequency Pokers",
            image: ["./Assets/Product Images/shfn60_12m.png", "./Assets/Product Images/shfn40_12m.png", "./Assets/Product Images/shfn60_5m.png", "./Assets/Product Images/shfn40_5m.png","./Assets/Product Images/shiv40.png", "./Assets/Product Images/shiv60.png"],
            imageWebp: ["./Assets/Product Images/shfn60_12m.webp", "./Assets/Product Images/shfn40_12m.webp", "./Assets/Product Images/shfn60_5m.webp", "./Assets/Product Images/shfn40_5m.webp", "./Assets/Product Images/shiv40.webp", "./Assets/Product Images/shiv60.webp"],
            description: "Internal concrete vibration needles for superior consolidation.",
            models: ["40mm", "60mm"],
            link: "Product_details/high_frequency_poker_models.html"
        },
        {
            title: "Mechanical Pokers",
            image: ["./Assets/Product Images/smp25.png", "./Assets/Product Images/smp40.png", "./Assets/Product Images/smp60.png"],
            imageWebp: ["./Assets/Product Images/smp25.webp", "./Assets/Product Images/smp40.webp", "./Assets/Product Images/smp60.webp"],
            description: "High-quality vibration needles for various applications.",
            models: ["25mm", "40mm", "60mm"],
            link: "Product_details/mechanical_poker_models.html"
        },
        {
            title: "Shutter Vibrators",
            image: ["./Assets/Product Images/shfs.png", "./Assets/Product Images/shfs-4215.png", "./Assets/Product Images/ssv-305.png", "./Assets/Product Images/ssv-310.png", "./Assets/Product Images/ssv-320.png"],
            imageWebp: ["./Assets/Product Images/shfs.webp", "./Assets/Product Images/shfs-4215.webp", "./Assets/Product Images/ssv-305.webp", "./Assets/Product Images/ssv-310.webp", "./Assets/Product Images/ssv-320.webp"],
            description: "External vibrators for formwork, ensuring void-free concrete.",
            models: ["High Frequency", "Standalone"],
            link: "Product_details/shutter_vibrator_models.html"
        },
        {
            title: "Handy Vibrator Solution",
            image: ["./Assets/Product Images/shm800.png", "./Assets/Product Images/shm1200.png", "./Assets/Product Images/shm1600.png", "./Assets/Product Images/hand-held.png"],
            imageWebp: ["./Assets/Product Images/shm800.webp", "./Assets/Product Images/shm1200.webp", "./Assets/Product Images/shm1600.webp", "./Assets/Product Images/hand-held.webp"],
            description: "Portable and efficient vibration solutions.",
            models: ["800W", "1200W", "1600W", "2200W"],
            link: "Product_details/handy_vibration_models.html"
        },
        {
            title: "Surface Smootheners",
            image: ["./Assets/Product Images/screed vibrator.png", "./Assets/Product Images/sptp.png", "./Assets/Product Images/spte.png"],
            imageWebp: ["./Assets/Product Images/screed vibrator.webp", "./Assets/Product Images/sptp.webp", "./Assets/Product Images/spte.webp"],
            description: "High-quality finishing with Power Trowels and Screed Vibrators.",
            models: ["Screed Vibrator", "Power Trowel"],
            link: "Product_details/surface_smootheners.html"
        }
    ];

    // --- Phase 5: Miscellaneous & Finishing ---
    const miscellaneous = [
        {
            title: "Industrial Cutting Tools",
            image: ["./Assets/Product Images/scc-90.png","./Assets/Product Images/scc-200.png", "./Assets/Product Images/groove.png"],
            imageWebp: ["./Assets/Product Images/scc-90.webp","./Assets/Product Images/scc-200.webp", "./Assets/Product Images/groove.webp"],
            description: "Precision tools for groove and core cutting applications.",
            models: ["Groove Cutter", "Core Cutter"],
            link: "Product_details/industrial_cutting_tools.html"
        },
        {
            title: "Dewatering Pumps",
            image: ["./Assets/Product Images/sdwp2.png", "./Assets/Product Images/sdwp3.png"],
            imageWebp: ["./Assets/Product Images/sdwp2.webp", "./Assets/Product Images/sdwp3.webp"],
            description: "Submersible flexible shaft pumps for efficient water removal.",
            models: ["2 Inch", "3 Inch"],
            link: "Product_details/dewatering_pump.html"
        },
        {
            title: "Prefab. Structures",
            image: ["./Assets/Product Images/cabin.png", "./Assets/Product Images/container.png", "./Assets/Product Images/toilet.png"],
            imageWebp: ["./Assets/Product Images/cabin.webp", "./Assets/Product Images/container.webp", "./Assets/Product Images/toilet.webp"],
            description: "Customizable portable cabins, containers, and toilets.",
            models: ["Cabins", "Containers", "Toilets"],
            link: "Product_details/prefab_structures.html"
        },
        {
            title: "Civic Utility Products",
            image: ["./Assets/Product Images/heavybarrow.png", "./Assets/Product Images/screener.png", "./Assets/Product Images/fogger.png", "./Assets/Product Images/welding.png","./Assets/Product Images/weights.png"],
            imageWebp: ["./Assets/Product Images/heavybarrow.webp", "./Assets/Product Images/screener.webp", "./Assets/Product Images/fogger.webp", "./Assets/Product Images/welding.webp","./Assets/Product Images/weights.webp"],
            description: "Essential utility tools for civic maintenance and construction.",
            models: ["Wheel Barrows", "Screeners", "Foggers"],
            link: "Product_details/civic_utility_products.html"
        }
    ];

    function createHomeProductCard(product) {
        const isProductPage = window.location.pathname.includes('/Product_details/') || window.location.pathname.includes('/Service_details/');
        const rootPath = isProductPage ? '../' : './';
        
        let imageHTML;

        const images = Array.isArray(product.image) ? product.image : [product.image];
        const webpImages = product.imageWebp ? (Array.isArray(product.imageWebp) ? product.imageWebp : [product.imageWebp]) : [];

        if (images.length > 1) {
            const imageTags = images.map((img, index) => {
                let imgSrc = img.startsWith('./') ? rootPath + img.substring(2) : img;
                let webpSrc = webpImages[index] ? (webpImages[index].startsWith('./') ? rootPath + webpImages[index].substring(2) : webpImages[index]) : null;
                
                // Auto-infer WebP if not explicitly provided
                if (!webpSrc && imgSrc && !imgSrc.startsWith('data:') && !imgSrc.startsWith('http')) {
                    webpSrc = imgSrc.replace(/\.(png|jpg|jpeg)$/i, '.webp');
                }

                const isFirst = index === 0;
                // Use a transparent pixel as placeholder for hidden images to prevent immediate loading
                const placeholder = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
                
                const srcAttr = isFirst ? `src="${imgSrc}"` : `src="${placeholder}" data-src="${imgSrc}"`;
                const encodedWebpSrc = webpSrc ? webpSrc.replace(/ /g, '%20') : '';
                const srcsetAttr = isFirst ? `srcset="${encodedWebpSrc}"` : `data-srcset="${encodedWebpSrc}"`;

                const singleImgTag = `<img ${srcAttr} alt="${product.title}" class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" loading="lazy" decoding="async">`;

                if (webpSrc) {
                    return `<picture class="absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${isFirst ? 'opacity-100' : 'opacity-0'} p-4">
                                <source ${srcsetAttr} type="image/webp">
                                ${singleImgTag}
                            </picture>`;
                }
                return singleImgTag.replace('class="', `class="absolute inset-0 transition-opacity duration-700 ease-in-out ${isFirst ? 'opacity-100' : 'opacity-0'} p-4 `);
            }).join('');

            const dotsTags = images.map((_, index) => 
                `<div class="w-1.5 h-1.5 rounded-full bg-primary transition-all duration-300 ${index === 0 ? 'opacity-100 w-3' : 'opacity-40'} shadow-sm"></div>`
            ).join('');

            imageHTML = `<div class="relative w-full h-full carousel-container" data-image-count="${images.length}">
                            ${imageTags}
                            <div class="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10 pointer-events-none dots-container">
                                ${dotsTags}
                            </div>
                         </div>`;
        } else {
            let imgSrc = images[0];
            if (imgSrc && imgSrc.startsWith('./')) {
                imgSrc = rootPath + imgSrc.substring(2);
            }
            
            let webpSrc = webpImages[0];
            if (webpSrc && webpSrc.startsWith('./')) {
                webpSrc = rootPath + webpSrc.substring(2);
            }

            // Auto-infer WebP if not explicitly provided
            if (!webpSrc && imgSrc && !imgSrc.startsWith('data:') && !imgSrc.startsWith('http')) {
                webpSrc = imgSrc.replace(/\.(png|jpg|jpeg)$/i, '.webp');
            }

            const singleImgTag = `<img onclick="openImageModal('${imgSrc}')" src="${imgSrc}" alt="${product.title}" loading="lazy" decoding="async" class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 cursor-pointer" width="300" height="200">`;

            imageHTML = webpSrc
                ? `<picture class="w-full h-full block p-4"><source srcset="${webpSrc.replace(/ /g, '%20')}" type="image/webp">${singleImgTag}</picture>`
                : `<div class="w-full h-full p-4">${singleImgTag}</div>`;
        }

        return `
        <div class="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col h-full group overflow-hidden hover:-translate-y-1">
            <div class="h-48 md:h-56 bg-white relative overflow-hidden flex items-center justify-center">
                ${imageHTML}
                <!-- Gradient Overlay for depth -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            
            <div class="p-5 flex flex-col flex-grow">
                <div class="mb-2">
                    <h3 class="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1" title="${product.title}">${product.title}</h3>
                    <div class="h-0.5 w-12 bg-secondary rounded-full mt-1 group-hover:w-20 transition-all duration-300"></div>
                </div>
                
                <p class="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">${product.description}</p>
                
                <div class="flex flex-wrap gap-2 mb-6">
                    ${(product.models || []).slice(0, 3).map(model => 
                        `<span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                            ${model}
                        </span>`
                    ).join('')}
                    ${(product.models || []).length > 3 ? `<span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-500 border border-gray-100">+${(product.models || []).length - 3}</span>` : ''}
                </div>
                
                <a href="${product.link}" class="mt-auto w-full group/btn relative flex items-center justify-center gap-2 bg-white border-2 border-gray-100 text-gray-700 font-semibold py-2.5 px-4 rounded-xl hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 overflow-hidden" aria-label="View details for ${product.title}">
                    <span class="relative z-10">View Details</span>
                    <i class="fa-solid fa-arrow-right relative z-10 transform group-hover/btn:translate-x-1 transition-transform"></i>
                </a>
            </div>
        </div>
        `;
    }

    window.initAppreciationCarousel = function() {
        const carousel = document.getElementById('apc-carousel');
        // Guard against re-initialization from router
        if (!carousel || carousel.dataset.jsInitialized) return;

        const styleId = 'apc-carousel-style';
        if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
            style.id = styleId;
        style.innerHTML = `
            #apc-carousel {
                display: flex;
                overflow-x: auto;
                scroll-snap-type: x mandatory;
                gap: 20px;
                padding: 20px 15%; /* Peek effect on mobile */
                scrollbar-width: none;
                -ms-overflow-style: none;
            }
            #apc-carousel::-webkit-scrollbar {
                display: none;
            }
            #apc-carousel > * {
                flex: 0 0 70%; /* On mobile, card is 70% of container */
                scroll-snap-align: center;
            }
            @media (min-width: 768px) {
                #apc-carousel { padding: 20px 30%; }
                #apc-carousel > * { flex: 0 0 100%; } /* Card fills the central 40% area */
            }
        `;
        document.head.appendChild(style);
        }

        // Defer the JS initialization to ensure styles are applied
        setTimeout(() => {
            if (window.initInfiniteCarousel) {
                window.initInfiniteCarousel('apc-carousel', 'apc-prev', 'apc-next', 3000);
                carousel.dataset.jsInitialized = 'true';
            }
        }, 0);
    };

    window.renderHomeCards = function() {
    // New phase-based containers
    const soilContainer = document.getElementById('soil-foundation-grid');
    const rebarContainer = document.getElementById('rebar-processing-grid');
    const liftingContainer = document.getElementById('lifting-solutions-grid');
    const concretingContainer = document.getElementById('concreting-equipment-grid');
    const miscContainer = document.getElementById('miscellaneous-grid');
    
    if (!soilContainer && !rebarContainer && !liftingContainer && !concretingContainer && !miscContainer) return;

    let contentUpdated = false;

    const processContainer = (container, data) => {
        if (container && !container.hasAttribute('data-rendered')) {
            container.innerHTML = data.map(product => createHomeProductCard(product)).join('');
            container.setAttribute('data-rendered', 'true');
            
            // Force visibility immediately to prevent content staying hidden during navigation
            container.style.opacity = '1';
            container.style.transform = 'none';
            container.classList.add('is-visible');
            
            // Remove fade-in class from children to prevent double animation issues
            container.classList.remove('fade-in-section');
            
            contentUpdated = true;
        }
    };

    processContainer(soilContainer, soilFoundation);
    processContainer(rebarContainer, rebarProcessing);
    processContainer(liftingContainer, liftingSolutions);
    processContainer(concretingContainer, concretingEquipment);
    processContainer(miscContainer, miscellaneous);

    // Only setup animations if content was actually updated (prevents double-reset glitch)
    if (!contentUpdated) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-section').forEach(section => {
        // Reset opacity/transform if needed to ensure animation plays
        section.classList.remove('is-visible');
        observer.observe(section);
    });
    
    // Force check immediately in case elements are already in view
    setTimeout(() => {
        // Fallback: Force visibility if observer fails to trigger
        document.querySelectorAll('.fade-in-section:not(.is-visible)').forEach(el => {
            el.classList.add('is-visible');
            el.style.opacity = '1'; // Hard fallback
        });
    }, 100);
}
    // This function will be the main entry point for rendering home cards.
    // It's safe to call multiple times because renderHomeCards has its own internal guard.
    function checkAndRenderHomeCards() {
        const soilContainer = document.getElementById('soil-foundation-grid');
        const rebarContainer = document.getElementById('rebar-processing-grid');
        const liftingContainer = document.getElementById('lifting-solutions-grid');
        const concretingContainer = document.getElementById('concreting-equipment-grid');
        const miscContainer = document.getElementById('miscellaneous-grid');

        if (soilContainer || rebarContainer || liftingContainer || concretingContainer || miscContainer) {
            renderHomeCards();
        }
    }


    // Expose for manual calls if needed (Router compatibility)
    window.initProductCards = function() {
        window.renderHomeCards();
        window.initAppreciationCarousel();
    };

    const CarouselManager = {
    isRunning: false,
    animationFrameId: null,

    start: function() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.loop();
    },

    stop: function() {
        this.isRunning = false;
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    },

    loop: function() {
        if (!this.isRunning) return;

        const now = Date.now();
        const carousels = document.querySelectorAll('.carousel-container');

        carousels.forEach(carousel => {
            // 1. Initialize if needed (attach listeners)
            if (carousel.dataset.initialized !== 'true') {
                this.initCarousel(carousel);
            }

            // 2. Check timing for auto-rotation
            const lastSwitch = parseInt(carousel.dataset.lastSwitch || '0', 10);
            
            // Pause if hovered to prevent switching while user is looking/interacting
            if (carousel.matches(':hover')) {
                carousel.dataset.lastSwitch = now.toString();
                return;
            }

            if (now - lastSwitch > 2000) {
                this.rotate(carousel, 1);
                carousel.dataset.lastSwitch = now.toString();
            }
        });

        this.animationFrameId = requestAnimationFrame(() => this.loop());
    },

    initCarousel: function(carousel) {
        carousel.dataset.initialized = 'true';
        carousel.dataset.lastSwitch = Date.now().toString();
        carousel.style.cursor = 'pointer';

        // Click to next
        carousel.addEventListener('click', (e) => {
            e.stopPropagation();
            this.rotate(carousel, 1);
            carousel.dataset.lastSwitch = Date.now().toString(); // Reset timer
        });

        // Touch support
        let touchStartX = 0;
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            carousel.dataset.lastSwitch = Date.now().toString(); // Pause on touch
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 50) {
                this.rotate(carousel, 1); // Swipe Left -> Next
            } else if (touchEndX > touchStartX + 50) {
                this.rotate(carousel, -1); // Swipe Right -> Prev
            }
            carousel.dataset.lastSwitch = Date.now().toString();
        });
    },

    rotate: function(carousel, direction) {
        const imageCount = parseInt(carousel.dataset.imageCount, 10);
        if (imageCount <= 1) return;

        const images = Array.from(carousel.children).filter(el => !el.classList.contains('dots-container'));
        const dotsContainer = carousel.querySelector('.dots-container');
        const dots = dotsContainer ? Array.from(dotsContainer.children) : [];

        // Find current index
        let currentIndex = images.findIndex(img => img.classList.contains('opacity-100'));
        if (currentIndex === -1) currentIndex = 0;

        // Hide current
        images[currentIndex].classList.remove('opacity-100');
        images[currentIndex].classList.add('opacity-0');
        if (dots[currentIndex]) {
            dots[currentIndex].classList.remove('opacity-100', 'w-3');
            dots[currentIndex].classList.add('opacity-40');
        }

        // Calculate next
        let nextIndex = (currentIndex + direction + imageCount) % imageCount;

        // Preload next image
        this.preloadImage(images[nextIndex]);

        // Show next
        images[nextIndex].classList.remove('opacity-0');
        images[nextIndex].classList.add('opacity-100');
        if (dots[nextIndex]) {
            dots[nextIndex].classList.remove('opacity-40');
            dots[nextIndex].classList.add('opacity-100', 'w-3');
        }
    },

    preloadImage: function(element) {
        // Handle <picture> source tags
        const sources = element.querySelectorAll('source');
        sources.forEach(source => {
            if (source.dataset.srcset) {
                source.srcset = source.dataset.srcset;
                delete source.dataset.srcset;
            }
        });
        
        // Handle <img> tag
        const img = element.tagName === 'IMG' ? element : element.querySelector('img');
        if (img && img.dataset.src) {
            img.src = img.dataset.src;
            delete img.dataset.src;
        }
    }
};

    // Expose CarouselManager globally
    window.CarouselManager = CarouselManager;

    // Initialization Logic
    function init() {
        checkAndRenderHomeCards();
        window.initAppreciationCarousel();
        // The router will re-trigger card rendering on navigation via `initProductCards`.
        // The MutationObserver was removed to prevent conflicts and performance issues.
    }
    

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.addEventListener('pageshow', () => CarouselManager.start());
    document.addEventListener('visibilitychange', () => {
        document.visibilityState === 'visible' ? CarouselManager.start() : CarouselManager.stop();
    });
})();
