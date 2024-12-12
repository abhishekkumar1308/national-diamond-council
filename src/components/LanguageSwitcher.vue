<template>
  <div class="relative">
    <select
        id="language-select"
        v-model="selectedLanguage"
        @change="changeLanguage"
        class="w-24 h-9 bg-lang-l-orange border-[1px] border-lang-b-orange  pl-3 rounded-full text-gray-700 appearance-none focus:outline-none"
    >
      <option value="en">English</option>
      <option value="hi">Hindi</option>
    </select>
    <span class="absolute inset-y-0 right-0 flex mt-3 pr-2 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </span>
  </div>
</template>

<script>
export default {
  name: 'LanguageSwitcher',
  data() {
    return {
      selectedLanguage: this.$i18n.locale || 'en', // Default to current locale or 'en'
    };
  },
  methods: {
    // Method to change language and store it in localStorage
    changeLanguage() {
      localStorage.setItem('language', this.selectedLanguage); // Save language to localStorage
      this.$i18n.locale = this.selectedLanguage; // Update i18n locale
    },
  },
  mounted() {
    // Check if language is saved in localStorage and apply it
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      this.selectedLanguage = savedLanguage;
      this.$i18n.locale = savedLanguage;
    }
  },
};
</script>

<style scoped>
/* Additional styles if needed */
</style>
