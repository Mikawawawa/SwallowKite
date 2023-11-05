import { AspectRatio, Slider, Stack, Typography, SliderProps } from "@mui/joy";
import React, { useEffect, useRef } from "react";

export const LayerConfigSlider = (props: SliderProps) => {
  return (
    <Slider
      color="warning"
      orientation="horizontal"
      valueLabelDisplay="auto"
      size="sm"
      variant="solid"
      {...props}
    />
  );
};
