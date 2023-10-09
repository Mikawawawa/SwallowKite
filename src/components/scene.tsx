"use client";
import { MainScene } from "@/scene";
import React, { useEffect } from "react";

const BabylonContainer = "renderCanvas";

let hasInit = false;

export function SceneComponent() {
  useEffect(() => {
    if (hasInit) return;
    hasInit = true;
    const scene = new MainScene(BabylonContainer);
    scene.render();
  }, []);

  return (
    <canvas
      tabIndex={-1}
      id={BabylonContainer}
      style={{
        outline: "none",
        height: "100%",
        width: "100%",
      }}
    />
  );
}
