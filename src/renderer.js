console.log('Hello from renderer.js!');

// Import all required classes from '@babylonjs/core' with relative paths
import { Engine } from '../node_modules/@babylonjs/core/Engines/engine.js';
import { Scene } from '../node_modules/@babylonjs/core/scene.js';
import { Vector3 } from '../node_modules/@babylonjs/core/Maths/math.vector.js';
import { FreeCamera } from '../node_modules/@babylonjs/core/Cameras/freeCamera.js';
import { HemisphericLight } from '../node_modules/@babylonjs/core/Lights/hemisphericLight.js';
import { MeshBuilder } from '../node_modules/@babylonjs/core/Meshes/meshBuilder.js';
import { StandardMaterial } from '../node_modules/@babylonjs/core/Materials/standardMaterial.js';
import { Color3 } from '../node_modules/@babylonjs/core/Maths/math.color.js';

// Get the canvas element
const canvas = document.getElementById('renderCanvas');
if (!canvas) {
  console.error('Canvas not found!');
  throw new Error('Cannot proceed without canvas');
}

// Initialize the engine
const engine = new Engine(canvas, true);
console.log('Engine initialized:', engine);

// Create the scene
const scene = new Scene(engine);
scene.clearColor = new Color3(0.2, 0.4, 0.6); // Light blue background
console.log('Scene created:', scene);

// Camera setup: Looking down -Z onto XY plane
const cameraHeight = 500; // Above at z=500
const cameraPosition = new Vector3(0, 0, cameraHeight);
const cameraTarget = new Vector3(0, 0, 0); // Looking at origin
const camera = new FreeCamera('camera', cameraPosition, scene);
camera.setTarget(cameraTarget);
camera.fov = 0.2; // Narrow FOV for 2D-like view
camera.minZ = 0.1; // Closer near plane
camera.maxZ = 2000; // Farther far plane
console.log('Camera set up:', { position: cameraPosition, target: cameraTarget, fov: camera.fov, minZ: camera.minZ, maxZ: camera.maxZ });

// Add lighting
const light = new HemisphericLight('light', new Vector3(0, 0, 1), scene); // Light from above
light.intensity = 1;
console.log('Light added:', light);

// Create a simple mesh (red square) parallel to XY plane
const planeSize = 50; // Size in world units
const plane = MeshBuilder.CreatePlane('plane', { size: planeSize }, scene);
plane.position = new Vector3(0, 0, 0); // At origin
plane.rotation.z = -(Math.PI / 2); // Rotate 90° around X to face up (XY plane)
console.log('Plane created at position:', plane.position, 'with rotation:', { x: plane.rotation.x, y: plane.rotation.y, z: plane.rotation.z });

// Create and assign a material (two-sided)
const material = new StandardMaterial('material', scene);
material.diffuseColor = new Color3(1, 0, 0); // Red color
material.backFaceCulling = false; // Make plane visible from both sides
plane.material = material;
console.log('Material applied:', material, 'backFaceCulling:', material.backFaceCulling);

// Mouse movement handler
const updatePlanePosition = (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  const canvasWidth = canvas.clientWidth;
  const canvasHeight = canvas.clientHeight;
  const worldHeight = cameraHeight * Math.tan(camera.fov / 2) * 2;
  const worldWidth = worldHeight * (canvasWidth / canvasHeight);

  const worldX = (0.5 - mouseX / canvasWidth) * worldWidth;
  const worldY = (0.5 - mouseY / canvasHeight) * worldHeight;

  plane.position.x = worldX;
  plane.position.y = worldY;
  plane.position.z = 0; // Stay on XY plane
  console.log('Plane moved to:', { x: worldX, y: worldY, z: plane.position.z });
};

canvas.addEventListener('mousemove', updatePlanePosition);
console.log('Mouse movement handler added');

// Render loop
const renderLoop = () => {
  scene.render();
};
engine.runRenderLoop(renderLoop);
console.log('Render loop started');

// Handle window resize
const handleResize = () => {
  engine.resize();
  console.log('Resized canvas:', { width: canvas.clientWidth, height: canvas.clientHeight });
};
window.addEventListener('resize', handleResize);
console.log('Resize handler added');