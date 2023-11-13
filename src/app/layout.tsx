import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./global.css";
import { Theme } from "@/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "风筝纹理预览",
  description: "Developed by Mikawawa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-cn">
      <body className={inter.className}>
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
