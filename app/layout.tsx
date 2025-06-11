import type { Metadata } from "next";
import { Poppins, Fira_Code } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from '@clerk/nextjs'
import { frFR } from '@clerk/localizations';

const Poppinsfont = Poppins({
  subsets: ["latin"],
  weight: ['100', '200', '300','400', '500', '600', '700'],
  variable: "--font-poppins",
});

const Firafont = Fira_Code({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: "--font-fira",
});


export const metadata: Metadata = {
  title: "Wordflow",
  description: "IA-powered SEO articles generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
      <html lang="fr">
        <body className={cn("Poppinsfont intialiased", Poppinsfont.variable)}>
        <ClerkProvider localization={frFR} appearance={{ variables: { colorPrimary: "#212121"}}}>
          {children}
        </ClerkProvider>
        </body>
      </html>
  );
}
