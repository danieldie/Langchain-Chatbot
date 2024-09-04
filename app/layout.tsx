import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "./providers";
import AdSense from "@/components/AdSense";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat with Bible",
  description: "Chatbot with Bible",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <AdSense pId="9584439109294168"/>
      </head>
      <Provider>
        <body className={inter.className}>
          {children}
        </body>
      </Provider>
    </html>
  );
}
