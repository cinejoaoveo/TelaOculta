import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Suspense } from "react"; // 1. Importar o Suspense
import Script from "next/script"; // Importando o componente de Script

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

        {/* Script para desabilitar as ferramentas de desenvolvedor */}
        <Script src="https://cdn.jsdelivr.net/npm/disable-devtool@latest" strategy="lazyOnload" />
        <Script id="disable-devtool-config" strategy="lazyOnload">
          {`
            DisableDevtool({
              disableMenu: true,
              disableSelect: false,
              disableCopy: false,
              disableCut: true,
              disablePaste: false,
              clearLog: true,
              interval: 500,
              detectors: [0, 1, 3, 4, 5, 6, 7],
              ondevtoolopen: function(type, next) {
                window.location.href = 'https://i.ibb.co/5hH6bbp2/tentando-inspecionar-o-site.png';
              }
            });
          `}
        </Script>
      </body>
    </html>
  );
}
