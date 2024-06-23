<template>
    <div class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      <div class="relative bg-white w-1/2 p-6 rounded-lg shadow-lg">
        <button class="absolute top-0 right-0 mt-4 mr-4 text-gray-700 hover:text-gray-900 cursor-pointer" @click="closePopup()">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div class="flex items-center">
          <div class="ml-4">
            <div class="text-xl font-bold mb-2">{{ title }}</div>
            <p class="text-gray-700">{{ message }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      message: {
        type: String,
        required: true
      }
    },
    methods: {
      closePopup() {
        this.$emit('close');
      }
    }
  };
  </script>