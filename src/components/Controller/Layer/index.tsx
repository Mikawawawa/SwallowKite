import React, { FunctionComponent, PropsWithChildren } from "react";
import { SelectedLayer } from "./selected";
import { LayerCard } from "./idle";
import { Box } from "@mui/joy";

export const Layer: FunctionComponent<
  PropsWithChildren<{
    index: number;
    selected: boolean;
    setSelected: (index: number | null) => void;
  }>
> = ({ index, selected, setSelected, children }) => {
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      {/* {selected ? ( */}
      <SelectedLayer
        index={index}
        selected={selected}
        closeSelected={() => setSelected(null)}
        setSelected={() => setSelected(index)}
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
