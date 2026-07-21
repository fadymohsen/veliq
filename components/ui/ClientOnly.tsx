"use client";

import dynamic from "next/dynamic";

// SplashScreen needs SSR so it renders the overlay before hydration
// (prevents flash of page content → splash → page content)
export { default as SplashScreen } from "@/components/ui/SplashScreen";

// CustomCursor is purely decorative and accesses window APIs — skip SSR
export const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });
