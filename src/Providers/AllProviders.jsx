"use client";
import React, { useEffect } from "react";
import { AuthProvider } from "./AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
export default function AllProviders({ children }) {
  useEffect(() => {
    AOS.init();
    // fetch("/api/socketio");
  }, []);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 60 * 60 * 1000, // 5 Minuts
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
