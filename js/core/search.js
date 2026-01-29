/**
 * Search Functionality
 * Handles searching through productData and rendering results.
 */

document.addEventListener('DOMContentLoaded', () => {
    initSearch();
});

// Re-initialize on Router navigation (if navigating back to home)
window.addEventListener('router:navigation-complete', () => {
    initSearch();
});

function initSearch() {
    const searchInput = document.getElementById('catalogue-search');
    if (!searchInput) return;

    // Synonym Dictionary for smarter matching
    const synonyms = {
        'cement': 'concrete',
        'rod': 'bar',
        'rebar': 'bar',
        'iron': 'bar',
        'steel': 'bar',
        'tmt': 'bar',
        'stirrup': 'bar',
        'mix': 'mixer',
        'mortar': 'concrete',
        'pokers': 'poker',
        'needles': 'needle',
        'tube': 'hose',
        'pipe': 'hose',
        'compaction': 'compactor',
        'rammer': 'compactor',
        'soil': 'compactor',
        'asphalt': 'compactor',
        'breaker': 'cutter',
        'shear': 'cutter',
        'saw': 'cutter',
        'drill': 'cutter',
        'drum': 'roller',
        'hoist': 'lift',
        'crane': 'lift',
        'elevator': 'lift',
        'cradle': 'platform',
        'gondola': 'platform',
        'scaffold': 'platform',
        'floater': 'trowel',
        'finisher': 'trowel',
        'submersible': 'pump',
        'trolley': 'barrow',
        'cart': 'barrow',
        'office': 'cabin',
        'helicopter': 'trowel',
        'polisher': 'trowel',
        'monkey': 'lift',
        'winch': 'lift',
        'basket': 'platform',
        'stage': 'platform',
        'swing': 'platform',
        'shaft': 'needle',
        'vibrating': 'vibrator',
        'bit': 'cutter',
        'blade': 'cutter',
        'sieve': 'screener',
        'mesh': 'screener',
        'smoke': 'fogger',
        'spray': 'fogger',
        'arc': 'welding',
        'inverter': 'welding',
        'scale': 'weights',
        'loo': 'toilet',
        'restroom': 'toilet',
        'shed': 'cabin',
        'hire': 'rental',
        'lease': 'rental',
        'fix': 'repair',
        'mechanic': 'repair',
        'checkup': 'maintenance',
        'decoiling': 'straightener',
        'tamping': 'compactor',
        'frog': 'compactor',
        'earth': 'compactor'
    };

    let currentSearchResults = [];
    let currentSuggestion = null;

    // Debounce to prevent excessive rendering
    const debounce = (func, wait) => {
        let timeout;
        return function(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    const toggleOriginalContent = (show) => {
        const productsSection = document.getElementById('products');
        if (!productsSection) return;
        const container = productsSection.querySelector('.max-w-7xl');
        if (!container) return;

        Array.from(container.children).forEach(child => {
            if (child.id !== 'search-results-section') {
                show ? child.classList.remove('hidden') : child.classList.add('hidden');
            }
        });
    };

    const resetSearch = () => {
        const resultsSection = document.getElementById('search-results-section');
        if (resultsSection) resultsSection.classList.add('hidden');
        toggleOriginalContent(true);
    };

    const updateCategoryDropdown = () => {
        const select = document.getElementById('search-category-filter');
        if (!select) return;

        // Extract unique categories from current results
        const categories = [...new Set(currentSearchResults.map(p => p._searchCategory))].filter(Boolean).sort();
        
        // Helper to format "bar-benders" to "Bar Benders"
        const formatLabel = (str) => str.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

        if (categories.length <= 1) {
            // Hide dropdown wrapper if only 1 or 0 categories
            select.parentElement.classList.add('hidden');
        } else {
            select.parentElement.classList.remove('hidden');
            select.innerHTML = '<option value="">All Categories</option>' + 
                categories.map(c => `<option value="${c}">${formatLabel(c)}</option>`).join('');
            select.value = ""; // Reset selection on new search
        }
    };

    const renderFilteredResults = () => {
        const select = document.getElementById('search-category-filter');
        const category = select ? select.value : "";
        const query = searchInput.value;

        const results = category 
            ? currentSearchResults.filter(p => p._searchCategory === category) 
            : currentSearchResults;

        const countEl = document.getElementById('search-count');
        if (countEl) {
            const catText = category ? ` in ${category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}` : '';
            countEl.textContent = `Found ${results.length} matching items for "${query}"${catText}`;
        }

        // Show/Hide Top Suggestion
        const suggestionContainer = document.getElementById('search-suggestion-container');
        if (suggestionContainer) {
            if (currentSuggestion && currentSuggestion.toLowerCase() !== query.toLowerCase()) {
                suggestionContainer.innerHTML = `Did you mean <button id="suggestion-btn-top" class="text-secondary font-bold hover:underline">${currentSuggestion}</button>?`;
                suggestionContainer.classList.remove('hidden');
                document.getElementById('suggestion-btn-top').addEventListener('click', () => performSearch(currentSuggestion));
            } else {
                suggestionContainer.classList.add('hidden');
            }
        }

        if (results.length > 0) {
            window.renderProductCards('search-results-grid', results);

            // Highlight matches
            const grid = document.getElementById('search-results-grid');
            // Get unique terms including synonyms
            const rawTerms = query.toLowerCase().split(/\s+/).filter(t => t.length > 1);
            const terms = new Set(rawTerms);
            rawTerms.forEach(t => { if (synonyms[t]) terms.add(synonyms[t]); });

            if (grid && terms.size > 0) {
                // Target specific text elements to avoid breaking layout/buttons
                const textElements = grid.querySelectorAll('h3, p, li span'); 
                textElements.forEach(el => {
                    let html = el.innerHTML;
                    let hasChange = false;
                    terms.forEach(term => {
                        const safeTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                        const regex = new RegExp(`(${safeTerm})`, 'gi');
                        if (regex.test(html)) {
                            html = html.replace(regex, '<mark class="bg-yellow-200 text-gray-900 rounded-sm px-0.5">$1</mark>');
                            hasChange = true;
                        }
                    });
                    if (hasChange) el.innerHTML = html;
                });
            }
        } else {
            document.getElementById('search-results-grid').innerHTML = `
                <div class="col-span-full flex flex-col items-center justify-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <div class="relative mb-6">
                        <i class="fa-solid fa-magnifying-glass text-6xl text-gray-300"></i>
                        <i class="fa-solid fa-magnifying-glass absolute -bottom-2 -right-2 text-4xl text-gray-400 bg-gray-50 rounded-full p-1 border-4 border-gray-50"></i>
                    </div>
                    <h4 class="text-2xl font-bold text-gray-700 mb-2">No products found</h4>
                    <p class="text-gray-500 text-center max-w-md">
                        ${currentSuggestion ? 
                            `Did you mean <button id="suggestion-btn" class="text-secondary font-bold hover:underline text-lg">${currentSuggestion}</button>?` : 
                            (category ? 'Try switching back to "All Categories".' : `We couldn't find any matches for "<span class="font-semibold text-gray-800">${query}</span>".`)
                        }
                        ${!currentSuggestion ? '<br>Try checking for typos or using broader keywords.' : ''}
                    </p>
                </div>
            `;

            const suggestionBtn = document.getElementById('suggestion-btn');
            if (suggestionBtn) {
                suggestionBtn.addEventListener('click', () => performSearch(currentSuggestion));
            }
        }
    };

    // Helper: Levenshtein Distance for fuzzy matching (Typo Tolerance)
    const getEditDistance = (a, b) => {
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;
        const matrix = [];
        for (let i = 0; i <= b.length; i++) matrix[i] = [i];
        for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                const cost = b.charAt(i - 1) === a.charAt(j - 1) ? 0 : 1;
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + cost, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
            }
        }
        return matrix[b.length][a.length];
    };

    // Helper: Generate "Did you mean" suggestion
    const getDidYouMeanSuggestion = (query, products) => {
        const vocabulary = new Set();
        products.forEach(p => {
            // Add exact identifiers to vocabulary first
            if (p.name) vocabulary.add(p.name.toLowerCase());
            if (p.model) vocabulary.add(p.model.toLowerCase());

            const text = `${p.name} ${p.model} ${p._searchCategory} ${p.description || ''}`;
            text.toLowerCase().split(/[\s\-\/\(\)]+/).forEach(w => {
                if (w.length > 2) vocabulary.add(w);
            });
        });

        const tokens = query.toLowerCase().split(/\s+/);
        let hasCorrection = false;
        
        const correctedTokens = tokens.map(token => {
            if (vocabulary.has(token)) return token;
            
            let bestWord = token;
            let minDist = Infinity;
            
            vocabulary.forEach(word => {
                const dist = getEditDistance(token, word);
                // Allow correction if distance is small (<= 2) and relative to length
                if (dist < minDist && dist <= 2 && dist < token.length) {
                    minDist = dist;
                    bestWord = word;
                }
            });
            
            if (bestWord !== token) hasCorrection = true;
            return bestWord;
        });

        return hasCorrection ? correctedTokens.join(' ') : null;
    };

    const performSearch = (query) => {
        if (!window.productData || !window.renderProductCards) return;

        const term = query.toLowerCase().trim();
        const productsSection = document.getElementById('products');
        
        // Update input value if search was triggered programmatically (e.g. suggestion click)
        if (searchInput.value !== query) {
            searchInput.value = query;
        }

        // 1. Setup Search Results Container (if not exists)
        let resultsSection = document.getElementById('search-results-section');
        
        if (!resultsSection && productsSection) {
            const container = productsSection.querySelector('.max-w-7xl');
            if (container) {
                const div = document.createElement('div');
                div.id = 'search-results-section';
                div.className = 'hidden mb-12 animate-fade-in-up';
                div.innerHTML = `
                    <div class="text-center mb-8 border-b border-gray-200 pb-4">
                        <h3 class="text-3xl font-bold text-primary">Search Results</h3>
                        <p id="search-count" class="text-gray-600 mt-2 font-medium"></p>
                        <div id="search-suggestion-container" class="mt-2 text-lg hidden text-gray-600"></div>
                        <div class="flex flex-col md:flex-row justify-center items-center gap-4 mt-4">
                            
                            <div class="relative hidden">
                                <select id="search-category-filter" class="appearance-none bg-white border border-gray-300 text-gray-700 py-2 pl-4 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary cursor-pointer font-medium min-w-[200px]">
                                    <option value="">All Categories</option>
                                </select>
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <i class="fa-solid fa-chevron-down text-xs"></i>
                                </div>
                            </div>

                            <button id="clear-search-btn" class="text-sm text-red-500 hover:text-red-700 font-bold underline flex items-center gap-2 transition-colors">
                                <i class="fa-solid fa-xmark"></i> Clear Search
                            </button>
                        </div>
                    </div>
                    <div id="search-results-grid" class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8"></div>
                `;
                
                // Insert before the first content in the container
                container.prepend(div);
                resultsSection = div;
                
                // Bind Clear Button
                const clearAction = () => {
                    searchInput.value = '';
                    resetSearch();
                };
                document.getElementById('clear-search-btn').addEventListener('click', clearAction);
                document.getElementById('search-category-filter').addEventListener('change', renderFilteredResults);
            }
        }

        // 3. Reset if query is empty
        if (term.length < 2) {
            resetSearch();
            return;
        }

        // 4. Flatten Product Data
        let allProducts = [];
        Object.entries(window.productData).forEach(([key, category]) => {
            const defaultCat = key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

            if (Array.isArray(category)) {
                category.forEach(p => {
                    const cat = (p.compare && p.compare.category) ? p.compare.category : defaultCat;
                    allProducts.push({ ...p, _searchCategory: cat });
                });
            } else if (typeof category === 'object') {
                // Handle nested categories (e.g. handy-vibration-models)
                Object.values(category).forEach(subCat => {
                    if (Array.isArray(subCat)) {
                        subCat.forEach(p => {
                            const cat = (p.compare && p.compare.category) ? p.compare.category : defaultCat;
                            allProducts.push({ ...p, _searchCategory: cat });
                        });
                    }
                });
            }
        });

        // 5. Intelligent Filter & Rank (Weighted Scoring + Fuzzy Search)
        const rawTokens = term.split(/\s+/).filter(t => t.length > 0);
        // Expand tokens with synonyms
        const tokens = [...rawTokens];
        rawTokens.forEach(t => {
            if (synonyms[t]) tokens.push(synonyms[t]);
        });
        
        const scoredProducts = allProducts.map(p => {
            let score = 0;
            
            // Prepare searchable text fields
            const name = (p.name || '').toLowerCase();
            const model = (p.model || '').toLowerCase();
            const desc = (p.description || '').toLowerCase();
            const specs = (p.specs || []).map(s => (s.text || '').toLowerCase()).join(' ');
            const category = (p._searchCategory || '').toLowerCase();
            
            // A. Exact Phrase Match (Highest Priority)
            if (name.includes(term) || model.includes(term)) score += 100;

            // B. Token Matching
            let matchedTokensCount = 0;

            tokens.forEach(token => {
                let tokenScore = 0;
                let matched = false;

                // 1. Check Model (Highest Weight)
                if (model.includes(token)) { tokenScore += 40; matched = true; }
                
                // 2. Check Name (High Weight)
                else if (name.includes(token)) { tokenScore += 30; matched = true; }

                // 3. Check Category
                else if (category.includes(token)) { tokenScore += 15; matched = true; }

                // 4. Check Description & Specs (Lower Weight)
                else if (desc.includes(token) || specs.includes(token)) { tokenScore += 10; matched = true; }

                // 5. Fuzzy Fallback (Typo Tolerance)
                if (!matched && token.length > 3) {
                    // Check against words in name/model/category/desc
                    const targetWords = (name + ' ' + model + ' ' + category + ' ' + desc).split(/\s+/);
                    const bestMatch = targetWords.some(word => {
                        // Allow 1 edit for length 4-6, 2 edits for longer
                        const maxEdits = token.length > 6 ? 2 : 1;
                        return Math.abs(word.length - token.length) <= maxEdits && getEditDistance(token, word) <= maxEdits;
                    });
                    
                    if (bestMatch) {
                        tokenScore += 5; // Low score for fuzzy match
                        matched = true;
                    }
                }

                if (matched) {
                    matchedTokensCount++;
                    score += tokenScore;
                }
            });

            // Boost score if all tokens matched
            if (matchedTokensCount === tokens.length) score += 50;

            return { product: p, score };
        }).filter(item => item.score > 0); // Keep only matching items

        // Sort by score descending (Best matches first)
        scoredProducts.sort((a, b) => b.score - a.score);
        
        currentSearchResults = scoredProducts.map(item => item.product);

        // Generate suggestion (Always check to help users refine queries)
        currentSuggestion = getDidYouMeanSuggestion(term, allProducts);

        // 6. Render Results
        if (resultsSection) {
            resultsSection.classList.remove('hidden');
            toggleOriginalContent(false);
            
            updateCategoryDropdown();
            renderFilteredResults();

            // Scroll to results if user is far up (e.g. at Hero)
            const navbarHeight = document.getElementById('navbar')?.offsetHeight || 80;
            const targetPosition = resultsSection.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;
            
            // Only scroll if we are not already looking at it
            if (Math.abs(window.scrollY - targetPosition) > 300) {
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        }
    };

    // Tooltip Setup
    let tooltip = document.getElementById('search-tooltip');
    if (tooltip) tooltip.remove(); // Remove old tooltip to ensure fresh render

    tooltip = document.createElement('div');
    tooltip.id = 'search-tooltip';
    tooltip.className = 'absolute top-1/2 transform -translate-y-1/2 flex items-center gap-2 pointer-events-none transition-opacity duration-200 opacity-0 z-10';
    tooltip.innerHTML = `
        <i class="fa-solid fa-arrow-turn-down transform rotate-90 text-secondary text-lg animate-pulse"></i>
        <span class="text-gray-400 text-sm font-medium whitespace-nowrap">Press Enter to See Results</span>
    `;
    
    const parent = searchInput.parentElement;
    if (parent) {
        if (window.getComputedStyle(parent).position === 'static') {
            parent.classList.add('relative');
        }
        parent.appendChild(tooltip);
    }

    // Mirror for text width measurement
    let mirror = document.getElementById('search-input-mirror');
    if (!mirror) {
        mirror = document.createElement('span');
        mirror.id = 'search-input-mirror';
        mirror.style.cssText = 'position:absolute; visibility:hidden; white-space:pre; left:-9999px; top:-9999px;';
        document.body.appendChild(mirror);
    }

    const updateTooltip = () => {
        if (!tooltip || !mirror) return;
        
        const val = searchInput.value;
        if (val.length === 0) {
            tooltip.classList.add('opacity-0');
            return;
        }

        const styles = window.getComputedStyle(searchInput);
        mirror.style.font = styles.font;
        mirror.style.fontSize = styles.fontSize;
        mirror.style.fontFamily = styles.fontFamily;
        mirror.style.fontWeight = styles.fontWeight;
        mirror.style.letterSpacing = styles.letterSpacing;
        mirror.textContent = val;

        const paddingLeft = parseFloat(styles.paddingLeft) || 0;
        const textWidth = mirror.offsetWidth;
        const scrollLeft = searchInput.scrollLeft;
        
        const leftPos = paddingLeft + textWidth - scrollLeft + 12;
        
        tooltip.style.left = `${leftPos}px`;
        tooltip.classList.remove('opacity-0');
    };

    // Event Listeners
    searchInput.addEventListener('input', (e) => {
        if (e.target.value.trim() === '') {
            resetSearch();
            if (tooltip) tooltip.classList.add('opacity-0');
        } else {
            updateTooltip();
        }
    });

    // Update tooltip on scroll/click/keyup to handle cursor movement/scrolling
    ['scroll', 'click', 'keyup'].forEach(evt => {
        searchInput.addEventListener(evt, () => {
            if (searchInput.value.trim() !== '') updateTooltip();
        });
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (tooltip) tooltip.classList.add('opacity-0');
            performSearch(searchInput.value);
        }
    });

    searchInput.addEventListener('blur', () => {
        if (tooltip) tooltip.classList.add('opacity-0');
    });

    searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim() !== '') {
            updateTooltip();
        }
    });
}