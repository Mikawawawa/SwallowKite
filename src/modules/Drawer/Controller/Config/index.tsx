import React, { FunctionComponent, useState } from "react";
import { DotLayerConfig, DotLayerPreviewer } from "./dot";
import { ImageLayerConfig, ImageLayerPreviewer } from "./image";
import { ColorLayerConfig, ColorLayerPreviewer } from "./color";
import {
  TextureLayerForRender,
  useLayerManager,
} from "@/hooks/useLayerReducer";
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/joy";

export const LayerConfig: FunctionComponent<{
  layer: TextureLayerForRender;
  onChange: (value: unknown) => void;
}> = ({ layer, onChange }) => {
  return (
    <Box>
      {layer.type === "pattern" && (
        <>
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

export const LayerPreview: FunctionComponent<{
  layer: TextureLayerForRender;
  // setType: (type: TextureLayerForRender["type"]) => void;
}> = ({
  layer,
  // setType
}) => {
  return (
    <Box>
      {layer.type === "pattern" && (
        <>
          <DotLayerPreviewer config={layer.props} />
        </>
      )}
      {layer.type === "image" && (
        <>
          <ImageLayerPreviewer config={layer.props} />
        </>
      )}
      {layer.type === "solid" && (
        <>
          <ColorLayerPreviewer config={layer.props} />
        </>
      )}
      {/* {!layer.type && <TypeSelection onChange={setType} />} */}
    </Box>
  );
};

export const TypeSelection = ({
  onChange,
}: {
  onChange: (value: TextureLayerForRender["type"]) => void;
}) => {
  const [value, setValue] = useState<TextureLayerForRender["type"]>();

  return (
    <Stack onClick={(e) => e.stopPropagation()}>
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
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Radio value="solid" label={<Chip>色彩</Chip>} color="primary" />
            <Radio value="image" label={<Chip>图片</Chip>} color="neutral" />
            <Radio value="pattern" label={<Chip>图案</Chip>} color="danger" />
          </Stack>
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
    </Stack>
  );
};
