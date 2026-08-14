import { createClient } from '@supabase/supabase-js'

// Next.js çerezlerini KULLANMAYAN, sadece statik (ISR) veri çekimleri için
// kullanılacak istemci (client). Çerezleri kullanan istemciler sayfayı dinamik hale getirir.
export const supabaseStatic = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
)
