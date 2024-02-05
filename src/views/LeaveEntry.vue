<template>
  <div>
    <h1 class="page-title">İzin Girişi</h1>

    <form class="leave-entry-form">
      <div class="form-group">
        <label for="employee" class="form-label">Çalışan Seç:</label>
        <select id="employee" v-model="selectedEmployee" class="custom-select">
          <option v-for="employee in employees" :key="employee.id" :value="employee.id">
            {{ employee.firstName }} {{ employee.lastName }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="leaveDays" class="form-label">İzin Günleri:</label>
        <input type="number" id="leaveDays" v-model="leaveDays" class="custom-input" min="1" max="15" />
      </div>

      <button type="button" @click="submitLeave" class="custom-button">İzni Kaydet</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LeaveEntry',
  data() {
    return {
      employees: [
        { id: 1, firstName: 'İsim1', lastName: 'Soyisim1', email: 'email1@example.com', department: 'Departman1', leaveDays: 15 },
        { id: 2, firstName: 'İsim2', lastName: 'Soyisim2', email: 'email2@example.com', department: 'Departman2', leaveDays: 15 },
      ],
      selectedEmployee: null,
      leaveDays: 1, 
    };
  },
  methods: {
    submitLeave() {
      if (this.selectedEmployee !== null) {
        const employee = this.employees.find(emp => emp.id === this.selectedEmployee);
        if (employee) {
          
          const updatedLeaveDays = employee.leaveDays - this.leaveDays;
          this.$emit('updateLeaveDays', this.selectedEmployee, updatedLeaveDays);
          console.log('Çalışana Verilen İzin:', {
            employeeId: this.selectedEmployee,
            leaveDays: this.leaveDays,
          });
        }
      }
    },
  },
};
</script>

<style scoped>
  .page-title {
    font-size: 40px;
    text-align: center;
    margin-bottom: 20px;
  }

  .leave-entry-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 600px;
    margin: 0 auto;
  }

  .form-group {
    width: 100%;
    margin-bottom: 15px;
  }

  .form-label {
    display: block;
    margin-bottom: 5px;
    font-size: 20px;
  }

  .custom-select,
  .custom-input {
    width: 100%;
    height: 35px;
    font-size: 14px;
    padding: 5px;
    box-sizing: border-box;
  }

  .custom-button {
    width: 100%;
    height: 40px;
    font-size: 20px;
    background-color: #3498db;
    color: #fff;
    border: none;
    cursor: pointer;
  }

  .custom-button:hover {
    background-color: #2980b9;
  }
</style>
