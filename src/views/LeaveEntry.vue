<template>
  <div>
    <h1>İzin Girişi</h1>

    <form>
      <label for="employee">Çalışan Seç:</label>
      <select id="employee" v-model="selectedEmployee">
        <!-- Liste -->
      </select>

      <label for="leaveDays">İzin Günleri:</label>
      <input type="number" id="leaveDays" v-model="leaveDays" />

      <button type="button" @click="submitLeave">İzni Kaydet</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LeaveEntry',
  data() {
    return {
      selectedEmployee: null,
      leaveDays: 0,
    };
  },
  methods: {
    submitLeave() {
      // İzin bilgilerini kaydet
      console.log('Çalışana Verilen İzin:', {
        employeeId: this.selectedEmployee,
        leaveDays: this.leaveDays,
      });
    },
  },
};
</script>

<style scoped></style>


<!-- <template>
    <div>
      <h2>Leave Entry</h2>
      <form @submit.prevent="submitLeave">
        <label for="employeeId">Çalışan Seçin:</label>
        <select v-model="selectedEmployee" required>
          <option v-for="employee in employees" :key="employee.id" :value="employee.id">
            {{ employee.firstName }} {{ employee.lastName }}
          </option>
        </select>
  
        <label for="leaveDays">İzin Günleri:</label>
        <input type="number" v-model="leaveDays" required />
  
        <button type="submit">İzin Girişi Yap</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        employees: [], // API 
        selectedEmployee: null,
        leaveDays: null
      };
    },
    mounted() {
      // API
    },
    methods: {
      submitLeave() {
        // API 
        console.log("İzin Girişi Yapıldı:", this.selectedEmployee, this.leaveDays);
      }
    }
  };
  </script>
  
  <style scoped>
  
  </style>
   -->
