(function() {
    const heavyMachinery = [
        {
            title: "Bar Bending Machine",
            image: "./Assets/Product Images/bender.png",
            imageWebp: "./Assets/Product Images/bender.webp",
            description: "Automatic bending with digital control panel. Angles range 0-360 degrees.",
            features: ["Preset Angle Options", "Emergency Stop Safety", "Durable Construction"],
            link: "Product_details/bar_bending_models.html"
        },
        {
            title: "Bar Cutting Machine",
            image: "./Assets/Product Images/sbc.png",
            imageWebp: "./Assets/Product Images/sbc.webp",
            description: "Precise cutting for TMT bars up to 40mm. Low noise, high efficiency.",
            features: ["Heavy Duty Gearbox", "ISO Certified Components", "Low Noise Operation"],
            link: "Product_details/bar_cutting_models.html"
        },
        {
            title: "Suspended Scaffold Solution",
            image: ["./Assets/Product Images/srp.png", "./Assets/Product Images/srp2.webp"],
            imageWebp: ["./Assets/Product Images/srp.webp", "./Assets/Product Images/srp2.webp"],
            description: "Customizable high-safety suspended platforms for facade work.",
            features: ["Model: ZLP800", "Customizable Platform Size", "Adjustable Rope Length"],
            link: "Product_details/suspended_rope_platform.html"
        },
        {
            title: "Scrap Straightener",
            image: "./Assets/Product Images/sss.png",
            imageWebp: "./Assets/Product Images/sss.webp",
            description: "Now your scrap is no more scrap.",
            features: ["Multiple models", "Overload Protection", "High Efficiency"],
            link: "Product_details/scrap_straightener_models.html"
        },
        {
            title: "Road Rollers",
            image: ["./Assets/Product Images/srr.png", "./Assets/Product Images/swr.png", "./Assets/Product Images/swr fh.png"],
            imageWebp: ["./Assets/Product Images/srr.webp", "./Assets/Product Images/swr.webp", "./Assets/Product Images/swr fh.webp"],
            description: "Ride-on and Walk-behind rollers for road construction.",
            features: ["Ride-on & Walk-behind", "Heavy Duty Compaction", "Single & Double Drum Options"],
            link: "Product_details/road_roller_models.html"
        },
        
          
    ];

const lightEquipment = [
        {
            title: "Portable Bar Equipment",
            image: ["./Assets/Product Images/spb.png", "./Assets/Product Images/spc.png"],
            imageWebp: ["./Assets/Product Images/spb.webp", "./Assets/Product Images/spc.webp"],
            description: "Lightweight, on-site solutions for rebar cutting and bending.",
            features: ["Portable Cutters up to 32mm", "Portable Benders up to 32mm", "Durable Construction"],
            link: "Product_details/portable_bar_processing_models.html"
        },
        {
            title: "High Frequency Converters",
            image: ["./Assets/Product Images/shfc35.png", "./Assets/Product Images/shfc90.png"],
            imageWebp: ["./Assets/Product Images/shfc35.webp", "./Assets/Product Images/shfc90.webp"],
            description: "Reliable power conversion for high-frequency concrete vibrators.",
            features: ["2 & 4 Outlet Models", "Converts 415V to 42V/200Hz", "Robust Design"],
            link: "Product_details/high_frequency_converter_models.html"
        },
        {
            title: "High Frequency Pokers",
            image: ["./Assets/Product Images/shfn60_12m.png", "./Assets/Product Images/shfn40_12m.png", "./Assets/Product Images/shfn60_5m.png", "./Assets/Product Images/shfn40_5m.png","./Assets/Product Images/shiv40.png", "./Assets/Product Images/shiv60.png"],
            imageWebp: ["./Assets/Product Images/shfn60_12m.webp", "./Assets/Product Images/shfn40_12m.webp", "./Assets/Product Images/shfn60_5m.webp", "./Assets/Product Images/shfn40_5m.webp", "./Assets/Product Images/shiv40.webp", "./Assets/Product Images/shiv60.webp"],
            description: "Internal concrete vibration needles for superior consolidation.",
            features: ["40mm & 60mm Diameters", "Hose lengths up to 12 meters", "Multiple Power Options"],
            link: "Product_details/high_frequency_poker_models.html"
        },
        {
            title: "Vibrators",
            image: ["./Assets/Product Images/sdv.png", "./Assets/Product Images/sev33.png", "./Assets/Product Images/spv.png", "./Assets/Product Images/sev31.png"],
            imageWebp: ["./Assets/Product Images/sdv.webp", "./Assets/Product Images/sev33.webp", "./Assets/Product Images/spv.webp", "./Assets/Product Images/sev31.webp"],
            description: "A wide range of concrete vibrators for perfect consolidation.",
            features: ["High Frequency Pokers", "Electric & Petrol Engines", "Multiple Power Options"],
            link: "Product_details/Vibrators.html"
        },
        {
            title: "Mechanical Pokers",
            image: ["./Assets/Product Images/smp25.png", "./Assets/Product Images/smp40.png", "./Assets/Product Images/smp60.png"],
            imageWebp: ["./Assets/Product Images/smp25.webp", "./Assets/Product Images/smp40.webp", "./Assets/Product Images/smp60.webp"],
            description: "High-quality vibration needles for various applications.",
            features: ["Handy & Hand-Held Needles", "Mechanical Needles", "Durable Construction"],
            link: "Product_details/mechanical_poker_models.html"
        },
        {
            title: "Shutter Vibrators",
            image: ["./Assets/Product Images/shfs.png", "./Assets/Product Images/shfs-4215.png", "./Assets/Product Images/ssv-305.png", "./Assets/Product Images/ssv-310.png", "./Assets/Product Images/ssv-320.png"],
            imageWebp: ["./Assets/Product Images/shfs.webp", "./Assets/Product Images/shfs-4215.webp", "./Assets/Product Images/ssv-305.webp", "./Assets/Product Images/ssv-310.webp", "./Assets/Product Images/ssv-320.webp"],
            description: "External vibrators for formwork, ensuring void-free concrete.",
            features: ["High Frequency Models", "3-Phase Power Options", "Durable Construction"],
            link: "Product_details/shutter_vibrator_models.html"
        },
        {
            title: "Handy Vibrator Solution",
            image: ["./Assets/Product Images/shm800.png", "./Assets/Product Images/shm1200.png", "./Assets/Product Images/shm1600.png"],
            imageWebp: ["./Assets/Product Images/shm800.webp", "./Assets/Product Images/shm1200.webp", "./Assets/Product Images/shm1600.webp"],
            description: "Portable and efficient vibration solutions.",
            features: ["Hand Held Motors", "800W - 1600W Options", "High Frequency Vibrators"],
            link: "Product_details/handy_vibration_models.html"
        },
        {
            title: "Mini Lift / Crane",
            image: ["./Assets/Product Images/sml.png","./Assets/Product Images/sml-500.png"],
            imageWebp: ["./Assets/Product Images/sml.webp", "./Assets/Product Images/sml-500.webp"],
            description: "Compact mini crane for lifting materials up to 30m.",
            features: ["300Kg & 500Kg Capacity", "360 degree rotation", "Electric Motor"],
            link: "Product_details/mini_lift_models.html"
        },
        {
            title: "Scissor Lifts",
            image: "./Assets/Product Images/scissorlift.png",
            imageWebp: "./Assets/Product Images/scissorlift.webp",
            description: "Safe and stable platforms for elevated work.",
            features: ["Max Height: 14m", "Battery / Electric", "Hydraulic Operation"],
            link: "Product_details/scissorlift_models.html"
        },
        {
            title: "Plate Compactors",
            image: ["./Assets/Product Images/sfpc-2p.png", "./Assets/Product Images/srpc-3d.png", "./Assets/Product Images/srpc-3e.png","./Assets/Product Images/sfpc-5e.png", "./Assets/Product Images/sfpc-5d.png"],
            imageWebp: ["./Assets/Product Images/sfpc-2p.webp", "./Assets/Product Images/srpc-3d.webp", "./Assets/Product Images/srpc-3e.webp", "./Assets/Product Images/sfpc-5e.webp", "./Assets/Product Images/sfpc-5d.webp"],
            description: "For soil, asphalt, and paving stone compaction.",
            features: ["Forward & Reversible", "Electric & Petrol & Diesel Engines", "Various Weight Options"],
            link: "Product_details/plate_compactor_models.html"
        },
        {
            title: "Surface Smootheners",
            image: ["./Assets/Product Images/screed vibrator.png", "./Assets/Product Images/sptp.png", "./Assets/Product Images/spte.png"],
            imageWebp: ["./Assets/Product Images/screed vibrator.webp", "./Assets/Product Images/sptp.webp", "./Assets/Product Images/spte.webp"],
            description: "High-quality finishing with Power Trowels and Screed Vibrators.",
            features: ["Power Trowels (Petrol/Electric)", "Screed Vibrators & Blades","Durable Build"],
            link: "Product_details/surface_smootheners.html"
        },
        {
            title: "Industrial Cutting Tools",
            image: ["./Assets/Product Images/scc-90.png","./Assets/Product Images/scc-200.png", "./Assets/Product Images/groove.png"],
            imageWebp: ["./Assets/Product Images/scc-90.webp","./Assets/Product Images/scc-200.webp", "./Assets/Product Images/groove.webp"],
            description: "Precision tools for groove and core cutting applications.",
            features: ["Groove Cutters", "Core Cutters", "Electric & Petrol Options"],
            link: "Product_details/industrial_cutting_tools.html"
        },
        {
            title: "Concrete Handling Equipment",
            image: ["./Assets/Product Images/scme.png", "./Assets/Product Images/scpb.png", "./Assets/Product Images/scme-220.png"],
            imageWebp: ["./Assets/Product Images/scme.webp", "./Assets/Product Images/scpb.webp", "./Assets/Product Images/scme-220.webp"],
            description: "Portable 1-bag and 2-bag mixers for any site.",
            features: ["Heavy-Duty Chassis", "Electric & Diesel Options", "Easy Mobility"],
            link: "Product_details/concrete_mixer_models.html"
        },
        {
            title: "Dewatering Pumps",
            image: ["./Assets/Product Images/sdwp2.png", "./Assets/Product Images/sdwp3.png"],
            imageWebp: ["./Assets/Product Images/sdwp2.webp", "./Assets/Product Images/sdwp3.webp"],
            description: "Submersible flexible shaft pumps for efficient water removal.",
            features: ["2 inch & 3 inch pumps", "Petrol/Diesel/Electric", "High Flow Rates"],
            link: "Product_details/dewatering_pump.html"
        },
        {
            title: "Prefab. Structures",
            image: ["./Assets/Product Images/cabin.png", "./Assets/Product Images/container.png", "./Assets/Product Images/toilet.png"],
            imageWebp: ["./Assets/Product Images/cabin.webp", "./Assets/Product Images/container.webp", "./Assets/Product Images/toilet.webp"],
            description: "Customizable portable cabins, containers, and toilets.",
            features: ["Portable Office Cabins", "Shipping Containers", "FRP Toilets"],
            link: "Product_details/prefab_structures.html"
        },
        {
            title: "Civic Utility Products",
            image: ["./Assets/Product Images/heavybarrow.png", "./Assets/Product Images/screener.png", "./Assets/Product Images/fogger.png", "./Assets/Product Images/welding.png","./Assets/Product Images/weights.png"],
            imageWebp: ["./Assets/Product Images/heavybarrow.webp", "./Assets/Product Images/screener.webp", "./Assets/Product Images/fogger.webp", "./Assets/Product Images/welding.webp","./Assets/Product Images/weights.webp"],
            description: "Essential utility tools for civic maintenance and construction.",
            features: ["Wheel Barrows", "Sand Screeners", "Fogger Machines", "Welding Machines", "Weights & Measures"],
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

                const singleImgTag = `<img ${srcAttr} alt="${product.title}" class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110" loading="lazy" decoding="async">`;

                if (webpSrc) {
                    return `<picture class="absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${isFirst ? 'opacity-100' : 'opacity-0'}">
                                <source ${srcsetAttr} type="image/webp">
                                ${singleImgTag}
                            </picture>`;
                }
                return singleImgTag.replace('class="', `class="absolute inset-0 transition-opacity duration-700 ease-in-out ${isFirst ? 'opacity-100' : 'opacity-0'} `);
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

            const singleImgTag = `<img onclick="openImageModal('${imgSrc}')" src="${imgSrc}" alt="${product.title}" loading="lazy" decoding="async" class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 cursor-pointer" width="300" height="200">`;

            imageHTML = webpSrc
                ? `<picture class="w-full h-full block"><source srcset="${webpSrc.replace(/ /g, '%20')}" type="image/webp">${singleImgTag}</picture>`
                : singleImgTag;
        }

        return `
        <div class="border border-gray-200 rounded-xl overflow-hidden hover:border-primary hover:shadow-[0_0_20px_rgba(30,58,138,0.6)] transition-all duration-300 flex flex-col h-full group bg-white">
            <div class="h-32 md:h-64 bg-white flex items-center justify-center overflow-hidden relative">
                ${imageHTML}
            </div>
            <div class="p-3 md:p-6 flex flex-col flex-grow">
                <h3 class="text-base md:text-xl font-bold mb-2 text-gray-900">${product.title}</h3>
                <p class="text-gray-600 text-xs md:text-sm mb-4">${product.description}</p>
                <ul class="text-xs md:text-sm text-gray-600 mb-4 space-y-1 flex-grow">
                    ${product.features.map(feature => `<li><i class="fa-solid fa-check text-green-600 mr-2" aria-hidden="true"></i> ${feature}</li>`).join('')}
                </ul>
                <a href="${product.link}" class="block text-center w-full border border-primary text-primary py-1.5 md:py-2 rounded hover:bg-primary hover:text-white transition mt-auto text-sm md:text-base" aria-label="View details for ${product.title}">Details</a>
            </div>
        </div>
        `;
    }

    window.renderHomeCards = function() {
    const heavyContainer = document.getElementById('heavy-machinery-grid');
    const lightContainer = document.getElementById('light-machinery-grid');
    
    if (!heavyContainer && !lightContainer) return;

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

    processContainer(heavyContainer, heavyMachinery);
    processContainer(lightContainer, lightEquipment);

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

    // Expose for manual calls if needed (Router compatibility)
    window.initProductCards = function() {
        window.renderHomeCards();
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
        window.initProductCards();
        CarouselManager.start();
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
