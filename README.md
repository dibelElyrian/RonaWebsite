# Rona's Shoe Thrift Shop Website

A modern e-commerce platform for a shoe thrift shop, built to manage unique inventory and boost online presence.

## Project Overview
This website serves two main purposes:
1.  **Public Storefront:** A clean, "streetwear" aesthetic site for customers to browse unique shoe drops, filter by size/condition, and reserve items.
2.  **Admin Dashboard:** A management tool for the shop owner to easily upload new inventory, track sales, and manage product status.

## Tech Stack
- **Framework:** [Next.js](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Backend:** [Supabase](https://supabase.com/) (Database, Auth, Storage)
- **Deployment:** [Netlify](https://www.netlify.com/)

## Development Guidelines

### UI & UX Standards
*   **Clear Fonts Required:** All forms, inputs, and primary content must use clear, high-contrast fonts. Avoid light gray text (`text-gray-500` or lighter) for critical reading fields like input values or labels. Prefer `text-gray-900` or `font-semibold` to ensuring readability across all devices.

## Getting Started

### Prerequisites
- Node.js
- npm or yarn

### Installation
1.  Navigate to the project directory:
    ```bash
    cd rona-shop
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up environment variables:
    - Rename `.env.local` (if needed) and add your Supabase URL and Anon Key.
4.  Run the development server:
    ```bash
    npm run dev
    ```

## Roadmap
See [ROADMAP.md](./ROADMAP.md) for the detailed development plan.

### Upcoming Features
- **User Experience:** "Add to Cart" animations & Improved Checkout Wizard.
- **Admin Tools:** Enhanced Order Search & filtering.

## Recent Updates (Jan 2026)
- **Checkout Wizard:** New 2-step checkout process with auto-save for shipping details.
- **Strict Validation:** 
  - **Mobile:** Enforced `09xxxxxxxxx` (11 digits) format.
  - **GCash:** Enforced 13-digit numeric only reference validation.
- **UX Improvements:**
  - **Cart:** Non-intrusive "Added to Cart" feedback (removed annoying drawer popup).
  - **Admin:** Added Search Bar for Orders (supports Name, Email, Ref No.).
  - **Payment:** Expandable QR Code ("Lightbox") for easier scanning.
