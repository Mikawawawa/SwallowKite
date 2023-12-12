// BabylonScene.js
import { Drawer } from "@/service/Drawer";

import "babylonjs-loaders";
import * as BABYLON from "babylonjs";
import * as Materials from "babylonjs-materials";
import { throttle } from "lodash";

export class MainScene {
  public engine: BABYLON.Engine;
  public canvas: HTMLCanvasElement;
  public scene: BABYLON.Scene;
  public camera: BABYLON.Camera;

  private light: BABYLON.Light;

  private texture: BABYLON.DynamicTexture | undefined;

  constructor(containerId: string) {
    this.canvas = document.getElementById(containerId) as HTMLCanvasElement;
    this.engine = new BABYLON.Engine(this.canvas, true, {}, false);

    this.scene = new BABYLON.Scene(this.engine);
    this.camera = this.initCamera();
    this.light = this.initLight();

    // this.engine.hideLoadingUI(); // 隐藏加载界面

    this.setSkyBox();
    // this.scene.debugLayer.show({ embedMode: false, handleResize: false });

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

  initLight() {
    const light = new BABYLON.PointLight(
      "light",
      new BABYLON.Vector3(3, -14, 10),
      this.scene
    );
    const light2 = new BABYLON.PointLight(
      "light2",
      new BABYLON.Vector3(-3, -20, -10),
      this.scene
    );

    const light3 = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1, 0),
      this.scene
    );

    light.intensity = 3; // 可根据需求调整
    light.diffuse = new BABYLON.Color3(1, 1, 1); // 修改光照颜色为白色

    light.shadowMinZ = 0.1;
    light.shadowMaxZ = 1200;

    let i = 1;
    this.scene.registerBeforeRender(() => {
      // pimon.morphTargetManager.getTarget(0).influence =
      //   Math.sin(i * 5) * 0.5 + 0.5; //wink L
      // pimon.morphTargetManager.getTarget(1).influence =
      //   Math.sin(i * 5) * 0.5 + 0.5; //wink R
      light2.position.x = Math.cos(i) * 40;
      light2.position.z = Math.sin(i) * 40;
      i += 0.01;
    });

    const areaLight = BABYLON.CubeTexture.CreateFromPrefilteredData(
      "/singleSourceAreaLight.env",
      this.scene
    );
    areaLight.name = "areaLight";
    areaLight.gammaSpace = true;

    this.scene.environmentIntensity = 2;
    this.scene.environmentTexture = areaLight;
    // // @ts-ignore
    // this.scene.environmentTexture.setReflectionTextureMatrix(
    //   BABYLON.Matrix.RotationY(BABYLON.Tools.ToRadians(190))
    // );

