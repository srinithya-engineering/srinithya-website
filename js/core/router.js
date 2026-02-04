document.addEventListener('DOMContentLoaded', () => {
    // Initialize Router
    initRouter();
});

function initRouter() {
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        
        // Ignore if not a link, or external, or hash link, or specific download/mail links
        if (!link || 
            link.target === '_blank' || 
            link.getAttribute('href').startsWith('#') || 
            link.getAttribute('href').startsWith('mailto:') || 
            link.getAttribute('href').startsWith('tel:') ||
            link.hasAttribute('download')) {
            return;
        }

        // Prevent default navigation
        e.preventDefault();
        const href = link.href;

        navigateTo(href);
    });

    // Handle Back/Forward buttons
    window.addEventListener('popstate', () => {
        loadPage(window.location.href, false);
    });
}

async function navigateTo(url) {
    history.pushState(null, null, url);
    await loadPage(url, true);
}

async function loadPage(url, scroll = true) {
    const loader = document.getElementById('loader-wrapper');
    if (loader) loader.style.display = 'flex'; // Show loader briefly

    // Close mobile menu if open (Fix for navigation not closing menu)
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }

    try {
        let fetchUrl = url;
        let targetId = '';
        if (url.indexOf('#') !== -1) {
            const parts = url.split('#');
            fetchUrl = parts[0];
            targetId = parts[1];
        }

        const response = await fetch(fetchUrl);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // 1. Swap Main Content
        // Helper to normalize DOM structure (ensure a content wrapper exists)
        const normalizeStructure = (d) => {
            // 1. Check for existing standard containers
            let container = d.getElementById('main-content') || d.querySelector('main');
            if (container) return container;

            // 2. Fallback: Create a wrapper for "unoptimized" pages
            const wrapper = d.createElement('main');
            wrapper.id = 'dynamic-main-content';
            
            // Identify content nodes (everything between header and footer)
            const children = Array.from(d.body.children);
            const contentNodes = children.filter(el => {
                const id = el.id || '';
                const tag = el.tagName.toLowerCase();
                // Exclude Navbar, Footer, Scripts, and Overlays
                return tag !== 'nav' && id !== 'navbar' && tag !== 'footer' && 
                       !id.includes('modal') && !id.includes('overlay') &&
                       id !== 'loader-wrapper' && id !== 'scroll-progress' && id !== 'back-to-top-container' &&
                       id !== 'sepl-chatbot-container' &&
                       !el.classList.contains('fixed'); 
            });

            // Move nodes into wrapper and insert into DOM
            contentNodes.forEach(node => wrapper.appendChild(node));
            const footer = d.querySelector('footer');
            (footer && footer.parentNode === d.body) ? d.body.insertBefore(wrapper, footer) : d.body.appendChild(wrapper);
            return wrapper;
        };

        const newContent = normalizeStructure(doc);
        const currentContent = normalizeStructure(document);

        if (newContent && currentContent) {
            currentContent.innerHTML = newContent.innerHTML;
            // Update classes to match (e.g., padding differences)
            currentContent.className = newContent.className;

            // Fix for layout overlap: Ensure container has padding for fixed navbar and footer
            const classes = currentContent.className;
            
            // Check inner first child for padding too (common in unoptimized pages wrapped by router)
            let innerClasses = '';
            if (currentContent.firstElementChild) {
                innerClasses = currentContent.firstElementChild.className || '';
            }

            if (!classes.includes('pb-') && !classes.includes('py-')) {
                currentContent.classList.add('pb-12');
            }
        } else {
            // Fallback if structure is different (shouldn't happen if all pages are updated)
            window.location.reload();
            return;
        }

        // 2. Update Title
        document.title = doc.title;

        // 3. Re-execute Scripts
        // We need to find scripts in the new content and run them
        // Specifically looking for the inline script that calls renderProductCards
        
        // Helper: Intercept DOMContentLoaded/load events to force execution in SPA mode
        const originalDocAddListener = document.addEventListener;
        const originalWindowAddListener = window.addEventListener;
        
        const interceptListener = (type, listener, options) => {
            if (type === 'DOMContentLoaded' || type === 'load') {
                // Execute immediately since DOM is already ready
                setTimeout(listener, 10);
            } else {
                // Pass through other events
                if (this === document) originalDocAddListener.call(document, type, listener, options);
                else originalWindowAddListener.call(window, type, listener, options);
            }
        };

        document.addEventListener = interceptListener;
        window.addEventListener = interceptListener;

        // Find all scripts (both in the new body content and potentially new ones in head)
        const bodyScripts = Array.from(newContent.querySelectorAll('script'));
        const headScripts = Array.from(doc.head.querySelectorAll('script')).filter(s => s.src); // Only external scripts from head
        const allScripts = [...headScripts, ...bodyScripts];

        allScripts.forEach(oldScript => {
            const newScript = document.createElement('script');
            Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
            newScript.textContent = oldScript.textContent;
            
            // Prevent re-executing core infrastructure scripts that might cause issues (e.g. double listeners)
            if (newScript.src && (
                newScript.src.includes('router.js') || 
                newScript.src.includes('navbar.js') || 
                newScript.src.includes('footer.js') ||
                newScript.src.includes('product_renderer.js') ||
                newScript.src.includes('chatbot.js')
            )) return;

            // If it's an inline script with renderProductCards, we might need to delay it 
            // or ensure dependencies are ready.
            // Since product_data.js and renderer are likely in head or cached, it should be fine.
            document.body.appendChild(newScript);
            
            // Only remove inline scripts immediately. External scripts need time to load.
            if (!newScript.src) {
                newScript.remove();
            } else {
                // Optional: Remove after load to keep DOM clean, or just leave it.
                newScript.addEventListener('load', () => newScript.remove());
                newScript.addEventListener('error', () => newScript.remove());
            }
        });

        // Restore original event listeners after a short delay
        setTimeout(() => {
            document.addEventListener = originalDocAddListener;
            window.addEventListener = originalWindowAddListener;
        }, 500);

        // The MutationObservers in product_renderer.js and product_cards.js will handle re-rendering.
        // We only need to manually re-initialize components that don't use an observer.
        setTimeout(() => {
            // Explicitly trigger home page card rendering if the function exists
            if (window.initProductCards) window.initProductCards();

            // Ensure dynamic product cards are rendered (in case data loaded after DOM swap)
            if (window.autoRenderProducts) window.autoRenderProducts();

            if (window.CarouselManager && typeof window.CarouselManager.start === 'function') {
                window.CarouselManager.start();
            }

            // Notify components that navigation and rendering are complete
            window.dispatchEvent(new Event('router:navigation-complete'));

            // Explicitly re-initialize Compare Logic
            if (typeof window.initCompare === 'function') {
                window.initCompare();
            } else if (typeof window.updateCompareBar === 'function') {
                window.updateCompareBar();
            }
        }, 300);

        // 4. Update Navbar & Footer (which are outside the main content)
        if (window.updateNavbarLinks) {
            window.updateNavbarLinks();
        }
        // Remove old footer if it exists, then re-initialize
        const existingFooter = document.querySelector('footer');
        if (existingFooter) {
            existingFooter.remove();
        }
        if (window.initFooter) {
            window.initFooter();
        }

        if (scroll) {
            if (targetId) {
                setTimeout(() => {
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        // Use the specialized highlighter if available (handles scroll + animation)
                        if (window.highlightSharedProduct) {
                            window.highlightSharedProduct();
                        } else {
                            const headerOffset = 80;
                            const elementPosition = targetElement.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.scrollY - headerOffset;
                            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                        }
                    } else {
                        window.scrollTo(0, 0);
                    }
                }, 600);
            } else {
                window.scrollTo(0, 0);
            }
        }

    } catch (error) {
        console.error('Navigation error:', error);
        window.location.reload(); // Fallback
    } finally {
        if (loader) loader.style.display = 'none';
    }
}