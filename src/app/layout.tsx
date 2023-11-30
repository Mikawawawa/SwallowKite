import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./global.css";
import { Theme } from "@/theme";
import { Stack, Typography } from "@mui/joy";
import { Skeleton, Toolbar } from "@mui/material";
import Link from "next/link";
import DrawerFilters from "@/components/InsetDrawer";

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

                <DrawerFilters />
              </Stack>
            </Toolbar>

            {children}
          </Stack>
        </Theme>
      </body>
    </html>
  );
}
