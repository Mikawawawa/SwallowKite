import * as PIXI from "pixi.js";
import { TextureLayerForRender } from "../hooks/useLayerReducer";

export class Drawer {
  public canvas: HTMLDivElement;
  private app: PIXI.Application;
  private stage: PIXI.Container;
  private needUpdate: boolean = false;

  layers: Array<TextureLayerForRender> = [];

  constructor(containerId: string) {
    this.canvas = document.getElementById(containerId) as HTMLDivElement;

    const app = new PIXI.Application({
      resizeTo: this.canvas,
      backgroundAlpha: 0,
      preserveDrawingBuffer: true,
      antialias: true,
      background: "transparent",
    });

    // @ts-expect-error 12
    this.canvas.appendChild(app.view);

    this.stage = new PIXI.Container();
    this.stage.height = app.view.height;
    this.stage.width = app.view.width;
    app.stage.addChild(this.stage);

    this.app = app;

    this.canvas.addEventListener("resize", () => {
      this.stage.height = this.app.view.height;
      this.stage.width = this.app.view.width;

      app.resize();
    });
    app.ticker.add(this.animate);
  }

  exportTexture() {
    return new Promise((resolve) => {
      const handler = () => {
        if (!this.needUpdate) {
          resolve(this.app.view.toDataURL?.("image/png"));
        } else {
          requestAnimationFrame(handler);
        }
      };
      requestAnimationFrame(() => {
        handler();
      });
    });
  }

  render() {
    this.layers?.forEach?.((layer) => {
      const { type, props, opacity, offset, size, rotation, scale } = layer;

      let layerSprite: PIXI.Sprite | PIXI.Graphics | PIXI.Container;

      const width = size?.width || this.app.view.width;
      const height = size?.height || this.app.view.height;

      switch (type) {
        case "solid": {
          layerSprite = new PIXI.Graphics();
          if (props.content) {
            (layerSprite as PIXI.Graphics).beginFill(
              parseInt(props.content.substring(1), 16)
            );
            (layerSprite as PIXI.Graphics).drawRect(0, 0, width, height);
          }

          break;
        }
        case "image": {
          if (!props.src) {
            return;
          }

          layerSprite = PIXI.Sprite.from(props.src);
        }
        case "pattern": {
          layerSprite = new PIXI.Container();

          if (!layer?.props?.src) {
            return;
          }
          const { rowGap = 1, columnGap = 1, scale = 1 } = layer?.props || {};

          const patternSpriteOrigin = PIXI.Sprite.from(props.src);

          const lineHeight = (1 + rowGap) * patternSpriteOrigin.height;
          const colWidth = (1 + columnGap) * patternSpriteOrigin.width;

          for (let y = 0; y < height; y += lineHeight) {
            for (let x = 0; x < width; x += colWidth) {
              const patternSprite = PIXI.Sprite.from(props.src);
              patternSprite.position.set(x + ((y / lineHeight) % 2), y);
              patternSprite.scale.set(scale);
              layerSprite.addChild(patternSprite);
            }
          }

          break;
        }
        default: {
          return;
        }
      }

      layerSprite.alpha = opacity || 1;
      layerSprite.position.set(
        (offset?.x || 0) * this.app.view.width,
        (offset?.y || 0) * this.app.view.height
      );
      layerSprite.width = width;
      layerSprite.height = height;
      layerSprite.rotation = (rotation || 0) * Math.PI * 2;

      layerSprite.scale = { x: scale || 1, y: scale || 1 };

      this.stage.addChild(layerSprite);
    });

    this.needUpdate = false;
  }

  animate = () => {
    this.stage.removeChildren();

    // 重新渲染图层
    this.render();

    // 渲染 PIXI 应用
    this.app.renderer.render(this.stage);
  };

  updateLayers = (layers: TextureLayerForRender[]) => {
    this.needUpdate = true;
    this.layers = layers;
  };
}
