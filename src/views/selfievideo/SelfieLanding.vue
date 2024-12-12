<template>
  <div class="relative h-screen flex flex-col justify-between">
    <!-- Top Section -->
    <div class="top-0 left-0 right-0 bg-top-img bg-cover from-black to-indigo-400 z-10">
      <!-- Top Logos -->
      <div class="flex justify-between items-center">
        <!-- Left Logo -->
        <img src="@/assets/images/logo.png" class="px-4 pt-4" alt="Birla Opus" />
        <!-- Right Logo -->
        <img src="@/assets/logo.svg" class="px-4 pt-4" alt="Birla Group" />
      </div>
      <div class="flex justify-center items-center bg-extra-light-purple py-5">
        <img src="@/assets/images/bg-s1.svg" class="w-full" alt="" />
      </div>
    </div>

    <!-- Bottom Section with Background Image Covering Height -->
    <div class="absolute top-[42%] left-0 right-0 h-[62%] bg-s2-bottom-img bg-cover bg-center bg-no-repeat z-20" >
      <!-- Language Selection Section -->
      <div class="flex flex-col items-center justify-center space-y-6 mx-8 h-full">

        <!-- Title -->
        <h1 class="text-black text-2xl font-poppins-bold text-center font-semibold">
          {{ $t('Select Your Preferred Language') }}
        </h1>

        <!-- Language Dropdown -->
        <div class="w-full max-w-sm relative">
          <select
            v-model="selectedLanguage"
            :class="['w-full h-12 bg-transparent border px-4 rounded-lg text-black appearance-none focus:outline-none', hasError ? 'border-red-500' : 'border-black']"
            @change="changeLanguage"
          >
            <option value="" class="text-black">{{ $t("Select a Language") }}</option>
            <option
              v-for="(language, code) in languages"
              :key="code"
              :value="code"
              class="text-black"
            >
              {{ language }}
            </option>
          </select>
          <!-- Custom dropdown icon (optional) -->
          <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <svg
              class="w-5 h-5 text-black"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>

        <!-- Error Message -->
        <p v-if="hasError" class="text-red-500 text-sm">{{ $t("Please select a language") }}</p>


        <button
          @click="handleContinue"
          class="w-full h-12 btn bg-yellow text-black max-w-sm px-4 bg-yellow-400 mt-5 font-semibold rounded-lg hover:bg-yellow-500 focus:outline-none"
        >
          {{ $t("Continue") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelfieLanding",
  data() {
    return {
      selectedLanguage: "", // Track selected language
      languages: {
        "en": "English",
        "hi": "Hindi",
        "mr": "Marathi",
        "gu": "Gujarati",
        "pa": "Punjabi",
        "ml": "Malayalam",
        "te": "Telugu",
        "ta": "Tamil",
        "kn": "Kannada",
        "bn": "Bengali",
        "as": "Assamese",
        "or": "Oriya (Odia)"
      },

      hasError: false, // Track error state
    };
  },
  methods: {
    // Handle language change and store it in localStorage
    changeLanguage() {
      localStorage.setItem("language", this.selectedLanguage); // Save language in localStorage
      this.$i18n.locale = this.selectedLanguage; // Update the i18n locale dynamically
    },

    // Handle continue button action
    handleContinue() {
      if (this.selectedLanguage === "") {
        this.hasError = true; // Show error if no language selected
      } else {
        this.hasError = false;
        this.$router.push({ path: '/selfie/video-type'/*, query: { language: this.selectedLanguage }*/ });
      }
    },
  },

  mounted() {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      this.selectedLanguage = savedLanguage; // Set selected language from localStorage
      this.$i18n.locale = savedLanguage; // Update the i18n locale
    }
  },
};
</script>

<style scoped>
.bg-s2-bottom-img {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
