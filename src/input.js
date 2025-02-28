import { Vector3 } from '../node_modules/@babylonjs/core/Maths/math.vector.js';

export const setupInput = (canvas, gameObjects) => {
  const updatePlanePosition = (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;
    const cameraHeight = 500; // Match game.js
    const cameraFov = 0.2;    // Match game.js
    const worldHeight = cameraHeight * Math.tan(cameraFov / 2) * 2;
    const worldWidth = worldHeight * (canvasWidth / canvasHeight);

    const worldX = (0.5 - mouseX / canvasWidth) * worldWidth;
    const worldY = (0.5 - mouseY / canvasHeight) * worldHeight;

    const plane = gameObjects.playerPlane;
    plane.position = new Vector3(worldX, worldY, 0);
    console.log('Plane moved to:', { x: worldX, y: worldY, z: plane.position.z });
  };

  canvas.addEventListener('mousemove', updatePlanePosition);
  console.log('Mouse movement handler added');
};