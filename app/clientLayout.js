// app/clientLayout.js (Layout where you wrap the session provider)
"use client";

import SessionProviderWrapper from "../components/SessionProviderWrapper";
import { GeistSans, GeistMono } from "next/font/local"; // Same imports

export default function ClientLayout({ children }) {
  return (
    <SessionProviderWrapper>
      <div
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </div>
    </SessionProviderWrapper>
  );
}
