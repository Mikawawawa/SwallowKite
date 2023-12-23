import React, { useState, useEffect, useRef } from "react";
import { ImageStorageManager, ImageItem } from "@/service/AssetGallery";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
} from "@mui/material";
import { AspectRatio, Checkbox } from "@mui/joy";
import { Delete } from "@mui/icons-material";
import { UploadTrigger } from "@/components/UploadTrigger";
import { EditableText } from "@/components/ClickToEdit";
import { useLocalAssetsHelper } from "./withLocal";

export const Gallery: React.FC<{
  onChange: (source?: string) => void;
  imageList: any[];
  handleAddImage?: any;
  handleUpdateImage?: any;
  handleRemoveImage?: any;
}> = ({
  imageList,
  handleAddImage,
  handleUpdateImage,
  handleRemoveImage,
  onChange,
}) => {
  const [selectedKey, setSelected] = React.useState<string>();

  useEffect(() => {
    onChange?.(
      imageList.find?.((imageItem) => imageItem.key === selectedKey)?.source
    );
  }, [selectedKey, imageList]);

  return (
    <div>
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
                handleUpdateImage && (
                  <EditableText
                    value={image.name}
                    onChange={(value) => {
                      handleUpdateImage(image.key, value);
                    }}
                  />
                )
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
                handleRemoveImage && (
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
                )
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

        {handleAddImage && (
          <ImageListItem>
            <AspectRatio objectFit="contain">
              <UploadTrigger onChange={handleAddImage} />
            </AspectRatio>
          </ImageListItem>
        )}
      </ImageList>
    </div>
  );
};
