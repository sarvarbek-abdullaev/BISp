"use client";

import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { theme } from '@/theme';
import { Navbar } from '@/components/Navbar';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ChakraProvider theme={theme} >
              <Navbar />
              {children}
            </ChakraProvider>
        </SessionProvider>
    )
}
