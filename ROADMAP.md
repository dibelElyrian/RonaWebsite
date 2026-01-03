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

## Phase 5: Compliance & Trust
- [x] Create `Privacy Policy` and `Terms of Service` pages (Data Privacy Act compliance).
- [x] Add "Thrift/Pre-loved" disclaimer to Footer and Product pages.
- [x] Update Reservation success message with specific GCash payment instructions.

## Phase 6: Business Efficiency (Admin Tools)
- [x] **Social Media Caption Generator:** One-click copy for FB/IG captions.
- [x] **Profit & Expense Tracker:** Analytics tab for Sales vs Cost.
- [x] **Waybill Generator:** Print labels for shipping.

## Phase 7: Onboarding & Education (Guides)
- [x] **Admin Onboarding:** Interactive tour for first-time admin login (Flow & Features).
- [x] **Customer Onboarding:** "How to Buy" popup/tour for new visitors.
- [x] **Help/FAQ Section:** Guide for common questions (Size, Payment, Shipping).
- [x] **"Show Tutorial" Button:** Persistent help button to replay the guides.

## Phase 8: Customer Experience & Localization
- [ ] **Messenger Chat Plugin:** Direct inquiry bubble.
- [ ] **"Steal Price" Section:** Filter for budget items (<₱1,000).
- [ ] **Size Guide & CM Search:** Conversion charts and CM filtering.
- [ ] **Social Proof:** "Flex Your Kicks" section.
- [ ] **Mobile Optimization:** Performance tuning for mobile data.

## Phase 9: Advanced Automation
- [ ] **Stock Alerts:** Email notifications.
- [ ] **Auto-Posting:** Automatically post new drops to Social Media.
