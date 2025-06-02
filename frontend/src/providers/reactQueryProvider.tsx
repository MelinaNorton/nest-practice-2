"use client";

import { ReactNode } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// 1) Instantiate a QueryClient. You can customize options here if needed.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // e.g. refetch on window focus is enabled by default;
      // adjust or remove these lines if you want different behavior:
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

interface ReactQueryProviderProps {
  children: ReactNode;
}

// 2) Wrap children with QueryClientProvider
export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
