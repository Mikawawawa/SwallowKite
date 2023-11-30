import { Button, Card, Stack, styled } from "@mui/joy";
import { throttle } from "lodash";
import { Box, debounce } from "@mui/material";
import {
  FunctionComponent,
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";
import {
  TextureLayerForRender,
  useLayerManager,
} from "@/hooks/useLayerReducer";

import { Flipper, Flipped } from "react-flip-toolkit";

import { LayerConfig } from "./Config";
import { Layer } from "./Layer";

export const LayerController: FunctionComponent<{
  helper: ReturnType<typeof useLayerManager>;
  onChange: Function;
}> = ({ helper, onChange }) => {
  const { layers: data, addLayer, updateLayer } = helper;

  const [focusedLayerIndex, setFocusedLayerIndex] = useState<null | number>(
    null
  );

  const handleUpdate = useCallback(
    (id: string, data: any) => {
      const notify = throttle((value) => {
        console.log('value',value)
        onChange(value?.layers);
      }, 10);
      updateLayer(id, data, notify);
    },
    [onChange, updateLayer]
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
              item={item}
              index={index}
              selected={selected}
              setSelected={setFocusedLayerIndex}
              onChange={(value: any) => {
                handleUpdate(item.id, {
                  ...item,
                  ...value,
                });
              }}
            >
              <LayerConfig
                setType={(type) => {
                  handleUpdate(item.id, {
                    ...item,
                    type,
                    props: {},
                  });
                }}
                selected={selected}
                layer={data[index]}
                onChange={(value: any) => {
                  handleUpdate(item.id, {
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
              // @ts-ignore
              onClick={() => addLayer({})}
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
