<!-- Modal.vue -->
<template>
  <div class="modal" v-if="selectedEmployee">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Kalan İzin Günleri: </h2>
      <p>{{ selectedEmployee.dayOff }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['selectedEmployee'],
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
