import { Gallery } from "@/modules/Gallery/Pure";
import { useCompositePresetAssetsHelper } from "@/modules/Gallery/withCompositePresets";

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
  background = "background",
  body = "body",
  wing = "wing",
  tile = "tile",
  waist = "waist",
  head = "head",
}

const GalleryNames = {
  [GalleryType.background]: "底面纹样",
  [GalleryType.wing]: "翅膀纹样",
  [GalleryType.head]: "头部纹样",
  [GalleryType.tile]: "尾部纹样",
  [GalleryType.waist]: "腰栓纹样",
  [GalleryType.body]: "胸部纹样",
};

const CompositeGallery = ({
  onChange,
  categories = [
    GalleryType.background,
    GalleryType.wing,
    GalleryType.head,
    GalleryType.tile,
    GalleryType.waist,
    GalleryType.body,
  ],
}: {
  onChange: (src?: string) => void;
  categories?: GalleryType[];
}) => {
  const backgroundPresetHelper = useCompositePresetAssetsHelper("background");
  const wingPresetHelper = useCompositePresetAssetsHelper("wing");
  const headPresetHelper = useCompositePresetAssetsHelper("head");
  const tilePresetHelper = useCompositePresetAssetsHelper("tile");
  const waistPresetHelper = useCompositePresetAssetsHelper("waist");
  const bodyPresetHelper = useCompositePresetAssetsHelper("body");

  const helperMap = {
    [GalleryType.background]: backgroundPresetHelper,
    [GalleryType.wing]: wingPresetHelper,
    [GalleryType.head]: headPresetHelper,
    [GalleryType.tile]: tilePresetHelper,
    [GalleryType.waist]: waistPresetHelper,
    [GalleryType.body]: bodyPresetHelper,
  };

  const [type, setType] = useState<GalleryType>(GalleryType.background);
  return (
    <Tabs value={type} onChange={(_, value) => setType(value as GalleryType)}>
      <TabList>
        {categories.map((cat) => (
          <Tab variant="plain" color="neutral" value={cat} key={cat}>
            {GalleryNames[cat]}
          </Tab>
        ))}
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
          选择
        </Button>
        <CompositeGallery onChange={(source) => setSelected(source)} />
      </PickerDrawer>
    </Stack>
  );
};

export const CompossiteImagePicker = ({ onChange, value }: any) => {
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
          选择
        </Button>
        <CompositeGallery onChange={(source) => setSelected(source)} />
      </PickerDrawer>
    </Stack>
  );
};
