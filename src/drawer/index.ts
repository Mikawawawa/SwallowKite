import * as PIXI from "pixi.js";

export class Drawer {
  public canvas: HTMLDivElement;
  private app: PIXI.Application;

  constructor(containerId: string) {
    this.canvas = document.getElementById(containerId) as HTMLDivElement;

    const app = new PIXI.Application({
      resizeTo: this.canvas,
      backgroundColor: 0x00000000,
      preserveDrawingBuffer: true
    });

    window.addEventListener("resize", () => {
      app.resize();
    });

    // @ts-ignore
    this.canvas.appendChild(app.view);

    // Move container to the center
    // container.x = app.screen.width / 2;
    // container.y = app.screen.height / 2;

    // Center bunny sprite in local container coordinates
    // container.pivot.x = container.width / 2;
    // container.pivot.y = container.height / 2;

    // Inner radius of the circle
    const radius = 200;

    // The blur amount
    const blurSize = 32;

    PIXI.Assets.load("https://pixijs.com/assets/bg_grass.jpg").then(
      (grassTexture) => {
        const background = new PIXI.Sprite(grassTexture);

        const container = new PIXI.Container();

        container.width = app.screen.width;
        container.height = app.screen.height;

        app.stage.addChild(container);

        // Create a new texture

        container.addChild(background);

        background.width = app.screen.width;
        background.height = app.screen.height;

        const circle = new PIXI.Graphics()
          .beginFill(0xff0000)
          .drawCircle(radius + blurSize, radius + blurSize, radius)
          .endFill();

        circle.filters = [new PIXI.filters.BlurFilter(blurSize)];

        const bounds = new PIXI.Rectangle(
          0,
          0,
          (radius + blurSize) * 2,
          (radius + blurSize) * 2
        );
        const texture = app.renderer.generateTexture(
          circle,
          PIXI.SCALE_MODES.NEAREST,
          //   @ts-ignore
          1,
          bounds
        );
        const focus = new PIXI.Sprite(texture);

        const texture2 = PIXI.Texture.from("/kite.jpeg");

        // Create a 5x5 grid of bunnies
        for (let i = 0; i < 25; i++) {
          const bunny = new PIXI.Sprite(texture2);
          (bunny.width = 20), (bunny.height = 20);

          bunny.anchor.set(0.5);
          bunny.x = 100 + (i % 5) * 80;
          bunny.y = 100 + Math.floor(i / 5) * 80 + (i % 2) * 5;

          container.addChild(bunny);
        }

        // app.stage.addChild(focus);

        // container.mask = focus;

        app.stage.eventMode = "static";
        app.stage.hitArea = app.screen;
        // app.stage.on("pointermove", (event) => {
        //   focus.position.x = event.global.x - focus.width / 2;
        //   focus.position.y = event.global.y - focus.height / 2;
        // });
      }
    );

    this.app = app;

    // Listen for animate update
  }

  exportTexture() {
    // @ts-expect-error 123
    return this.canvas.querySelector("canvas").toDataURL?.("image/png");
  }
}
