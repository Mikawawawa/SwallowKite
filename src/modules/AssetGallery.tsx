import React, { useState, useEffect } from "react";
import { ImageStorageManager, ImageItem } from "@/service/AssetGallery";
import {
  Button,
  TextField,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { HoverBox } from "@/components/HoverBox";

export const AssetGallery: React.FC<{ namespace: string }> = ({
  namespace,
}) => {
  const imageStorage = new ImageStorageManager(namespace);
  const [imageList, setImageList] = useState<ImageItem[]>([]);
  const [newImageName, setNewImageName] = useState<string>("");
  const [newImageSource, setNewImageSource] = useState<string>("");

  useEffect(() => {
    const fetchImageList = async () => {
      const list = await imageStorage.getImageList();
      setImageList(list);
    };

    fetchImageList();
  }, [imageStorage]);

  const handleAddImage = async () => {
    if (newImageSource) {
      await imageStorage.addImage(newImageSource, newImageName);
      setNewImageName("");
      setNewImageSource("");
      setImageList(await imageStorage.getImageList());
    }
  };

  const handleRemoveImage = async (key: string) => {
    await imageStorage.removeImage(key);
    setImageList(await imageStorage.getImageList());
  };

  const handleUpdateImage = async (key: string, name: string) => {
    await imageStorage.updateImage(key, { name });
    setImageList(await imageStorage.getImageList());
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Image List Manager
      </Typography>
      <div>
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
        <Button variant="contained" color="primary" onClick={handleAddImage}>
          Add Image
        </Button>
      </div>
      <ImageList sx={{ width: "100%" }} cols={4}>
        {imageList.map((image) => (
          <HoverBox key={image.key}>
            <ImageListItem>
              <img src={image.source} alt={image.name} loading="lazy" />
              <ImageListItemBar
                title={image.name}
                actionIcon={
                  <IconButton
                    onClick={() => handleRemoveImage(image.key)}
                    color="error"
                  >
                    <EditIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          </HoverBox>
        ))}
      </ImageList>
    </div>
  );
};
