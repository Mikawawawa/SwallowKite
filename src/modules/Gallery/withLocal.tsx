import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  createContext,
  useContext,
  FunctionComponent,
  PropsWithChildren,
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

// 创建一个 Context
const CompositeAssetsContext = createContext<
  Partial<ReturnType<typeof useLocalAssetsHelper>>
>({
  imageList: [],
});

export const CompositeAssetsProvider: FunctionComponent<
  PropsWithChildren<{}>
> = ({ children }) => {
  // 将需要共享的数据放入 Context.Provider 的 value 中
  const contextValue = useLocalAssetsHelper("composite");

  return (
    <CompositeAssetsContext.Provider value={contextValue}>
      {children}
    </CompositeAssetsContext.Provider>
  );
};

export const useCompositeAssetsHelper = () => {
  return useContext(CompositeAssetsContext);
};
