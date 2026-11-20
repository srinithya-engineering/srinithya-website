# Srinithya Engineering Private Limited (SEPL) Website

This is the source code for the official website of Srinithya Engineering Private Limited (https://srinithyaepl.in), a manufacturer of bar processing machinery and trader of light construction equipment.

## Project Overview

The website is a static HTML/CSS/JavaScript application designed to showcase products, allow users to build an estimate/quotation cart, compare product models, and contact the company via Email or WhatsApp. It uses Tailwind CSS for styling and several client-side libraries for functionality.

## Features

-   **Responsive Design**: Fully responsive layout that works on desktops, tablets, and mobile devices.
-   **Product Catalogue**: Detailed pages for various construction machinery.
-   **Estimate Builder (Cart)**:
    -   Users can add products to a cart (persisted via `localStorage`).
    -   Adjust quantities.
    -   Generate a PDF quotation instantly using `jspdf`.
    -   Email the quotation to the company automatically using `EmailJS`.
-   **Model Comparison**:
    -   Select up to 4 models on product pages to compare specifications side-by-side.
    -   Comparison bar appears dynamically when items are selected.
-   **Contact Integration**:
    -   "Get in Touch" form integrated with `EmailJS`.
    -   Floating WhatsApp button for direct messaging.
    -   Callback request modal.
-   **Animations**:
    -   Scroll-triggered animations for sections.
    -   Dynamic company name header that resizes on scroll.
    -   Interactive product carousels and image modals.

## File Structure

```
/
├── index.html, about.html, services.html
├── 404.html, CNAME, robots.txt, sitemap.xml
├── organize_project.js
├── Assets/
│   ├── APC/
│   ├── Custom Icons/
│   ├── Fonts/
│   ├── Others/
│   └── Product Images/
├── css/
│   └── style.css
├── js/
│   ├── components/             # Navigation, footer, cards, and renderers
│   ├── config/                 # Tailwind configuration
│   ├── core/                   # Routing, cart, comparison, and search
│   └── data/                   # Product and chatbot data
├── Product_details/            # Product category pages and share pages
├── Service_details/             # Repair, rental, and maintenance pages
└── scripts/                    # Sitemap, image, product-page, and hook utilities
```

## Setup & Configuration

Since this is a static website, no backend server is required. You can host it on GitHub Pages, Netlify, Vercel, or any standard web server.

### 1. EmailJS Configuration

To make the "Request a Quote" form and the "Send Estimate" feature work, you need to configure EmailJS:

1.  Sign up at EmailJS.
2.  Create a **Service** (e.g., Gmail).
3.  Create an **Email Template** for inquiries and quotations.
4.  Open the HTML files (`index.html` and files in `Product_details/`) and look for the following script block in the `<head>` or script section:

    ```javascript
    (function(){
        emailjs.init("YOUR_PUBLIC_KEY"); 
    })();
    ```

5.  Replace `YOUR_PUBLIC_KEY` with your actual Public Key.
6.  In the `sendPdfByEmail` function and form submission listeners, replace `YOUR_SERVICE_ID` and `YOUR_TEMPLATE_ID` with your specific IDs from the EmailJS dashboard.

### 2. Dependencies (CDNs)

The project relies on the following external libraries loaded via CDN. Ensure you have an internet connection for these to load:

-   **Tailwind CSS**: For styling (`cdn.tailwindcss.com`).
-   **Font Awesome**: For icons (`cdnjs.cloudflare.com`).
-   **jsPDF**: For generating PDF quotes (`cdnjs.cloudflare.com`).
-   **jsPDF-AutoTable**: For creating tables in PDFs (`cdnjs.cloudflare.com`).
-   **EmailJS**: For sending emails (`cdn.jsdelivr.net`).

## Customization

-   **Colors**: The shared Tailwind theme is in `js/config/tailwind-config.js`. Some product pages define the same theme inline in their `<head>`, so update both the shared file and any page-specific configuration when changing colors:
    ```javascript
    colors: {
        primary: '#1e3a8a',   // Dark Blue
        secondary: '#d97706', // Amber/Orange
        dark: '#111827',      // Almost Black
    }
    ```
-   **Adding Products**: Add model details, specifications, comparison data, and image paths to `js/data/product_data.js`. Add or update the corresponding category card in `js/components/product_cards.js`. Product category pages render their models from this shared data.

## Maintenance Scripts

-   Generate the sitemap after adding or removing public HTML pages:
    ```bash
    node scripts/generate_sitemap.js
    ```
    The generator excludes the 404 page and creates entries for the site, product, and service pages.
-   Generate or refresh product sharing pages:
    ```bash
    node scripts/generate_product_pages.js
    ```
-   Convert PNG and JPEG assets to WebP:
    ```bash
    node scripts/convert_images.js
    ```
    This script requires the `sharp` Node.js package and preserves the source images.
-   `organize_project.js` moves files from legacy locations into their configured folders and updates HTML/CSS paths. It skips files that are already in their destination folders.

## WhatsApp Sharing (Open Graph)

To ensure specific product images appear when sharing links on WhatsApp:

1.  Run the generator script before deployment:
    ```bash
    node scripts/generate_product_pages.js
    ```
2.  **Testing with VS Code Port Forwarding**: If you are testing locally, pass your forwarded URL (e.g., `https://xxxx.use.devtunnels.ms`) as an argument:
    ```bash
    node scripts/generate_product_pages.js https://your-forwarded-url.use.devtunnels.ms
    ```

## Automation (Git Hooks)

To ensure your sitemap and product share pages are always up to date, you can install a git pre-commit hook.

1. Run the setup script once:
    ```bash
    node scripts/setup_hooks.js
    ```
2. Now, whenever you run `git commit`, the generation scripts will run automatically and include the updated files in your commit.