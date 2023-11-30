"use client";

import { SceneComponent } from "@/modules/MainScene";
import * as React from "react";

import Stack from "@mui/material/Stack";
import { DrawerComponent } from "@/modules/Drawer";
import { Box, Toolbar } from "@mui/material";
import { useLayerManager } from "@/hooks/useLayerReducer";
import { useEffect } from "react";

import { useThrottle } from "@/hooks/useThrottle";
import { Drawer } from "@/service/Drawer";
import { MainScene } from "@/service/Scene";
import { SolutionManager } from "@/service/SolutionManger";

export default function Home({ params }: any) {
  const layersHelper = useLayerManager();
  const drawerRef = React.useRef<Drawer>();
  const sceneRef = React.useRef<MainScene>();

  const save = useThrottle((value: Record<string, any>) => {
    const texture = drawerRef.current?.exportTexture?.() as string;
    SolutionManager.save(params.solutionId, { value, texture });

    sceneRef.current?.updateMaterial?.("main", texture);
  }, 1000);

  useEffect(() => {
    SolutionManager.get(params.solutionId).then((result: any) => {
      const { value: layers } = result || {};
      if (Array.isArray(layers)) {
        layersHelper.setLayers(layers);
      }
    });
  }, []);

  return (
    <Stack
      direction="row"
      component={"main"}
      sx={{
        flex: 1,
        flexWrap: "nowrap",
        padding: 3,
        overflow: "hidden",
      }}
      spacing={2}
    >
      <DrawerComponent
        ref={drawerRef}
        layersHelper={layersHelper}
        onChange={(value) => {
          console.log("53", value);
          drawerRef.current?.updateLayers?.(value);
          save(value);
        }}
      />

      <Box
        sx={{
          height: "100%",
          flex: 3,
        }}
      >
        <SceneComponent ref={sceneRef} />
      </Box>
    </Stack>
  );
}
