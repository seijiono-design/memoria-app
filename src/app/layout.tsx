import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/memoria/language-context";

export const metadata: Metadata = {
  title: "Memoria",
  description: "Anniversary management app",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}