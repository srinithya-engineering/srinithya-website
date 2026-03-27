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
├── index.html                  # Homepage (Landing page)
├── about.html                  # About Us page
├── css/                        # Stylesheets
│   └── style.css
├── js/                         # JavaScript Logic & Components
│   ├── navbar.js
│   ├── footer.js
│   ├── product_renderer.js
│   └── ... (other scripts)
├── scripts/                    # Utility/Build scripts
│   └── convert_images.js
│   └── generate_sitemap.js
│   └── add_meta_tags.js
│   └── generate_product_pages.js
│   └── setup_hooks.js
├── Assets/                     # Images and icons
│   ├── logo.png
│   └── ...
└── Product_details/            # Individual product category pages
    ├── bar_cutting_models.html
    ├── bar_bending_models.html
    ├── scrap_straightener_models.html
    ├── concrete_mixer_models.html
    ├── plate_compactor_models.html
    ├── power_trowel_models.html
    ├── high_frequency_converter_models.html
    ├── safety_equipment_models.html
    └── Vibrators.html
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

-   **Colors**: The primary and secondary colors are defined in the Tailwind config script within the `<head>` of each HTML file:
    ```javascript
    colors: {
        primary: '#1e3a8a',   // Dark Blue
        secondary: '#d97706', // Amber/Orange
        dark: '#111827',      // Almost Black
    }
    ```
-   **Adding Products**: To add new products, duplicate an existing product card HTML block in the relevant `Product_details` file.
    -   Ensure you update the `data-*` attributes (e.g., `data-model`, `data-power`) if the page supports the "Compare" feature.
    -   Update the `addToCart` function arguments with the new product details.

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