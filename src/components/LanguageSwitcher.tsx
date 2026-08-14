'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  
  const switchLocale = (newLocale: string) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    // segments[0] is empty string (before the first /)
    // segments[1] is the current locale
    segments[1] = newLocale;
    return segments.join('/');
  };

  const currentLocale = pathname?.split('/')[1] || 'en';

  return (
    <div className="flex gap-3 items-center text-xs font-semibold tracking-wider">
      <Link 
        href={switchLocale('en')}
        className={`${currentLocale === 'en' ? 'text-zinc-200' : 'text-zinc-600 hover:text-zinc-400'} transition-colors`}
      >
        EN
      </Link>
      <span className="text-zinc-800">/</span>
      <Link 
        href={switchLocale('tr')}
        className={`${currentLocale === 'tr' ? 'text-zinc-200' : 'text-zinc-600 hover:text-zinc-400'} transition-colors`}
      >
        TR
      </Link>
    </div>
  );
}
