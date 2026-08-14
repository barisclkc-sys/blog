import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from './utils/supabase/middleware';

const locales = ['en', 'tr'];
const defaultLocale = 'en';

function getLocale(request: NextRequest): string {
  // Always default to English as requested by user
  return defaultLocale;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // --- Admin Route Protection (Supabase Auth) ---
  if (pathname.startsWith('/admin')) {
    const { supabaseResponse, user } = await updateSession(request);
    
    // Redirect if not logged in and trying to access protected admin page
    if (!user && pathname !== '/admin/login') {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      return NextResponse.redirect(loginUrl);
    }
    
    // Redirect to dashboard if logged in and trying to access login page
    if (user && pathname === '/admin/login') {
      const dashboardUrl = request.nextUrl.clone();
      dashboardUrl.pathname = '/admin/dashboard';
      return NextResponse.redirect(dashboardUrl);
    }

    // Skip i18n for /admin routes
    return supabaseResponse;
  }

  // --- i18n Routing ---
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // _next, api, public dosyaları hariç tut
    '/((?!_next|api|favicon.ico|.*\\..*).*)',
  ],
};
