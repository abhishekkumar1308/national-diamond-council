<template>
  <div class="relative h-screen flex flex-col justify-between">
    <!-- Top Section -->
    <div class="top-0 left-0 right-0 bg-top-img bg-cover from-black to-indigo-400 z-10">
      <!-- Top Logos -->
      <div class="flex justify-between items-center px-4 py-4">
        <!-- Left Logo -->
        <img src="@/assets/images/birlaopus-s1.svg" class="w-24 sm:w-28 md:w-32 lg:w-40" alt="Birla Opus" />
        <!-- Right Logo -->
        <img src="@/assets/logo.svg" class="w-24 sm:w-28 md:w-32 lg:w-40" alt="Birla Group" />
      </div>
      <!-- Top Image -->
      <div class="flex justify-center items-center bg-extra-light-purple py-5">
        <img src="@/assets/images/bg-s1.svg" class="w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl" alt="" />
      </div>
    </div>

    <!-- Bottom Section with Background Image Covering Height -->
    <div class="absolute top-[42%] left-0 right-0 h-[62%] bg-s2-bottom-img bg-cover bg-center bg-no-repeat z-20">
      <!-- Language Selection Section -->
      <div class="flex flex-col items-center justify-center space-y-6 mx-4 sm:mx-8 lg:mx-16 h-full">
        <!-- Title -->
        <h1 class="text-black text-lg sm:text-xl md:text-2xl lg:text-3xl font-poppins-bold text-center font-semibold">
          {{ $t('Hey Kartik, your personalized video will be sent to your WhatsApp shortly!') }}
        </h1>
        <p class="text-black text-center my-3 sm:my-4 md:my-5 lg:my-6 text-sm sm:text-base">
          This is placeholder for the sub copy and can extend to three liner max
        </p>

        <button
          @click="handleContinue"
          class="w-full h-10 sm:h-12 btn bg-yellow text-black max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-4 bg-yellow-400 mt-4 font-semibold rounded-lg hover:bg-yellow-500 focus:outline-none"
        >
          {{ $t("Explore Opus") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelfiePortfolio",
  data() {
    return {
      selectedLanguage: "",
      hasError: false,
    };
  },
  methods: {
    changeLanguage() {
      localStorage.setItem("language", this.selectedLanguage);
      this.$i18n.locale = this.selectedLanguage;
    },
    handleContinue() {
      if (this.selectedLanguage === "") {
        this.hasError = true;
      } else {
        this.hasError = false;
        this.$router.push({ path: "/selfie/onboarding" });
      }
    },
  },
  mounted() {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      this.selectedLanguage = savedLanguage;
      this.$i18n.locale = savedLanguage;
    }
  },
};
</script>

<style scoped>
</style>
