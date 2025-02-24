import { createPosition } from './components/position.js';
import { createVelocity } from './components/velocity.js';
import { createRenderable } from './components/renderable.js';

export const createEntities = ({ BABYLON, scene, spriteManager }) => {
  const player = {
    position: createPosition(0, 0),
    velocity: createVelocity(0, 0), // Stationary, we’ll add mouse control later
    renderable: createRenderable({ BABYLON, scene, spriteManager, type: 'sprite', size: 64 }),
  };

  const obstacle = {
    position: createPosition(100, 0), // Offset further for wide scrolling
    renderable: createRenderable({ BABYLON, scene, spriteManager, type: 'square', size: 200 }),
  };

  return [player, obstacle];
};