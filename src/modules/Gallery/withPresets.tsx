"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  ComponentType,
} from "react";
import { ImageStorageManager, ImageItem } from "@/service/AssetGallery";
import { Gallery } from "./Pure";

// @ts-ignore
if (!window.SwallowPresetsLoaded) {
  // @ts-ignore
  window.SwallowPresetsLoaded = fetch("/api/assets").then((res) => res.json());
}

export const usePresetAssetsHelper = () => {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    // @ts-ignore
    window.SwallowPresetsLoaded?.then((res) => {
      console.log("usePresetAssetsHelper", res);
      setImageList(res);
    });
  }, []);
  return { imageList };
};
