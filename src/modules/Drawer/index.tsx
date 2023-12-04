"use client";
import { Drawer } from "@/service/Drawer";
import { Stack, Typography } from "@mui/joy";
import React, { useEffect, useImperativeHandle, useRef } from "react";
import { LayerController } from "./Controller";
import {
  TextureLayerForRender,
  useLayerManager,
} from "@/hooks/useLayerReducer";
import { Surface } from "../../components/Surface";

const DrawerContainer = "renderDrawerContainer";

export const DrawerComponent = React.forwardRef(function DrawerComponentInner(
  {
    layersHelper,
    onChange,
  }: {
    onChange: (value: TextureLayerForRender[]) => void;
    layersHelper: ReturnType<typeof useLayerManager>;
  },
  ref
) {
  const hasInit = useRef<boolean>(false);

  useImperativeHandle(ref, () => ({
    updateLayers: (value: TextureLayerForRender[]) => {
      drawerRef.current?.updateLayers(value);
    },
    exportTexture: () => {
      const res = drawerRef.current?.exportTexture?.();
      console.log("res", res);
      return res;
    },
  }));

  const drawerRef = useRef<Drawer>();

  useEffect(() => {
    if (hasInit.current) return;
    hasInit.current = true;

    const drawer = new Drawer(DrawerContainer);
    drawerRef.current = drawer;
    // @ts-expect-error 123
    window.drawer = drawer;
  }, []);

  // useEffect(() => {
  //   // drawerRef.current?.updateLayers(layersHelper.layers);
  //   // save(layersHelper.layers);
  //   onChange(layersHelper.layers);
  // }, [layersHelper.layers]);

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
        <Surface
          sx={{
            flexShrink: 0,
            overflowY: "hidden",
            flex: 1,
            background: "transparent",
            boxShadow: "none",
          }}
        >
          <LayerController helper={layersHelper} onChange={onChange} />
        </Surface>
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

        <Surface
          sx={{
            flex: 1,
            padding: 4,
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
        </Surface>
      </Stack>
    </>
  );
});
