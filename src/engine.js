import { Engine } from '../node_modules/@babylonjs/core/Engines/engine.js';
import { Scene } from '../node_modules/@babylonjs/core/scene.js';
import { Color3 } from '../node_modules/@babylonjs/core/Maths/math.color.js';

export const initializeEngine = (canvas) => {
  const engine = new Engine(canvas, true);
  console.log('Engine initialized:', engine);

  const scene = new Scene(engine);
  scene.clearColor = new Color3(0.2, 0.4, 0.6); // Light blue background
  console.log('Scene created:', scene);

  const renderLoop = () => {
    scene.render();
  };
  engine.runRenderLoop(renderLoop);
  console.log('Render loop started');

  const handleResize = () => {
    engine.resize();
    console.log('Resized canvas:', { width: canvas.clientWidth, height: canvas.clientHeight });
  };
  window.addEventListener('resize', handleResize);
  console.log('Resize handler added');

  return { engine, scene };
};