import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ImageItem, ImageStorageManager } from "@/service/AssetGallery";

const ImageManager: React.FC<{ namespace: string }> = ({ namespace }) => {
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
      const key = await imageStorage.addImage(newImageSource, newImageName);
      setNewImageName("");
      setNewImageSource("");
      setImageList([
        ...imageList,
        { key, source: newImageSource, name: newImageName },
      ]);
    }
  };

  const handleRemoveImage = async (key: string) => {
    await imageStorage.removeImage(key);
    setImageList(imageList.filter((item) => item.key !== key));
  };

  const handleUpdateImage = async (key: string, name: string) => {
    await imageStorage.updateImage(key, { name });
    setImageList(
      imageList.map((item) => (item.key === key ? { ...item, name } : item))
    );
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Image Manager
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
      <div style={{ marginTop: "20px" }}>
        {imageList.map((image) => (
          <Card key={image.key} style={{ marginBottom: "10px" }}>
            <CardContent>
              <Typography variant="h6">{image.name}</Typography>
              <img
                src={image.source}
                alt={image.name}
                style={{ maxWidth: "100%" }}
              />
            </CardContent>
            <CardActions>
              <IconButton
                color="error"
                onClick={() => handleRemoveImage(image.key)}
              >
                <DeleteIcon />
              </IconButton>
              <TextField
                label="New Name"
                variant="outlined"
                size="small"
                onChange={(e) => handleUpdateImage(image.key, e.target.value)}
              />
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ImageManager;
