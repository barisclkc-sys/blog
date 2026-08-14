import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import { getDictionary } from "@/dictionaries";
import Link from "next/link";
import { supabaseStatic } from "@/utils/supabase/static";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(
  props: { params: Promise<{ lang: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const { data: siteSettings } = await supabaseStatic.from('site_settings').select('*').eq('lang', params.lang).maybeSingle();
  
  const title = siteSettings?.seo_title || "Barış Çolakça - Portfolio";
  const description = siteSettings?.seo_description || "Senior Electrical & Electronics Engineering Student @ METU | Developer";
  const ogImageUrl = supabaseStatic.storage.from('public-assets').getPublicUrl('background.jpg').data.publicUrl;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [ogImageUrl],
    }
  };
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }];
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const dict = await getDictionary(params.lang);
  
  // Fetch site settings for the layout
  const { data: siteSettings } = await supabaseStatic.from('site_settings').select('*').eq('lang', params.lang).maybeSingle();
  
  const heroName = siteSettings?.hero_name || dict.hero.name;
  const heroTitle = siteSettings?.hero_title || dict.hero.title;
  
  // Use a short snippet for the sidebar description if available, otherwise fallback
  const heroDesc = siteSettings?.hero_focus ? siteSettings.hero_focus.substring(0, 100) + '...' : dict.hero.techFocusTitle;
  
  // Fetch dynamic social links
  const { data: socialLinksData } = await supabaseStatic.from('social_links').select('*').eq('lang', params.lang).order('id', { ascending: true });
  const socialLinks = socialLinksData || [];
  const contactEmail = siteSettings?.contact_email;

  const { data: cvData } = supabaseStatic.storage
    .from('public-assets')
    .getPublicUrl('CV.pdf');
    
  const cvUrl = cvData?.publicUrl || '#';
  
  // Background Image
  const { data: bgData } = supabaseStatic.storage
    .from('public-assets')
    .getPublicUrl('background.jpg');
    
  const bgUrl = bgData?.publicUrl || '';
  
  const navItems = [
    { label: params.lang === 'tr' ? 'Ana Sayfa' : 'Home', href: `/${params.lang}`, external: false },
    { label: params.lang === 'tr' ? 'Deneyimler' : 'Experience', href: `/${params.lang}#experience`, external: false },
    { label: params.lang === 'tr' ? 'Blog' : 'Blog', href: `/${params.lang}#blog`, external: false },
    { label: params.lang === 'tr' ? 'Projeler' : 'Projects', href: `/${params.lang}#projects`, external: false },
    { label: params.lang === 'tr' ? 'CV İndir' : 'Resume', href: cvUrl, external: true },
  ];

  return (
    <html
      lang={params.lang}
      className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#0a0a0a] text-neutral-300 font-sans selection:bg-neutral-800 selection:text-neutral-100 relative">
          
          {/* Background Image Layer */}
          <div 
            className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat opacity-15"
            style={{ backgroundImage: `url(${bgUrl})` }}
          />
          
          {/* Fixed Top Left Navigation */}
          <div className="fixed top-6 left-6 z-50 flex items-center gap-4">
            <Navbar />
          </div>

          <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-20 md:px-12 md:py-24 lg:px-24 lg:py-0">
            <div className="lg:flex lg:justify-between lg:gap-16">
              
              {/* Left Sidebar (Sticky) */}
              <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-5/12 lg:flex-col lg:justify-between lg:py-24 pt-12">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-5xl mt-8 lg:mt-0">
                    <Link href={`/${params.lang}`}>{heroName}</Link>
                  </h1>
                  <h2 className="mt-4 text-lg font-medium tracking-tight text-neutral-600 dark:text-neutral-400 sm:text-xl">
                    {heroTitle}
                  </h2>
                  <p className="mt-6 text-sm text-neutral-500 dark:text-neutral-500 max-w-xs leading-relaxed font-light">
                    {heroDesc}
                  </p>
                  
                  {/* Navigation Menu */}
                  <nav className="nav hidden lg:block mt-16">
                    <ul className="mt-8 w-max space-y-2">
                      {navItems.map((item) => (
                        <li key={item.label}>
                          {item.external ? (
                            <a className="group flex items-center py-2" href={item.href} target="_blank" rel="noopener noreferrer">
                              <span className="mr-4 h-px w-8 bg-neutral-300 dark:bg-neutral-700 transition-all group-hover:w-16 group-hover:bg-neutral-900 dark:group-hover:bg-neutral-300"></span>
                              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-200 transition-colors">
                                {item.label} ↗
                              </span>
                            </a>
                          ) : (
                            <Link className="group flex items-center py-2" href={item.href}>
                              <span className="mr-4 h-px w-8 bg-neutral-300 dark:bg-neutral-700 transition-all group-hover:w-16 group-hover:bg-neutral-900 dark:group-hover:bg-neutral-300"></span>
                              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-200 transition-colors">
                                {item.label}
                              </span>
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
                
                {/* Social Links Bottom Bar */}
                <div className="mt-12 flex items-center flex-wrap gap-5 lg:mt-0">
                  {contactEmail && (
                    <a href={`mailto:${contactEmail}`} title="Email Me" className="text-neutral-500 hover:text-neutral-200 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </a>
                  )}
                  {socialLinks.map((link) => {
                    const p = link.platform.toLowerCase();
                    let Icon;
                    if (p.includes('github')) {
                      Icon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>;
                    } else if (p.includes('linkedin')) {
                      Icon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;
                    } else if (p.includes('twitter') || p.includes('x')) {
                      Icon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
                    } else if (p.includes('instagram')) {
                      Icon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
                    } else if (p.includes('youtube')) {
                      Icon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>;
                    } else {
                      // Generic Link Icon
                      Icon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>;
                    }

                    return (
                      <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" title={link.platform} className="text-neutral-500 hover:text-neutral-200 transition-colors">
                        {Icon}
                      </a>
                    );
                  })}
                </div>
              </header>

              {/* Middle Content */}
              <main className="pt-24 lg:w-7/12 lg:py-24">
                {props.children}
              </main>

            </div>
          </div>
          <Analytics />
      </body>
    </html>
  );
}
