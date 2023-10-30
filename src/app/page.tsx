"use client";
import { SceneComponent } from "@/components/MainScene";
import * as React from "react";
import Typography from "@mui/material/Typography";

import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";

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
            overflow: "hidden",
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{
                color: "#FFFFFF",
              }}
            >
              Swallow Kite
            </Typography>
          </Toolbar>

          <Stack
            direction="row"
            component={"main"}
            sx={{
              flex: 1,
              flexWrap: "nowrap",
              padding: 3,
            }}
            spacing={2}
          >
            {/* <Box
              sx={{
                flex: 7,
                color: "white",
                flexWrap: "nowrap",
                display: "flex",
                flexDirection: "row",
              }}
            > */}
            <DrawerComponent />
            {/* </Box> */}

            <Box
              sx={{
                height: "100%",
                flex: 3,
              }}
            >
              <SceneComponent />
            </Box>
          </Stack>
        </Stack>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  );
}
