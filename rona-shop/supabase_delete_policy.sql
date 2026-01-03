-- Allow authenticated users (admins) to delete products
create policy "Authenticated users can delete products."
  on products for delete
  using ( auth.role() = 'authenticated' );
