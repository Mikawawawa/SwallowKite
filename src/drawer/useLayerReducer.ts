import { useEffect, useReducer } from "react";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";

const tempValue = [
  {
    type: "solid",
    props: {
      content: "#F1C2DE", // 纯色图层
    },
    scale: 0.5,
    offset: { x: 100, y: 100 },
    // size: { width: 200, height: 150 },
    rotation: 0.5,
  },
  {
    type: "image",
    props: {
      src: "/technicalFabricSmall_normal_256.png",
    },
    opacity: 0.5,

    size: { width: 200, height: 150 },
    rotation: 0,
  },
  {
    type: "image",
    props: {
      src: "/technicalFabricSmall_normal_256.png",
    },
    opacity: 0.5,

    rotation: 0,
  },
  {
    type: "pattern",
    props: {
      src: "/kite.jpeg",
      rowGap: 200,
      columnGap: 200,
      scale: 0.6506709277209668,
      zoom: -62,
      leftRightSpacing: 100,
      topBottomSpacing: 100,
    },
    opacity: 0.6,
    scale: 0.8,
    rotation: 0,
  },
];

// 图层数据类型
type TextureLayer = {
  id: string; // 唯一标识符
  type: "pattern" | "image" | "solid";
  opacity?: number;
  size?: {
    width?: number;
    height?: number;
  };
  rotation?: number;
  scale?: number;
  offset?: {
    x?: number;
    y?: number;
  };
  props: {
    [k: string]: any;
  };
};

export type TextureLayerForRender = Omit<TextureLayer, "id"> & {
  id?: string;
};

// 初始状态类型
type InitialState = {
  layers: TextureLayer[];
  layersMap: Map<string, TextureLayer>;
};

// 操作类型
type Action =
  | { type: "SET"; payload: TextureLayer[] }
  | { type: "ADD_LAYER"; payload: TextureLayerForRender }
  | { type: "UPDATE_LAYER"; payload: { id: string; layer: TextureLayer } }
  | { type: "REMOVE_LAYER"; payload: string } // payload 是图层的唯一标识符
  | { type: "CLEAR" };

// Reducer函数
const layerReducer = (state: InitialState, action: Action): InitialState => {
  const { layers, layersMap } = state;
  switch (action.type) {
    case "CLEAR": {
      layersMap.clear();
      return {
        layers: [],
        layersMap: layersMap,
      };
      break;
    }
    case "SET": {
      layersMap.clear();
      action.payload.forEach((value, index) => {
        const newId = value.id || uuidv4();
        if (!value.id) {
          value.id = newId;
        }
        layersMap.set(newId, value);
      });
      return {
        layers: action.payload,
        layersMap,
      };
      break;
    }
    case "ADD_LAYER": {
      // 处理添加新图层的逻辑
      const id = uuidv4();
      action.payload.id = id;
      layersMap.set(id, action.payload as TextureLayer);
      return {
        ...state,
        layers: [...layers, action.payload as TextureLayer],
      };
      break;
    }
    case "UPDATE_LAYER": {
      // 处理更新图层的逻辑
      if (layersMap.has(action.payload.id)) {
        const updatedLayers = layers.map((layer) =>
          layer.id === action.payload.id ? action.payload.layer : layer
        );
        layersMap.set(action.payload.id, action.payload.layer);
        return {
          ...state,
          layers: updatedLayers,
        };
      }
      break;
    }
    case "REMOVE_LAYER": {
      // 处理删除图层的逻辑
      const layerToRemove = layersMap.get(action.payload);
      if (layerToRemove) {
        layersMap.delete(action.payload);
        const updatedLayers = layers.filter(
          (layer) => layer.id !== action.payload
        );
        return {
          ...state,
          layers: updatedLayers,
        };
      }
      break;
    }
    default: {
      return state;
    }
  }
  return { ...state };
};

export function useLayerManager() {
  const [state, dispatch] = useReducer(layerReducer, {
    layers: [],
    layersMap: new Map<string, TextureLayer>(),
  } as InitialState);

  const clear = () => {
    dispatch({ type: "CLEAR" });
  };

  // 添加新图层
  const addLayer = (newLayer: TextureLayerForRender) => {
    dispatch({ type: "ADD_LAYER", payload: newLayer });
  };

  // 更新图层
  const updateLayer = (id: string, updatedLayer: TextureLayer) => {
    dispatch({ type: "UPDATE_LAYER", payload: { id, layer: updatedLayer } });
  };

  // 删除图层
  const removeLayer = (id: string) => {
    dispatch({ type: "REMOVE_LAYER", payload: id });
  };

  const setLayers = (initValue: TextureLayer[]) => {
    dispatch({ type: "SET", payload: initValue });
  };

  return {
    layers: state.layers,
    addLayer,
    updateLayer,
    removeLayer,
    setLayers
  };
}
