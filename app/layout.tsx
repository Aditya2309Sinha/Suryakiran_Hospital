import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Suryakiran Multispecialty Hospital | Best Healthcare in Kandivali East",
  description: "Suryakiran Multispecialty Hospital - A trusted private, multispeciality, and children's hospital with 13 years of experience. Located in Kandivali East, Mumbai.",
  keywords: "hospital, multispecialty, healthcare, Mumbai, Kandivali, paediatrics, general medicine, surgery",

  icons: {
    icon: "/images/fevicon.png",
    shortcut: "/images/fevicon.png",
    apple: "/images/fevicon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-silver-50 text-silver-800">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}