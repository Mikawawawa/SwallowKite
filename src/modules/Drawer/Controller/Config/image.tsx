import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { ImagePicker } from "./fields/ImagePicker";
import { Stack, Typography, Chip } from "@mui/joy";
import { useForm, Controller, useWatch } from "react-hook-form";
import { throttle } from "lodash";

export const ImageLayerPreviewer = React.memo(function Previewer({
  config,
}: {
  config: any;
}) {
  return (
    <Stack direction={"row"} spacing={1}>
      <img
        src={config.src ? config.src : "none"}
        style={{
          width: "64px",
          height: "36px",
          filter: "drop-shadow(0 4px 4px rgba(154, 137, 145, 0.5))",
          objectFit: "contain",
        }}
      />
      <Typography level="title-lg" component="div">
        <Chip>图片</Chip>
      </Typography>
    </Stack>
  );
});

export const ImageLayerConfig: FunctionComponent<{
  config: any;
  onChange: Function;
}> = React.memo(function Configure({ config, onChange }) {
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const { control, getValues } = useForm({
    defaultValues: {
      ...config,
    },
  });

  const handleChange = useCallback(
    throttle(() => {
      const value = getValues();
      onChangeRef.current({
        ...value,
      });
    }, 20),
    [getValues]
  );

  return (
    <form>
      <Stack direction="column" sx={{ flex: 1 }}>
        <Stack direction="column">
          <Controller
            name="src"
            control={control}
            render={({ field }) => (
              <ImagePicker
                {...field}
                onChange={(value: any) => {
                  field.onChange(value);

                  handleChange();
                }}
              />
            )}
          />
        </Stack>
      </Stack>
    </form>
  );
});
