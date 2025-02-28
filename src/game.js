import { Vector3 } from '../node_modules/@babylonjs/core/Maths/math.vector.js';
import { FreeCamera } from '../node_modules/@babylonjs/core/Cameras/freeCamera.js';
import { Color3 } from '../node_modules/@babylonjs/core/Maths/math.color.js';
import { createUnlitPlane } from './meshUtils.js';

export const setupGame = (scene) => {
  // Camera setup
  const cameraHeight = 500;
  const cameraPosition = new Vector3(0, 0, cameraHeight);
  const cameraTarget = new Vector3(0, 0, 0);
  const camera = new FreeCamera('camera', cameraPosition, scene);
  camera.setTarget(cameraTarget);
  camera.fov = 0.2;
  camera.minZ = 0.1;
  camera.maxZ = 2000;
  console.log('Camera set up:', { position: cameraPosition, target: cameraTarget, fov: camera.fov, minZ: camera.minZ, maxZ: camera.maxZ });

  // Game objects
  const plane = createUnlitPlane('playerPlane', 50, new Vector3(0, 0, 0), new Vector3(0, 0, -(Math.PI / 2)), new Color3(1, 0, 0), scene);
  console.log('Player plane created:', plane);

  return { playerPlane: plane };
};