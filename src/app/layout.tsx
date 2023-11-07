import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./global.css";
import { CssBaseline } from "@mui/material";

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
    <html lang="en">
      <body className={inter.className}>
        <CssBaseline />
        {children}
      </body>
    </html>
  );
}
