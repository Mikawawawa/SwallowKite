import React, {
  useState,
  useEffect,
  useRef,
  ChangeEventHandler,
  useCallback,
  FunctionComponent,
  PropsWithChildren,
} from "react";
import { ImageStorageManager, ImageItem } from "@/service/AssetGallery";
import {
  TextField,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { HoverBox } from "@/components/HoverBox";
import { AspectRatio, Box, Checkbox, Stack, Button } from "@mui/joy";
import { Delete, UploadFile } from "@mui/icons-material";
import { UploadTrigger } from "@/components/UploadTrigger";
import { EditableText } from "@/components/ClickToEdit";

export const AssetGallery: React.FC<{
  namespace: string;
  onChange: (source?: string) => void;
  debug: boolean;
}> = ({ namespace, onChange, debug }) => {
  const imageStorage = useRef(new ImageStorageManager(namespace));
  const [imageList, setImageList] = useState<ImageItem[]>([]);
  const [newImageName, setNewImageName] = useState<string>("");
  const [newImageSource, setNewImageSource] = useState<string>("");
  const [selectedKey, setSelected] = React.useState<string>();

  useEffect(() => {
    const fetchImageList = async () => {
      const list = await imageStorage.current.getImageList();
      setImageList(list);
    };

    fetchImageList();
  }, []);

  useEffect(() => {
    onChange?.(
      imageList.find?.((imageItem) => imageItem.key === selectedKey)?.source
    );
  }, [selectedKey, imageList]);

  const handleAddImage = async () => {
    if (newImageSource) {
      await imageStorage.current.addImage(newImageSource, newImageName);
      setNewImageName("");
      setNewImageSource("");
      setImageList(await imageStorage.current.getImageList());
    }
  };

  const handleRemoveImage = async (key: string) => {
    await imageStorage.current.removeImage(key);
    setImageList(await imageStorage.current.getImageList());
  };

  const handleUpdateImage = async (key: string, name: string) => {
    await imageStorage.current.updateImage(key, { name });
    setImageList(await imageStorage.current.getImageList());
  };

  return (
    <div>
      {debug && (
        <>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Image Name"
              variant="outlined"
              value={newImageName}
              onChange={(e) => setNewImageName(e.target.value)}
            />
            <TextField
              label="Image Source"
              variant="outlined"
              value={newImageSource}
              onChange={(e) => setNewImageSource(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddImage}
            >
              Add Image
            </Button>
          </Stack>
        </>
      )}

      <ImageList sx={{ width: "100%" }} cols={4}>
        {imageList.map((image) => (
          <ImageListItem
            key={image.key}
            onClick={() => {
              if (selectedKey === image.key) {
                setSelected(undefined);
              } else {
                setSelected(image.key);
              }
            }}
          >
            <AspectRatio objectFit="contain">
              <img src={image.source} alt={image.name} loading="lazy" />
            </AspectRatio>

            <ImageListItemBar
              title={
                <EditableText
                  value={image.name}
                  onChange={(value) => {
                    handleUpdateImage(image.key, value);
                  }}
                />
              }
              position="top"
              actionIcon={
                <Checkbox
                  checked={selectedKey === image.key}
                  sx={{
                    margin: 1,
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                  }}
                />
              }
              actionPosition="right"
            />

            <ImageListItemBar
              position="bottom"
              actionIcon={
                <IconButton
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (image.key === selectedKey) {
                      setSelected(undefined);
                    }
                    handleRemoveImage(image.key);
                  }}
                >
                  <Delete />
                </IconButton>
              }
              sx={{
                opacity: 0.3,
                background: "transparent",
                transition: "all 300ms",
                "&:hover": {
                  opacity: 1,
                },
              }}
              actionPosition="right"
            />
          </ImageListItem>
        ))}

        <UploadTrigger
          onChange={async (url, name) => {
            await imageStorage.current.addImage(url, name || "untiled");
            setImageList(await imageStorage.current.getImageList());
          }}
        />
      </ImageList>
    </div>
  );
};
