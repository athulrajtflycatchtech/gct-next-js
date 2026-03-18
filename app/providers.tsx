"use client";

import { MantineProvider } from "@mantine/core";
import QueryProvider from "./query-provider";
import { Notifications } from "@mantine/notifications";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <MantineProvider defaultColorScheme="auto">
        <Notifications position="top-right" />
        {children}
      </MantineProvider>
    </QueryProvider>
  );
}
