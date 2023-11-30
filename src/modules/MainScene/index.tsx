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
      <Stack
        direction={"column"}
        spacing={2}
        sx={{
          height: "100%",
        }}
      >
        <Stack direction="row" spacing={2} alignItems={"center"}>
          <Typography
            level="title-lg"
            sx={{
              color: "white",
            }}
          >
            场景
          </Typography>

          {/* {afterDraw && (
            <Button
              variant="soft"
              color="neutral"
              // @ts-ignore
              size="small"
              onClick={() => {
                if (scene.current) {
                  scene.current?.updateMaterial("main");
                }
              }}
            >
              更新贴图
            </Button>
          )} */}
        </Stack>

        <Surface
          sx={{
            flex: 1,
            padding: 4,
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
        </Surface>
      </Stack>
    );
  }
);
