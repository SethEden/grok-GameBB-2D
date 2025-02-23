<!-- src/components/eventTriggers.vue -->
<template>
  <div class="event-triggers">
    <h2>event Triggers</h2>
    <input v-model="eventName" placeholder="Event Name" />
    <button @click="setTrigger">Set Trigger</button>
  </div>
</template>

<script>
export default {
  name: 'eventTriggers',
  data() {
    return {
      eventName: '',
    };
  },
  methods: {
    setTrigger() {
      console.log('Setting trigger:', this.eventName);
      // Add game engine logic here
      this.eventName = '';
    },
  },
};
</script>

<style scoped>
.event-triggers {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  border-radius: 5px;
}
</style>