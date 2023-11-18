import React, { FunctionComponent, PropsWithChildren } from "react";
import { SelectedLayer } from "./selected";
import { LayerCard } from "./idle";
import { Box } from "@mui/joy";
import { TextureLayerForRender } from "@/hooks/useLayerReducer";

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
  }>
> = ({ index, selected, setSelected, children, onChange, item }) => {
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      {/* {selected ? ( */}
      <SelectedLayer
        index={index}
        item={item}
        selected={selected}
        closeSelected={() => setSelected(null)}
        setSelected={() => setSelected(index)}
        onChange={onChange}
      >
        {children}
      </SelectedLayer>
      {/* ) : (
        <LayerCard
          index={index}
          selected={selected}
          onClick={() => setSelected(index)}
        >
          {children}
        </LayerCard>
      )} */}
    </Box>
  );
};
