"use client";

import { SceneComponent } from "@/modules/MainScene";

import Stack from "@mui/material/Stack";
import { DrawerComponent } from "@/modules/Drawer";
import {
  TextureLayerForRender,
  useLayerManager,
} from "@/hooks/useLayerReducer";
import { useEffect, useRef, useMemo, useCallback } from "react";

import { Drawer } from "@/service/Drawer";
import { MainScene } from "@/service/Scene";
import { SolutionManager, useSolutionStorage } from "@/service/SolutionManger";
import { EditableText } from "@/components/ClickToEdit";
import { IconButton, Typography } from "@mui/joy";
import { ArrowBackSharp } from "@mui/icons-material";
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
    return data.find?.((item) => solutionId === item.key)?.name || "未命名";
  }, [solutionId, data, inited]);

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

  const save = useCallback(async (value: TextureLayerForRender[]) => {
    drawerRef.current?.updateLayers?.(value);
    const texture = (await drawerRef.current?.exportTexture?.()) as string;

    SolutionManager.throttleSave(params.solutionId, { value, texture });
    sceneRef.current?.updateMaterial?.("main", texture);
  }, []);

  const layersHelper = useLayerManager((value) => {
    save(value);
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
        <IconButton
          size="sm"
          variant="soft"
          onClick={async () => {
            const texture =
              (await drawerRef.current?.exportTexture?.()) as string;

            await SolutionManager.save(params.solutionId, {
              value: layersHelper.layers,
              texture,
            });

            router.push("/");
          }}
        >
          <ArrowBackSharp />
        </IconButton>
        <Typography
          level="h3"
          component={"div"}
          sx={{
            color: "#FFFFFF",
          }}
        >
          <EditableText value={title} onChange={setTitle} />
        </Typography>
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
          onChange={(id, value) => {
            // @ts-ignore
            layersHelper.updateLayer(id, value);
          }}
        />
      </Stack>
    </>
  );
}
