<!-- src/components/commandTab.vue -->
<template>
  <div>
    <h3>Commands</h3>
    <input v-model="command" @keyup.enter="executeCommand" placeholder="Enter command..." />
  </div>
</template>

<script>
export default {
  name: 'commandTab',
  data() {
    return {
      command: '',
    };
  },
  methods: {
    executeCommand() {
      console.log('Executing:', this.command);
      // Add logic to interact with your game engine here
      this.command = '';
    },
  },
};
</script>