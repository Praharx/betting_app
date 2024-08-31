"use client";

import React, { FC, useMemo } from 'react';
import AppWalletProvider from '@/components/AppWalletAdapter';
 
export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return (
      <html>
        <body>
            <AppWalletProvider>
            {children}
            </AppWalletProvider>
        </body>

    </html>    
            
       
    );
};