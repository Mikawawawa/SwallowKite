import { AssetGallery } from "@/modules/AssetGallery";
import {
  Stack,
  AspectRatio,
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  ModalClose,
  Sheet,
  Typography,
} from "@mui/joy";
import React, { ChangeEventHandler, useCallback, useRef } from "react";

export const ImagePicker = ({ onChange, value }: any) => {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string>();

  return (
    <Stack
      direction="column"
      sx={{
        position: "relative",
      }}
    >
      <Drawer
        anchor="right"
        size="lg"
        variant="plain"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          content: {
            sx: {
              bgcolor: "transparent",
              p: { md: 3, sm: 0 },
              boxShadow: "none",
            },
          },
        }}
      >
        <Sheet
          sx={{
            borderRadius: "md",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          <DialogTitle>Assets Gallery</DialogTitle>

          <ModalClose />
          <Divider sx={{ mt: "auto" }} />
          <DialogContent sx={{ gap: 2 }}>
            <Typography>
              This is the demo for image selection component
            </Typography>
            <AssetGallery
              debug={process.env.NODE_ENV === "development"}
              namespace={"ugc"}
              onChange={(source) => setSelected(source)}
            />
          </DialogContent>

          <Button
            variant="soft"
            disabled={!selected}
            onClick={() => {
              setOpen(false);
              onChange?.(selected);
            }}
          >
            Choose
          </Button>
        </Sheet>
      </Drawer>

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
        onClick={() => {
          setOpen(true);
        }}
      >
        <Button variant="soft">选择图片</Button>
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
