import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./global.css";
import { Theme } from "@/theme";
import { Stack, Typography } from "@mui/joy";
import { Toolbar } from "@mui/material";
import Link from "next/link";
import Head from "next/head";
import { Compositor } from "@/modules/Composition";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SwallowKite",
  description: "Developed by Mikawawa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-cn">
      <Head>
        <link rel="shortcut icon" href="/kite.ico" />
      </Head>
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
            <Toolbar
              sx={{
                backdropFilter: "blur(10px)",
              }}
            >
              <Stack
                direction="row"
                justifyContent={"space-between"}
                sx={{
                  width: "100%",
                }}
              >
                <Link
                  href="/"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Typography
                    level="title-lg"
                    component="div"
                    sx={{
                      color: "#FFFFFF",
                    }}
                  >
                    Swallow Kite
                  </Typography>
                </Link>

                <Compositor />
              </Stack>
            </Toolbar>

            {children}
          </Stack>
        </Theme>
      </body>
    </html>
  );
}
