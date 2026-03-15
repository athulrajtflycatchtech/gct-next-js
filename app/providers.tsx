'use client';

import { MantineProvider } from '@mantine/core';
import QueryProvider from './query-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <MantineProvider defaultColorScheme="auto">
        {children}
      </MantineProvider>
    </QueryProvider>
  );
}
