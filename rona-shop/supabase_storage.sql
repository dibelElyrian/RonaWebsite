-- Create the storage bucket for shoe images
insert into storage.buckets (id, name, public)
values ('shoe-images', 'shoe-images', true);

-- Policy: Allow public read access to all images in the bucket
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'shoe-images' );

-- Policy: Allow authenticated users (admins) to upload images
create policy "Authenticated Upload"
  on storage.objects for insert
  with check ( bucket_id = 'shoe-images' and auth.role() = 'authenticated' );

-- Policy: Allow authenticated users (admins) to update images
create policy "Authenticated Update"
  on storage.objects for update
  using ( bucket_id = 'shoe-images' and auth.role() = 'authenticated' );

-- Policy: Allow authenticated users (admins) to delete images
create policy "Authenticated Delete"
  on storage.objects for delete
  using ( bucket_id = 'shoe-images' and auth.role() = 'authenticated' );
