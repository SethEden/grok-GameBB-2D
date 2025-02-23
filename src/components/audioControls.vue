<!-- src/components/audioControls.vue -->
<template>
  <div class="audio-controls">
    <h2>Audio Controls</h2>
    <input type="range" v-model="volume" min="0" max="1" step="0.1" @input="updateVolume" />
  </div>
</template>

<script>
import { engine } from '../engine';

export default {
  name: 'audioControls',
  data() {
    return {
      volume: 1,
    };
  },
  methods: {
    updateVolume() {
      // Adjust game audio volume here
      console.log('Volume set to:', this.volume);
    },
  },
};
</script>

<style scoped>
.audio-controls {
  position: absolute;
  top: 50%;
  right: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  border-radius: 5px;
}
</style>