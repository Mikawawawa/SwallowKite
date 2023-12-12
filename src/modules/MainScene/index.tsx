"use client";
import { MainScene } from "@/service/Scene";
import { Box, Button, Stack, Typography } from "@mui/joy";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Surface } from "../../components/Surface";
import { DrawerColumn } from "@/components/DrawerColumn";

const BabylonContainer = "renderCanvas";

export const SceneComponent = forwardRef(
  function SceneComponentInner(props, ref) {
    const hasInit = useRef(false);
    const scene = useRef<MainScene>();

    useImperativeHandle(ref, () => ({
      updateMaterial: (key: string, src: string) => {
        scene.current?.updateMaterial?.(key, src);
      },
    }));

    useEffect(() => {
      if (hasInit.current) return;
      hasInit.current = true;
      scene.current = new MainScene(BabylonContainer);

      scene.current.initScene().then(() => {
        scene.current?.renderLoop();
      });
    }, []);

    return (
      <DrawerColumn
        title="场景"
        sx={{
          minWidth: "700px",
        }}
      >
        <canvas
          tabIndex={-1}
          id={BabylonContainer}
          style={{
            outline: "none",
            height: "100%",
            width: "100%",
          }}
        />
      </DrawerColumn>
    );
  }
);
