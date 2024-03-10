import { useState, useEffect } from "react";

export const useCompositePresetAssetsHelper = (key: string) => {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    // @ts-ignore
    if (!window.SwallowCompositePresetsLoaded) {
      // @ts-ignore
      window.SwallowCompositePresetsLoaded = fetch("/api/composite").then((res) =>
        res.json()
      );
    }

    // @ts-ignore
    window.SwallowCompositePresetsLoaded?.then((res) => {
      setImageList(res[key] || []);
    });
  }, []);
  return { imageList };
};
