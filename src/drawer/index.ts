import * as PIXI from "pixi.js";
import { TextureLayerForRender } from "./useLayerReducer";

export class Drawer {
  public canvas: HTMLDivElement;
  private app: PIXI.Application;
  private stage: PIXI.Container;

  layers: Array<TextureLayerForRender> = [];

  constructor(containerId: string) {
    this.canvas = document.getElementById(containerId) as HTMLDivElement;

    const app = new PIXI.Application({
      resizeTo: this.canvas,
      backgroundColor: 0x00000000,
      preserveDrawingBuffer: true,
      antialias: true,
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
    // @ts-expect-error
    return this.canvas.querySelector("canvas").toDataURL?.("image/png");
  }

  render() {
    this.layers.forEach((layer) => {
      const { type, props, opacity, offset, size, rotation, scale } = layer;

      let layerSprite: PIXI.Sprite | PIXI.Graphics | PIXI.Container;

      const width = size?.width || this.app.view.width;
      const height = size?.height || this.app.view.height;

      switch (type) {
        case "solid": {
          layerSprite = new PIXI.Graphics();
          (layerSprite as PIXI.Graphics).beginFill(
            parseInt(props.content.substring(1), 16)
          );
          (layerSprite as PIXI.Graphics).drawRect(0, 0, width, height);
          break;
        }
        case "image": {
          layerSprite = PIXI.Sprite.from(props.src);
          break;
        }
        case "pattern": {
          layerSprite = new PIXI.Container();

          const { rowGap, columnGap, scale } = layer?.props;

          for (let y = 0; y < height; y += rowGap) {
            for (let x = 0; x < width; x += columnGap) {
              const patternSprite = PIXI.Sprite.from(props.src);
              patternSprite.position.set(x + ((y / rowGap) % 2), y);
              patternSprite.scale.set(scale || 1);
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
      layerSprite.position.set(offset?.x || 0, offset?.y || 0);
      layerSprite.width = width;
      layerSprite.height = height;
      layerSprite.rotation = rotation || 0;

      if (scale) {
        layerSprite.scale = { x: scale, y: scale };
      }

      this.stage.addChild(layerSprite);
    });
  }

  animate = () => {
    this.stage.removeChildren();

    // 重新渲染图层
    this.render();

    // 渲染 PIXI 应用
    this.app.renderer.render(this.stage);
  };

  updateLayers = (layers: TextureLayerForRender[]) => {
    this.layers = layers;
  };
}

// PIXI.Assets.load("https://pixijs.com/assets/bg_grass.jpg").then(
//     (grassTexture) => {
//       const background = new PIXI.Sprite(grassTexture);

//       const container = new PIXI.Container();

//       container.width = app.screen.width;
//       container.height = app.screen.height;

//       app.stage.addChild(container);

//       // Create a new texture

//       container.addChild(background);

//       background.width = app.screen.width;
//       background.height = app.screen.height;

//       const circle = new PIXI.Graphics()
//         .beginFill(0xff0000)
//         .drawCircle(radius + blurSize, radius + blurSize, radius)
//         .endFill();

//       circle.filters = [new PIXI.filters.BlurFilter(blurSize)];

//       const bounds = new PIXI.Rectangle(
//         0,
//         0,
//         (radius + blurSize) * 2,
//         (radius + blurSize) * 2
//       );
//       const texture = app.renderer.generateTexture(
//         circle,
//         PIXI.SCALE_MODES.NEAREST,
//         //   @ts-ignore
//         1,
//         bounds
//       );
//       const focus = new PIXI.Sprite(texture);

//       const texture2 = PIXI.Texture.from("/kite.jpeg");

//       // Create a 5x5 grid of bunnies
//       for (let i = 0; i < 25; i++) {
//         const bunny = new PIXI.Sprite(texture2);
//         (bunny.width = 20), (bunny.height = 20);

//         bunny.anchor.set(0.5);
//         bunny.x = 100 + (i % 5) * 80;
//         bunny.y = 100 + Math.floor(i / 5) * 80 + (i % 2) * 5;

//         container.addChild(bunny);
//       }

//       // app.stage.addChild(focus);

//       // container.mask = focus;

//       app.stage.eventMode = "static";
//       app.stage.hitArea = app.screen;
//       // app.stage.on("pointermove", (event) => {
//       //   focus.position.x = event.global.x - focus.width / 2;
//       //   focus.position.y = event.global.y - focus.height / 2;
//       // });
//     }
//   );
