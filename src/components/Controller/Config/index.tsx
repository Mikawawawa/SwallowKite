import React, { FunctionComponent, useState } from "react";
import { DotLayerConfig, DotLayerPreviewer } from "./dot";
import { ImageLayerConfig, ImageLayerPreviewer } from "./image";
import { ColorLayerConfig, ColorLayerPreviewer } from "./color";
import {
  TextureLayerForRender,
  useLayerManager,
} from "@/drawer/useLayerReducer";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/joy";

export const LayerConfig: FunctionComponent<{
  layer: TextureLayerForRender;
  onChange: (value: unknown) => void;
  setType: (type: TextureLayerForRender["type"]) => void;
  selected: boolean;
}> = ({ layer, onChange, setType }) => {
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
      {!layer.type && <TypeSelection onChange={setType} />}
    </Box>
  );
};

const TypeSelection = ({
  onChange,
}: {
  onChange: (value: TextureLayerForRender["type"]) => void;
}) => {
  const [value, setValue] = useState<TextureLayerForRender["type"]>();

  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <FormControl>
        <FormLabel>选择类型</FormLabel>
        <RadioGroup
          defaultValue="medium"
          name="radio-buttons-group"
          onChange={(e) => {
            console.log(e.target.value);
            if (e?.target?.value) {
              setValue(e.target.value as TextureLayerForRender["type"]);
            }
          }}
        >
          <Radio value="solid" label="色彩" color="primary" />
          <Radio value="image" label="图片" color="neutral" />
          <Radio value="pattern" label="图案" color="danger" />
        </RadioGroup>
      </FormControl>
      <Button
        type="submit"
        disabled={!Boolean(value)}
        onClick={() => {
          if (value) {
            onChange?.(value);
          }
        }}
      >
        确认
      </Button>
    </Box>
  );
};