    return light;
  }

  initCamera() {
    // const camera = new BABYLON.UniversalCamera(
    //   "UniversalCamera",
    //   new BABYLON.Vector3(0, 1, -2),
    //   this.scene
    // );

    // camera.speed = 0.1; // 控制相机移动速度
    // camera.angularSensibility = 4000; // 控制相机旋转灵敏度

    // // 将相机附加到画布
    // camera.attachControl(this.canvas, true);

    // camera.keysUp.push(87); // W键
    // camera.keysDown.push(83); // S键
    // camera.keysLeft.push(65); // A键
    // camera.keysRight.push(68); // D键

    // camera.minZ = 0.01; // 最小缩放距离
    // // @ts-ignore
    // camera.lowerRadiusLimit = 0.05; // 缩放限制的最小值
    // // @ts-ignore
    // camera.upperRadiusLimit = 10; // 缩放限制的最大值

    // return camera;

    const camera = new BABYLON.ArcRotateCamera(
      "Camera",
      0,
      0,
      0,
      // new BABYLON.Vector3(10, 5, 10),
      new BABYLON.Vector3(0, 10, 0),
      this.scene
    );

    camera.setPosition(new BABYLON.Vector3(-50, 20, -50));
    camera.fov = 0.25;
    camera.attachControl(this.canvas, true);
    camera.wheelPrecision = 20;
    camera.minZ = 0.1;
    camera.lowerRadiusLimit = 0;

    // const camera = new BABYLON.ArcRotateCamera(
    //   "Camera",
    //   0,
    //   0,
    //   1,
    //   new BABYLON.Vector3(0, 1, 0),
    //   this.scene
    // );

    // camera.setPosition(new BABYLON.Vector3(0, 0, 10));
    // // camera.fov = 0.25;
    // camera.fov = 1;
    // camera.attachControl(this.canvas, true);
    // camera.wheelPrecision = 20;
    // camera.minZ = 0.001;

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

    // Load assets
    // promises.push(
    //   BABYLON.SceneLoader.AppendAsync(
    //     // "https://patrickryanms.github.io/BabylonJStextures/Demos/sheen/SheenCloth.gltf"
    //     "/SheenCloth.gltf"
    //   )
    // );

    const ground = BABYLON.Mesh.CreateGroundFromHeightMap(
      "ground",
      "heightMap.png",
      100,
      100,
      100,
      0,
      10,
      scene,
      false
    );
    const groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture(
      "/img/background.jpg",
      scene
    );
    // @ts-ignore
    groundMaterial.diffuseTexture.uScale = 6;
    // @ts-ignore
    groundMaterial.diffuseTexture.vScale = 6;
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    ground.position.y = -2.05;
    ground.material = groundMaterial;

    promises.push(
      BABYLON.SceneLoader.AppendAsync(
        // "https://patrickryanms.github.io/BabylonJStextures/Demos/sheen/SheenCloth.gltf"
        "/qipao.gltf"
        // "pimon.glb"
      )
    );

    // Callback when assets are loaded
    return Promise.all(promises).then(() => {
      const root = scene.getMeshByName("__root__");
      if (!root) {
        return;
      }

      root.position = new BABYLON.Vector3(0, -2, 0);
      root.scaling = new BABYLON.Vector3(10, 10, 10);

      // var pimon = scene.getMeshByName("pimon");
      // var pimonOutline = scene.getMeshByName("outline");

      // var pimonWink_L = pimon.morphTargetManager.getTarget(0);
      // var pimonWink_R = pimon.morphTargetManager.getTarget(1);

      // var powl = pimonOutline.morphTargetManager.getTarget(0);
      // var powr = pimonOutline.morphTargetManager.getTarget(1);

      // var animation1 = new BABYLON.Animation(
      //   "pimonWink_L",
      //   "influence",
      //   60,
      //   BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      //   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
      // );

      // // Animation keys
      // var keys = [];

      // keys.push({
      //   frame: 0,
      //   value: 0,
      // });

      // keys.push({
      //   frame: 20,
      //   value: 1,
      // });

      // keys.push({
      //   frame: 60,
      //   value: 0,
      // });

      // keys.push({
      //   frame: 150,
      //   value: 0,
      // });

      // animation1.setKeys(keys);

      // var animation2 = new BABYLON.Animation(
      //   "pimonWink_R",
      //   "influence",
      //   60,
      //   BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      //   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
      // );

      // keys = [];

      // keys.push({
      //   frame: 0,
      //   value: 0,
      // });

      // keys.push({
      //   frame: 20,
      //   value: 1,
      // });

      // keys.push({
      //   frame: 60,
      //   value: 0,
      // });

      // keys.push({
      //   frame: 150,
      //   value: 0,
      // });

      // animation2.setKeys(keys);

      // var animationGroup = new BABYLON.AnimationGroup("my group");

      // animationGroup.addTargetedAnimation(animation1, pimonWink_L);
      // animationGroup.addTargetedAnimation(animation2, pimonWink_R);

      // animationGroup.addTargetedAnimation(animation1, powl);
      // animationGroup.addTargetedAnimation(animation2, powr);

      // animationGroup.play(true);

      // BABYLON.NodeMaterial.ParseFromSnippetAsync("#4AWEWY#82", scene).then(
      //   (pimonMat) => {
      //     // @ts-expect-error unknown
      //     console.log("pimonMat", pimonMat);

      //     pimonMat.getInputBlockByPredicate(
      //       (b) => b.name === "diffuseCut"
      //     ).value = 0.21;
      //     pimonMat.getInputBlockByPredicate(
      //       (b) => b.name === "shadowItensity"
      //     ).value = 0.87;
      //     pimonMat.getInputBlockByPredicate(
      //       (b) => b.name === "rimIntensity"
      //     ).value = 0.08;

      //     // if (this.texture) {
      //     //   pimonMat.albedoTexture = this.texture; // 也可能叫diffuseTexture
      //     //   pimonMat.diffuseTexture = this.texture; // 也可能叫diffuseTexture
      //     // }

      //     // node.getInputBlockByPredicate((b) => b.name === "Texture").value = pimon.material.albedoTexture
      //     scene.meshes.forEach((m) => {
      //       if (
      //         m.name.indexOf("pimon") !== 1 &&
      //         m.name.indexOf("outline") !== 0
      //       ) {
      //         m.material = pimonMat;
      //       }
      //     });
      //   }
      // );

      // var gl = new BABYLON.GlowLayer("gl", scene, {
      //   mainTextureFixedSize: 1024, //????
      //   blurKernelSize: 64, //????
      // });
      // gl.intensity = 1.5;

      //gl.addExcludedMesh(pep)

      // var hl = new BABYLON.HighlightLayer("hl", scene, {
      //   mainTextureFixedSize: 2048,
      //   blurHorizontalSize: 30,
      //   blurVerticalSize: 30,
      //   isStroke: true,
      //   alphaBlendingMode: 2,
      // });
      // hl.addMesh(pimon, new BABYLON.Color3(1, 0, 0));

      // hl.innerGlow = false;
      // hl.renderingGroupId = 2;
    });
  }

  getNextMaterial(src: string) {
    const texture = new BABYLON.Texture(src, this.scene); // drawer.exportTexture()是dataURL格式的图片数据
    texture.vScale = -1;
    texture.uScale = -1;

    const normalMapTexture = new BABYLON.Texture(
      "/technicalFabricSmall_normal_256.png",
      this.scene
    );

    const mat0 = new BABYLON.PBRMaterial("mat0", this.scene);

    mat0.ambientTexture = texture;
    mat0.ambientTextureStrength = 1.3;
    mat0.sheen.isEnabled = true;
    mat0.sheen.roughness = 0.3;
    mat0.sheen.texture = texture;

    mat0.directIntensity = 0.3; // 根据需要调整值
    mat0.environmentIntensity = 1.0; // 根据需要调整值

    mat0.bumpTexture = normalMapTexture;
    // 调整法线贴图的强度
    mat0.bumpTexture.level = 0.3; // 根据需要调整值

    mat0.metallic = 0.0;
    mat0.roughness = 1;

    mat0.backFaceCulling = true;
    return mat0;
  }

  updateMaterial = throttle(
    (name: string, src: string) => {
      const model = this.scene.getMeshByName(name); // 替换为你的模型名称
      if (!model || !src) {
        return;
      }

      const nextMaterial = this.getNextMaterial(src);
      // 获取纹理对象

      // 模型还没有材质，直接赋值 nextMaterial
      model.material = nextMaterial;
    },
    200,
    {
      trailing: true,
    }
  );

  setSkyBox() {
    const scene = this.scene;
    // Sky material
    const skyboxMaterial = new Materials.SkyMaterial("skyMaterial", scene);
    skyboxMaterial.backFaceCulling = false;
    //skyboxMaterial._cachedDefines.FOG = true;

    // Sky mesh (box)
    const skybox = BABYLON.Mesh.CreateBox("skyBox", 2000.0, scene);
    skybox.material = skyboxMaterial;

    /*
     * Keys:
     * - 1: Day
     * - 2: Evening
     * - 3: Increase Luminance
     * - 4: Decrease Luminance
     * - 5: Increase Turbidity
     * - 6: Decrease Turbidity
     * - 7: Move horizon to -50
     * - 8: Restore horizon to 0
     */
    const setSkyConfig = function (property: string, from: number, to: number) {
      var keys = [
        { frame: 0, value: from },
        { frame: 100, value: to },
      ];

      const animation = new BABYLON.Animation(
        "animation",
        property,
        100,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
      );
      animation.setKeys(keys);

      scene.stopAnimation(skybox);
      scene.beginDirectAnimation(skybox, [animation], 0, 100, false, 1);
    };

    const setDay = () => {
      // setSkyConfig("material.inclination", skyboxMaterial.inclination, 0); // 1
      setSkyConfig("material.inclination", skyboxMaterial.inclination, -0.5); // 2

      setSkyConfig("material.luminance", skyboxMaterial.luminance, 0.1); // 3
      // setSkyConfig("material.luminance", skyboxMaterial.luminance, 1.0); // 4

      setSkyConfig("material.turbidity", skyboxMaterial.turbidity, 40); // 5
      // setSkyConfig("material.turbidity", skyboxMaterial.turbidity, 5); // 6

      // setSkyConfig(
      //   "material.cameraOffset.y",
      //   skyboxMaterial.cameraOffset.y,
      //   50
      // ); // 7
      // setSkyConfig("material.cameraOffset.y", skyboxMaterial.cameraOffset.y, 50);  // 8
    };

    // Set to Day
    setSkyConfig("material.inclination", skyboxMaterial.inclination, 0);
    // setDay()
  }
}
