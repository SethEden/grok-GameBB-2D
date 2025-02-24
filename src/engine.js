import { createEntities } from './entities.js';
import { updateMovement } from './systems/movement.js';
import { updateRendering } from './systems/rendering.js';
import { setupInput, updateInput } from './systems/input.js';
import { setEntities } from './state.js';
import { ipcRenderer } from 'electron';

export const engine = ({ BABYLON, canvas, displays, currentDisplayId }) => {
  const babylonEngine = new BABYLON.Engine(canvas, true);
  const scene = new BABYLON.Scene(babylonEngine);
  scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);

  // Sort displays by bounds.x
  const sortedDisplays = [...displays].sort((a, b) => a.bounds.x - b.bounds.x);
  const minX = Math.min(...sortedDisplays.map(d => d.bounds.x));
  const currentDisplay = sortedDisplays.find(d => d.id === currentDisplayId);
  const worldXOffset = currentDisplay.bounds.x - minX;
  const screenWidth = currentDisplay.bounds.width;
  const screenHeight = currentDisplay.bounds.height;
  const worldWidth = sortedDisplays.reduce((sum, d) => sum + d.bounds.width, 0);
  const worldHeight = screenHeight; // Assuming uniform height for simplicity

  // Use FreeCamera in perspective mode, facing negative Z, locked
  const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, -500), scene);
  camera.minZ = 0.1;
  camera.maxZ = 1000;
  camera.attachControl(canvas, true);

  camera.angularSensibility = 0;
  camera.keysUp = [];
  camera.keysDown = [];
  camera.keysLeft = [];
  camera.keysRight = [];

  // Set FOV for 2D-like view (adjusted for screen width)
  // Set FOV
  camera.fov = 1.74; // Vertical FOV ≈ 100 degrees

  // Position camera for this display
  camera.position.x = worldXOffset + screenWidth / 2 - worldWidth / 2;
  camera.position.y = 0;

  // Calculate horizontal FOV
  const aspectRatio = canvas.width / canvas.height;
  const verticalFov = camera.fov;
  const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * aspectRatio);

  // Calculate distance d for frustum width = screenWidth at Z=0
  const d = screenWidth / (2 * Math.tan(horizontalFov / 2));
  camera.position.z = -d;

  // Set target with offset towards positive Z (less negative)
  const targetOffsetZ = 200; // Matches current offset
  const target = new BABYLON.Vector3(
    camera.position.x,
    camera.position.y,
    camera.position.z + targetOffsetZ
  );

  // Set and lock target
  camera.setTarget(target);
  camera.lockedTarget = target;

  // Log camera and target positions
  ipcRenderer.send('log', `Camera Position: ${currentDisplayId}: pos: ${camera.position.x}, ${camera.position.y}, ${camera.position.z}, fov: ${camera.fov}`);
  ipcRenderer.send('log', `Camera Target: ${currentDisplayId}: pos: ${target.x}, ${target.y}, ${target.z}`);

  // Log view frustum at Z=0 for verification
  const widthAtZ0 = 2 * d * Math.tan(horizontalFov / 2);
  const heightAtZ0 = 2 * d * Math.tan(verticalFov / 2);
  const frustumMinX = camera.position.x - widthAtZ0 / 2;
  const frustumMaxX = camera.position.x + widthAtZ0 / 2;
  const frustumMinY = camera.position.y - heightAtZ0 / 2;
  const frustumMaxY = camera.position.y + heightAtZ0 / 2;
  ipcRenderer.send('log', `View frustum at Z=0 for display ${currentDisplayId}:
    Upper-Left Corner: (${frustumMinX.toFixed(2)}, ${frustumMaxY.toFixed(2)}, 0),
    Upper-Right Corner: (${frustumMaxX.toFixed(2)}, ${frustumMaxY.toFixed(2)}, 0),
    Lower-Right Corner: (${frustumMaxX.toFixed(2)}, ${frustumMinY.toFixed(2)}, 0),
    Lower-Left Corner: (${frustumMinX.toFixed(2)}, ${frustumMinY.toFixed(2)}, 0)`);

  const spriteManager = new BABYLON.SpriteManager('sprites', 'assets/sprites.png', 100, 64, scene);
  const entities = createEntities({ BABYLON, scene, spriteManager });
  setEntities(entities);

  const systems = [
    updateMovement,
    updateRendering({ BABYLON, scene, camera, canvas }),
    updateInput,
  ];

  setupInput(entities, { canvas, displays: sortedDisplays, currentDisplayId }); // Pass sorted displays
  ipcRenderer.send('log', `Scene meshes: ${scene.meshes.length}, names: ${scene.meshes.map(m => m.name).join(', ')}`);

  let lastTime = performance.now();
  const run = () => {
    const loop = () => {
      const currentTime = performance.now();
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      systems[0](entities, delta, { worldWidth, worldHeight });
      systems[1](entities);
      systems[2](entities);
      scene.render();
      ipcRenderer.send('log', `Rendering frame for display ${currentDisplayId}`);
    };
    babylonEngine.runRenderLoop(loop);
  };

  return run;
};