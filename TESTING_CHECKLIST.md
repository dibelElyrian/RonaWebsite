# Rona's Shoe Thrift Shop - Testing Checklist

Use this checklist to verify that all features of the website are working correctly before promoting to production.

## 1. Public Storefront (Customer View)

### Homepage
- [ ] **Load:** Homepage loads successfully with the "Fresh Kicks" hero banner.
- [ ] **Fresh Drops:** The "Fresh Drops" section displays the latest 20 available shoes.
- [ ] **Empty State:** If no shoes are available, a "No shoes available" message is shown.
- [ ] **Navigation:** Clicking "Shop All" or "View all" navigates to `/shop`.

### Shop Page (`/shop`)
- [ ] **Product Grid:** Displays all available shoes.
- [ ] **Mobile Layout:** Shows 2 columns of products on mobile screens.
- [ ] **Desktop Layout:** Shows 3-4 columns of products on desktop screens.
- [ ] **Filters (Brand):** Selecting a brand (e.g., "Nike") updates the URL and filters the grid.
- [ ] **Filters (Size):** Selecting a size (e.g., "9.5") updates the URL and filters the grid.
- [ ] **Filters (Condition):** Selecting a condition updates the URL and filters the grid.
- [ ] **Mobile Filters:** The "Filters" dropdown opens and closes correctly on mobile.
- [ ] **No Results:** Selecting filters that match no items shows a "No shoes found" message.

### Product Detail Page (`/products/[id]`)
- [ ] **Details:** Displays correct Title, Price, Brand, Size, and Condition.
- [ ] **Image:** Displays the product image (or "No Image" placeholder).
- [ ] **Status Indicator:** Shows "Available" (Green) or "Reserved/Sold" (Red).
- [ ] **Back Button:** "Back to Shop" link works correctly.

### Reservation Flow
- [ ] **Reserve Button:** Clicking "Reserve Now" opens the reservation modal.
- [ ] **Form Validation:** Cannot submit the form without Name, Email, and Phone.
- [ ] **Submission:** Submitting the form:
    - [ ] Shows a success alert ("Reservation successful").
    - [ ] Closes the modal.
    - [ ] Refreshes the page.
    - [ ] Updates the button to "Reserved" (Disabled).
- [ ] **Database Check:** Verify in Supabase that a new row was added to `orders` and the product status changed to `reserved`.

## 2. Admin Dashboard (Rona's View)

### Authentication
- [ ] **Login:** Can log in at `/login` with valid Supabase credentials.
- [ ] **Redirect:** Redirects to `/admin` after successful login.
- [ ] **Protection:** Accessing `/admin` without logging in redirects to `/login`.
- [ ] **Logout:** Clicking "Logout" signs out and redirects to `/login`.

### Inventory Management (`/admin`)
- [ ] **List View:** Displays all products (including Sold/Reserved ones).
- [ ] **Add Product:**
    - [ ] Can upload an image file.
    - [ ] Can enter Title, Brand, Size, Price, Condition.
    - [ ] Clicking "Add Product" saves to database and refreshes the list.
- [ ] **Mark Sold:** Clicking "Mark Sold" updates the status badge to Red.
- [ ] **Mark Available:** Clicking "Mark Available" updates the status badge to Green.
- [ ] **Delete:** Clicking "Delete" removes the product from the list (and database).

### Order Management (`/admin/orders`)
- [ ] **List View:** Displays all incoming reservations/orders.
- [ ] **Details:** Shows Customer Name, Email, Phone, and the Product ordered.
- [ ] **Complete Order:** Clicking "Complete" changes status to `completed` (Green).
- [ ] **Cancel Order:** Clicking "Cancel" changes status to `cancelled` (Red).

## 3. General / Technical
- [ ] **Responsive Navbar:**
    - [ ] Desktop: Links are visible horizontally.
    - [ ] Mobile: Hamburger menu appears; clicking it reveals links.
- [ ] **Performance:** Images load reasonably fast (Supabase Storage).
- [ ] **SEO:** Page titles and basic metadata are present (Next.js defaults).
