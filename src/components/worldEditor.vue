<!-- src/components/worldEditor.vue -->
<template>
  <div class="world-editor">
    <h2>world Editor</h2>
    <button @click="addEntity">Add Entity</button>
    <button @click="removeEntity">Remove Entity</button>
  </div>
</template>

<script>
import { engine } from '../engine';

export default {
  name: 'worldEditor',
  methods: {
    addEntity() {
      // Logic to add an entity to the game world
    },
    removeEntity() {
      // Logic to remove an entity
    },
  },
};
</script>

<style scoped>
.world-editor {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  border-radius: 5px;
}
</style>