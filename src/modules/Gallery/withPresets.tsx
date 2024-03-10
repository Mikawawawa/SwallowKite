import { useState, useEffect } from "react";

export const usePresetAssetsHelper = () => {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    // @ts-ignore
    if (!window.SwallowPresetsLoaded) {
      // @ts-ignore
      window.SwallowPresetsLoaded = fetch("/api/assets").then((res) =>
        res.json()
      );
    }

    // @ts-ignore
    window.SwallowPresetsLoaded?.then((res) => {
      setImageList(res);
    });
  }, []);
  return { imageList };
};
