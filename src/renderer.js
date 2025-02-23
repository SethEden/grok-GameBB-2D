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

  ipcRenderer.on('player-position', (event, { x, y }) => {
    updatePlayerPosition(x, y);
  });
});