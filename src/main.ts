import {
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  MeshBuilder,
  Scene,
  SceneLoader,
  Vector3,
} from "babylonjs";
import "babylonjs-loaders";
import "./style.css";

const canvas = document.getElementById(
  "renderCanvas"
) as HTMLCanvasElement | null;

const engine = new Engine(canvas, true, {
  preserveDrawingBuffer: true,
  stencil: true,
});

const createScene = () => {
  const scene = new Scene(engine);
  const camera = new ArcRotateCamera("camera", 0, 0, 10, Vector3.Zero(), scene);
  camera.setTarget(Vector3.Zero());
  camera.attachControl(canvas, false);
  const light = new HemisphericLight("light1", new Vector3(1, 1, 1));
  console.log(light);

  const ground = MeshBuilder.CreateGround(
    "ground1",
    { width: 6, height: 6, subdivisions: 2, updatable: false },
    scene
  );
  console.log(ground);

  // Load first splat
  SceneLoader.ImportMeshAsync("splat", "./", "untitled.splat", scene).then(
    (result) => {
      const splat1 = result.meshes[0];
      splat1.position = new Vector3(-1.5, 5, 1.5);
      splat1.scaling = new Vector3(2.0, 2.0, 2.0); // Adjust the scale as needed
      splat1.rotation = new Vector3(0, Math.PI / 4, 0); // Adjust the rotation as needed
    }
  );

  // Load second splat
  SceneLoader.ImportMeshAsync("splat", "./", "clstesti.splat", scene).then(
    (result) => {
      const splat2 = result.meshes[0];
      splat2.position = new Vector3(2, 1.35, 0);
      splat2.scaling = new Vector3(0.5, 0.5, 0.5); // Adjust the scale as needed
      splat2.rotation = new Vector3(0, Math.PI / 4, 0); // Adjust the rotation as needed
    }
  );

  return scene;
};

const scene = createScene();
engine.runRenderLoop(function () {
  scene.render();
});

window.addEventListener("resize", function () {
  engine.resize();
});

// Modal functionality
const modal = document.getElementById("myModal") as HTMLElement;
const btn = document.getElementById("openModalBtn") as HTMLElement;
const span = document.getElementsByClassName("close")[0] as HTMLElement;

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
