-- Add payment_reference column to orders table
ALTER TABLE orders ADD COLUMN payment_reference text;

-- Update the reserve_product function to include payment reference
CREATE OR REPLACE FUNCTION reserve_product(
  p_product_id bigint,
  p_customer_name text,
  p_customer_email text,
  p_customer_phone text,
  p_customer_address text,
  p_payment_reference text default null
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_status text;
BEGIN
  -- Check if product is available
  SELECT status INTO v_status
  FROM products
  WHERE id = p_product_id;

  IF v_status != 'available' THEN
    RAISE EXCEPTION 'Product is no longer available';
  END IF;

  -- Update product status
  UPDATE products
  SET status = 'reserved'
  WHERE id = p_product_id;

  -- Create order
  INSERT INTO orders (product_id, customer_name, customer_email, customer_phone, customer_address, payment_reference, status)
  VALUES (p_product_id, p_customer_name, p_customer_email, p_customer_phone, p_customer_address, p_payment_reference, 'pending');
END;
$$;
