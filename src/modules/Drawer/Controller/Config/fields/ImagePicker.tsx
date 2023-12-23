import { Gallery } from "@/modules/Gallery/Pure";
import { useLocalAssetsHelper } from "@/modules/Gallery/withLocal";
import { usePresetAssetsHelper } from "@/modules/Gallery/withPresets";
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
  Tabs,
  TabList,
  Tab,
  TabPanel,
} from "@mui/joy";
import React, {
  ChangeEventHandler,
  PropsWithChildren,
  useCallback,
  useRef,
  useState,
} from "react";

const PickerDrawer = ({
  open,
  onClose,
  children,
}: PropsWithChildren<{
  open: boolean;
  onClose: () => void;
}>) => {
  return (
    <Drawer
      anchor="right"
      size="lg"
      variant="plain"
      open={open}
      onClose={onClose}
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

        <DialogContent sx={{ gap: 2 }}>{children}</DialogContent>
      </Sheet>
    </Drawer>
  );
};

enum GalleryType {
  Local = "local",
  Preset = "preset",
}

const FullImageGallery = ({ onChange }: { onChange: any }) => {
  const localHelper = useLocalAssetsHelper("ugc");
  const presetsHelper = usePresetAssetsHelper();

  const helperMap = {
    [GalleryType.Local]: localHelper,
    [GalleryType.Preset]: presetsHelper,
  };

  const [type, setType] = useState<GalleryType>(GalleryType.Local);
  console.log("type", type);
  return (
    <Tabs value={type} onChange={(_, value) => setType(value as GalleryType)}>
      <TabList>
        <Tab variant="plain" color="neutral" value={GalleryType.Local}>
          用户素材
        </Tab>

        <Tab variant="plain" color="neutral" value={GalleryType.Preset}>
          系统素材
        </Tab>
      </TabList>

      <Gallery {...helperMap[type]} onChange={onChange} />
    </Tabs>
  );
};

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
        <Button
          variant="soft"
          sx={{
            transition: "all 0.3s",
          }}
        >
          选择图片
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

      <PickerDrawer open={open} onClose={() => setOpen(false)}>
        <Button
          disabled={!selected}
          onClick={() => {
            setOpen(false);
            onChange?.(selected);
          }}
        >
          Choose
        </Button>
        <FullImageGallery onChange={(source) => setSelected(source)}/>
      </PickerDrawer>
    </Stack>
  );
};
