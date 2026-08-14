import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import { getDictionary } from "@/dictionaries";
import Link from "next/link";
import { supabaseStatic } from "@/utils/supabase/static";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Barış Çolakça - Portfolio",
  description: "Senior Electrical & Electronics Engineering Student @ METU",
};

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }];
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const dict = await getDictionary(params.lang);
  
  const { data: cvData } = supabaseStatic.storage
    .from('public-assets')
    .getPublicUrl('CV.pdf');
    
  const cvUrl = cvData?.publicUrl || '#';
  
  // Background Image
  const { data: bgData } = supabaseStatic.storage
    .from('public-assets')
    .getPublicUrl('background.jpg');
    
  // To avoid heavy caching issues when updating the background, you can append a cache-buster if needed
  // For simplicity, we just use the direct URL. Vercel cache is revalidated on action.
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
      className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-[#0a0a0a] dark:text-neutral-300 font-sans selection:bg-neutral-800 selection:text-neutral-100 relative">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          
          {/* Background Image Layer */}
          <div 
            className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat opacity-40 dark:opacity-15 transition-opacity duration-500"
            style={{ backgroundImage: `url(${bgUrl})` }}
          />
          
          {/* Fixed Top Left Language Switcher & Theme Toggle */}
          <div className="fixed top-6 left-6 z-50 flex items-center gap-4">
            <Navbar />
            <ThemeToggle />
          </div>

          <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-20 md:px-12 md:py-24 lg:px-24 lg:py-0">
            <div className="lg:flex lg:justify-between lg:gap-16">
              
              {/* Left Sidebar (Sticky) */}
              <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-5/12 lg:flex-col lg:justify-between lg:py-24 pt-12">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-5xl mt-8 lg:mt-0">
                    <Link href={`/${params.lang}`}>Barış Çolakça</Link>
                  </h1>
                  <h2 className="mt-4 text-lg font-medium tracking-tight text-neutral-600 dark:text-neutral-400 sm:text-xl">
                    Engineer & Developer
                  </h2>
                  <p className="mt-6 text-sm text-neutral-500 dark:text-neutral-500 max-w-xs leading-relaxed font-light">
                    I build accessible, inclusive products and digital experiences for the web.
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
                <div className="mt-12 flex items-center gap-5 lg:mt-0">
                  <a href="https://github.com/barisclkc-sys" target="_blank" className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                  </a>
                  <a href="https://linkedin.com/in/bariscolakca" target="_blank" className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                </div>
              </header>

              {/* Middle Content */}
              <main className="pt-24 lg:w-7/12 lg:py-24">
                {props.children}
              </main>

            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
