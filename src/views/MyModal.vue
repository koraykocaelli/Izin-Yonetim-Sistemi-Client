<template>
    <div>
      <button @click="openModal">Open Modal</button>
      <VueFinalModal v-if="isOpen" @close="isOpen = false">
        <h1>My Modal</h1>
        <p>This is the content of my modal.</p>
        <button @click="closeModal">Close Modal</button>
      </VueFinalModal>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { VueFinalModal } from 'vue-final-modal';
  
  export default {
    components: {
      VueFinalModal,
    },
    setup() {
      const isOpen = ref(false);
  
      const openModal = () => {
        isOpen.value = true;
      };
  
      const closeModal = () => {
        isOpen.value = false;
      };
  
      return {
        isOpen,
        openModal,
        closeModal,
      };
    },
  };
  </script>