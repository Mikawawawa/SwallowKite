import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  ComponentType,
} from "react";
import { ImageStorageManager, ImageItem } from "@/service/AssetGallery";

export const useLocalAssetsHelper = (namespace: string) => {
  const imageStorage = useRef(new ImageStorageManager(namespace));
  const [imageList, setImageList] = useState<ImageItem[]>([]);

  useEffect(() => {
    const fetchImageList = async () => {
      const list = await imageStorage.current.getImageList();
      setImageList(list);
    };

    fetchImageList();
  }, []);

  const handleRemoveImage = useCallback(async (key: string) => {
    await imageStorage.current.removeImage(key);
    setImageList(await imageStorage.current.getImageList());
  }, []);

  const handleUpdateImage = useCallback(async (key: string, name: string) => {
    await imageStorage.current.updateImage(key, { name });
    setImageList(await imageStorage.current.getImageList());
  }, []);

  const handleAddImage = useCallback(async (url: string, name?: string) => {
    await imageStorage.current.addImage(url, name || "untiled");
    setImageList(await imageStorage.current.getImageList());
  }, []);

  return {
    imageList,
    handleAddImage,
    handleUpdateImage,
    handleRemoveImage,
  };
};
