"use client";
import { Drawer } from "@/service/Drawer";
import React, { useEffect, useImperativeHandle, useRef } from "react";
import { LayerController } from "./Controller";
import {
  TextureLayerForRender,
  useLayerManager,
} from "@/hooks/useLayerReducer";

import { DrawerColumn } from "@/components/DrawerColumn";

const DrawerContainer = "renderDrawerContainer";

export const DrawerComponent = React.forwardRef(function DrawerComponentInner(
  {
    layersHelper,
    onChange,
  }: {
    onChange: (id: string, value: TextureLayerForRender) => void;
    layersHelper: ReturnType<typeof useLayerManager>;
  },
  ref
) {
  const drawerRef = useRef<Drawer>();
  const hasInit = useRef<boolean>(false);

  useImperativeHandle(ref, () => ({
    updateLayers: (value: TextureLayerForRender[]) => {
      drawerRef.current?.updateLayers(value);
    },
    exportTexture: () => {
      return drawerRef.current?.exportTexture?.();
    },
  }));

  useEffect(() => {
    if (hasInit.current) return;
    hasInit.current = true;

    const drawer = new Drawer(DrawerContainer);
    drawerRef.current = drawer;
  }, []);

  return (
    <>
      <DrawerColumn
        title="预览"
        sx={{
          flex: 5,
        }}
      >
        <div
          tabIndex={-1}
          id={DrawerContainer}
          style={{
            outline: "none",
            height: "100%",
            width: "100%",
            background: '#ddd'
          }}
        />
        {/* <canvas
          tabIndex={-1}
          id={DrawerContainer}
          style={{
            outline: "none",
            height: "100%",
            width: "100%",
          }}
        /> */}
      </DrawerColumn>

      <DrawerColumn
        title="图层"
        sx={{
          "&.drawer-content": {
            background: "transparent",
            px: 1,
            py: 0,
          },
        }}
      >
        <LayerController
          helper={layersHelper}
          onChange={(id, value) => {
            if (!hasInit.current) {
              return;
            }
            onChange(id, value);
          }}
        />
      </DrawerColumn>
    </>
  );
});
