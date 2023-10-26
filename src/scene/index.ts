// BabylonScene.js
import { Drawer } from "@/drawer";
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

    this.engine.hideLoadingUI(); // 隐藏加载界面
    // this.scene.debugLayer.show({embedMode: true});

    window.addEventListener("resize", () => {
      this.engine.resize();
    });

    // const objResizeObserver = new ResizeObserver((e) => {
    //   console.log("resize", e);
    //   this.engine.resize();
    // });
    // 观察文本域元素
  }

  async renderLoop() {
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  initCamera() {
    const camera = new BABYLON.UniversalCamera(
      "UniversalCamera",
      new BABYLON.Vector3(0, 1, -2),
      this.scene
    );

    camera.speed = 0.1; // 控制相机移动速度
    camera.angularSensibility = 4000; // 控制相机旋转灵敏度

    // 将相机附加到画布
    camera.attachControl(this.canvas, true);

    camera.keysUp.push(87); // W键
    camera.keysDown.push(83); // S键
    camera.keysLeft.push(65); // A键
    camera.keysRight.push(68); // D键

    camera.minZ = 0.01; // 最小缩放距离
    // @ts-ignore
    camera.lowerRadiusLimit = 0.05; // 缩放限制的最小值
    // @ts-ignore
    camera.upperRadiusLimit = 10; // 缩放限制的最大值

    return camera;
  }

  // initCamera() {
  //   const camera = new BABYLON.ArcRotateCamera(
  //     "ArcRotateCamera",
  //     BABYLON.Tools.ToRadians(-90),
  //     BABYLON.Tools.ToRadians(90),
  //     1.6,
  //     new BABYLON.Vector3(0, 1, -1),
  //     this.scene
  //   );
  //   camera.minZ = 0.1;
  //   // This attaches the camera to the canvas
  //   camera.attachControl(this.canvas, true);
  //   camera.lowerRadiusLimit = 0.05;
  //   camera.upperRadiusLimit = 10;
  //   camera.wheelDeltaPercentage = 0.01;
  //   camera.minZ = 0.01;

  //   return camera;
  // }

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
    areaLight.gammaSpace = true;
    scene.environmentTexture = areaLight;
    // @ts-ignore
    scene.environmentTexture.setReflectionTextureMatrix(
      BABYLON.Matrix.RotationY(BABYLON.Tools.ToRadians(190))
    );

    // Load assets
    // promises.push(
    //   BABYLON.SceneLoader.AppendAsync(
    //     // "https://patrickryanms.github.io/BabylonJStextures/Demos/sheen/SheenCloth.gltf"
    //     "/SheenCloth.gltf"
    //   )
    // );

    promises.push(
      BABYLON.SceneLoader.AppendAsync(
        // "https://patrickryanms.github.io/BabylonJStextures/Demos/sheen/SheenCloth.gltf"
        "/qipao.gltf"
      )
    );

    // Callback when assets are loaded
    return Promise.all(promises).then(() => {
      const root = scene.getMeshByName("__root__");
      if (!root) {
        return;
      }

      root.scaling = new BABYLON.Vector3(1, 1, 1);

      this.scene.render();
    });
  }

  getNextMaterial() {
    if (!this.originalMaterial) {
      const textureSize = 256; // 贴图大小
      // @ts-expect-error
      const drawer = window.drawer as Drawer;

      const texture = new BABYLON.Texture(
        drawer.exportTexture() as string,
        this.scene
      ); // drawer.exportTexture()是dataURL格式的图片数据

      return texture;
      // const color = new BABYLON.Color3(1, 1, 0.92); // 米白色

      // const dynamicTexture = new BABYLON.DynamicTexture(
      //   "dynamicTexture",
      //   textureSize,
      //   this.scene,
      //   false
      // );

      // dynamicTexture.drawText(
      //   "Hello, World!",
      //   null,
      //   null,
      //   "40px Arial",
      //   `white`,
      //   `rgba(255,255,238.0.5)`,
      //   true
      // );

      // return dynamicTexture;
    } else {
      console.log("originalMaterial", this.originalMaterial);
      return this.originalMaterial;
    }
  }

  updateMaterial() {
    const model = this.scene.getMeshByName("main"); // 替换为你的模型名称
    console.log("model", model);

    if (!model) {
      return;
    }

    // 找到材质
    const material = model.material; // 假设你要更新材质的纹理

    if (!material) {
      return;
    }

    // 获取纹理对象
    const nextTexture = this.getNextMaterial();
    console.log("nextTexture", nextTexture);
    // @ts-expect-error unknown
    this.originalMaterial = material.albedoTexture;
    // 将新的基本颜色贴图分配给材质
    // @ts-expect-error unknown
    material.albedoTexture = nextTexture; // 也可能叫diffuseTexture
  }
}
