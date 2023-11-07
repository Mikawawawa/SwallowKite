import { Button, Card, Stack, styled } from "@mui/joy";

import { Box } from "@mui/material";
import {
  FunctionComponent,
  MouseEventHandler,
  PropsWithChildren,
  useState,
} from "react";
import {
  TextureLayerForRender,
  useLayerManager,
} from "@/drawer/useLayerReducer";

import { Flipper, Flipped } from "react-flip-toolkit";

import { LayerConfig } from "./Config";
import { Layer } from "./Layer";

export const LayerController: FunctionComponent<{
  helper: ReturnType<typeof useLayerManager>;
}> = ({ helper }) => {
  const { layers: data, addLayer, updateLayer } = helper;

  const [focusedLayerIndex, setFocusedLayerIndex] = useState<null | number>(
    null
  );

  return (
    // <Flipper flipKey={focusedLayerIndex} className={{

    // }}>
    <Stack
      component={Flipper}
      flipKey={focusedLayerIndex}
      sx={{
        width: "320px",
        overflowY: "visible",
        overflowX: "auto",
        height: "100%",
        "--ListItem-radius": "8px",
        "--List-gap": "4px",
      }}
    >
      <>
        {data?.map?.((item, index) => {
          const selected = focusedLayerIndex === index;
          return (
            <Layer
              key={item.id}
              index={index}
              selected={selected}
              setSelected={setFocusedLayerIndex}
            >
              <LayerConfig
                selected={selected}
                layer={data[index]}
                onChange={(value: any) => {
                  updateLayer(item.id, {
                    ...item,
                    props: {
                      ...item.props,
                      ...value,
                    },
                  });
                }}
              />
            </Layer>
          );
        })}
        <Flipped flipId={"layers-cta"}>
          {Array.isArray(data) && (
            <Button
              variant="soft"
              sx={{
                position: "sticky",
                bottom: 0,
              }}
            >
              添加新图层
            </Button>
          )}
        </Flipped>
      </>
    </Stack>
    // </Flipper>
  );
};
