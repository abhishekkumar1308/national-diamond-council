<template>
  <div class="relative h-screen flex flex-col justify-between">
    <!-- Top Section with Logos and Language Switcher -->
    <div class="top-0 left-0 right-0 bg-cover bg-center bg-no-repeat h-[34%] z-10" :style="{ backgroundImage: `url(${require('@/assets/images/bg-top-login.svg')})` }">
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
    <div class="absolute bottom-0 left-0 right-0 h-[80%] bg-light-purple bg-cover bg-center bg-no-repeat" >
      <!-- Language Selection Section -->
      <div class="flex flex-col items-center justify-center mx-8 h-full">

        <div>
          <h2 class="text-3xl font-bold text-center">{{ $t('Hello!') }}</h2>
          <p class="text-center text-black-500 font-semibold mb-6">{{ $t('Sign in/Sign up to your account') }}</p>
        </div>
        <DangerAlert v-if="alertType === 'danger'" ref="dangerAlert" :title="alertTitle" :message="alertMessage"/>
        <!-- Form Inputs -->
        <form @submit.prevent="handleSubmit">

          <div class="mb-4">
            <label for="name" class="my-2">{{ $t('Your name') }}</label>
            <input
              type="text"
              id="name"
              v-model="name"
              @input="clearError('name')"
              class="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span>
          </div>

          <div class="mb-4">
            <label for="mobile">{{ $t('Enter mobile number') }}</label>
            <input
              type="tel"
              id="mobile"
              v-model="mobile"
              @input="clearError('mobile')"
              class="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span v-if="errors.mobile" class="text-red-500 text-sm">{{ errors.mobile }}</span>
          </div>

          <!-- Checkbox and Terms -->
          <div class="items-start mb-4">
            <div class="flex items-center"> <!-- items-center for vertical centering -->
              <input
                  id="terms"
                  type="checkbox"
                  v-model="acceptedTerms"
                  @change="clearError('acceptedTerms')"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label for="terms" class="ml-2 text-sm text-gray-600">
                <span v-html="consentMessage"></span>
              </label>
            </div>
            <span v-if="errors.acceptedTerms" class="text-red-500 text-sm">{{ errors.acceptedTerms }}</span>
          </div>


          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-yellow text-black font-semibold py-3 rounded-lg hover:bg-yellow-500 focus:outline-none"
          >
            {{ $t('Continue') }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import { useAuthStore } from '@/stores/auth';
import api from '@/plugins/axios';
import DangerAlert from "@/components/alerts/DangerAlert.vue";

export default {
  components: {
    DangerAlert,
    LanguageSwitcher,
  },
  data() {
    return {
      name: "",
      mobile: "",
      alertType: "",
      acceptedTerms: false,
      errors: {
        name: "",
        mobile: "",
        acceptedTerms: "",
      },
      currentStep: 1,
    };
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  methods: {
    clearError(field) {
      this.errors[field] = "";
    },
    handleSubmit() {
      this.errors = { name: "", mobile: "", acceptedTerms: "" };

      if (!this.name) this.errors.name = "Name is required";
      if (!this.mobile || !this.isValidMobile(this.mobile)) this.errors.mobile = "Valid mobile number is required";
      if (!this.acceptedTerms) this.errors.acceptedTerms = "You must agree to the terms and policy.";

      if (!this.errors.name && !this.errors.mobile && this.acceptedTerms) {
        this.sendOtp();
      }
    },
    isValidMobile(mobile) {
      const phoneRegex = /^[0-9]{10}$/;
      return phoneRegex.test(mobile);
    },
    async sendOtp() {
      try {
        const response = await api.post('/api/v1.0/auth/send-otp', {
          name: this.name,
          mobile_number: this.mobile,
          user_type: 'selfie-video',
        });

        if (response?.data?.status) {
          if (!this.authStore.selfie.name || this.authStore.selfie.mobile!==this.mobile) {
            this.authStore.loginSelfie({userId: 0, name: this.name, mobile: this.mobile});
          }
          this.$router.push({
            name: "otp-verify",
            params: {redirect: this.authStore.user_type }
          });
        } else {
          this.showAlert('danger', 'Error', response?.data?.message || 'Something went wrong. Please try again.');
        }
      } catch (error) {
        console.error("Error sending OTP:", error);
        this.showAlert('danger', 'Error', error.response?.data?.error || error.response?.data?.message || 'Something went wrong. Please try again.');

      }
    },
    showAlert(type, title, message) {
      this.alertType = type;
      this.alertTitle = title;
      this.alertMessage = message;
      if (type === 'success') {
        this.$refs.successAlert?.resetAlert();
      } else if (type === 'danger') {
        this.$refs.dangerAlert?.resetAlert();
      }
    }
  },
  computed: {
    consentMessage() {
      const termsLink = `<a href="/terms" class="text-indigo-500 underline">${this.$t('terms_link_text')}</a>`;
      return this.$t("consent_message", { terms: termsLink });
    },
  },
};
</script>

<style scoped>
/* Add any custom styling here */
</style>
