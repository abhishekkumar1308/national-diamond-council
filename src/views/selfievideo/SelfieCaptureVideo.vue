<template>
  <div class="relative h-screen flex flex-col justify-between">
    <!-- Header Section -->
    <div :class="['top-0 left-0 right-0 bg-cover bg-center bg-no-repeat z-10', formStep ? 'bg-sm-top-img' : 'bg-light-purple', 'h-[14rem] sm:h-[10rem] lg:h-[18rem]']">
      <div class="flex justify-between items-center px-4 pt-4">
        <!-- Left Logo -->
        <img src="@/assets/images/logo.png" class="w-20 sm:w-24 md:w-28 lg:w-32" alt="Birla Opus" />
        <!-- Language Switcher -->
        <div class="flex mt-4">
          <LanguageSwitcher />
        </div>
        <!-- Right Logo -->
        <img src="@/assets/logo.svg" class="w-20 sm:w-24 md:w-28 lg:w-32" alt="Birla Group" />
      </div>

      <!-- Progress Steps -->
      <div class="flex items-center w-full mt-4 sm:mt-6 md:mt-8">
        <div v-for="(step, index) in steps" :key="index" class="flex flex-col items-center w-1/3">
          <div class="flex items-center w-full">
            <div class="flex-auto h-[2px]" :class="currentStep >= index + 1 ? 'bg-lang-b-orange' : 'bg-grayish'"></div>
            <div class="w-3 h-3 rounded-full" :class="currentStep >= index + 1 ? 'bg-lang-b-orange' : 'bg-grayish'"></div>
            <div class="flex-auto h-[2px]" :class="currentStep > index + 1 ? 'bg-lang-b-orange' : 'bg-grayish'"></div>
          </div>
          <span class="text-xs sm:text-sm mt-2">{{ step }}</span>
        </div>
      </div>
    </div>

    <!-- Video Capture Section -->
    <div v-if="formStep" class="absolute bottom-0 left-0 right-0 h-[43rem] bg-light-purple bg-cover bg-center bg-no-repeat py-6 sm:py-8">
      <div class="text-center mt-12 sm:mt-16 px-6 sm:px-8">
        <h2 class="text-lg sm:text-xl md:text-2xl font-semibold">{{ $t('Welcome') }}, {{ display_name }}!</h2>
        <p class="text-black font-normal mt-3 text-sm sm:text-base">
          {{ $t('Record a video and submit to be part of the ad campaign!') }}
        </p>

        <div class="mt-12 sm:mt-16 px-4 sm:px-6 md:px-8">
          <div class="flex items-center text-sm sm:text-base">
            <img src="@/assets/images/bulb.svg" alt="bulb" class="mr-2 w-4 sm:w-5" />
            <p>{{ $t('Tips while creating your video!') }}</p>
          </div>

          <!-- Tips Section -->
          <div class="bg-white p-4 mt-4 rounded max-h-[30rem] sm:max-h-[40rem] overflow-y-auto divide-y divide-gray-200">
            <!-- Tip item start -->
            <div class="flex items-center py-3">
              <img src="@/assets/images/bulb.svg" alt="bulb" class="mr-2 w-5 h-5 sm:w-5">
              <p class="text-xs sm:text-sm">{{ $t('Showcase your best in 15 sec') }}</p>
            </div>
            <div class="flex items-center py-3">
              <img src="@/assets/images/bulb.svg" alt="bulb" class="mr-2 w-5 h-5 sm:w-5">
              <p class="text-xs sm:text-sm">{{ $t('Use minimal background noise and avoid busy/cluttered backgrounds') }}</p>
            </div>
            <div class="flex items-center py-3">
              <img src="@/assets/images/bulb.svg" alt="bulb" class="mr-2 w-5 h-5 sm:w-5">
              <p class="text-xs sm:text-sm">{{ $t('Align the camera at eye level and at a distance that captures you') }}</p>
            </div>
            <div class="flex items-center py-3">
              <img src="@/assets/images/bulb.svg" alt="bulb" class="mr-2 w-5 h-5 sm:w-5">
              <p class="text-xs sm:text-sm">{{ $t('Look Directly at the Camera') }}</p>
            </div>
            <!-- Tip item end -->
          </div>
        </div>
        <button @click="openCameraModal" class="text-black sm:mt-8 bg-yellow px-5 py-2 mt-5 ">
          <span>Record a Selfie Video</span>
        </button>
      </div>
    </div>
    <div v-if="!formStep" class="absolute bottom-0 left-0 right-0 h-[48rem] bg-light-purple bg-cover bg-center bg-no-repeat py-16 sm:py-24">
      <div class="text-center" >


        <div class="text-center mt-12 sm:mt-16 px-6 sm:px-8">
          <h2 class="text-lg sm:text-xl md:text-2xl font-semibold">{{ $t('Welcome') }}, {{ display_name }}!</h2>
          <p class="text-black font-normal px-8 mt-3 bt-5 text-sm sm:text-base">
            {{display_phone}}
          </p>
          <DangerAlert v-if="alertType === 'danger'" :title="alertTitle" :message="alertMessage" ref="dangerAlert" />
        </div>

          <div class=" relative p-4 divide-y divide-gray-200 max-h-[54rem] overflow-y-auto sm:mt-8">
            <video
                v-if="videoPreview"
                :src="videoPreview"
                ref="previewVideo"
                playsinline
                controls
                @play="hidePlayButton"
                @pause="showPlayButton"
                @ended="showPlayButton"
                class="w-full h-full object-cover rounded"
            ></video>
            <!-- Play Button Overlay -->
