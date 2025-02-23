import { createPosition } from './components/position.js';
import { createVelocity } from './components/velocity.js';
import { createRenderable } from './components/renderable.js';

export const createEntities = ({ BABYLON, scene }) => {
  const player = {
    position: createPosition(0, 0, 0),
    velocity: createVelocity(0, 0, 0), // Stationary for now, can be controlled later
    renderable: createRenderable({ BABYLON, scene, type: 'box', size: 1 }),
  };

  const cube = {
    position: createPosition(5, 0, 0), // Offset so it’s distinct from player
    // No velocity, making it static
    renderable: createRenderable({ BABYLON, scene, type: 'box', size: 2 }),
  };

  console.log('Player mesh position:', player.renderable.mesh.position);
  console.log('Cube mesh position:', cube.renderable.mesh.position);

  return [player, cube];
};