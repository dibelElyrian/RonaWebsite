'use server'

import { revalidatePath } from 'next/cache'

export async function revalidateShop(productId: number) {
  revalidatePath(`/products/${productId}`)
  revalidatePath('/shop')
  revalidatePath('/')
}
