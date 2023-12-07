import { throttle } from "lodash";
import { useEffect, useMemo, useReducer, useRef } from "react";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";

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
  | {
      type: "UPDATE_LAYER";
      payload: {
        callback: any;
        id: string;
        layer: TextureLayer;
      };
    }
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
        layers: [...action.payload],
        layersMap,
      };
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
    }
    case "UPDATE_LAYER": {
      // 处理更新图层的逻辑
      if (layersMap.has(action.payload.id)) {
        const updatedLayers = layers.map((layer) =>
          layer.id === action.payload.id ? action.payload.layer : layer
        );
        layersMap.set(action.payload.id, action.payload.layer);

        const newState = {
          ...state,
          layers: [...updatedLayers],
        };

        if (action.payload.callback) {
          requestAnimationFrame(() => action.payload.callback?.(newState));
        }

        return newState;
      }
      break;
    }
    case "REMOVE_LAYER": {
      // 处理删除图层的逻辑
      const layerToRemove = layersMap.get(action.payload);
      console.log(layerToRemove, layersMap, action.payload);
      debugger;
      if (layerToRemove) {
        layersMap.delete(action.payload);
        const updatedLayers = layers.filter((layer) => {
          console.log(layer.id, action.payload);
          return layer.id !== action.payload;
        });
        return {
          ...state,
          layers: [...updatedLayers],
        };
      }
      break;
    }
    default: {
      return state;
    }
  }
  return state;
};

export function useLayerManager(
  callback: (layers: TextureLayerForRender[]) => void
) {
  const [state, dispatch] = useReducer(layerReducer, {
    layers: [],
    layersMap: new Map<string, TextureLayer>(),
  } as InitialState);

  const layersRef = useRef(state.layers);
  layersRef.current = state.layers;

  const notify = useMemo(() => {
    return throttle(() => {
      callback?.(layersRef.current);
    }, 16);
  }, [callback]);

  const clear = () => {
    dispatch({ type: "CLEAR" });
    notify?.();
  };

  // 添加新图层
  const addLayer = (newLayer: TextureLayerForRender) => {
    dispatch({ type: "ADD_LAYER", payload: newLayer });
    notify?.();
  };

  // 更新图层
  const updateLayer = (
    id: string,
    updatedLayer: TextureLayer,
    callback?: Function
  ) => {
    dispatch({
      type: "UPDATE_LAYER",
      payload: { id, layer: updatedLayer, callback },
    });
    notify?.();
  };

  // 删除图层
  const removeLayer = (id: string) => {
    console.log("remove layer", id);
    dispatch({ type: "REMOVE_LAYER", payload: id });
    notify?.();
  };

  const setLayers = (initValue: TextureLayer[]) => {
    dispatch({ type: "SET", payload: initValue });
    notify?.();
  };

  return {
    layers: state.layers,
    addLayer,
    updateLayer,
    removeLayer,
    setLayers,
    clear,
  };
}
