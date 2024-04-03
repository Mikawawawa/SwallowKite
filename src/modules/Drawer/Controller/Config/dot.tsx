import {
  AspectRatio,
  Slider,
  Stack,
  Typography,
  SliderProps,
  Chip,
  FormLabel,
} from "@mui/joy";
import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { FunctionComponent } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import * as yup from "yup";
import { LayerConfigSlider } from "./fields/Slider";
import { ImagePicker } from "./fields/ImagePicker";
import { emptyImage } from "@/service/AssetGallery";

export const DotLayerPreviewer = React.memo(function Previewer({
  config,
}: {
  config: any;
}) {
  return (
    <Stack direction={"row"} spacing={1}>
      <img
        src={config.src ? config.src : emptyImage}
        style={{
          width: "64px",
          height: "36px",
          filter: "drop-shadow(0 4px 4px rgba(154, 137, 145, 0.5))",
          objectFit: "contain",
        }}
      />
      <Typography level="title-lg" component="div">
        <Chip>图案</Chip>
      </Typography>
    </Stack>
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
          <FormLabel>贴图</FormLabel>
          <Controller
            name="src"
            control={control}
            render={({ field }) => <ImagePicker {...field} />}
          />
        </Stack>
        <Stack direction="column">
          <FormLabel>左右间距</FormLabel>
          <Controller
            name="columnGap"
            control={control}
            render={({ field }) => (
              <LayerConfigSlider
                {...field}
                min={-50}
                max={200}
                valueLabelFormat={(value) => {
                  return `${(1 + value / 100).toFixed(2)} x`;
                }}
              />
            )}
          />
        </Stack>

        <Stack direction="column">
          <FormLabel>上下间距</FormLabel>
          <Controller
            name="rowGap"
            control={control}
            render={({ field }) => (
              <LayerConfigSlider
                {...field}
                min={-50}
                max={200}
                valueLabelFormat={(value) => {
                  return `${(1 + value / 100).toFixed(2)} x`;
                }}
              />
            )}
          />
        </Stack>

        <Stack direction="column">
          <FormLabel>缩放</FormLabel>
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
