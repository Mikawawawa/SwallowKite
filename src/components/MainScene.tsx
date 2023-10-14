"use client";
import { MainScene } from "@/scene";
import { Box, Button } from "@mui/joy";
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
    <Box
      sx={{
        height: "100%",
        width: "100%",
        position: "relative",
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

      {afterDraw && (
        <Button
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
          }}
          onClick={() => {
            if (scene.current) {
              console.log('there')
              scene.current?.updateMaterial();
            }
          }}
        >
          Update texture
        </Button>
      )}
    </Box>
  );
}
