import { useCallback } from "react";
import {
  ArcRotateCamera,
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
    const mainCamera = new ArcRotateCamera("mainCamera", 0, Math.PI / 2, 10, Vector3.Zero(), scene);
    const hudCamera = new ArcRotateCamera("hudCamera", 0, Math.PI / 2, 10, Vector3.Zero(), scene);
    mainCamera.onViewMatrixChangedObservable.add(() => {
      hudCamera.alpha = mainCamera.alpha;
      hudCamera.beta = mainCamera.beta;
    });
    mainCamera.attachControl(canvas, true);
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.75;
    const ground = MeshBuilder.CreateGround("ground", { width: 15, height: 10 }, scene);

    const sphere = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);
    sphere.position.y = 0.5;
    const sphereMaterial = new StandardMaterial("sphereMaterial", scene);
    sphereMaterial.diffuseColor = Color3.Red();
    sphere.material = sphereMaterial;

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
