import React from "react";
import { HexColorPicker } from "react-colorful";

export function ColorPicker(props: any) {
  return <HexColorPicker color={props.value} onChange={props.onChange} />;
}
