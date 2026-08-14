import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen bg-neutral-950 text-neutral-200">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-neutral-900 border-r border-neutral-800 p-6 hidden md:flex md:flex-col">
            <h2 className="text-xl font-bold mb-8 text-neutral-100">Dashboard</h2>
            <nav className="space-y-2 flex-1">
              <a href="/admin/dashboard" className="block px-4 py-2 rounded bg-neutral-800 text-neutral-100 font-medium">
                Content Manager
              </a>
              <a href="/" className="block px-4 py-2 rounded hover:bg-neutral-800 text-neutral-400 hover:text-neutral-100 transition-colors">
                View Site
              </a>
            </nav>
            <div className="mt-auto pt-6 border-t border-neutral-800">
              <form action={async () => {
                'use server'
                const { logout } = await import('./actions')
                await logout()
              }}>
                <button type="submit" className="text-sm font-medium text-neutral-500 hover:text-neutral-300 transition-colors">
                  Sign out
                </button>
              </form>
            </div>
          </aside>
          
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6 md:p-12">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
