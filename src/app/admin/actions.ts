'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect('/admin/login?error=Could not authenticate user')
  }

  return redirect('/admin/dashboard')
}

export async function createPost(formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const slug = formData.get('slug') as string

  const { error } = await supabase.from('posts').insert([
    { title, content, slug }
  ])

  if (error) {
    console.error('Error inserting post:', error)
    return { error: error.message }
  }

  // Revalidate frontend pages (ISR update)
  revalidatePath('/en')
  revalidatePath('/tr')

  return { success: true }
}

export async function uploadCV(formData: FormData) {
  const supabase = await createClient()
  const file = formData.get('file') as File
  
  if (!file) {
    return { error: 'No file provided' }
  }

  // Upload to public-assets bucket, filename CV.pdf
  const { error } = await supabase.storage
    .from('public-assets')
    .upload('CV.pdf', file, {
      cacheControl: '3600',
      upsert: true // Overwrite existing CV.pdf
    })

  if (error) {
    console.error('Error uploading CV:', error)
    return { error: error.message }
  }

  return { success: true }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return redirect('/admin/login')
}
