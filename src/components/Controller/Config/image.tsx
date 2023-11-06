import React, { FunctionComponent, useEffect, useRef } from "react";
import { ImagePicker } from "./fields/ImagePicker";
import { AspectRatio, Slider, Stack, Typography, SliderProps } from "@mui/joy";
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
    <>
      <Typography level="title-lg">图片</Typography>
    </>
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
