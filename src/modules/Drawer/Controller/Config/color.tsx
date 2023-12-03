import {
  AspectRatio,
  Slider,
  Stack,
  Typography,
  SliderProps,
  Badge,
  Chip,
} from "@mui/joy";
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
    <Stack direction={"row"} spacing={1}>
      <Stack component={Typography} level="body-sm" direction="row" spacing={2}>
        <Box
          sx={{
            width: "64px",
            height: "36px",
            backgroundColor: config.content,
            filter: "drop-shadow(0 4px 4px rgba(154, 137, 145, 0.5))",
          }}
        ></Box>
      </Stack>
      <Stack direction="column" alignItems={"flex-start"}>
        <Chip >色彩</Chip>
        <Chip size="sm">
          <Typography
            level="body-sm"
            sx={{
              color: config.content,
            }}
          >
            {config.content}
          </Typography>
        </Chip>
      </Stack>
    </Stack>
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
