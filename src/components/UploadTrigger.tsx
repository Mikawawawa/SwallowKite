import React, {
  useRef,
  ChangeEventHandler,
  useCallback,
  FunctionComponent,
} from "react";
import { Box, Button } from "@mui/joy";
import { UploadFile } from "@mui/icons-material";

export const UploadTrigger: FunctionComponent<{
  onChange: (url: string, name?: string) => void;
}> = ({ onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

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
    <Box
      sx={{
        background: "rgba(150, 150, 150, 0.3)",
        opacity: 1,
        zIndex: 1,
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        transition: "opacity 0.3s ease-in-out",
        "&:hover": {
          opacity: 1,
        },
      }}
    >
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0,
          zIndex: 1,
          cursor: "pointer",
        }}
        onChange={handleFileChange}
      />
      <Button
        variant="soft"
        onClick={() => inputRef?.current?.click?.()}
        startDecorator={<UploadFile />}
      >
        Add New Assets
      </Button>
    </Box>
  );
};
