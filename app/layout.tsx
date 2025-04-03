import type { Metadata } from "next";
import { Poppins, Fira_Code } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const Poppinsfont = Poppins({
  subsets: ["latin"],
  weight: ['300','400', '500', '600', '700'],
  variable: "--font-poppins",
});

const Firafont = Fira_Code({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: "--font-poppins",
});


export const metadata: Metadata = {
  title: "Wordify",
  description: "IA-powered SEO articles generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /*<ClerkProvider>
      <html lang="en">
        <body
          className={cn("Poppinsfont intialiased", Poppinsfont.variable)}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>*/
    <ClerkProvider appearance={{
      variables: { colorPrimary: "#212121"}
    }}>
      <html lang="fr">
        <body className={cn("Poppinsfont intialiased", Poppinsfont.variable)}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
