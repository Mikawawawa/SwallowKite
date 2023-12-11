"use client";

import { SceneComponent } from "@/modules/MainScene";

import Stack from "@mui/material/Stack";
import { DrawerComponent } from "@/modules/Drawer";
import { Box, Toolbar } from "@mui/material";
import { useLayerManager } from "@/hooks/useLayerReducer";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";

import { useThrottle } from "@/hooks/useThrottle";
import { Drawer } from "@/service/Drawer";
import { MainScene } from "@/service/Scene";
import { SolutionManager, useSolutionStorage } from "@/service/SolutionManger";
import { EditableText } from "@/components/ClickToEdit";
import { IconButton, Typography } from "@mui/joy";
import {
  ArrowBack,
  ArrowBackSharp,
  BackHand,
  Backup,
  Save,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

const useSolutionName = (
  solutionId: string
): [string, (newName: string) => void] => {
  const { inited, data, updateItem } = useSolutionStorage(
    "swallow-kite-solutions"
  );

  const info = useMemo(() => {
    if (!inited) {
      return "Loading";
    }
    return data.find?.((item) => solutionId === item.key)?.name || "Untitled";
  }, [solutionId, data]);

  const updateName = useCallback(
    (newName: string) => {
      updateItem(solutionId, newName);
    },
    [solutionId, updateItem]
  );

  return [info, updateName];
};

export default function Home({ params }: any) {
  const [title, setTitle] = useSolutionName(params.solutionId);
  const save = useCallback((value: Record<string, any>) => {
    const texture = drawerRef.current?.exportTexture?.() as string;
    SolutionManager.throttleSave(params.solutionId, { value, texture });
    sceneRef.current?.updateMaterial?.("main", texture);
  }, []);
  const layersHelper = useLayerManager((value) => {
    save(value);
    drawerRef.current?.updateLayers?.(value);
  });
  const drawerRef = useRef<Drawer>();
  const sceneRef = useRef<MainScene>();

  const router = useRouter();

  useEffect(() => {
    SolutionManager.get(params.solutionId).then((result: any) => {
      const { value: layers } = result || {};
      if (Array.isArray(layers)) {
        layersHelper.setLayers(layers);
      }
    });
  }, []);

  return (
    <>
      <Stack
        direction={"row"}
        spacing={2}
        sx={{
          backdropFilter: "blur(10px)",
          px: 3,
        }}
      >
        <Typography
          level="h3"
          component={"div"}
          sx={{
            color: "#FFFFFF",
          }}
        >
          <EditableText value={title} onChange={setTitle} />
        </Typography>

        <IconButton
          size="sm"
          variant="soft"
          onClick={() => {
            const texture = drawerRef.current?.exportTexture?.() as string;

            SolutionManager.save(params.solutionId, {
              value: layersHelper.layers,
              texture,
            }).then(() => {
              router.push("/");
            });
          }}
        >
          <ArrowBackSharp />
        </IconButton>
      </Stack>
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
        <SceneComponent ref={sceneRef} />

        <DrawerComponent
          ref={drawerRef}
          layersHelper={layersHelper}
          onChange={(value) => {
            drawerRef.current?.updateLayers?.(value);
            save(value);
          }}
        />
      </Stack>
    </>
  );
}
