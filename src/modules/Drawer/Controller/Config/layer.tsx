import React, { FunctionComponent, useCallback, useRef } from "react";
import { Stack, FormLabel } from "@mui/joy";
import { useForm, Controller, useWatch } from "react-hook-form";
import { LayerConfigSlider } from "./fields/Slider";
import { TextureLayerForRender } from "@/hooks/useLayerReducer";
import { throttle } from "lodash";

export const LayerBasicConfig: FunctionComponent<{
  config: Partial<TextureLayerForRender>;
  onChange: Function;
}> = React.memo(function Configure({ config, onChange }) {
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const { control, getValues } = useForm({
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

  const handleChange = useCallback(
    throttle(() => {
      const value = getValues();
      onChangeRef.current({
        ...value,
        scale: Math.pow(2, (value.scale || 0) / 100),
        // rowGap: value.rowGap / 100,
        // columnGap: value.columnGap / 100,
      });
    }, 16),
    [getValues]
  );

  return (
    <form
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Stack direction="column" sx={{ flex: 1 }}>
        <Stack direction="column">
          <Stack direction="column">
            <FormLabel>偏移X</FormLabel>
            <Controller
              name="offset.x"
              control={control}
              render={({ field }) => (
                <LayerConfigSlider
                  {...field}
                  min={-1}
                  max={1}
                  step={0.01}
                  onChange={(value) => {
                    field.onChange(value);
                    handleChange();
                  }}
                />
              )}
            />
          </Stack>
          <Stack direction="column">
            <FormLabel>偏移Y</FormLabel>
            <Controller
              name="offset.y"
              control={control}
              render={({ field }) => (
                <LayerConfigSlider
                  {...field}
                  min={-1}
                  max={1}
                  step={0.01}
                  onChange={(value) => {
                    field.onChange(value);
                    handleChange();
                  }}
                />
              )}
            />
          </Stack>
          <Stack direction="column">
            <FormLabel>旋转</FormLabel>
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
                  onChange={(value) => {
                    field.onChange(value);
                    handleChange();
                  }}
                />
              )}
            />
          </Stack>
          <Stack direction="column">
            <FormLabel>缩放</FormLabel>
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
                  onChange={(value) => {
                    field.onChange(value);
                    handleChange();
                  }}
                />
              )}
            />
          </Stack>

          <Stack direction="column">
            <FormLabel>透明度</FormLabel>
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
                  onChange={(value) => {
                    field.onChange(value);
                    handleChange();
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
