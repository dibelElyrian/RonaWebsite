# Rona's Shoe Thrift Shop - Project Roadmap

This document outlines the development roadmap for Rona's Shoe Thrift Shop website.

## Tech Stack
- **Frontend:** Next.js (React)
- **Styling:** Tailwind CSS
- **Backend/Database:** Supabase (PostgreSQL, Auth, Storage)
- **Hosting:** Netlify

## Phase 1: Foundation & Setup
- [x] Initialize Next.js project with Tailwind CSS
- [x] Set up Supabase Project
    - [ ] Create tables: `products`, `orders`, `profiles`
    - [ ] Create Storage Bucket: `shoe-images`
- [ ] Connect repository to Netlify for continuous deployment

## Phase 2: The "Manager" (Admin Side)
- [x] Build Admin Login page (Supabase Auth)
- [x] Develop Inventory Manager
    - [x] Form to upload images (Drag & Drop)
    - [x] Input fields: Brand, Size, Condition, Price, Cost
    - [x] Save product data to Supabase
- [x] Create Inventory List View (Edit/Delete/Mark Sold)

## Phase 3: The Storefront (Public Side)
- [x] Build "Fresh Drops" / New Arrivals Feed
- [x] Implement Smart Filters
    - [x] Filter by Size (US/UK/EU)
    - [x] Filter by Brand
    - [x] Filter by Condition
- [x] Create Product Detail Page
    - [x] High-res image gallery
    - [x] Condition Rating display
    - [x] "Reserve" / "Buy" action

## Phase 4: Transaction & Launch
- [x] Implement Checkout/Reservation flow
    - [x] Create Orders table in Supabase
    - [x] Build Reservation Modal
    - [x] Build Admin Orders View
- [x] Mobile responsiveness check and UI polish
    - [x] Mobile Navigation (Hamburger Menu)
    - [x] Mobile Filters (Collapsible)
    - [x] Responsive Product Grid (2 columns on mobile)
- [x] Final Launch on Netlify subdomain

## Future Ideas
- [ ] Payment Integration (Stripe)
- [ ] Social Media auto-posting when new items drop
