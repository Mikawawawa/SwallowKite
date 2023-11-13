"use client";
import { Drawer } from "@/drawer";
import { MainScene } from "@/scene";
import { Box, Button, Stack, Typography } from "@mui/joy";
import React, { useEffect, useRef } from "react";
import { LayerController } from "./Controller";
import { useLayerManager } from "@/drawer/useLayerReducer";
import { IO } from "@/service/io";
import { Surface } from "./Surface";

const DrawerContainer = "renderDrawerContainer";

let hasInit = false;

function useThrottle(callback: Function, delay: number) {
  const lastExecTime = useRef(0);
  const timerRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    return () => {
      // 清除定时器，确保在组件卸载时不会触发回调
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return function throttledCallback(...args: any[]) {
    const currentTime = Date.now();

    if (currentTime - lastExecTime.current > delay) {
      callback(...args);
      lastExecTime.current = currentTime;
    } else {
      // 如果在延迟时间内调用了函数，清除之前的定时器，并设置新的定时器
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // @ts-ignore
      timerRef.current = setTimeout(() => {
        callback(...args);
        lastExecTime.current = Date.now();
      }, delay);
    }
  };
}

export default useThrottle;

export function DrawerComponent() {
  const drawerRef = useRef<Drawer>();
  const layersHelper = useLayerManager();

  useEffect(() => {
    if (hasInit) return;
    hasInit = true;
    IO.get("layers").then((layers) => {
      if (Array.isArray(layers)) {
        // @ts-ignore
        layersHelper.setLayers(layers);
      }
    });

    const drawer = new Drawer(DrawerContainer);
    drawerRef.current = drawer;
    // @ts-expect-error 123
    window.drawer = drawer;
  }, []);

  const save = useThrottle((value: Record<string, any>) => {
    console.log("save", value);
    IO.save("layers", value);
  }, 3000);

  useEffect(() => {
    drawerRef.current?.updateLayers(layersHelper.layers);
    save(layersHelper.layers);
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
        <Surface
          sx={{
            flexShrink: 0,
            overflowY: "hidden",
            flex: 1,
          }}
        >
          <LayerController helper={layersHelper} />
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
}
