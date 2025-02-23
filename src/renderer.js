import { createApp } from 'vue';
import { ipcRenderer } from 'electron';
import * as BABYLON from 'babylonjs';
import App from './App.vue';
import { engine } from './engine.js';

console.log('Renderer process starting');

const app = createApp(App);
app.mount('#app');
console.log('Vue app mounted');

const canvas = document.getElementById('renderCanvas');
if (!canvas) {
  console.error('Canvas not found!');
} else {
  console.log('Canvas found:', canvas);
}

let startEngine;
ipcRenderer.on('display-info', (event, { displays, currentDisplayId }) => {
  console.log('Received display-info for display', currentDisplayId, displays);
  startEngine = engine({ BABYLON, canvas, displays, currentDisplayId });
  startEngine();
});