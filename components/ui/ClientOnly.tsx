"use client";

// SplashScreen needs SSR so it renders the overlay before hydration
// (prevents flash of page content → splash → page content)
export { default as SplashScreen } from "@/components/ui/SplashScreen";
