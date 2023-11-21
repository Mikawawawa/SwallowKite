import { Stack, AspectRatio, Box, Button } from "@mui/joy";
import React, { ChangeEventHandler, useCallback, useRef } from "react";

export const ImagePicker = ({ onChange, value }: any) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          onChange?.(reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
    [onChange]
  );

  return (
    <Stack
      direction="column"
      sx={{
        position: "relative",
      }}
    >
      <Box
        sx={{
          background: "rgba(150, 150, 150, 0.3)",
          opacity: value ? 0 : 1,
          zIndex: 1,
          display: "flex",
          position: "absolute",
          height: "100%",
          width: "100%",
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
        <Button variant="soft" onClick={() => inputRef?.current?.click?.()}>
          上传图片
        </Button>
      </Box>

      <AspectRatio maxHeight={100}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundImage: value ? `url(${value})` : "none",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
      </AspectRatio>
    </Stack>
  );
};
