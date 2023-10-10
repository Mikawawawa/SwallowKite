"use client";
import { Drawer } from "@/drawer";
import { MainScene } from "@/scene";
import React, { useEffect } from "react";

const DrawerContainer = "renderDrawerContainer";

let hasInit = false;

export function DrawerComponent() {
  useEffect(() => {
    if (hasInit) return;
    hasInit = true;
    const drawer = new Drawer(DrawerContainer);
  }, []);

  return (
    <div
      tabIndex={-1}
      id={DrawerContainer}
      style={{
        outline: "none",
        height: "100%",
        width: "100%",
      }}
    />
  );
}
