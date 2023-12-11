import { Box } from "@mui/joy";
import React, { PropsWithRef } from "react";
import { HexColorPicker } from "react-colorful";

export const ColorPicker = React.forwardRef(function ColorPickerInner(
  props: PropsWithRef<{
    value: string;
    onChange: (value: string) => void;
  }>,
  ref
) {
  return (
    <Box ref={ref}>
      <HexColorPicker
        style={{
          width: "auto",
        }}
        color={props.value}
        onChange={props.onChange}
      />
    </Box>
  );
});
