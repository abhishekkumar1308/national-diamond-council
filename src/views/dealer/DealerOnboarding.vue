<template>
  <div class="relative h-screen flex flex-col">
    <!-- Top Section -->
    <div class="top-0 left-0 right-0 bg-top-img bg-cover  z-10">
      <!-- Top Logos -->
      <div class="flex justify-between items-center">
        <!-- Left Logo -->
        <img src="@/assets/images/logo.png" class="px-4 pt-4" alt="Birla Opus" />
        <div class="flex mt-4">
          <LanguageSwitcher />
        </div>
        <img src="@/assets/logo.svg" class="px-4 pt-4" alt="Birla Group" />
      </div>
      <div class="flex justify-center items-center bg-extra-light-purple py-5">
        <img src="@/assets/images/bg-s1.svg" class="w-full" alt="" />
      </div>
    </div>

    <!-- Bottom Section (70% Height, Overlapping with Top Section) -->
    <div class="absolute top-[42%] left-0 right-0 h-[62%] bg-s2-bottom-img bg-cover bg-center bg-no-repeat z-20" >
      <!-- Language Selection Section -->
      <div class="flex flex-col items-center justify-center space-y-6 mx-8 h-full">
        <!-- Title -->
        <h1 class="text-black text-[1.75rem] font-semibold text-center">
          {{ $t("Get your personalised portfolio of Vicky Kaushal promoting your business") }}
        </h1>

        <!-- Steps Section -->
        <div class="w-full max-w-sm mx-auto">
          <p class="text-black text-lg text-center mb-4">{{ $t("How it works") }}</p>
          <div class="flex items-top justify-between text-white">
            <!-- Step 1 -->
            <div class="flex flex-col items-center text-center">
              <div class="h-12 w-12 bg-black mb-2 flex justify-center items-center rounded-md">
                1
              </div>
              <span class="text-black text-sm">{{ $t("Verify Account") }}</span>
            </div>

            <!-- Line 1 (Flex container to ensure vertical alignment) -->
            <div class="flex items-center h-12">
              <img src="@/assets/images/line-s1.svg" alt="line" class="h-1 w-full" />
            </div>

            <!-- Step 2 -->
            <div class="flex flex-col items-center text-center">
              <div class="h-12 w-12 bg-black mb-2 flex justify-center items-center rounded-md">
                2
              </div>
              <span class="text-black text-sm">{{ $t("Take a Selfie") }}</span>
            </div>

            <!-- Line 2 (Flex container to ensure vertical alignment) -->
            <div class="flex items-center h-12">
              <img src="@/assets/images/line-s1.svg" alt="line" class="h-1 w-full" />
            </div>

            <!-- Step 3 -->
            <div class="flex flex-col items-center text-center">
              <div class="h-12 w-12 bg-black mb-2 flex justify-center items-center rounded-md">
                3
              </div>
              <span class="text-black text-sm">{{ $t("Add Images") }}</span>
            </div>
          </div>


        </div>

        <!-- Continue Button -->
        <div class="flex justify-center">
          <button @click="handleLetsStart"
              class="w-full h-12 bg-yellow text-black max-w-sm px-4 font-semibold rounded-lg hover:bg-yellow-500 focus:outline-none"
          >
            {{ $t("Let’s start") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";

export default {
  name: "DealerOnboarding",
  components: {LanguageSwitcher},
  methods: {
    handleLetsStart (){
      this.$router.push({path:'/dealer/login'});
    }
  }
};
</script>

<style scoped>
/* No custom CSS needed since we're using Tailwind's config */
</style>
