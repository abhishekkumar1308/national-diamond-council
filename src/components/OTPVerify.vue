<template>
  <form>
    <!-- Name and Mobile (Read-only) -->
    <SuccessAlert v-if="alertType === 'success'" :title="alertTitle" :message="alertMessage" ref="successAlert" />
    <DangerAlert v-if="alertType === 'danger'" :title="alertTitle" :message="alertMessage" ref="dangerAlert" />
    <div class="w-full mb-4">
      <label >{{ $t('Your Name') }}</label>
      <input
        type="text"
        :value="authStore[redirect]?.name || ''"
        readonly
        class="w-full border border-gray-300 p-3 rounded-lg bg-gray-100"
      />
    </div>
    <div class="w-full mb-4">
      <label >{{ $t('Your Mobile Number') }}</label>
      <input
        type="text"
        :value="authStore[redirect]?.mobile || ''"
        readonly
        class="w-full border border-gray-300 p-3 rounded-lg bg-gray-100"
      />
    </div>

    <!-- OTP Inputs -->
    <div class="mb-4 w-full flex justify-center space-x-2">
      <input
        v-for="(value, index) in otp"
        :key="index"
        type="text"
        maxlength="1"
        v-model="otp[index]"
        class="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        @input="focusNext(index)"
        @keydown.backspace="focusPrevious(index, $event)"
        ref="otpInput"
      />
    </div>

    <!-- Resend OTP Link -->
    <div class="flex justify-center items-center text-sm mb-4">
      <p>{{ $t('Not received OTP?') }}</p>
      <button @click="resendOtp" type="button" class="text-lang-b-orange ml-2">{{ $t('Resend OTP') }}</button>
    </div>
    <!-- Checkbox and Terms -->
    <div class=" items-start mb-4">
      <div class="flex items-center">
        <input
          id="terms"
          type="checkbox" checked  aria-readonly="true"
          class="h-4 w-4 border-black rounded justify-center align-middle checked:bg-transparent checked:border-black checked:text-black"
      />
        <label for="terms" class="ml-2 text-sm text-black">
          <span v-html="consentMessage"></span>
        </label>
      </div>

    </div>
    <div class="flex justify-between w-full ">
    <a href="/dealer/login" class="text-xl text-center block bg-yellow px-5 py-4 rounded-lg">{{ $t('Back') }}</a>
    <!-- Verify OTP Button -->
    <button type="button"
      @click="verifyOtp"
      class="bg-yellow text-black font-semibold px-5 py-4 rounded-lg hover:bg-yellow-500 focus:outline-none"
    >
      {{ $t('Verify OTP') }}
    </button>
    </div>
  </form>
</template>

<script>
import api from '@/plugins/axios';
import { useAuthStore } from '@/stores/auth';
import SuccessAlert from '@/components/alerts/SuccessAlert.vue';
import DangerAlert from '@/components/alerts/DangerAlert.vue';

export default {
  name: 'OTPVerify',
  components: {
    SuccessAlert,
    DangerAlert,
  },
  props: {
    name: {
      type: String,
      required: true
    },
    mobile: {
      type: String,
      required: true
    },
    redirect: {
      type: String,
      required: true,
      validator: value => ['dealer', 'contractor', 'selfie'].includes(value)
    }
  },
  data() {
    return {
      otp: Array(6).fill(""),
      alertType: '',
      alertTitle: '',
      alertMessage: '',
      finalAction: {
        dealer: "/dealer/take-selfie",
        contractor: "/contractor/take-selfie",
        selfie: "/selfie/video"
      },
      errors: {
        otp: ""
      },
    };
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  methods: {
    // Move focus to the next OTP input
    focusNext(index) {
      if (this.otp[index] && index < 5) {
        this.$refs.otpInput[index + 1].focus();
      }
    },

    // Move focus back on backspace if the input is empty
    focusPrevious(index, event) {
      if (event.key === 'Backspace' && index > 0 && !this.otp[index]) {
        this.$refs.otpInput[index - 1].focus();
      }
    },

    // Resend OTP
    async resendOtp() {
      try {
        const response = await api.post('/api/v1.0/auth/send-otp', {
          name: this.authStore[this.redirect].name,
          mobile_number: this.authStore[this.redirect].mobile,
          user_type: this.authStore.user_type,
        });
        if (response?.data?.status) {
          this.showAlert('success', 'Success!', response.data.message);
        } else {
          this.showAlert('danger', 'Error', response?.data?.error || 'Failed to send OTP, please try again.');
        }
      } catch (error) {
        console.error('Error sending OTP:', error);
        this.showAlert('danger', 'Error', error.response?.data?.error || 'Something went wrong. Please try again.');
      }
    },
    // Validate and verify OTP
    async verifyOtp() {
      const otpString = this.otp.join("");
      if (otpString.length !== 6) {
        this.showAlert('danger', 'Invalid OTP', 'Please enter a valid 6-digit OTP.');
        return;
      }

      try {
        const languages = {
          "mr": "Marathi",
          "gu": "Gujarati",
          "pa": "Punjabi",
          "ml": "Malayalam",
          "te": "Telugu",
          "ta": "Tamil",
          "kn": "Kannada",
          "bn": "Bengali",
          "as": "Assamese",
          "or": "Oriya",
          "en": "English",
          "hi": "Hindi"
        };
        // Make API call for OTP verification
        const response = await api.post("/api/v1.0/auth/verify-otp", {
          name: this.name,
          mobile_number: this.mobile,
          otp: otpString,
          language:languages[localStorage.getItem('language')],
          user_type: this.authStore.user_type,
          tvc_video:this.authStore?.selfie?.tvc_video
        });
        if (response?.data?.status) {
          localStorage.setItem('access_token', response.data.token.access_token);
          if (this.redirect === 'selfie') {
            this.authStore.loginSelfie({ userId: 0, name: this.name, mobile: this.mobile,isAuthenticated:true });
          }else if (this.redirect === 'dealer') {
            this.authStore.loginDealer({ userId: 0, name: this.name, mobile: this.mobile,isAuthenticated:true });
          } else if (this.redirect === 'contractor') {
            this.authStore.loginContractor({ userId: 0, name: this.name, mobile: this.mobile,isAuthenticated:true });
          }
          this.$router.push(this.finalAction[this.redirect]);
        } else {
          this.showAlert('danger', 'Error', 'Invalid OTP, please try again.');
        }
      } catch (error) {
        console.error('Error verifying OTP:', error);
        this.showAlert('danger', 'Error', error.response?.data?.error || 'Something went wrong. Please try again.');
      }
    },
    showAlert(type, title, message) {
      this.alertType = type;
      this.alertTitle = title;
      this.alertMessage = message;

      // Reset and show the appropriate alert component
      if (type === 'success') {
        this.$refs.successAlert?.resetAlert();
      } else if (type === 'danger') {
        this.$refs.dangerAlert?.resetAlert();
      }
    },
  },
  computed: {
    consentMessage() {
      const termsLink = `<a href="/terms" class="text-indigo-500 underline">${this.$t('terms_link_text')}</a>`;
      return this.$t("consent_message", { terms: termsLink });
    },
  }
};
</script>

<style scoped>
/* Additional styling */
</style>
