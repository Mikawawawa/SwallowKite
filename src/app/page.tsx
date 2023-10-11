"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { SceneComponent } from "@/components/scene";
import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";
import { CssVarsProvider as JoyCssVarsProvider, styled } from "@mui/joy/styles";

import Stack from "@mui/material/Stack";
import { DrawerComponent } from "@/components/Drawer";
import { Box, Toolbar } from "@mui/material";
import { Layer } from "@/components/Controller/Layer";

const materialTheme = materialExtendTheme();

export default function Home() {
  return (
    <MaterialCssVarsProvider
      defaultMode="system"
      theme={{ [MATERIAL_THEME_ID]: materialTheme }}
    >
      <JoyCssVarsProvider defaultMode="system">
        <Stack
          direction="column"
          sx={{
            height: "100%",
            width: "100%",
            overflow: "hidden"
          }}
        >
          <Toolbar>
            <Typography variant="h6" component="div">
              Swallow Kite
            </Typography>
          </Toolbar>

          <Stack
            direction="row"
            component={"main"}
            sx={{
              flex: 1,
              flexWrap: 'nowrap'
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: "30vw",
              }}
            >
              <SceneComponent />
            </Box>

            <Box
              sx={{
                width: '70vw',
                color: "white",
                flexWrap: "nowrap",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  height: "100%",
                  backgroundColor: "#F1C2DE",
                }}
              >
                <DrawerComponent />
              </Box>

              <Box sx={{ flexShrink: 0 }}>
                <Layer />
              </Box>
            </Box>
          </Stack>
        </Stack>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  );
}
