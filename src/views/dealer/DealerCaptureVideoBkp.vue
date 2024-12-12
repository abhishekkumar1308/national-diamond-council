<template>
  <div class="relative h-screen flex flex-col justify-between">
    <!-- Header Section -->
    <div class="top-0 left-0 right-0 bg-cover bg-center bg-no-repeat h-[26%] z-10" :style="{ backgroundImage: `url(${require('@/assets/images/bg-top-login.svg')})` }">
      <div class="flex justify-between items-center">
        <img src="@/assets/images/logo.png" class="px-4 pt-4" alt="Birla Opus"/>
        <div class="flex mt-4">
          <LanguageSwitcher/>
        </div>
        <img src="@/assets/logo.svg" class="px-4 pt-4" alt="Birla Group"/>
      </div>

      <!-- Progress Steps -->
      <div class="flex items-center w-full mt-8">
        <div v-for="(step, index) in steps" :key="index" class="flex flex-col items-center w-1/3">
          <div class="flex items-center w-full">
            <div class="flex-auto h-[2px]" :class="currentStep >= index + 1 ? 'bg-lang-b-orange' : 'bg-grayish'"></div>
            <div class="w-3 h-3 rounded-full" :class="currentStep >= index + 1 ? 'bg-lang-b-orange' : 'bg-grayish'"></div>
            <div class="flex-auto h-[2px]" :class="currentStep > index + 1 ? 'bg-lang-b-orange' : 'bg-grayish'"></div>
          </div>
          <span class="text-sm mt-2">{{ step }}</span>
        </div>
      </div>
    </div>

    <!-- Video Capture Section -->
    <div class="absolute bottom-0 left-0 right-0 h-[85%] bg-light-purple bg-cover bg-center bg-no-repeat py-8">
      <div class="text-center ">
        <div class="text-center mt-20  px-8">
          <h2 class="text-2xl font-semibold">{{ $t('Welcome') }}, {{ display_name }}!</h2>
          <div class="text-black font-normal px-8 mt-3 bt-5">
                {{ $t('Record a video and submit to be part of the ad campaign!') }}
          </div>
        </div>
        <div class="text-center mt-20  px-8">
          <div class="px-8 pb-5">
            <div class="text-xs font-normal flex items-center">
              <img src="@/assets/images/bulb.svg" alt="bulb" class="mr-2 h-5 w-4">
              <p class="text-xs font-normal">
                {{ $t('Tips while creating your video!') }}
              </p>
            </div>
          </div>

          <div class="bg-white p-4 divide-y divide-gray-200 max-h-[54rem] overflow-y-auto rounded">
            <!-- Tip item start -->
            <div class="flex items-center py-3">
              <img src="@/assets/images/bulb.svg" alt="bulb" class="mr-2 w-5 h-5">
              <p class="text-xs font-normal">{{ $t('Showcase your best in 15 sec') }}</p>
            </div>
            <div class="flex items-center py-3">
              <img src="@/assets/images/bulb.svg" alt="bulb" class="mr-2 w-5 h-5">
              <p class="text-xs font-normal">{{ $t('Use minimal background noise and avoid busy/cluttered backgrounds') }}</p>
            </div>
            <div class="flex items-center py-3">
              <img src="@/assets/images/bulb.svg" alt="bulb" class="mr-2 w-5 h-5">
              <p class="text-xs font-normal">{{ $t('Align the camera at eye level and at a distance that captures you') }}</p>
            </div>
            <div class="flex items-center py-3">
              <img src="@/assets/images/bulb.svg" alt="bulb" class="mr-2 w-5 h-5">
              <p class="text-xs font-normal">{{ $t('Look Directly at the Camera') }}</p>
            </div>
            <!-- Tip item end -->

            <!-- Repeat the above block for each tip up to 54 times -->
          </div>

        </div>
        <button @click="openCameraModal" class="text-black bg-yellow px-5 py-2 mt-5 ">
          <span>Record a Selfie Video</span>
        </button>
      </div>
    </div>
    <div v-if="cameraModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div class="relative w-full h-full">
        <!-- Video Preview or Live Camera Feed -->
        <video
            v-if="!videoPreview"
            ref="video"
            autoplay
            playsinline
            muted
            class="w-full h-full object-cover"
        ></video>
        <video
            v-if="videoPreview"
            :src="videoPreview"
            ref="previewVideo"
            playsinline
            @play="hidePlayButton"
            @pause="showPlayButton"
            @ended="showPlayButton"
            class="w-full h-full object-cover"
        ></video>

        <!-- Play Button Overlay -->
        <div
            v-if="videoPreview && showPlayIcon"
            @click="playVideo"
            class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer"
        >
          <svg class="w-16 h-16 text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 22v-20l18 10-18 10z" />
          </svg>
        </div>

        <!-- Start/Stop and Confirm/Retake Buttons -->
        <div v-if="!videoPreview" class="absolute rounded-b-md bottom-0 text-center left-1/2 transform -translate-x-1/2 bg-rose-white w-full p-5">
          <button @click="startRecording"  :disabled="isRecording">

            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="28" cy="28" r="28" fill="#D91F06"/>
              <circle cx="28" cy="28" r="14" fill="white"/>
            </svg>
          </button>
        </div>

        <!-- Timer Display during Recording -->
        <div
            v-if="isRecording"
            class="absolute rounded-full bg-red-600 font-semibold px-5 py-1 top-4 left-1/2 transform -translate-x-1/2 text-white text-lg"
        >
          00:{{ formatTime(remainingTime) }}
        </div>

        <!-- Retake/Confirm Buttons for Video Preview -->
        <div v-if="videoPreview" class="absolute bottom-8 flex justify-between w-full px-8">
          <button @click="retakeVideo" class="bg-white text-black px-4 py-2 rounded border border-yellow">Record Again</button>
          <button @click="confirmVideo" class="bg-yellow text-black px-4 py-2 rounded">Confirm</button>
        </div>

        <!-- Close Button -->
        <button @click="closeCameraModal" class="absolute top-4 right-4 text-white text-2xl">
          <span>✕</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import { useAuthStore } from "@/stores/auth";
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import api from "@/plugins/axios";

