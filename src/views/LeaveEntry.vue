<!-- LeaveEntry.vue -->
<template>
  <div class="container">
    <h1 class="page-title">İzin Girişi</h1>

    <form class="leave-entry-form" @submit.prevent="submitLeave">
      <div class="form-group">
        <label for="employee" class="form-label">Çalışan Seç:</label>
        <select id="employee" v-model="selectedEmployeeId" class="custom-select">
          <option :value="null">Seçiniz</option>
          <option v-for="employee in employees" :key="employee.id" :value="employee.id">
            {{ employee.firstName }} {{ employee.lastName }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="usedDayOff" class="form-label">Kullanılan İzin Günleri:</label>
        <input type="number" id="usedDayOff" v-model="usedDayOff" class="custom-input" min="1" max="15" />
      </div>

      <button type="submit" class="custom-button">İzni Kaydet</button>
    </form>
  </div>
</template>

<script>
import { getEmployees, updateEmployee } from '../common/api.service';

export default {
  name: 'LeaveEntry',
  data() {
    return {
      employees: [],
      selectedEmployeeId: null,
      usedDayOff: 1,
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
          console.error('Error fetching employees:', error);
        });
    },
    submitLeave() {
      if (this.selectedEmployeeId || this.usedDayOff > 0) {
        const selectedEmployee = this.employees.find(emp => emp.id === this.selectedEmployeeId);
        if (selectedEmployee) {
          if (selectedEmployee.dayOff >= this.usedDayOff) {
            const updatedEmployeeData = {
              ...selectedEmployee,
              dayOff: selectedEmployee.dayOff,
              usedDayOff: this.usedDayOff
            };
            updateEmployee(this.selectedEmployeeId, updatedEmployeeData)
              .then(() => {
                console.log('Leave days updated successfully');
                this.getEmployees();
                this.resetForm();
              })
              .catch(error => {
                console.error('Error updating leave days:', error);
              });
          }
        } else {
          console.error('Çalışan bulunamadı.');
        }
      } else {
        console.error('Çalışan seçilmedi veya izin günü geçersiz.');
      }
    },
    resetForm() {
      this.selectedEmployeeId = null;
      this.usedDayOff = 1;
    },
  },
};
</script>

<style scoped>
body, html {
    margin: 0;
    padding: 0;
    background-color: #2c3e50; /* Arka plan rengi daha koyu mavi */
    color: #fff; /* Yazı rengi beyaz */
  }

.page-title {
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;
  color: #eee; /* Yazı rengi beyazdan açık griye */
}

.leave-entry-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #2c3e50; /* Arka plan rengi koyu gri */
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-label {
  font-size: 18px;
  margin-bottom: 5px;
  color: #eee; /* Yazı rengi beyazdan açık griye */
}

.custom-select,
.custom-input {
  width: 100%;
  height: 40px;
  font-size: 16px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.custom-button {
  width: 100%;
  height: 40px;
  font-size: 18px;
  background-color: #3498db; 
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease; 
}

.custom-button:hover {
  background-color: #2980b9; 
}
</style>
