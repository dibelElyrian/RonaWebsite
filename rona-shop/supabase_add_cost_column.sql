-- Add cost_price column to products table
ALTER TABLE products ADD COLUMN cost_price numeric DEFAULT 0;
