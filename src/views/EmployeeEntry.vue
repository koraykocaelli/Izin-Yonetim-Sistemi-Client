<template>
  <div class="container">
    <h1 class="page-title">Çalışan Girişi</h1>

    <form class="employee-entry-form">
      <div class="form-group">
        <label for="firstName" class="form-label">Adı:</label>
        <input type="text" id="firstName" v-model="employee.firstName" class="custom-input" />
      </div>

      <div class="form-group">
        <label for="lastName" class="form-label">Soyadı:</label>
        <input type="text" id="lastName" v-model="employee.lastName" class="custom-input" />
      </div>

      <div class="form-group">
        <label for="email" class="form-label">Email:</label>
        <input type="email" id="email" v-model="employee.email" class="custom-input" />
      </div>

      <div class="form-group">
        <label for="department" class="form-label">Departman:</label>
        <input type="text" id="department" v-model="employee.department" class="custom-input" />
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
.container {
  text-align: center;
  margin-top: 50px;
}

.page-title {
  font-size: 40px;
  margin-bottom: 20px;
}

.employee-entry-form {
  width: 60%;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 5px;
  font-size: 20px;
}

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
  background-color: #2ecc71;
  color: #fff;
  border: none;
  cursor: pointer;
}

.custom-button:hover {
  background-color: #27ae60;
}
</style>
