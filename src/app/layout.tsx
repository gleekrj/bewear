import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "@/providers/react-query";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bewear | Plataforma de Gestão de Guarda-Roupas Inteligente",
  description:
    "O Bewear é uma aplicação web voltada para a organização de guarda-roupas, permitindo cadastrar, visualizar e combinar roupas de forma prática e intuitiva. Desenvolvido com foco em usabilidade, performance e boas práticas de desenvolvimento front-end.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
