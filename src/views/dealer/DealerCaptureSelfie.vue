<template>
  <div class="relative h-screen flex flex-col justify-between">
    <!-- Main Content -->
    <div class="top-0 left-0 right-0 bg-top-img bg-cover bg-center bg-no-repeat h-[45%] z-10">
      <div class="flex justify-between items-center">
        <!-- Left Logo -->
        <img src="@/assets/images/logo.png" class="px-4 pt-4" alt="Birla Opus" />
        <div class="flex mt-4">
          <LanguageSwitcher />
        </div>
        <img src="@/assets/logo.svg" class="px-4 pt-4" alt="Birla Group" />
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

    <!-- Take Selfie Button -->
    <div class="absolute bottom-0 left-0 right-0 h-[85%] bg-light-purple bg-cover bg-center bg-no-repeat" >
      <!-- Language Selection Section -->
      <div class="flex flex-col items-center justify-center space-y-6 mx-8 h-full">
        <!-- User Information -->
        <div class="flex px-4 justify-center z-20">
          <img :src="filePreview" alt="Selected Image" class="w-[12.5rem] h-[12rem] object-cover rounded-full mx-auto" />
        </div>
        <div class="text-center ">
          <h2 class="text-3xl font-semibold">{{ $t('Welcome') }}, {{ display_name }}!</h2>
          <p class="text-black font-normal px-8">{{ $t('Complete your profile by adding profile image') }}</p>
          <small class="text-black mb-6 font-semibold text-xs">Supported File Types: PNG, JPG (max 5 MB)</small>
        </div>
        <form @submit.prevent="handleSubmit">
          <button
            type="button"
            @click="openCameraModal"
            class="w-full p-2 px-5 mt-16 bg-yellow text-black font-semibold py-3 rounded-lg hover:bg-yellow-500 focus:outline-none"
          >
            {{ $t('Take a Selfie') }}
          </button>
          <span v-if="errors.file" class="text-red-500 text-sm mt-2">{{ errors.file }}</span>
        </form>

      </div>
    </div>

    <!-- Camera Modal for Selfie Capture -->
    <div v-if="cameraModalOpen" class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <button @click="closeCameraModal" class="absolute top-4 left-4 text-white text-2xl">
        <img v-if="showPreview" src="@/assets/images/arrow-black-left.svg" class="h-6 w-6" alt="Back arrow" />
        <img v-if="!showPreview" src="@/assets/images/arrow-white-left.svg" class="h-6 w-6" alt="Back arrow" />
      </button>
      <div  :class="['flex flex-col items-center w-full h-full', showPreview ? 'bg-extra-light-purple' : 'bg-dark-gray']">
        <!-- Top Heading & Subheading -->
        <div class="text-center mt-10 mb-4  py-5">
          <span v-if="!showPreview" class="text-xl text-white font-semibold">{{ $t("Take a Selfie") }}</span>
          <span v-else class="text-2xl text-black font-semibold">{{ $t("Check Selfie") }}</span>
          <p v-if="showPreview" class=" text-black">{{ $t('Make sure your selfie clearly shows your face') }}</p>
        </div>

        <!-- Camera Preview or Captured Image -->
        <div v-if="!showPreview" class="relative w-full h-[80%] flex justify-center items-center">
          <video ref="video" autoplay playsinline class="w-full h-full object-cover"></video>
          <button @click="captureSelfie" class="absolute bottom-8 bg-yellow-500 text-black rounded-full p-4 shadow-lg">

            <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="35" cy="35" r="33" stroke="white" stroke-width="4"/>
              <circle cx="35" cy="35" r="28" fill="white"/>
            </svg>

          </button>
        </div>

        <!-- Captured Image Preview with Retake and Confirm Buttons -->
        <div v-else class="w-full h-[80%] flex flex-col items-center">
          <img :src="filePreview" alt="Captured Selfie" class="w-full h-full object-cover mx-auto  mt-6" />
          <div class="flex justify-between mt-2 px-4 w-full">
            <button @click="retakeSelfie" class="bg-white text-black border border-yellow px-8 py-2 rounded">Retake</button>
            <button @click="confirmSelfie" class="bg-yellow border border-yellow text-black px-8 py-2 rounded">Confirm</button>
          </div>
        </div>
      </div>

      <!-- Close Camera Modal Button -->
      <button @click="closeCameraModal" class="absolute top-4 right-4 text-white text-2xl">
        <img v-if="showPreview" src="@/assets/images/close-black.svg" class="h-6 w-6" alt="Back arrow" />
        <img v-if="!showPreview" src="@/assets/images/close-white.svg" class="h-6 w-6" alt="Back arrow" />
      </button>
    </div>
  </div>