export default {
  components: {
    LanguageSwitcher,
  },
  setup() {
    const authStore = useAuthStore();
    const display_name = computed(() => authStore.dealer?.name || "Guest");
    const video = ref(null);
    const previewVideo = ref(null);
    const mediaRecorder = ref(null);
    const recordedChunks = ref([]);
    const cameraModalOpen = ref(false);
    const isRecording = ref(false);
    const videoPreview = ref(null);
    const remainingTime = ref(5);
    const currentStep = ref(2);
    const steps = ["Verify Account", "Take a Selfie", "Add Images"];
    const showPlayIcon = ref(true);
    let timer = null;

    // Initialize Camera
    const startCamera = async () => {
      if (navigator.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (video.value) {
          video.value.srcObject = stream;
        }
      }
    };

    // Stop Camera
    const stopCamera = () => {
      if (video.value && video.value.srcObject) {
        const stream = video.value.srcObject;
        stream.getTracks().forEach((track) => track.stop());
        video.value.srcObject = null;
      }
    };


    // Start Recording
    const startRecording = () => {
      if (!video.value || !video.value.srcObject) {
        console.error("Error: Camera stream not available for recording.");
        return;
      }

      recordedChunks.value = [];
      isRecording.value = true;
      remainingTime.value = 5;

      const stream = video.value.srcObject;
      mediaRecorder.value = new MediaRecorder(stream, { mimeType: "video/webm" });
      mediaRecorder.value.ondataavailable = (event) => {
        if (event.data.size > 0) recordedChunks.value.push(event.data);
      };
      mediaRecorder.value.onstop = handleRecordingComplete;
      mediaRecorder.value.start();

      timer = setInterval(() => {
        remainingTime.value -= 1;
        if (remainingTime.value === 0) stopRecording();
      }, 1000);
    };

    // Stop Recording
    const stopRecording = () => {
      clearInterval(timer);
      if (mediaRecorder.value) {
        mediaRecorder.value.stop();
      }
      isRecording.value = false;
    };

    const handleRecordingComplete = () => {
      const blob = new Blob(recordedChunks.value, { type: "video/webm" });
      videoPreview.value = URL.createObjectURL(blob);
      showPlayIcon.value = true;
      stopCamera();
    };

    const retakeVideo = () => {
      videoPreview.value = null;
      showPlayIcon.value = true;
      startCamera();
    };

    const confirmVideo = async () => {
      const blob = new Blob(recordedChunks.value, { type: "video/webm" });
      const formData = new FormData();
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      formData.append("file", blob, `${timestamp}-video.webm`);
      await api.post("/api/v1.0/media/upload_profile_video", formData, { headers: { "Content-Type": "multipart/form-data" } });
      closeCameraModal();
    };

    const closeCameraModal = () => {
      stopCamera();
      cameraModalOpen.value = false;
    };

    const openCameraModal = () => {
      cameraModalOpen.value = true;
      startCamera();
    };

    const formatTime = (time) => `00:${String(time).padStart(2, "0")}`;

    const playVideo = () => {
      showPlayIcon.value = false;
      previewVideo.value.play();
    };

    const hidePlayButton = () => (showPlayIcon.value = false);
    const showPlayButton = () => (showPlayIcon.value = true);

    onMounted(() => startCamera());
    onBeforeUnmount(() => stopCamera());

    return {
      video,
      previewVideo,
      cameraModalOpen,
      isRecording,
      videoPreview,
      remainingTime,
      showPlayIcon,
      startRecording,
      stopRecording,
      retakeVideo,
      confirmVideo,
      closeCameraModal,
      openCameraModal,
      formatTime,
      playVideo,
      hidePlayButton,
      showPlayButton,
      display_name,
      currentStep,
      steps,
    };
  },
};
</script>

<style scoped>
</style>
