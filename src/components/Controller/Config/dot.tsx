import { AspectRatio, Slider, Stack, Typography, SliderProps } from "@mui/joy";
import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { FunctionComponent } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import * as yup from "yup";
import { LayerConfigSlider } from "./fields/Slider";

export const DotLayerPreviewer = React.memo(function Previewer({
  config,
}: {
  config: any;
}) {
  return (
    <>
      <Typography level="title-lg">图案</Typography>
      <Typography level="body-sm">
        <AspectRatio maxHeight={100}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${config.src})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
        </AspectRatio>
      </Typography>
    </>
  );
});

export const DotLayerConfig: FunctionComponent<{
  config: any;
  onChange: Function;
}> = React.memo(function Configure({ config, onChange }) {
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const { control } = useForm({
    defaultValues: {
      zoom: 0,
      rowGap: 0,
      columnGap: 0,
      ...config,
    },
  });
  const value = useWatch({ control });

  useEffect(() => {
    onChangeRef.current({
      ...value,
      scale: Math.pow(2, (value.zoom || 0) / 100),
      rowGap: value.rowGap / 100,
      columnGap: value.columnGap / 100,
    });
  }, [value]);

  return (
    <form>
      <Stack direction="column" sx={{ flex: 1 }}>
        <Stack direction="column">
          <label>左右间距</label>
          <Controller
            name="columnGap"
            control={control}
            render={({ field }) => (
              <LayerConfigSlider
                {...field}
                min={-100}
                max={300}
                valueLabelFormat={(value) => {
                  return `${(1 + value / 100).toFixed(2)} x`;
                }}
              />
            )}
          />
        </Stack>

        <Stack direction="column">
          <label>上下间距</label>
          <Controller
            name="rowGap"
            control={control}
            render={({ field }) => (
              <LayerConfigSlider
                {...field}
                min={-100}
                max={300}
                valueLabelFormat={(value) => {
                  return `${(1 + value / 100).toFixed(2)} x`;
                }}
              />
            )}
          />
        </Stack>

        <Stack direction="column">
          <label>缩放</label>
          <Controller
            name="zoom"
            control={control}
            rules={{
              min: -100,
              max: 100,
            }}
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
      </Stack>
    </form>
  );
});
