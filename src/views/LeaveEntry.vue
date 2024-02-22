<template>
  <div>
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
    this.getEmployees(); // Sayfa yüklendiğinde çalışanları al
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
      console.log('Seçilen Çalışan:', this.selectedEmployeeId);
      console.log('Kullanılan İzin Günleri:', this.usedDayOff);

      if (this.selectedEmployeeId || this.usedDayOff > 0) {
        const selectedEmployee = this.employees.find(emp => emp.id === this.selectedEmployeeId);
        if (selectedEmployee) {
          if (selectedEmployee.dayOff >= this.usedDayOff) {
            const updatedEmployeeData = {
              dayOff: selectedEmployee.dayOff,
              usedDayOff: this.usedDayOff
            };

            // Burada updateEmployee fonksiyonunu çağırırken iki parametre geçmelisiniz: id ve employeeData
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