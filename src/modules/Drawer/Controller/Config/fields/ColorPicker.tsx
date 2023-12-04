import React from "react";
import { HexColorPicker } from "react-colorful";

export function ColorPicker(props: any) {
  return <HexColorPicker style={{
    width: "auto"
  }} color={props.value} onChange={props.onChange} />;
}
