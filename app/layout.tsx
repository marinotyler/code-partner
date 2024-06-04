import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./header";
import { Providers } from "./provider"
import NextTopLoader from "nextjs-toploader"


const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Code Partner",
  description: "An application for finding that lifelong code partner",
};


export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <NextTopLoader/>
            <Header />
            {children}
        </Providers>
          </body>
    </html>
  );
}
