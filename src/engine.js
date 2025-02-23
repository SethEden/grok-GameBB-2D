import { createEntities } from './entities.js';
import { updateMovement } from './systems/movement.js';
import { updateRendering } from './systems/rendering.js';

export const engine = ({ BABYLON, canvas, displays, currentDisplayId }) => {
  const babylonEngine = new BABYLON.Engine(canvas, true);
  const scene = new BABYLON.Scene(babylonEngine);
  scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);

  const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, -10), scene);
  camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
  camera.setTarget(BABYLON.Vector3.Zero());

  const totalWidth = displays.reduce((sum, d) => sum + d.bounds.width, 0);
  const currentDisplay = displays.find(d => d.id === currentDisplayId);
  const worldWidth = totalWidth;
  const screenWidth = currentDisplay.bounds.width;
  const offset = displays
    .filter(d => d.id < currentDisplayId)
    .reduce((sum, d) => sum + d.bounds.width, 0);
  camera.orthoLeft = offset - worldWidth / 2;
  camera.orthoRight = offset + screenWidth - worldWidth / 2;
  camera.orthoBottom = -currentDisplay.bounds.height / 2;
  camera.orthoTop = currentDisplay.bounds.height / 2;

  const spriteManager = new BABYLON.SpriteManager(
    'sprites',
    'assets/sprites.png',
    100,
    64,
    scene
  );

  const entities = createEntities({ BABYLON, scene, spriteManager });
  const systems = [
    updateMovement,
    updateRendering({ BABYLON, scene, camera, canvas }),
  ];

  let lastTime = performance.now();
  const run = () => {
    const loop = () => {
      const currentTime = performance.now();
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      systems[0](entities, delta);
      systems[1](entities);
      scene.render();
      console.log('Rendering frame for display', currentDisplayId); // Add back for debug
    };
    babylonEngine.runRenderLoop(loop);
  };

  return run;
};