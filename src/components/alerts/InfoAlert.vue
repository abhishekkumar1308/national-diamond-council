<template>
  <div v-if="isVisible" class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
    <div class="flex">
      <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
      <div>
        <p class="font-bold">{{ title }}</p>
        <p class="text-sm">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoAlert',
  props: {
    title: {
      type: String,
      default: 'Our privacy policy has changed'
    },
    message: {
      type: String,
      default: 'Make sure you know how these changes affect you.'
    },
    autoCloseTime: {
      type: Number,
      default: 30000  // Default to 30 seconds (30000 ms)
    }
  },
  data() {
    return {
      isVisible: true
    };
  },
  mounted() {
    // Set a timer to automatically close the alert after the specified time
    this.startAutoCloseTimer();
  },
  beforeUnmount() {
    // Clear the timer if the component is destroyed before auto-close
    clearTimeout(this.autoCloseTimer);
  },
  methods: {
    startAutoCloseTimer() {
      this.autoCloseTimer = setTimeout(() => {
        this.isVisible = false;
      }, this.autoCloseTime);
    },
    closeAlert() {
      this.isVisible = false;
      clearTimeout(this.autoCloseTimer); // Clear the timer if the user manually closes the alert
    }
  }
};
</script>

<style scoped>
/* Optional: add custom styles if needed */
</style>