<!--            <div
                v-if="videoPreview && showPlayIcon"
                @click="playVideo"
                class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer"
            >
              <svg class="w-16 h-16 text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 22v-20l18 10-18 10z" />
              </svg>
            </div>-->

          </div>
          <div v-if="videoPreview" class="absolute bottom-8 flex justify-between w-full px-8">
            <button @click="openCameraModal" class="bg-white text-black px-4 py-2 rounded border border-yellow">Record Again</button>
            <button @click="confirmVideo" class="bg-yellow text-black px-4 py-2 rounded">Confirm</button>
          </div>
        </div>
      <div v-if="showPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg p-6 w-80 text-center relative shadow-lg">
          <button @click="closeModal" class="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
            <img  src="@/assets/images/close-black.svg" class="h-6 w-6" alt="Back arrow" />
          </button>
          <div class="flex flex-col items-center">
            <!-- Success Icon -->
            <div class="p-4 rounded-full mb-4">
              <img src="@/assets/images/check-icon.svg" alt="Success">
            </div>
            <!-- Success Message -->
            <h2 class="text-lg sm:text-xl font-semibold mb-2">Video request submitted successfully!</h2>
            <p class="text-gray-600 text-sm">
              Requested video will be shared on the registered number via WhatsApp in the next 1 hour.
            </p>
          </div>
        </div>
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


        <!-- Start/Stop and Confirm/Retake Buttons -->
        <div v-if="!videoPreview" class="absolute rounded-b-md bottom-0 text-center left-1/2 transform -translate-x-1/2 bg-rose-white w-full p-5">
          <button @click="stopRecording" >

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
        <!-- Close Button -->
        <button @click="closeCameraModal" class="absolute top-4 right-4 text-white text-2xl hidden">
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
import DangerAlert from "@/components/alerts/DangerAlert.vue";

export default {
  components: {
    DangerAlert,
    LanguageSwitcher,
  },
  methods:{
    closeModal(){
      this.$router.push({
        name: "portfolio",
        params: {redirect: "selfie" }
      });
    },
  },
  setup() {
    const authStore = useAuthStore();
    const display_name = computed(() => authStore.selfie?.name || "Guest");
    const display_phone = computed(() => authStore.selfie?.mobile || "91");
    const video = ref(null);
    const previewVideo = ref(null);
    const mediaRecorder = ref(null);
    const recordedChunks = ref([]);
    const cameraModalOpen = ref(false);
    const isRecording = ref(false);
    const videoPreview = ref(null);
    const remainingTime = ref(5);
    const currentStep = ref(3);
    const steps = ["Verify Account", "Create Video", "Upload"];
    const showPlayIcon = ref(true);
    const formStep = ref(true);
    const showPopup = ref(false);
    const alertType = ref("");
    const alertTitle = ref("");
    const alertMessage = ref("");
    let timer = null;

    // Initialize Camera
    const startCamera = async () => {
      if (navigator.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true,audio: true });
        if (video.value) {
          video.value.srcObject = stream;
        }
        startRecording()
      }
    };
    const showAlert = (type, title, message) =>{
      alertType.value = type;
      alertTitle.value = title;
      alertMessage.value = message;

      // Reset and show the appropriate alert component
      if (type === 'danger') {
        setTimeout(() => {
          alertType.value = "";
          alertTitle.value = "";
          alertMessage.value = "";
        }, 5000);
      }
    }
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
      cameraModalOpen.value = false;
    };

    const handleRecordingComplete = () => {
      const blob = new Blob(recordedChunks.value, { type: "video/webm" });
      videoPreview.value = URL.createObjectURL(blob);
      showPlayIcon.value = true;
      formStep.value=false;
      stopCamera();
    };

    const retakeVideo = () => {
      videoPreview.value = null;
      showPlayIcon.value = true;
      startCamera();
    };

    const confirmVideo = async () => {
      if (recordedChunks.value.length === 0) {
        showAlert('danger', 'Error', 'No video recorded. Please record a video before uploading.');
        return;
      }
      const blob = new Blob(recordedChunks.value, { type: "video/webm" });
      const formData = new FormData();
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      formData.append("upload_video", blob, `${timestamp}-video.webm`);
      try{
        const response = await api.post("/api/v1.0/media/upload-video", formData, {headers: {"Content-Type": "multipart/form-data"}});
        closeCameraModal();
        if (response?.data?.status) {
          showPopup.value = true;
        } else {
          showAlert('danger', 'Error', response?.data?.message);
        }
      } catch (error) {
        const errorMessage =
            error.response?.data?.error ||
            error.response?.data?.message ||
            'An unexpected error occurred. Please try again.';
        showAlert('danger', 'Upload Error', errorMessage);
      }
    };

    const closeCameraModal = () => {
      stopCamera();
      cameraModalOpen.value = false;
    };

    const openCameraModal = () => {
      cameraModalOpen.value = true;
      retakeVideo();
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
      display_phone,
      currentStep,
      steps,
      formStep,
      showPopup,
      alertType,
      alertTitle,
      alertMessage
    };
  },
};
</script>

<style scoped>
</style>
