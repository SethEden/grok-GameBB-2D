<!-- src/components/debugPanel.vue -->
<template>
  <div class="debug-panel">
    <h2>Debug Controls</h2>
    <button @click="toggleWireframe">Toggle Wireframe</button>
    <button @click="toggleDebugLayer">Toggle Debug Layer</button>
  </div>
</template>

<script>
import { engine } from '../engine'; // Adjust this import based on your game engine setup

export default {
  name: 'debugPanel',
  methods: {
    toggleWireframe() {
      const { scene } = engine;
      scene.forceWireframe = !scene.forceWireframe; // Example for Babylon.js
    },
    toggleDebugLayer() {
      const { scene } = engine;
      if (scene.debugLayer.isVisible()) {
        scene.debugLayer.hide();
      } else {
        scene.debugLayer.show();
      }
    },
  },
};
</script>

<style scoped>
.debug-panel {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  border-radius: 5px;
  width: 200px;
}
</style>