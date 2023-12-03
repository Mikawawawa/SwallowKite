import React, { FunctionComponent, useEffect, useRef } from "react";
import { ImagePicker } from "./fields/ImagePicker";
import {
  AspectRatio,
  Slider,
  Stack,
  Typography,
  SliderProps,
  Chip,
} from "@mui/joy";
import { Box } from "@mui/material";
import { useForm, Controller, useWatch } from "react-hook-form";
import * as yup from "yup";
import { LayerConfigSlider } from "./fields/Slider";
import { RgbColorPicker } from "react-colorful";
import { ColorPicker } from "./fields/ColorPicker";

export const ImageLayerPreviewer = React.memo(function Previewer({
  config,
}: {
  config: any;
}) {
  return (
    <Stack direction={"row"} spacing={1}>
      <img
        src={config.src ? config.src : "none"}
        style={{
          width: "64px",
          height: "36px",
          filter: "drop-shadow(0 4px 4px rgba(154, 137, 145, 0.5))",
          objectFit: "contain",
        }}
      />
      <Typography level="title-lg">
        <Chip>图片</Chip>
      </Typography>
    </Stack>
  );
});

export const ImageLayerConfig: FunctionComponent<{
  config: any;
  onChange: Function;
}> = React.memo(function Configure({ config, onChange }) {
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const { control } = useForm({
    defaultValues: {
      ...config,
    },
  });
  const value = useWatch({ control });

  useEffect(() => {
    onChangeRef.current({
      ...value,
    });
  }, [value]);

  return (
    <form>
      <Stack direction="column" sx={{ flex: 1 }}>
        <Stack direction="column">
          <Controller
            name="src"
            control={control}
            render={({ field }) => <ImagePicker {...field} />}
          />
        </Stack>
      </Stack>
    </form>
  );
});
