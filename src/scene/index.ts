// BabylonScene.js
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";

export class MainScene {
  public engine: BABYLON.Engine;
  public canvas: HTMLCanvasElement;
  public scene: BABYLON.Scene;
  public camera: BABYLON.Camera;
  constructor(containerId: string) {
    this.canvas = document.getElementById(containerId) as HTMLCanvasElement;
    this.engine = new BABYLON.Engine(this.canvas, true);

    this.scene = new BABYLON.Scene(this.engine);
    this.camera = this.initCamera();

    window.addEventListener("resize", () => {
      this.engine.resize();
    });
  }

  render() {
    const scene = this.scene;
    this.initScene();
    // var sphere = BABYLON.MeshBuilder.CreateSphere(
    //   "sphere",
    //   { diameter: 2, segments: 32 },
    //   scene
    // );

    // Move the sphere upward 1/2 its height
    // sphere.position.y = 1;
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
    Promise.all(promises).then(function () {
      const root = scene.getMeshByName("__root__");
      if (!root) {
        return;
      }
      root.scaling = new BABYLON.Vector3(20, 20, 20);
    });
  }
}
