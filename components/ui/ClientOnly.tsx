"use client";

import dynamic from "next/dynamic";

export const SplashScreen = dynamic(() => import("@/components/ui/SplashScreen"), { ssr: false });
export const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });
