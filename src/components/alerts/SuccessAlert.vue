<template>
  <div v-if="isVisible" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
    <strong class="font-bold">{{ title }}</strong>
    <span class="block sm:inline">{{ message }}</span>
    <span @click="closeAlert" class="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer">
      <svg class="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <title>Close</title>
        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
      </svg>
    </span>
  </div>
</template>

<script>
// SuccessAlert.vue (same applies to DangerAlert.vue)
export default {
  name: 'SuccessAlert',
  props: {
    title: {
      type: String,
      default: 'Success!'
    },
    message: {
      type: String,
      default: 'Action completed'
    },
    autoCloseTime: {
      type: Number,
      default: 30000  // Default to 30 seconds
    }
  },
  data() {
    return {
      isVisible: true
    };
  },
  mounted() {
    this.startAutoCloseTimer();
  },
  beforeUnmount() {
    clearTimeout(this.autoCloseTimer);
  },
  methods: {
    startAutoCloseTimer() {
      clearTimeout(this.autoCloseTimer); // Ensure no previous timer is running
      this.autoCloseTimer = setTimeout(() => {
        this.isVisible = false;
      }, this.autoCloseTime);
    },
    closeAlert() {
      this.isVisible = false;
      clearTimeout(this.autoCloseTimer);
    },
    resetAlert() { // New method to reset visibility and timer
      this.isVisible = true;
      this.startAutoCloseTimer();
    }
  }
};

</script>

<style scoped>
/* Optional: add custom styles if needed */
</style>
