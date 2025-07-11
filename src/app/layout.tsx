import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import LayoutQueryClient from "@/components/Layout/LayoutQueryClient";

export const metadata: Metadata = {
  title: "LootLab",
  description:
    "🎮 Game & NFT Arts Analysis | Transforming Data into Experiences | Preparing for New Opportunities in the Digital World! 🚀",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" type="image/svg+xml" href="/logo-mesh.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body monica-locale="pt_BR" className="vsc-initialized">
        <LayoutQueryClient>{children}</LayoutQueryClient>
      </body>
    </html>
  );
}