</template>

<script>
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import { useAuthStore } from "@/stores/auth";
import api from "@/plugins/axios";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

export default {
  components: {
    LanguageSwitcher,
  },
  setup() {
    const authStore = useAuthStore();
    const display_name = computed(() => authStore.dealer?.name || "Guest");
    const filePreview = ref(require('@/assets/images/default-pic.png'));
    const errors = ref({ file: "" });
    const steps = ["Verify Account", "Take a Selfie", "Add Images"];
    const currentStep = ref(2);
    const cameraModalOpen = ref(false);
    const video = ref(null);
    const showPreview = ref(false);
    const selfieConfirmed = ref(false);
    onMounted(async () => {
      try {
        const response = await api.get("/api/v1.0/media/profile-pic");
        if (response?.data?.status && response.data?.selfie) {
          filePreview.value = process.env.VUE_APP_API_BASE_URL+'/'+response.data.selfie;
        }
      } catch (error) {
        console.error("Error loading profile picture:", error);
      }
    });

    const openCameraModal = async () => {
      cameraModalOpen.value = true;
      showPreview.value = false;
      selfieConfirmed.value = false;
      await startCamera();
    };

    const closeCameraModal = () => {
      cameraModalOpen.value = false;
      stopCamera();
    };

    const startCamera = async () => {
      if (navigator.mediaDevices?.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          video.value.srcObject = stream;
        } catch (error) {
          console.error("Camera access denied", error);
          errors.value.file = "Camera access is required to take a selfie.";
        }
      }
    };

    const stopCamera = () => {
      const stream = video.value?.srcObject;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        video.value.srcObject = null;
      }
    };

    const captureSelfie = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.value.videoWidth;
      canvas.height = video.value.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video.value, 0, 0);
      filePreview.value = canvas.toDataURL("image/png");
      showPreview.value = true;
      stopCamera();
    };

    const retakeSelfie = () => {
      filePreview.value = null;
      showPreview.value = false;
      startCamera();
    };

    const confirmSelfie = () => {
      selfieConfirmed.value = true; // Mark selfie as confirmed
      closeCameraModal();
      uploadSelfie();
    };

    const uploadSelfie = async () => {
      if (!filePreview.value) {
        errors.value.file = "No file to upload";
        return;
      }

      try {
        const formData = new FormData();
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        formData.append("file", dataURItoBlob(filePreview.value), `${timestamp}-selfie.png`);

        const response = await api.post("/api/v1.0/media/upload-profile", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.data.status) {
          //add route to redirect on link page
        }
      } catch (error) {
        console.error("File upload error:", error);
        errors.value.file = error?.response?.data?.error || "File upload failed, please try again.";
      }
    };

    const dataURItoBlob = (dataURI) => {
      const byteString = atob(dataURI.split(",")[1]);
      const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    };

    onBeforeUnmount(() => {
      if (filePreview.value) {
        URL.revokeObjectURL(filePreview.value);
      }
    });

    return {
      video,
      cameraModalOpen,
      filePreview,
      showPreview,
      selfieConfirmed, // Make selfieConfirmed available in the template
      errors,
      steps,
      currentStep,
      openCameraModal,
      closeCameraModal,
      captureSelfie,
      retakeSelfie,
      confirmSelfie,
      uploadSelfie,
      display_name,
    };
  },
};
</script>

<style scoped>
.overlay-mask {
  @apply absolute inset-0 bg-black bg-opacity-80;
  clip-path: ellipse(45% 55% at center);
}
</style>
