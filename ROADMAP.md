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
- [ ] Build Admin Login page (Supabase Auth)
- [ ] Develop Inventory Manager
    - [ ] Form to upload images (Drag & Drop)
    - [ ] Input fields: Brand, Size, Condition, Price, Cost
    - [ ] Save product data to Supabase
- [ ] Create Inventory List View (Edit/Delete/Mark Sold)

## Phase 3: The Storefront (Public Side)
- [ ] Build "Fresh Drops" / New Arrivals Feed
- [ ] Implement Smart Filters
    - [ ] Filter by Size (US/UK/EU)
    - [ ] Filter by Brand
    - [ ] Filter by Condition
- [ ] Create Product Detail Page
    - [ ] High-res image gallery
    - [ ] Condition Rating display
    - [ ] "Reserve" / "Buy" action

## Phase 4: Transaction & Launch
- [ ] Implement Checkout/Reservation flow
- [ ] Mobile responsiveness check and UI polish
- [ ] Final Launch on Netlify subdomain

## Future Ideas
- [ ] Payment Integration (Stripe)
- [ ] Social Media auto-posting when new items drop
