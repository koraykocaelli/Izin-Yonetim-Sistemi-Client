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
        <input type="number" id="leaveDays" v-model="leaveDays" class="custom-input" min="1" />
      </div>

      <button type="button" @click="submitLeave" class="custom-button">İzni Kaydet</button>
    </form>
  </div>
</template>

<script>
import { getEmployees, updateLeaveDays } from '../common/api.service';

export default {
  name: 'LeaveEntry',
  data() {
    return {
      employees: [],
      selectedEmployee: null,
      leaveDays: 1,
    };
  },
  created() {
    this.getEmployees();
  },
  methods: {
    getEmployees() {
      getEmployees()
        .then(response => {
          this.employees = response.data;
        })
        .catch(error => {
          console.error('Çalışanları getirirken bir hata oluştu:', error);
        });
    },
    submitLeave() {
      if (this.selectedEmployee !== null && this.leaveDays > 0) {
        const employee = this.employees.find(emp => emp.id === this.selectedEmployee);
        if (employee) {
          const updatedLeaveDays = employee.leaveDays - this.leaveDays;
          updateLeaveDays(this.selectedEmployee, updatedLeaveDays)
            .then(() => {
              console.log('Çalışan izni güncellendi:', {
                employeeId: this.selectedEmployee,
                leaveDays: this.leaveDays,
              });
              // LeaveEntry.vue dosyasındaki veriyi güncelledikten sonra EmployeeList.vue dosyasındaki veriyi de güncelle
              const updatedEmployee = this.employees.find(emp => emp.id === this.selectedEmployee);
              if (updatedEmployee) {
                updatedEmployee.leaveDays = updatedLeaveDays;
              }
              this.resetForm();
            })
            .catch(error => {
              console.error('İzin güncelleme işlemi sırasında bir hata oluştu:', error);
            });
        }
      }
    },
    resetForm() {
      this.selectedEmployee = null;
      this.leaveDays = 1;
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
