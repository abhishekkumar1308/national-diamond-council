<template>
  <div class="relative h-screen flex flex-col justify-between">
    <!-- Top Section with Logos and Language Switcher -->
    <div class="absolute top-0 left-0 right-0 bg-top-img bg-cover from-white to-indigo-400 h-[40%] z-10">
      <div class="flex justify-between px-4 pt-2 h-20">
        <img src="@/assets/images/birlaopus-s1.svg" class="h-16" alt="Birla Opus Logo" />
        <div class="flex mt-4">
          <LanguageSwitcher />
        </div>
        <img src="@/assets/logo.svg" class="h-16 mt-2" alt="Birla Group Logo" />
      </div>
      <!-- Steps Navigation (Progress Bar) -->
      <div class="flex items-center w-full ">
        <!-- Step 1 -->
        <div class="flex flex-col items-center w-1/3">
          <div class="flex items-center w-full">
            <div class="flex-auto h-[2px]" :class="currentStep >= 1 ? 'bg-lang-b-orange' : 'bg-grayish'"></div>
            <div class="w-3 h-3 rounded-full" :class="currentStep >= 1 ? 'bg-lang-b-orange' : 'bg-grayish'"></div>
            <div class="flex-auto h-[2px]" :class="currentStep >= 2 ? 'bg-lang-b-orange' : 'bg-grayish'"></div>
          </div>
          <span class="text-sm mt-2">{{ $t('Verify Account') }}</span>
        </div>

        <!-- Step 2 -->
        <div class="flex flex-col items-center w-1/3">
          <div class="flex items-center w-full">
            <div class="flex-auto h-[2px]" :class="currentStep >= 2 ? 'bg-lang-b-orange' : 'bg-grayish'"></div>
            <div class="w-3 h-3 rounded-full" :class="currentStep >= 2 ? 'bg-lang-b-orange' : 'bg-grayish'"></div>
            <div class="flex-auto h-[2px]" :class="currentStep >= 3 ? 'bg-lang-b-orange' : 'bg-grayish'"></div>
          </div>
          <span class="text-sm mt-2">{{ $t('Take a Selfie') }}</span>
        </div>

        <!-- Step 3 -->
        <div class="flex flex-col items-center w-1/3">
          <div class="flex items-center w-full">
            <div class="flex-auto h-[2px]" :class="currentStep >= 3 ? 'bg-lang-b-orange' : 'bg-grayish'"></div>
            <div class="w-3 h-3 rounded-full" :class="currentStep >= 3 ? 'bg-lang-b-orange' : 'bg-grayish'"></div>
            <div class="flex-auto h-[2px]" :class="currentStep >= 3 ? 'bg-lang-b-orange' : 'bg-grayish'"></div>
          </div>
          <span class="text-sm mt-2">{{ $t('Add Images') }}</span>
        </div>
      </div>

      <div class="flex px-4 justify-center mt-[5rem]">
        <div v-if="filePreview" >
        <img :src="filePreview" alt="Selected Image" class="w-[12.5rem] h-[12rems] object-cover rounded-full mx-auto" />
      </div>
      </div>
      <div class="flex flex-col px-4 text-center justify-center">
          <h2 class="text-2xl font-bold">{{ $t('Welcome') }}, {{ display_name }}!</h2>
          <p class="text-dark-gray px-4">
            {{ $t('Complete your profile by adding profile image') }}
          </p>
          <small class="text-dark-gray mb-6 font-semibold text-xs">Supported File Types: PNG, JPG (max 5 MB)</small>

      </div>
    </div>

    <!-- Login Form Section -->
    <div class="bg-light-purple bg-cover h-full flex flex-col justify-center z-0 mt-32 pt-24">

      <div class="flex flex-col items-center justify-center space-y-4 pt-32 mx-8">



        <form @submit.prevent="handleSubmit">
          <input
            type="file"
            ref="fileInput"
            class="hidden"
            @change="handleFileChange"
            accept="image/png, image/jpeg"
          />
          <button
              type="button"
              @click="triggerFileInput"
              class="w-full p-2 px-5 mt-5 bg-yellow text-black font-semibold py-3 rounded-lg hover:bg-yellow-500 focus:outline-none"
          >
            {{ $t('Take a Selfie') }}
          </button>
          <span v-if="errors.file" class="text-red-500 text-sm mt-2">{{ errors.file }}</span>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import { useAuthStore } from "@/stores/auth";
import api from "@/plugins/axios";
import { ref, computed, onBeforeUnmount } from "vue";

export default {
  components: {
    LanguageSwitcher,
  },
  setup() {
    const authStore = useAuthStore();
    const display_name = computed(() => authStore.contractor?.name || "Guest");
    const file = ref(null);
    const fileInput = ref(null);
    const filePreview = ref(require('@/assets/images/default-pic.png'));
    const errors = ref({ file: "" });

    const triggerFileInput = () => fileInput.value.click();

    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      if (!selectedFile) return;

      if (selectedFile.size > 5 * 1024 * 1024) {
        errors.value.file = "File size must be under 5 MB.";
        return;
      }

      if (!["image/png", "image/jpeg"].includes(selectedFile.type)) {
        errors.value.file = "Only PNG and JPG files are supported.";
        return;
      }

      file.value = selectedFile;
      filePreview.value = URL.createObjectURL(selectedFile);
      errors.value.file = "";
    };

    const handleSubmit = async () => {
      if (!file.value) {
        errors.value.file = "Please select a file.";
        return;
      }

      try {
        const formData = new FormData();
        formData.append("file", file.value);

        const response = await api.post("/api/v1.0/media/upload_profile_pic", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.status) {
          console.log("File uploaded successfully:", response);
        } else {
          errors.value.file = "File upload failed, please try again.";
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        errors.value.file = "Error uploading file, please try again later.";
      }
    };

    onBeforeUnmount(() => {
      if (filePreview.value) {
        URL.revokeObjectURL(filePreview.value);
      }
    });

    return {
      authStore,
      display_name,
      file,
      fileInput,
      filePreview,
      errors,
      triggerFileInput,
      handleFileChange,
      handleSubmit,
      currentStep: 2,
    };
  },
};
</script>

<style scoped>
/* Add any custom styling here */
</style>
