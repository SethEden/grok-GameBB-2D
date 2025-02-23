import { createEntities } from './entities.js';
import { updateMovement } from './systems/movement.js';
import { updateRendering } from './systems/rendering.js';

export const engine = ({ BABYLON, canvas, displays, currentDisplayId }) => {
  console.log('Engine starting for display', currentDisplayId);
  const babylonEngine = new BABYLON.Engine(canvas, true);
  const scene = new BABYLON.Scene(babylonEngine);
  
  // Set background color to black
  scene.clearColor = new BABYLON.Color4(0, 0, 0, 1); // Black background

  // Enable debug layer
  scene.debugLayer.show(); // Shows debug UI overlay

  // Add a light (ensure it’s present and strong enough)
  const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
  light.intensity = 1; // Default is 1, but let’s confirm it’s bright

  // Camera setup with WASD and mouse
  const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 5, -5), scene);
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.speed = 0.5; // Movement speed
  camera.angularSensibility = 2000; // Mouse sensitivity
  camera.keysUp = [87]; // W key
  camera.keysDown = [83]; // S key
  camera.keysLeft = [65]; // A key
  camera.keysRight = [68]; // D key
  camera.attachControl(canvas, true); // Enables mouse look

  console.log('Camera position:', camera.position);
  console.log('Camera target:', camera.getTarget());

  // Multi-monitor viewport
  const totalWidth = displays.reduce((sum, d) => sum + d.bounds.width, 0);
  const currentDisplay = displays.find(d => d.id === currentDisplayId);
  const viewportWidth = currentDisplay.bounds.width / totalWidth;
  const viewportX = displays
    .filter(d => d.id < currentDisplayId)
    .reduce((sum, d) => sum + d.bounds.width, 0) / totalWidth;
  camera.viewport = new BABYLON.Viewport(viewportX, 0, viewportWidth, 1);
  console.log('Viewport for display', currentDisplayId, ':', camera.viewport);

  const entities = createEntities({ BABYLON, scene });

  const systems = [
    updateMovement,
    updateRendering({ BABYLON, scene, camera, canvas }),
  ];

  const run = () => {
    console.log('Render loop running for display', currentDisplayId);
    systems.forEach(system => system(entities));
    babylonEngine.runRenderLoop(() => scene.render());
  };

  return run;
};