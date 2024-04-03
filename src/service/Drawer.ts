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
    // if (!this.needUpdate) {
    //   return;
    // }
    // this.stage.removeChildren();

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

          layerSprite = PIXI.Sprite.from(props.src, {
            scaleMode: 0,
            resourceOptions: {},
          });
          break;
        }
        case "pattern": {
          layerSprite = new PIXI.Container();

          if (!layer?.props?.src) {
            return;
          }
          const { rowGap = 1, columnGap = 1, scale = 1 } = layer?.props || {};

          const patternSpriteOrigin = PIXI.Sprite.from(props.src, {
            scaleMode: 0,
          });
          patternSpriteOrigin.scale = {
            x: patternSpriteOrigin.scale.x * scale,
            y: patternSpriteOrigin.scale.y * scale,
          };

          const lineHeight = (1 + rowGap) * patternSpriteOrigin.height;
          const colWidth = (1 + columnGap) * patternSpriteOrigin.width;
          // console.log('sprite', patternSpriteOrigin, colWidth, lineHeight)

          for (let y = 0; y < height; y += lineHeight) {
            for (let x = 0; x < width; x += colWidth) {
              const patternSprite = PIXI.Sprite.from(props.src, {
                scaleMode: 0,
              });
              // patternSprite.position.set(x + ((y / lineHeight) % 2), y);
              layerSprite.addChild(patternSprite);
              patternSprite.height = patternSpriteOrigin.height;
              patternSprite.width = patternSpriteOrigin.width;
              patternSprite.scale = {
                x: patternSpriteOrigin.scale.x * scale,
                y: patternSpriteOrigin.scale.y * scale,
              };

              patternSprite.position.set(x, y);
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

      const extraScale = scale || 1;

      layerSprite.scale = {
        x: layerSprite.scale.x * extraScale,
        y: layerSprite.scale.y * extraScale,
      };

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
