import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./global.css";
import { Theme } from "@/theme";
import { Stack, Typography } from "@mui/joy";
import { Toolbar } from "@mui/material";

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
        <Theme>
          <Stack
            direction="column"
            sx={{
              height: "100vh",
              width: "100vw",
              overflow: "hidden",
            }}
          >
            <Toolbar>
              <Typography
                level="title-lg"
                component="div"
                sx={{
                  color: "#FFFFFF",
                }}
              >
                Swallow Kite
              </Typography>
            </Toolbar>
            {children}
          </Stack>
        </Theme>
      </body>
    </html>
  );
}
