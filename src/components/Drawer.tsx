"use client";
import { Drawer } from "@/drawer";
import { MainScene } from "@/scene";
import { Box, Stack, Typography } from "@mui/joy";
import React, { useEffect, useRef } from "react";
import { LayerController } from "./Controller";
import { useLayerManager } from "@/drawer/useLayerReducer";

const DrawerContainer = "renderDrawerContainer";

let hasInit = false;

export function DrawerComponent() {
  const drawerRef = useRef<Drawer>();
  const layersHelper = useLayerManager();

  useEffect(() => {
    if (hasInit) return;
    hasInit = true;
    const drawer = new Drawer(DrawerContainer);
    drawerRef.current = drawer;
    // @ts-expect-error 123
    window.drawer = drawer;
  }, []);

  useEffect(() => {
    drawerRef.current?.updateLayers(layersHelper.layers);
  }, [layersHelper.layers]);

  return (
    <>
      <Stack
        direction={"column"}
        spacing={2}
        sx={{
          height: "100%",
        }}
      >
        <Typography
          level="title-lg"
          sx={{
            color: "white",
          }}
        >
          图层
        </Typography>
        <Box
          sx={{
            flexShrink: 0,
            overflowY: "hidden",
            flex: 1,
            boxShadow: "#767575 0px -2px 13px 1px",
            backgroundColor: "var(--joy-palette-background-surface)",
          }}
        >
          <LayerController helper={layersHelper} />
        </Box>
      </Stack>

      <Stack
        direction={"column"}
        spacing={2}
        sx={{
          flex: 5,
          height: "100%",
        }}
      >
        <Typography
          level="title-lg"
          sx={{
            color: "white",
          }}
        >
          预览
        </Typography>

        <Stack
          sx={{
            flex: 1,
            padding: 4,
            boxShadow: "#767575 0px -2px 13px 1px",
            backgroundColor: "var(--joy-palette-background-surface)",
          }}
        >
          <div
            tabIndex={-1}
            id={DrawerContainer}
            style={{
              outline: "none",
              height: "100%",
              width: "100%",
            }}
          />
        </Stack>
      </Stack>
    </>
  );
}
