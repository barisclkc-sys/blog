import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import { getDictionary } from "@/dictionaries";
import Link from "next/link";
import { supabaseStatic } from "@/utils/supabase/static";

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
  
  // Storage üzerinden public CV URL'sini al
  const { data: cvData } = supabaseStatic.storage
    .from('public-assets')
    .getPublicUrl('CV.pdf');
    
  const cvUrl = cvData?.publicUrl || '#';
  
  const navItems = [
    { label: params.lang === 'tr' ? 'Ana Sayfa' : 'Home', href: `/${params.lang}`, external: false },
    { label: params.lang === 'tr' ? 'Blog' : 'Blog', href: `/${params.lang}#blog`, external: false },
    { label: params.lang === 'tr' ? 'CV İndir' : 'Download CV', href: cvUrl, external: true },
  ];

  return (
    <html
      lang={params.lang}
      className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}
    >
      <body className="min-h-screen bg-neutral-900 text-neutral-300 font-sans selection:bg-neutral-700 selection:text-neutral-100">
        <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
          <div className="lg:flex lg:justify-between lg:gap-12">
            
            {/* Left Sidebar (Sticky) */}
            <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/3 lg:flex-col lg:justify-between lg:py-24">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-neutral-100 sm:text-5xl">
                  <Link href={`/${params.lang}`}>{dict.hero.name}</Link>
                </h1>
                <h2 className="mt-3 text-lg font-medium tracking-tight text-neutral-400 sm:text-xl">
                  Engineer & Developer
                </h2>
                
                {/* Navigation Menu */}
                <nav className="nav hidden lg:block mt-16">
                  <ul className="mt-8 w-max">
                    {navItems.map((item) => (
                      <li key={item.label}>
                        {item.external ? (
                          <a className="group flex items-center py-3 active" href={item.href} target="_blank" rel="noopener noreferrer">
                            <span className="nav-indicator mr-4 h-px w-8 bg-neutral-600 transition-all group-hover:w-16 group-hover:bg-neutral-200"></span>
                            <span className="nav-text text-xs font-bold uppercase tracking-widest text-neutral-500 group-hover:text-neutral-200">
                              {item.label} ↗
                            </span>
                          </a>
                        ) : (
                          <Link className="group flex items-center py-3 active" href={item.href}>
                            <span className="nav-indicator mr-4 h-px w-8 bg-neutral-600 transition-all group-hover:w-16 group-hover:bg-neutral-200"></span>
                            <span className="nav-text text-xs font-bold uppercase tracking-widest text-neutral-500 group-hover:text-neutral-200">
                              {item.label}
                            </span>
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              
              {/* Language Switcher & Bottom Bar */}
              <div className="mt-8 flex items-center gap-5 lg:mt-0">
                <Navbar />
              </div>
            </header>

            {/* Middle Content */}
            <main className="pt-16 lg:w-1/2 lg:py-24">
              {props.children}
            </main>

            {/* Right Sidebar (Sticky) */}
            <aside className="hidden xl:block xl:w-1/6 xl:sticky xl:top-0 xl:max-h-screen xl:py-24">
              <div className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-6">
                {params.lang === 'tr' ? 'İçindekiler' : 'Contents'}
              </div>
              <ul className="space-y-4">
                <li>
                  <a href="#experience" className="text-sm font-medium text-neutral-400 hover:text-neutral-200 transition-colors">
                    {dict.experience.title}
                  </a>
                </li>
                <li>
                  <a href="#blog" className="text-sm font-medium text-neutral-400 hover:text-neutral-200 transition-colors">
                    {params.lang === 'tr' ? 'Blog' : 'Blog'}
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-sm font-medium text-neutral-400 hover:text-neutral-200 transition-colors">
                    {dict.projects.title}
                  </a>
                </li>
              </ul>
            </aside>

          </div>
        </div>
      </body>
    </html>
  );
}
