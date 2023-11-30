import { AspectRatio, Slider, Stack, Typography, SliderProps } from "@mui/joy";
import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { FunctionComponent } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import * as yup from "yup";
import { LayerConfigSlider } from "./fields/Slider";
import { RgbColorPicker } from "react-colorful";
import { ColorPicker } from "./fields/ColorPicker";

export const ColorLayerPreviewer = React.memo(function Previewer({
  config,
}: {
  config: any;
}) {
  return (
    <>
      <Typography level="title-lg">色彩</Typography>
      <Stack component={Typography} level="body-sm" direction="row" spacing={2}>
        {config.content}{" "}
        <Box
          sx={{
            width: "32px",
            height: "18px",
            backgroundColor: config.content,
          }}
        ></Box>
      </Stack>
    </>
  );
});

export const ColorLayerConfig: FunctionComponent<{
  config: any;
  onChange: Function;
}> = React.memo(function Configure({ config, onChange }) {
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const { control } = useForm({
    defaultValues: {
      content: "#000000",
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
            name="content"
            control={control}
            render={({ field }) => <ColorPicker {...field} />}
          />
        </Stack>
      </Stack>
    </form>
  );
});
