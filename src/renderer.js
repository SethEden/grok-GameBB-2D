import { createApp } from 'vue';
import { ipcRenderer } from 'electron';
import * as BABYLON from 'babylonjs';
import App from './App.vue';
import { engine } from './engine.js';
import { sharedEntities } from './state.js';

const app = createApp(App);
app.mount('#app');

const canvas = document.getElementById('renderCanvas');
if (!canvas) {
  throw new Error('Canvas not found!');
}

const updatePlayerPosition = (x, y) => {
  const player = sharedEntities[0]; // Player is first entity
  if (player && player.position) {
    player.position.x = x;
    player.position.y = y;
    // console.log('Player moved to:', x, y); // Uncomment for debug
  }
};

ipcRenderer.on('display-info', (event, { displays, currentDisplayId }) => {
  const startEngine = engine({ BABYLON, canvas, displays, currentDisplayId });
  startEngine();

  canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const worldWidth = displays.reduce((sum, d) => sum + d.bounds.width, 0);
    const worldHeight = displays[0].bounds.height;
    const x = (mouseX / canvas.width) * displays[currentDisplayId].bounds.width +
              displays.filter(d => d.id < currentDisplayId).reduce((sum, d) => sum + d.bounds.width, 0) -
              worldWidth / 2;
    const y = -(mouseY / canvas.height) * worldHeight + worldHeight / 2;

    updatePlayerPosition(x, y);
    ipcRenderer.send('update-player-position', { x, y }); // Send to main
  });

  // Receive updates from other windows
  ipcRenderer.on('player-position', (event, { x, y }) => {
    updatePlayerPosition(x, y);
  });
});