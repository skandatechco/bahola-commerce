import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import Footer from '../components/footer/Footer';
import { SiteHeader } from '../components/header/SiteHeader';
import './globals.css';

// Load Inter from Google Fonts (works even if the user doesn't have it installed)
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',            // shows system font first, swaps to Inter when ready
});

export const metadata: Metadata = {
  title: 'Bahola',
  description: 'Trusted homeopathy since 1939',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* 
        inter.className applies Inter globally.
        Next/Inter already includes sensible fallbacks (Helvetica/Arial/system).
      */}
      <body className={inter.className}>
        <Suspense fallback={<div className="h-16 animate-pulse bg-gray-200" />}>
          <SiteHeader />
        </Suspense>
        {children}
        <Footer />
      </body>
    </html>
  );
}
