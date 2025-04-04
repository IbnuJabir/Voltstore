import type { Metadata } from "next";
import "./globals.css";
import { ClientProvider } from "./clientProvider";

export const metadata: Metadata = {
  title: "VoltStore",
  description: "An E-Commerce App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
