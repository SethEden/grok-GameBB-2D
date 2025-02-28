import { initializeEngine } from './engine.js';
import { setupGame } from './game.js';
import { setupInput } from './input.js';

console.log('Hello from renderer.js!');

const canvas = document.getElementById('renderCanvas');
if (!canvas) {
  console.error('Canvas not found!');
  throw new Error('Cannot proceed without canvas');
}

const { engine, scene } = initializeEngine(canvas);
const gameObjects = setupGame(scene);
setupInput(canvas, gameObjects);