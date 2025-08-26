'use client';

import React from 'react';
import localFont from 'next/font/local';
import './globals.scss';
import MeasureWidth from '../components/MeasureWidth/MeasureWidth'; // import it at the top
import Sidebar from '@/components/Sidebar/Sidebar';
import Player from '@/components/Player/player';
import Header from '@/components/Header/Header';
import { usePathname } from 'next/navigation';

// ========================
// Fonts
// ========================

// Manrope (100–900, normal)
const manrope = localFont({
  src: [
    { path: '../fonts/manrope/Manrope-VariableFont.woff2', weight: '100 900', style: 'normal' },
    { path: '../fonts/manrope/Manrope-VariableFont.woff', weight: '100 900', style: 'normal' },
  ],
  variable: '--font-manrope',
});

// Plus Jakarta Sans (100–900, normal + italic)
const plusJakartaSans = localFont({
  src: [
    // Normal
    { path: '../fonts/plusJakartaSans/PlusJakartaSans-VariableFont.woff2', weight: '100 900', style: 'normal' },
    { path: '../fonts/plusJakartaSans/PlusJakartaSans-VariableFont.woff', weight: '100 900', style: 'normal' },

    // Italic
    { path: '../fonts/plusJakartaSans/PlusJakartaSans-Italic-VariableFont.woff2', weight: '100 900', style: 'italic' },
    { path: '../fonts/plusJakartaSans/PlusJakartaSans-Italic-VariableFont.woff', weight: '100 900', style: 'italic' },
  ],
  variable: '--font-jakarta',
});

// SF Pro Display (900, normal)
const sfProDisplay = localFont({
  src: [
    { path: '../fonts/sfprodisplayheavy/sfprodisplayheavy.woff2', weight: '900', style: 'normal' },
    { path: '../fonts/sfprodisplayheavy/sfprodisplayheavy.woff', weight: '900', style: 'normal' },
  ],
  variable: '--font-display',
});

// ========================
// Props interface
// ========================
export interface LayoutProps {
  children?: React.ReactNode;
}

// ========================
// Layout component
// ========================
export default function RootLayout({ children }: LayoutProps) {
  const pathname = usePathname();  // 'usePathname' = keyword, 'pathname' = ours

  // ========================
  // Hide Header on certain pages
  // ========================
  const hideHeaderOn = [
    "/auth/playlists", 
    "/auth/playlists-page" // link 
  ];

  const hideHeader = hideHeaderOn.some(route => pathname.toLowerCase().startsWith(route));

  return (
    <html lang="en">
      <body className={`${manrope.variable} ${plusJakartaSans.variable} ${sfProDisplay.variable}`}>
        <MeasureWidth />
        <Sidebar />
        <div className="page">
          <div className="container">
            {!hideHeader && <Header />}  {/* only show header if not in hidden routes */}
            {children}
          </div>
        </div>
        <Player />
      </body>
    </html>
  );
}
