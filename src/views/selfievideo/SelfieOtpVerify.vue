<template>
  <div class="relative h-screen flex flex-col justify-between">
    <!-- Top Section with Logos and Language Switcher -->
    <!-- Top Section with Logos and Language Switcher -->
    <div class="top-0 left-0 right-0 bg-cover bg-center bg-no-repeat h-[34%] z-20" :style="{ backgroundImage: `url(${require('@/assets/images/bg-top-login.svg')})` }">
      <div class="flex justify-between items-center">
        <!-- Left Logo -->
        <img src="@/assets/images/logo.png" class="px-4 pt-4" alt="Birla Opus" />
        <div class="flex mt-4">
          <LanguageSwitcher />
        </div>
        <img src="@/assets/logo.svg" class="px-4 pt-4" alt="Birla Group" />
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
      <div class="flex justify-center items-center">
        <img src="@/assets/images/vikcy-img.png" alt="" />
      </div>
    </div>

    <!-- Login Form Section -->
    <div class="absolute top-[28%] left-0 right-0 h-[70%] bg-light-purple bg-cover bg-center bg-no-repeat z-10" >
      <!-- Language Selection Section -->
      <div class="flex flex-col items-center justify-center space-y-6 mx-8 h-full">
        <div>

          <h2 class="text-3xl font-bold text-center">{{ $t('Hello!') }}</h2>
          <p class="text-center text-black-500 font-semibold mb-6">{{ $t('Sign in/Sign up to your account') }}</p>
        </div>

        <OTPVerify
            :name="authStore.selfie.name"
            :mobile="authStore.selfie.mobile"
            redirect="selfie"
        />

      </div>
    </div>
  </div>
</template>
<script>
import { useAuthStore } from "@/stores/auth";
import OTPVerify from "@/components/OTPVerify.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
export default {
  components:{
    LanguageSwitcher,
    OTPVerify,
  },
  data() {
    return {
      currentStep: 1,
    };
  },
  setup() {
    const authStore = useAuthStore();
    console.log(authStore.selfie.name);
    return { authStore };
  }
}
</script>