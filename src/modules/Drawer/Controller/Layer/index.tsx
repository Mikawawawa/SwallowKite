import React, {
  FunctionComponent,
  PropsWithChildren,
  ReactNode,
  useMemo,
  useState,
} from "react";
import { SelectedLayer } from "./selected";
import { LayerCard } from "./idle";
import { Box, IconButton } from "@mui/joy";
import { TextureLayerForRender } from "@/hooks/useLayerReducer";
import { debounce } from "@mui/material";
import { ArrowLeft } from "@mui/icons-material";

// This part should be refactored
// Layer should just show the least information at first
// and the interaction should be more direct
export const Layer: FunctionComponent<
  PropsWithChildren<{
    index: number;
    selected: boolean;
    setSelected: (index: number | null) => void;
    item: TextureLayerForRender;
    onChange: (value: any) => void;
    configor: ReactNode;
  }>
> = ({ index, selected, setSelected, children, onChange, item, configor }) => {
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <SelectedLayer
        index={index}
        item={item}
        configor={configor}
        selected={selected}
        closeSelected={() => setSelected(null)}
        setSelected={() => setSelected(index)}
        onChange={onChange}
      >
        {children}
      </SelectedLayer>
    </Box>
  );
};
