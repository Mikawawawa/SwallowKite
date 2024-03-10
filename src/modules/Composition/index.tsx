"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import { ImageStorageManager, ImageItem } from "@/service/AssetGallery";

import {
  AspectRatio,
  Checkbox,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  Stack,
  Button,
  ModalClose,
  Sheet,
} from "@mui/joy";
import {
  CompossiteImagePicker,
} from "../Drawer/Controller/Config/fields/CompositePicker";
import { Drawer as DrawerService } from "@/service/Drawer";
import { useCompositeAssetsHelper } from "../Gallery/withLocal";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import { TextureLayer, useLayerManager } from "@/hooks/useLayerReducer";

const CompositeContainer = "composite-container";

const defaultLayers = [
  { type: "image", id: "1", props: {} },
  { type: "image", id: "2", props: {} },
  { type: "image", id: "3", props: {} },
  { type: "image", id: "4", props: {} },
  { type: "image", id: "5", props: {} },
  { type: "image", id: "6", props: {} },
] as TextureLayer[];

const layersName = [
  "底面纹样",
  "翅膀纹样",
  "头部纹样",
  "胸部纹样",
  "尾部纹样",
  "腰栓纹样",
];

export const Compositor: React.FC<{}> = ({}) => {
  const inited = useRef<boolean>(false);
  const drawerRef = useRef<DrawerService>();
  const layersHelper = useLayerManager((value) => {
    drawerRef.current?.updateLayers(value);
  });
  const [open, setOpen] = useState(false);

  const { handleAddImage } = useCompositeAssetsHelper();

  const save = useCallback(async () => {
    const texture = (await drawerRef.current?.exportTexture?.()) as string;
    await handleAddImage?.(texture);
    setOpen(false);
  }, [handleAddImage]);

  useEffect(() => {
    if (open) {
      if (!inited.current) {
        inited.current = true;
        const drawer = new DrawerService(CompositeContainer);
        drawerRef.current = drawer;
      }

      layersHelper.setLayers(defaultLayers);
    }
  }, [open]);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="soft">
        <DynamicFeedIcon />
      </Button>

      <Drawer
        anchor="right"
        size="lg"
        variant="plain"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          content: {
            sx: {
              width: "30vw",
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
          <DialogTitle>自定义风筝</DialogTitle>

          <ModalClose />
          <Divider sx={{ mt: "auto" }} />

          <DialogContent sx={{ gap: 2 }}>
            <Stack direction={"column"} spacing={4} alignItems={"center"}>
              <Stack
                direction={"row"}
                sx={{
                  width: "100%",
                }}
                flexWrap={"wrap"}
                useFlexGap
                justifyContent={"flex-start"}
                spacing={2}
              >
                {layersHelper?.layers?.map?.((layer, index) => {
                  return (
                    <Stack
                      key={layer.id}
                      sx={{
                        flex: 1,
                        minWidth: "30%",
                        flexShrink: 0,
                      }}
                    >
                      {layersName[index]}
                      <CompossiteImagePicker
                        value={layer?.props?.src}
                        onChange={(value: string) => {
                          layersHelper.updateLayer(layer.id, {
                            ...layer,
                            props: {
                              src: value,
                            },
                          });
                        }}
                      />
                    </Stack>
                  );
                })}
              </Stack>

              <div
                id={CompositeContainer}
                tabIndex={-1}
                style={{
                  outline: "none",
                  height: "25vw",
                  width: "25vw",
                  background: "#ddd",
                }}
              />

              <Button
                sx={{
                  width: "100%",
                }}
              >
                保存
              </Button>
            </Stack>
          </DialogContent>
        </Sheet>
      </Drawer>
    </>
  );
};
