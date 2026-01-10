-- Update the bulk reservation function to check for unique payment reference
-- We cannot simply add a UNIQUE constraint to the table because a single checkout 
-- with multiple items creates multiple order rows sharing the same reference number.
-- Instead, we check for existence before processing the new batch.

CREATE OR REPLACE FUNCTION reserve_products_bulk(
  p_product_ids bigint[],
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
  v_id bigint;
  v_unavailable_count int;
BEGIN
  -- 1. Check if payment reference has already been used
  -- We only check if it's provided and not empty
  IF p_payment_reference IS NOT NULL AND p_payment_reference != '' THEN
    IF EXISTS (SELECT 1 FROM orders WHERE payment_reference = p_payment_reference) THEN
        RAISE EXCEPTION 'Reference number % has already been used.', p_payment_reference;
    END IF;
  END IF;

  -- 2. Check if ALL products are available
  SELECT count(*) INTO v_unavailable_count
  FROM products
  WHERE id = ANY(p_product_ids) AND status != 'available';

  IF v_unavailable_count > 0 THEN
    RAISE EXCEPTION 'One or more items in your cart are no longer available.';
  END IF;

  -- 3. Loop through and process
  FOREACH v_id IN ARRAY p_product_ids LOOP
    -- Update Product Status
    UPDATE products
    SET status = 'reserved'
    WHERE id = v_id;

    -- Create Order
    INSERT INTO orders (product_id, customer_name, customer_email, customer_phone, customer_address, payment_reference, status)
    VALUES (v_id, p_customer_name, p_customer_email, p_customer_phone, p_customer_address, p_payment_reference, 'pending');
  END LOOP;
END;
$$;
