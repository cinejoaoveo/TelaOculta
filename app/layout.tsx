import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Suspense } from "react"; // 1. Importar o Suspense

export const metadata: Metadata = {
  title: "TelaOculta",
  description: "Seu novo site de filmes e séries.",
  icons: {
    icon: 'https://i.ibb.co/hRR6bVmk/Tela-Oculta-Icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="min-h-screen bg-black text-white flex flex-col">
          {/* 2. Envolver o Header com Suspense */}
          <Suspense>
            <Header />
          </Suspense>
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}