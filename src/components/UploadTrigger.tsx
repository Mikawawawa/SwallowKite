import React, {
  useRef,
  ChangeEventHandler,
  useCallback,
  FunctionComponent,
} from "react";
import { Box, Button, Stack, styled } from "@mui/joy";
import { UploadFile } from "@mui/icons-material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const UploadTrigger: FunctionComponent<{
  onChange: (url: string, name?: string) => void;
}> = ({ onChange }) => {
  const handleFileChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          onChange?.(reader.result as string, e?.target?.value);
        };
        reader.readAsDataURL(file);
      }
    },
    [onChange]
  );

  return (
    <Stack alignItems="stretch" justifyContent="flex-start" direction={"row"}>
      <Button
        component="label"
        style={{
          position: "absolute",
          transition: "all 0.3s ease",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
        }}
        variant="soft"
        startDecorator={<UploadFile />}
      >
        <VisuallyHiddenInput
          onChange={handleFileChange}
          type="file"
          accept="image/*"
        />
        Add New Assets
      </Button>
    </Stack>
  );
};
