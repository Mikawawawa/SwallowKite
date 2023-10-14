// BabylonScene.js
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";

export class MainScene {
  public engine: BABYLON.Engine;
  public canvas: HTMLCanvasElement;
  public scene: BABYLON.Scene;
  public camera: BABYLON.Camera;

  public originalMaterial: BABYLON.DynamicTexture | undefined;

  constructor(containerId: string) {
    this.canvas = document.getElementById(containerId) as HTMLCanvasElement;
    this.engine = new BABYLON.Engine(this.canvas, true);

    this.scene = new BABYLON.Scene(this.engine);
    this.camera = this.initCamera();

    window.addEventListener("resize", () => {
      this.engine.resize();
    });
  }

  async renderLoop() {
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  initCamera() {
    const camera = new BABYLON.ArcRotateCamera(
      "ArcRotateCamera",
      BABYLON.Tools.ToRadians(205),
      BABYLON.Tools.ToRadians(78),
      1.6,
      new BABYLON.Vector3(0, 0.3, 0),
      this.scene
    );
    camera.minZ = 0.1;
    // This attaches the camera to the canvas
    camera.attachControl(this.canvas, true);
    camera.lowerRadiusLimit = 0.05;
    camera.upperRadiusLimit = 10;
    camera.wheelDeltaPercentage = 0.01;
    camera.minZ = 0.01;

    return camera;
  }

  initScene() {
    const scene = this.scene;
    var promises = [];

    scene.clearColor = BABYLON.Color4.FromInts(180, 180, 180, 255);

    // environment light
    var areaLight = BABYLON.CubeTexture.CreateFromPrefilteredData(
      "/singleSourceAreaLight.env",
      scene
    );
    areaLight.name = "areaLight";
    areaLight.gammaSpace = false;
    scene.environmentTexture = areaLight;
    // @ts-ignore
    scene.environmentTexture.setReflectionTextureMatrix(
      BABYLON.Matrix.RotationY(BABYLON.Tools.ToRadians(190))
    );

    // Load assets
    promises.push(
      BABYLON.SceneLoader.AppendAsync(
        // "https://patrickryanms.github.io/BabylonJStextures/Demos/sheen/SheenCloth.gltf"
        "/SheenCloth.gltf"
      )
    );

    // Callback when assets are loaded
    return Promise.all(promises).then(() => {
      const root = scene.getMeshByName("__root__");
      if (!root) {
        return;
      }

      root.scaling = new BABYLON.Vector3(20, 20, 20);

      this.scene.render();
    });
  }

  getNextMaterial() {
    if (!this.originalMaterial) {
      const textureSize = 256; // 贴图大小
      // const color = new BABYLON.Color3(1, 1, 0.92); // 米白色
      const dynamicTexture = new BABYLON.DynamicTexture(
        "dynamicTexture",
        textureSize,
        this.scene,
        false
      );

      dynamicTexture.drawText(
        "Hello, World!",
        null,
        null,
        "40px Arial",
        `white`,
        `rgba(255,255,238.0.5)`,
        true
      );

      return dynamicTexture;
    } else {
      console.log("originalMaterial", this.originalMaterial);
      return this.originalMaterial;
    }
  }

  updateMaterial() {
    const model = this.scene.getMeshByName("SheenCloth_mesh"); // 替换为你的模型名称

    if (!model) {
      return;
    }
    // 找到材质
    const material = model.material; // 假设你要更新材质的纹理

    if (!material) {
      return;
    }

    console.log(model.material);
    // 获取纹理对象

    const nextTexture = this.getNextMaterial();
    // @ts-expect-error unknown
    this.originalMaterial = material.albedoTexture;
    // 将新的基本颜色贴图分配给材质
    // @ts-expect-error unknown
    material.albedoTexture = nextTexture; // 也可能叫diffuseTexture
  }
}
