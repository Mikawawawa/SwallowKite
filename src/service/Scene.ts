// @ts-nocheck
import "babylonjs-loaders";
import * as BABYLON from "babylonjs";
import * as Materials from "babylonjs-materials";
import { throttle } from "lodash";

export class MainScene {
  public engine: BABYLON.Engine;
  public canvas: HTMLCanvasElement;
  public scene: BABYLON.Scene;
  public camera: BABYLON.Camera;

  private material: BABYLON.PBRMaterial | undefined;

  private env: Record<string, any> = {};

  private lights: Record<string, any> = {};
  public model: string;

  constructor(containerId: string) {
    this.canvas = document.getElementById(containerId) as HTMLCanvasElement;
    this.engine = new BABYLON.Engine(this.canvas, true, {}, false);

    this.engine.hideLoadingUI();

    this.scene = new BABYLON.Scene(this.engine);
    this.camera = this.initCamera();
    this.initLight();
    this.initBackground();
    this.engine.hideLoadingUI();

    // this.setSkyBox();
    this.scene.debugLayer.show({ embedMode: false, handleResize: false });

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
    const scene = this.scene;

    const env = this.env;
    env.lighting = BABYLON.CubeTexture.CreateFromPrefilteredData(
      "https://patrickryanms.github.io/BabylonJStextures/Demos/sodaBottle/assets/env/hamburg_hbf.env",
      scene
    );
    env.lighting.name = "hamburg_hbf";
    env.lighting.gammaSpace = false;
    env.lighting.rotationY = BABYLON.Tools.ToRadians(0);
    scene.environmentTexture = env.lighting;

    env.skybox = BABYLON.MeshBuilder.CreateBox(
      "skyBox",
      { size: 1000.0 },
      scene
    );
    env.skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    env.skyboxMaterial.backFaceCulling = false;
    env.skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
      "https://patrickryanms.github.io/BabylonJStextures/Demos/sodaBottle/assets/skybox/hamburg",
      scene
    );
    env.skyboxMaterial.reflectionTexture.coordinatesMode =
      BABYLON.Texture.SKYBOX_MODE;
    env.skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    env.skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    env.skybox.material = env.skyboxMaterial;

