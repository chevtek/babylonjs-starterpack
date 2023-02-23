import { useCallback, useEffect } from "react";
import {
  ActionManager,
  ArcRotateCamera,
  AxesViewer,
  Color3,
  Engine,
  ExecuteCodeAction,
  HemisphericLight,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3
} from "@babylonjs/core";
import store from "./store";
import { changeColor } from "./store/slices/appSlice";

function BabylonWorkspace() {

  const canvasRef = useCallback((canvas: HTMLCanvasElement) => {
    if (!canvas) return;

    const initialState = store.getState();
    const engine = new Engine(canvas);
    const scene = new Scene(engine);
    new AxesViewer(scene);
    const mainCamera = new ArcRotateCamera("mainCamera", 0, Math.PI / 3, 10, Vector3.Zero(), scene);
    const hudCamera = new ArcRotateCamera("hudCamera", 0, Math.PI / 3, 10, Vector3.Zero(), scene);
    mainCamera.onViewMatrixChangedObservable.add(() => {
      hudCamera.alpha = mainCamera.alpha;
      hudCamera.beta = mainCamera.beta;
    });
    mainCamera.attachControl(canvas, true);
    const light = new HemisphericLight("light", new Vector3(0.5, 1, 0.25), scene);
    light.intensity = 0.75;
    const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);
    const groundMaterial = new StandardMaterial("ground", scene);
    groundMaterial.diffuseColor = Color3.Gray();
    ground.material = groundMaterial;

    const box = MeshBuilder.CreateBox("box", { size: 1 }, scene);
    box.position.y = 0.5;
    const boxMaterial = new StandardMaterial("sphereMaterial", scene);
    boxMaterial.diffuseColor = initialState.app.boxColor;
    store.subscribe(() => {
      boxMaterial.diffuseColor = store.getState().app.boxColor;
    });
    box.material = boxMaterial;

    box.actionManager = new ActionManager(scene);
    box.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickTrigger, evt => {
      store.dispatch(changeColor(Color3.Yellow()));
    }));

    window.onresize = () => {
      engine.resize();
    }

    engine.runRenderLoop(() => {
      scene.render();
    });
  }, []);

  return <canvas
    style={{ height: "100%", width: "100%" }}
    ref={canvasRef}
    id="babylonWorkspace"
  />;
}

export default BabylonWorkspace;
