-- Function to handle product reservation securely
-- This function runs with 'security definer' privileges, allowing it to bypass RLS
-- so that public users can reserve items without having direct update access to the products table.

create or replace function reserve_product(
  p_product_id bigint,
  p_customer_name text,
  p_customer_email text,
  p_customer_phone text
)
returns void
language plpgsql
security definer
as $$
begin
  -- 1. Check if product is available
  if not exists (select 1 from products where id = p_product_id and status = 'available') then
    raise exception 'Product is not available';
  end if;

  -- 2. Create Order
  insert into orders (product_id, customer_name, customer_email, customer_phone, status)
  values (p_product_id, p_customer_name, p_customer_email, p_customer_phone, 'pending');

  -- 3. Update Product Status
  update products
  set status = 'reserved'
  where id = p_product_id;
end;
$$;
