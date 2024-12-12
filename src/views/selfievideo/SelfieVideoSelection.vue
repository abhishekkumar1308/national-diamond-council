<template>
  <div class="relative h-screen flex flex-col justify-between">
    <!-- Top Section -->
    <div class="top-0 left-0 right-0 bg-cover z-10 h-full" :style="{ backgroundImage: `url(${require('@/assets/images/selfie-bg.svg')})` }">
      <!-- Top Logos -->
      <div class="flex justify-between items-center">
        <!-- Left Logo -->
        <div class="z-30 h-full" :style="{ backgroundImage: `url(${require('@/assets/images/opus-bg.png')})` }">
          <img src="@/assets/images/logo.png" class="px-4" alt="Birla Opus" />
        </div>
        <!-- Right Logo -->
        <img src="@/assets/logo.svg" class="px-4 pt-4" alt="Birla Group" />
      </div>
    </div>

    <!-- Bottom Section with Background Image Covering Height -->
    <div class="absolute top-[42%] left-0 right-0 h-[62%] bg-dark-green bg-cover bg-center bg-no-repeat z-20">
      <!-- Language Selection Section -->
      <div class="flex flex-col items-center justify-center space-y-6 mx-8 h-full">
        <!-- Title -->
        <h1 class="text-black text-2xl font-poppins-bold text-center font-semibold">
          {{ $t('Select Your Preferred Language') }}
        </h1>

        <!-- Language Dropdown -->
        <div class="w-full max-w-sm relative">
          <div class="grid grid-cols-2 gap-4 mt-6">
            <!-- Rashmika Card -->
            <div
              :class="['bg-yellow rounded-b-lg shadow-lg overflow-hidden', selectedVideo === 'rashmika' ? 'border-4 border-yellow' : '']"
              @click="selectVideo('rashmika')"
            >
              <img src="@/assets/images/rashmika.svg" alt="Rashmika" class="w-full" />
              <div class="p-4 text-center">
                <button
                  class="text-[#294954] font-semibold text-sm "
                  @click="handleContinue"
                >
                  Create a video with Rashmika
                </button>
              </div>
            </div>

            <!-- Vicky Card -->
            <div
              :class="['bg-yellow rounded-b-lg shadow-lg overflow-hidden', selectedVideo === 'vicky' ? 'border-4 border-yellow' : '']"
              @click="selectVideo('vicky')"
            >
              <img src="@/assets/images/vicky.svg" alt="Vicky" class="w-full" />
              <div class="p-4 text-center">
                <button
                  class=" text-[#294954] font-semibold text-sm w-full"
                  @click="handleContinue"
                >
                  Create a video with Vicky
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <p v-if="hasError" class="text-red-500 text-sm">{{ $t("Please select a language") }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
export default {
  data() {
    return {
      selectedVideo: "", // Track selected card
      hasError: false, // Track error state
    };
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },

  methods: {
    // Update selected video and store it in localStorage
    selectVideo(videoType) {
      this.selectedVideo = videoType;
      this.authStore.loginSelfie({userId: 0, name: "", mobile: "",tvc_video:videoType});
    },



    // Handle continue button action
    handleContinue(event) {
      event.stopPropagation(); // Prevent card click from triggering again
      if (this.selectedVideo === "") {
        this.hasError = true; // Show error if no language selected
      } else {
        this.hasError = false;
        this.$router.push({ path: '/selfie/login' });
      }
    },
  },
};
</script>
