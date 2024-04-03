/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { MainScene } from "@/service/Scene";
import { Box, Option, Select, Stack, Typography } from "@mui/joy";
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

export const SceneComponent = forwardRef(function SceneComponentInner(
  props: {
    onChangeModel: (name: string) => void;
  },
  ref
) {
  const hasInit = useRef(false);
  const scene = useRef<MainScene>();
  const [model, setModel] = useState("qipao");

  useImperativeHandle(ref, () => ({
    updateMaterial: (key: string, src: string) => {
      return scene.current?.updateMaterial?.(key, src);
    },
    updateModel: (name: string) => {
      return scene.current?.updateModel?.(name);
    },
  }));

  useEffect(() => {
    if (hasInit.current) return;
    hasInit.current = true;
    scene.current = new MainScene(BabylonContainer);

    scene.current.initScene(model).then(() => {
      scene.current?.renderLoop();
    });
  }, []);

  useEffect(() => {
    if (!scene.current) return;
    if (!model) return;
    if (model === scene.current?.model) return;
    props.onChangeModel(model);
  }, [model, props.onChangeModel]);

  return (
    <DrawerColumn
      title={
        <Stack>
          <span>场景</span>
          <Select
            value={model}
            onChange={(_, newValue) => {
              if (newValue) {
                setModel(newValue);
              }
            }}
          >
            <Option value="qipao">旗袍</Option>
            <Option value="tshirt">T恤</Option>
          </Select>
        </Stack>
      }
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
});