    // const lights = this.lights;
    // lights.dirLight = new BABYLON.DirectionalLight(
    //   "dirLight",
    //   new BABYLON.Vector3(0.6, -0.7, 0.63),
    //   scene
    // );
    // lights.dirLight.position = new BABYLON.Vector3(-0.05, 0.35, -0.05);
    // lights.dirLight.shadowMaxZ = 0.45;
    // lights.dirLight.intensity = 1;
  }

  initCamera() {
    const camera = new BABYLON.ArcRotateCamera(
      "camera",
      BABYLON.Tools.ToRadians(40),
      BABYLON.Tools.ToRadians(80),
      0.5,
      new BABYLON.Vector3(0.0, 0.1, 0.0),
      this.scene
    );
    camera.minZ = 0.01;
    camera.wheelDeltaPercentage = 0.01;
    camera.upperRadiusLimit = 0.5;
    camera.lowerRadiusLimit = 0.25;
    camera.upperBetaLimit = 1.575;
    camera.lowerBetaLimit = 0;
    camera.panningAxis = new BABYLON.Vector3(0, 0, 0);
    camera.attachControl(this.canvas, true);

    return camera;
  }

  async initBackground() {
    const bottle: Record<string, any> = {};
    const table: Record<string, any> = {};
    const lights = this.lights;

    const scene = this.scene;
    async function loadMeshes() {
      table.file = await BABYLON.SceneLoader.AppendAsync(
        "https://patrickryanms.github.io/BabylonJStextures/Demos/sodaBottle/assets/gltf/table.gltf"
      );
      table.mesh = scene.getMeshByName("table_low");
      lights.dirLight.includedOnlyMeshes.push(table.mesh);
    }

    let loadTexturesAsync = async function () {
      let textures: BABYLON.Texture[] = [];
      return new Promise((resolve, reject) => {
        let textureUrls = [
          "https://patrickryanms.github.io/BabylonJStextures/Demos/sodaBottle/assets/gltf/sodaBottleMat_thickness.png",
          "https://patrickryanms.github.io/BabylonJStextures/Demos/sodaBottle/assets/gltf/sodaMat_thickness.png",
          "https://patrickryanms.github.io/BabylonJStextures/Demos/sodaBottle/assets/gltf/sodaBottleMat_translucency.png",
        ];

        for (let url of textureUrls) {
          textures.push(new BABYLON.Texture(url, scene, false, false));
        }

        whenAllReady(textures, () => resolve(textures));
      }).then(() => {
        assignTextures(textures);
      });
    };

    // test if a texture is loaded
    let whenAllReady = function (
      textures: BABYLON.Texture[],
      resolve: Function
    ) {
      let numRemaining = textures.length;
      if (numRemaining == 0) {
        resolve();
        return;
      }

      for (let i = 0; i < textures.length; i++) {
        let texture = textures[i];
        if (texture.isReady()) {
          if (--numRemaining === 0) {
            resolve();
            return;
          }
        } else {
          let onLoadObservable = texture.onLoadObservable;
          if (onLoadObservable) {
            onLoadObservable.addOnce(() => {
              if (--numRemaining === 0) {
                resolve();
              }
            });
          }
        }
      }
    };

    let retrieveTexture = function (
      meshMat: string,
      channel: string,
      textures: BABYLON.Texture[]
    ) {
      let texture;
      for (let file of textures) {
        let segment = file.name.split("/");
        if (segment[segment.length - 1].split("_")[0] === meshMat) {
          if (segment[segment.length - 1].split("_")[1] === channel + ".png") {
            texture = file;
            return texture;
          }
        }
      }
    };

    const sodaMats: Record<string, any> = {};
    const bottleTex: Record<string, any> = {};
    const liquidTex: Record<string, any> = {};
    function assignTextures(textures: BABYLON.Texture[]) {
      bottleTex.baseColor = bottle.glass.material.albedoTexture;
      bottleTex.orm = bottle.glass.material.metallicTexture;
      bottleTex.normal = bottle.glass.material.bumpTexture;
      bottleTex.thickness = retrieveTexture(
        "sodaBottleMat",
        "thickness",
        textures
      );
      bottleTex.translucency = retrieveTexture(
        "sodaBottleMat",
        "translucency",
        textures
      );
      liquidTex.baseColor = bottle.liquid.material.albedoTexture;
      liquidTex.orm = bottle.liquid.material.metallicTexture;
      liquidTex.normal = bottle.liquid.material.bumpTexture;
      liquidTex.thickness = retrieveTexture("sodaMat", "thickness", textures);

      bottle.glass.material.dispose();
      bottle.liquid.material.dispose();
    }

    BABYLON.NodeMaterial.IgnoreTexturesAtLoadTime = true;
    const bottleParameters: Record<string, any> = {};
    const liquidParameters: Record<string, any> = {};
    async function createMaterials() {
      sodaMats.bottle = new BABYLON.NodeMaterial("sodaBottleMat", scene, {
        emitComments: false,
      });
      await sodaMats.bottle.loadAsync(
        "https://patrickryanms.github.io/BabylonJStextures/Demos/sodaBottle/assets/shaders/glassShader.json"
      );
      sodaMats.bottle.build(false);

      sodaMats.liquid = new BABYLON.NodeMaterial("sodaMat", scene, {
        emitComments: false,
      });
      await sodaMats.liquid.loadAsync(
        "https://patrickryanms.github.io/BabylonJStextures/Demos/sodaBottle/assets/shaders/sodaShader.json"
      );
      sodaMats.liquid.build(false);

      sodaMats.glassLabels = sodaMats.bottle.clone("glassLabelsMat");

      // get shader parameters
      bottleParameters.baseColor =
        sodaMats.bottle.getBlockByName("baseColorTex");
      bottleParameters.orm = sodaMats.bottle.getBlockByName("orm");
      bottleParameters.normal = sodaMats.bottle.getBlockByName("normalTex");
      bottleParameters.thickness =
        sodaMats.bottle.getBlockByName("thicknessTex");
      bottleParameters.maxThickness =
        sodaMats.bottle.getBlockByName("maxThickness");
      bottleParameters.glassTint = sodaMats.bottle.getBlockByName("glassTint");
      bottleParameters.fresnelColor =
        sodaMats.bottle.getBlockByName("fresnelColor");
      bottleParameters.translucency =
        sodaMats.bottle.getBlockByName("refractionInt");
      bottleParameters.glassAlphaSwitch =
        sodaMats.bottle.getBlockByName("alphaSwitch");
      bottleParameters.pbr = sodaMats.bottle.getBlockByName(
        "PBRMetallicRoughness"
      );

      bottleParameters.labelBaseColor =
        sodaMats.glassLabels.getBlockByName("baseColorTex");
      bottleParameters.labelOrm = sodaMats.glassLabels.getBlockByName("orm");
      bottleParameters.labelNormal =
        sodaMats.glassLabels.getBlockByName("normalTex");
      bottleParameters.labelThickness =
        sodaMats.glassLabels.getBlockByName("thicknessTex");
      bottleParameters.labelMaxThickness =
        sodaMats.glassLabels.getBlockByName("maxThickness");
      bottleParameters.labelGlassTint =
        sodaMats.glassLabels.getBlockByName("glassTint");
      bottleParameters.labelFresnelColor =
        sodaMats.glassLabels.getBlockByName("fresnelColor");
      bottleParameters.labelTranslucency =
        sodaMats.glassLabels.getBlockByName("refractionInt");
      bottleParameters.labelGlassAlphaSwitch =
        sodaMats.glassLabels.getBlockByName("alphaSwitch");
      bottleParameters.labelPbr = sodaMats.glassLabels.getBlockByName(
        "PBRMetallicRoughness"
      );

      liquidParameters.maxThickness =
        sodaMats.liquid.getBlockByName("maxThickness");

      // set up glass rendering parameters
      sodaMats.bottle.getAlphaTestTexture = () => bottleTex.baseColor;
      sodaMats.liquid.getAlphaTestTexture = () => liquidTex.baseColor;
      sodaMats.bottle.needDepthPrePass = true;
      sodaMats.bottle.backFaceCulling = false;
      sodaMats.glassLabels.forceDepthWrite = true;

      // assign textures and baseline shader parameters
      bottle.glass.material = sodaMats.bottle;
      bottle.glassLabels.material = sodaMats.glassLabels;
      bottleParameters.baseColor.texture =
        bottleParameters.labelBaseColor.texture = bottleTex.baseColor;
      bottleParameters.orm.texture = bottleParameters.labelOrm.texture =
        bottleTex.orm;
      bottleParameters.normal.texture = bottleParameters.labelNormal.texture =
        bottleTex.normal;
      bottleParameters.thickness.texture =
        bottleParameters.labelThickness.texture = bottleTex.thickness;
      bottleParameters.translucency.texture =
        bottleParameters.labelTranslucency.texture = bottleTex.translucency;
      bottleParameters.pbr.alphaTestCutoff = 0.0;
      bottleParameters.labelPbr.alphaTestCutoff = 0.999;
      bottleParameters.glassAlphaSwitch.value = 0.0;
      bottleParameters.labelGlassAlphaSwitch.value = 1.0;
      bottleParameters.maxThickness.value =
        bottleParameters.labelMaxThickness.value = 5.0;
      bottleParameters.glassTint.value = bottleParameters.labelGlassTint.value =
        BABYLON.Color3.FromHexString("#aaaaaa");

      // set up baseline shader parameters for liquid material
      bottle.liquid.material = sodaMats.liquid;
      liquidParameters.maxThickness.value = 1.5;
    }

    const shadows: Record<string, any> = {};
    function generateShadows() {
      shadows.shadowGenerator = new BABYLON.ShadowGenerator(
        1024,
        lights.dirLight
      );
      shadows.shadowGenerator.useBlurExponentialShadowMap = true;
      shadows.shadowGenerator.blurBoxOffset = 2;
      shadows.shadowGenerator.depthScale = 0;

      // shadows.shadowGenerator.addShadowCaster(bottle.glass);
      // shadows.shadowGenerator.addShadowCaster(bottle.liquid);

      shadows.shadowGenerator.enableSoftTransparentShadow = true;
      shadows.shadowGenerator.transparencyShadow = true;

      table.mesh.receiveShadows = true;
      table.mesh.material.environmentIntensity = 0.2;
    }

    await loadMeshes();
    // await loadTexturesAsync();
    // await createMaterials();
    // generateShadows();
  }

  async initScene(name: string) {
    await this.loadModel(name);
  }

  async loadModel(name: string) {
    const scene = this.scene;
    this.model = name;

    this.engine.hideLoadingUI();

    // await BABYLON.SceneLoader.AppendAsync("/qipao.glb");
    await BABYLON.SceneLoader.AppendAsync(`/${name}.glb`);

    // const root = scene.getMeshByName("qipao_main")?.parent;
    const root = scene.getMeshByName("program_main")?.parent;
    if (!root) {
      return;
    }

    root.position = new BABYLON.Vector3(0, 0.05, -0.03);
    root.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
    root.rotation = new BABYLON.Vector3(0.0, -6.0, 0.0);
  }

  async updateModel(name: string) {
    const root = this.scene.getMeshByName("program_main")?.parent;
    if (root) {
      await root.dispose();
      await this.scene.removeMesh(root);
    }

    await this.loadModel(name);

    const model = this.scene.getMeshByName("program_main"); // 替换为你的模型名称
    if (!model || !this.material) {
      return;
    }

    // 获取纹理对象

    // 模型还没有材质，直接赋值 nextMaterial
    // model.material = this.material;
  }

  getNextMaterial(src: string) {
    const texture = new BABYLON.Texture(src, this.scene); // drawer.exportTexture()是dataURL格式的图片数据
    if (this.model === "tshirt") {
      texture.vScale = -0.0001;
      texture.uScale = -0.0001;
    } else {
      texture.vScale = -1;
      texture.uScale = -1;
    }

    const mat0 = new BABYLON.PBRMaterial("mat0", this.scene);

    mat0.ambientTexture = texture;
    mat0.ambientTextureStrength = 1.3;
    mat0.sheen.isEnabled = true;
    mat0.sheen.roughness = 0.3;
    mat0.sheen.texture = texture;

    mat0.directIntensity = 0.3; // 根据需要调整值
    mat0.environmentIntensity = 1.0; // 根据需要调整值

    // mat0.bumpTexture = normalMapTexture;
    // 调整法线贴图的强度
    // mat0.bumpTexture.level = 0.3; // 根据需要调整值

    mat0.metallic = 0.0;
    mat0.roughness = 0.8;

    mat0.backFaceCulling = false;

    this.material = mat0;

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
