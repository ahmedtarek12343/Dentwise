import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import UserSync from "@/components/UserSync";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dentwise | Ai Dental Assistant",
  description: "Get dental advice and treatment plans with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <ClerkProvider
          appearance={{
            variables: {
              colorBackground: "var(--background)",
              colorForeground: "var(--primary)",
              colorInputBackground: "var(--background)",
              colorInputForeground: "var(--primary)",
              colorBorder: "var(--primary)",
              colorRing: "var(--primary)",
              colorPrimaryForeground: "var(--background)",
              colorPrimary: "var(--primary)",
              colorNeutral: "var(--primary)",
            },
          }}
        >
          <UserSync />
          {children}
          <Toaster richColors position="bottom-right" />
        </ClerkProvider>
      </body>
    </html>
  );
}
