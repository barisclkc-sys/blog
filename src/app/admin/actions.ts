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
    return
  }

  revalidatePath('/en')
  revalidatePath('/tr')
}

export async function deletePost(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const lang = formData.get('lang') as string || 'en'
  await supabase.from('posts').delete().eq('id', id)
  revalidatePath(`/${lang}`)
}

export async function uploadCV(formData: FormData) {
  const supabase = await createClient()
  const file = formData.get('file') as File
  
  if (!file) {
    return
  }

  const { error } = await supabase.storage
    .from('public-assets')
    .upload('CV.pdf', file, {
      cacheControl: '3600',
      upsert: true
    })

  if (error) {
    console.error('Error uploading CV:', error)
    return
  }
}

// --- CMS Actions ---

export async function updateSiteSettings(formData: FormData) {
  const supabase = await createClient()
  const lang = formData.get('lang') as string
  const hero_name = formData.get('hero_name') as string
  const hero_title = formData.get('hero_title') as string
  const hero_focus_title = formData.get('hero_focus_title') as string
  const hero_focus = formData.get('hero_focus') as string
  
  const { error } = await supabase.from('site_settings').upsert([
    { lang, hero_name, hero_title, hero_focus_title, hero_focus }
  ], { onConflict: 'lang' })
  
  if (error) console.error('Error updating site settings:', error)
  revalidatePath(`/${lang}`)
}

export async function addExperience(formData: FormData) {
  const supabase = await createClient()
  const lang = formData.get('lang') as string
  const company = formData.get('company') as string
  const role = formData.get('role') as string
  const description = formData.get('description') as string
  
  const { error } = await supabase.from('experiences').insert([{ lang, company, role, description }])
  if (error) console.error('Error adding experience:', error)
  revalidatePath(`/${lang}`)
}

export async function deleteExperience(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const lang = formData.get('lang') as string
  await supabase.from('experiences').delete().eq('id', id)
  revalidatePath(`/${lang}`)
}

export async function addProject(formData: FormData) {
  const supabase = await createClient()
  const lang = formData.get('lang') as string
  const name = formData.get('name') as string
  const technologies = formData.get('technologies') as string // comma separated
  
  const techArray = technologies.split(',').map(t => t.trim())
  
  const { error } = await supabase.from('projects').insert([{ lang, name, technologies: techArray }])
  if (error) console.error('Error adding project:', error)
  revalidatePath(`/${lang}`)
}

export async function deleteProject(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const lang = formData.get('lang') as string
  await supabase.from('projects').delete().eq('id', id)
  revalidatePath(`/${lang}`)
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  return redirect('/admin/login')
}
