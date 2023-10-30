"use client";
import { MainScene } from "@/scene";
import { Box, Button, Stack, Typography } from "@mui/joy";
import React, { useEffect, useRef, useState } from "react";

const BabylonContainer = "renderCanvas";

let hasInit = false;

export function SceneComponent() {
  const [afterDraw, setAfterDraw] = useState(false);

  const scene = useRef<MainScene>();

  useEffect(() => {
    if (hasInit) return;
    hasInit = true;
    scene.current = new MainScene(BabylonContainer);

    scene.current.initScene().then(() => {
      console.log("here 1");
      scene.current?.renderLoop();
      setAfterDraw(true);
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

        {afterDraw && (
          <Button
            variant="soft"
            color="neutral"
            size="small"
            onClick={() => {
              if (scene.current) {
                console.log("there");
                scene.current?.updateMaterial("main");
              }
            }}
          >
            更新贴图
          </Button>
        )}
      </Stack>

      <Stack
        sx={{
          flex: 1,
          padding: 4,
          boxShadow: "#767575 0px -2px 13px 1px",
          backgroundColor: "var(--joy-palette-background-surface)",
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
      </Stack>
    </Stack>
  );
}
