"use client";
import { fabric } from "fabric";

import { TextureLayerForRender } from "../hooks/useLayerReducer";

export class Drawer {
  public canvas: HTMLDivElement;
  private fabricCanvas: fabric.Canvas;
  private layers: Array<TextureLayerForRender> = [];

  constructor(containerId: string) {
    this.canvas = document.getElementById(containerId) as HTMLDivElement;

    this.fabricCanvas = new fabric.Canvas(containerId, {
      backgroundColor: "rgba(0, 0, 0, 0)",
      preserveObjectStacking: true,
    });

    this.canvas.addEventListener("resize", () => {
      this.fabricCanvas.setDimensions({
        width: this.canvas.clientWidth,
        height: this.canvas.clientHeight,
      });
    });
  }

  exportTexture() {
    return new Promise((resolve) => {
      const handler = () => {
        const dataUrl = this.fabricCanvas.toDataURL({ format: "png" });
        resolve(dataUrl);
      };
      requestAnimationFrame(() => {
        handler();
      });
    });
  }

  updateLayers(layers: TextureLayerForRender[]) {
    this.layers = layers;
    this.render();
  }

  render() {
    this.fabricCanvas.clear();

    this.layers.forEach((layer) => {
      const { type, props, opacity, offset, size, rotation, scale } = layer;

      let fabricObject: fabric.Object;

      const width = size?.width || this.fabricCanvas.width;
      const height = size?.height || this.fabricCanvas.height;

      switch (type) {
        case "solid": {
          fabricObject = new fabric.Rect({
            width: width,
            height: height,
            fill: props.content || "transparent",
          });
          break;
        }
        // case "image": {
        //   if (!props.src) {
        //     return;
        //   }
        //   fabricObject = new fabric.Image.fromURL(props.src, (img) => {
        //     this.fabricCanvas.add(img);
        //   });
        //   break;
        // }
        // case "pattern": {
        //   if (!props.src) {
        //     return;
        //   }

        //   const { rowGap = 1, columnGap = 1, scale = 1 } = layer.props || {};
        //   const patternSpriteOrigin = new fabric.Image.fromURL(props.src);

        //   for (
        //     let y = 0;
        //     y < height;
        //     y += patternSpriteOrigin.height * (1 + rowGap)
        //   ) {
        //     for (
        //       let x = 0;
        //       x < width;
        //       x += patternSpriteOrigin.width * (1 + columnGap)
        //     ) {
        //       const patternSprite = new fabric.Image.fromURL(props.src, {
        //         left: x + ((y / patternSpriteOrigin.height) % 2),
        //         top: y,
        //         scaleX: scale,
        //         scaleY: scale,
        //       });
        //       this.fabricCanvas.add(patternSprite);
        //     }
        //   }
        //   break;
        // }
        default: {
          return;
        }
      }

      fabricObject.set({
        opacity: opacity || 1,
        left: offset?.x || 0,
        top: offset?.y || 0,
        width: width,
        height: height,
        angle: rotation || 0,
        scaleX: scale || 1,
        scaleY: scale || 1,
      });

      this.fabricCanvas.add(fabricObject);
    });
  }
}
