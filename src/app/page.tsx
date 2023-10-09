"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { SceneComponent } from "@/components/scene";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import MediaCard from "@/components/MediaCard";

import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";
import { CssVarsProvider as JoyCssVarsProvider, styled } from "@mui/joy/styles";

import useScrollTrigger from "@mui/material/useScrollTrigger";

import { createTheme } from "@mui/material/styles";

import { AppBar, ThemeProvider, Toolbar } from "@mui/material";

import MaterialTypography, {
  typographyClasses as muiTypographyClasses,
} from "@mui/material/Typography";
import JoyTypography, {
  typographyClasses as joyTyographyClasses,
} from "@mui/joy/Typography";
import Stack from "@mui/material/Stack";
import { Sheet } from "@mui/joy";

const materialTheme = materialExtendTheme();

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.background.level1 : "#fff",
  ...theme.typography["body-sm"],
  padding: theme.spacing(1),
  textAlign: "center",
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
}));

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
          }}
        >
          <Toolbar>
            <Typography variant="h6" component="div">
              Swallow Kite
            </Typography>
          </Toolbar>

          <Grid
            container
            component={"main"}
            sx={{
              flex: 1,
            }}
          >
            <Grid
              xs={4}
              sx={{
                height: "100%",
              }}
            >
              <SceneComponent />
            </Grid>

            <Grid
              xs={8}
              sx={{
                background: "#87604f",
                color: "white",
              }}
            >
              <Stack
                sx={{
                  height: "100%",
                  width: "100%",
                }}
                alignItems={"center"}
                justifyContent={"center"}
              >
                Sketch Area
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  );
}
