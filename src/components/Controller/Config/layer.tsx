import React, { FunctionComponent, useEffect, useRef } from "react";
import { ImagePicker } from "./fields/ImagePicker";
import { AspectRatio, Slider, Stack, Typography, SliderProps } from "@mui/joy";
import { Box } from "@mui/material";
import { useForm, Controller, useWatch } from "react-hook-form";
import * as yup from "yup";
import { LayerConfigSlider } from "./fields/Slider";
import { RgbColorPicker } from "react-colorful";
import { ColorPicker } from "./fields/ColorPicker";
import { TextureLayerForRender } from "@/drawer/useLayerReducer";

export const LayerBasicConfig: FunctionComponent<{
  config: Partial<TextureLayerForRender>;
  onChange: Function;
}> = React.memo(function Configure({ config, onChange }) {
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const { control } = useForm({
    defaultValues: {
      scale: 1,
      opacity: 1,
      offset: {
        x: 0,
        y: 0,
      },
      rotation: 0,

      ...config,
    },
  });
  const value = useWatch({ control });

  useEffect(() => {
    onChangeRef.current({
      ...value,
      scale: Math.pow(2, (value.scale || 0) / 100),
      // rowGap: value.rowGap / 100,
      // columnGap: value.columnGap / 100,
    });
  }, [value]);

  return (
    <form
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Stack direction="column" sx={{ flex: 1 }}>
        <Stack direction="column">
          <Stack direction="column">
            <label>偏移X</label>
            <Controller
              name="offset.x"
              control={control}
              render={({ field }) => <LayerConfigSlider {...field} />}
            />
          </Stack>
          <Stack direction="column">
            <label>偏移Y</label>
            <Controller
              name="offset.y"
              control={control}
              render={({ field }) => <LayerConfigSlider {...field} />}
            />
          </Stack>
          <Stack direction="column">
            <label>旋转</label>
            <Controller
              name="rotation"
              control={control}
              render={({ field }) => (
                <LayerConfigSlider
                  min={-1}
                  max={1}
                  step={0.01}
                  valueLabelFormat={(value) => {
                    return `${(value / 100).toFixed(2)} %`;
                  }}
                  {...field}
                />
              )}
            />
          </Stack>
          <Stack direction="column">
            <label>缩放</label>
            <Controller
              name="scale"
              control={control}
              render={({ field }) => (
                <LayerConfigSlider
                  {...field}
                  min={-100}
                  max={100}
                  valueLabelFormat={(value) => {
                    return `${Math.pow(2, value / 100).toFixed(2)} x`;
                  }}
                />
              )}
            />
          </Stack>

          <Stack direction="column">
            <label>透明度</label>
            <Controller
              name="opacity"
              control={control}
              render={({ field }) => (
                <LayerConfigSlider
                  {...field}
                  min={0}
                  max={1}
                  step={0.01}
                  valueLabelFormat={(value) => {
                    return `${(value * 100).toFixed(2)} %`;
                  }}
                />
              )}
            />
          </Stack>
        </Stack>
      </Stack>
    </form>
  );
});
