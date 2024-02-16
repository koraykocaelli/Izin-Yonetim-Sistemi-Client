<template>
  <VueFinalModal v-if="isOpen" @close="closeModal">
    <h1>Çalışanın İzin Günleri</h1>
    <p>Adı: {{ selectedEmployee.firstName }}</p>
    <p>Soyadı: {{ selectedEmployee.lastName }}</p>
    <p>Email: {{ selectedEmployee.email }}</p>
    <p>Departman: {{ selectedEmployee.department }}</p>
    <p>Kalan İzin Günleri: {{ selectedEmployee.leaveDays }}</p>
    <button @click="closeModal">Close Modal</button>
  </VueFinalModal>
</template>

<script>
import { ref } from 'vue';
import { VueFinalModal } from 'vue-final-modal';

export default {
  components: {
    VueFinalModal,
  },
  props: {
    selectedEmployee: Object // Ana bileşenden gelen seçili çalışan verisi
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
