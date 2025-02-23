import { createApp } from 'vue';
import { ipcRenderer } from 'electron';
import * as BABYLON from 'babylonjs';
import App from './App.vue';
import { engine } from './engine.js';

const app = createApp(App);
app.mount('#app');

const canvas = document.getElementById('renderCanvas');
if (!canvas) {
  throw new Error('Canvas not found!');
}

ipcRenderer.on('display-info', (event, { displays, currentDisplayId }) => {
  const startEngine = engine({ BABYLON, canvas, displays, currentDisplayId });
  startEngine();
});