"use client";
import { Drawer } from "@/drawer";
import { MainScene } from "@/scene";
import { Box } from "@mui/joy";
import React, { useEffect, useRef } from "react";
import { Layer } from "./Controller/Layer";
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
      <Box
        sx={{
          flex: 1,
          height: "100%",
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
      </Box>

      <Box sx={{ flexShrink: 0, width: "320px", overflow: 'auto' }}>
        <Layer data={layersHelper.layers} />
      </Box>
    </>
  );
}
