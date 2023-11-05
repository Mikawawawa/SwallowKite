import React, { FunctionComponent } from "react";
import { DotLayerConfig, DotLayerPreviewer } from "./dot";
import { ImageLayerConfig, ImageLayerPreviewer } from "./image";
import { ColorLayerConfig, ColorLayerPreviewer } from "./color";
import {
  TextureLayerForRender,
  useLayerManager,
} from "@/drawer/useLayerReducer";
import { Box } from "@mui/joy";

export const LayerConfig: FunctionComponent<{
  layer: TextureLayerForRender;
  onChange: (value: unknown) => void;
  selected: boolean;
}> = ({ layer, onChange }) => {
  return (
    <Box>
      {layer.type === "pattern" && (
        <>
          <DotLayerPreviewer config={layer.props} />
          <Box
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <DotLayerConfig config={layer.props} onChange={onChange} />
          </Box>
        </>
      )}
      {layer.type === "image" && (
        <>
          <ImageLayerPreviewer config={layer.props} />
          <Box
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ImageLayerConfig config={layer.props} onChange={onChange} />
          </Box>
        </>
      )}
      {layer.type === "solid" && (
        <>
          <ColorLayerPreviewer config={layer.props} />
          <Box
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ColorLayerConfig config={layer.props} onChange={onChange} />
          </Box>
        </>
      )}
    </Box>
  );
};
