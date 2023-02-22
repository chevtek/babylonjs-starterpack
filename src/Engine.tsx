import { useCallback } from "react";
import {
  ArcRotateCamera,
  AxesViewer,
  Color3,
  Engine,
  HemisphericLight,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3
} from "@babylonjs/core";

function App() {
  const canvasRef = useCallback((canvas: HTMLCanvasElement) => {
    if (!canvas) return;
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
    boxMaterial.diffuseColor = Color3.Green();
    box.material = boxMaterial;

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

export default App;
