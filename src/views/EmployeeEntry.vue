<template>
  <div class="container">
    <h1 class="page-title">Çalışan Girişi</h1>

    <form class="employee-entry-form">
      <div class="form-group">
        <label for="firstName" class="form-label">Adı:</label>
        <input type="text" id="firstName" v-model="employee.firstName" class="custom-input" placeholder="Adınızı giriniz" />
      </div>

      <div class="form-group">
        <label for="lastName" class="form-label">Soyadı:</label>
        <input type="text" id="lastName" v-model="employee.lastName" class="custom-input" placeholder="Soyadınızı giriniz" />
      </div>

      <div class="form-group">
        <label for="email" class="form-label">Email:</label>
        <input type="email" id="email" v-model="employee.email" class="custom-input" placeholder="Email adresinizi giriniz" />
      </div>

      <div class="form-group">
        <label for="department" class="form-label">Departman:</label>
        <input type="text" id="department" v-model="employee.department" class="custom-input" placeholder="Departmanınızı giriniz" />
      </div>

      <button type="button" @click="saveEmployee" class="custom-button">Kaydet</button>
    </form>
  </div>
</template>

<script>
import { createEmployee } from '../common/api.service';

export default {
  data() {
    return {
      employee: {
        firstName: '',
        lastName: '',
        email: '',
        department: '',
      },
    };
  },
  methods: {
    saveEmployee() {
      createEmployee(this.employee)
        .then(response => {
          console.log('Employee saved successfully:', response.data);
          this.$emit('employeeAdded', response.data);
          this.resetForm();
        })
        .catch(error => {
          console.error('Error saving employee:', error);
        });
    },
    resetForm() {
      this.employee = {
        firstName: '',
        lastName: '',
        email: '',
        department: '',
      };
    },
  },
};
</script>

<style scoped>

body, html {
    margin: 0;
    padding: 0;
    background-color: #2c3e50; 
    color: #fff; 
  }
.container {
  max-width: 400px;
  margin: 0 auto;
}

.page-title {
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;
  color: #fff; 
}

.employee-entry-form {
  padding: 20px;
  background-color: #2c3e50; 
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-label {
  font-size: 18px;
  margin-bottom: 5px;
  color: #fff; 
}

.custom-input {
  width: 100%;
  height: 40px;
  font-size: 16px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #34495e; 
  color: #fff; 
}

.custom-button {
  width: 100%;
  height: 40px;
  font-size: 18px;
  background-color: #2980b9; 
  color: #fff; 
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.custom-button:hover {
  background-color: #1f6698; 
}
</style>
