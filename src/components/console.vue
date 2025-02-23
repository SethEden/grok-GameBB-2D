<!-- src/components/console.vue -->
<template>
  <div class="console">
    <ul class="tabs">
      <li v-for="tab in tabs" :key="tab" @click="selectTab(tab)" :class="{ active: currentTab === tab }">
        {{ tab }}
      </li>
    </ul>
    <div class="tab-content">
      <component :is="currentTabComponent" />
    </div>
  </div>
</template>

<script>
import logTab from './logTab.vue';
import commandTab from './commandTab.vue';

export default {
  name: 'console',
  components: {
    logTab,
    commandTab,
  },
  data() {
    return {
      tabs: ['log', 'commands'],
      currentTab: 'log',
    };
  },
  computed: {
    currentTabComponent() {
      return this.currentTab + 'tab';
    },
  },
  methods: {
    selectTab(tab) {
      this.currentTab = tab;
    },
  },
};
</script>

<style scoped>
.console {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  border-radius: 5px;
  width: 300px;
}
.tabs {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}
.tabs li {
  margin-right: 10px;
  cursor: pointer;
  padding: 5px;
}
.tabs li.active {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}
.tab-content {
  margin-top: 10px;
}
</style>