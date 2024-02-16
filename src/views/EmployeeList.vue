<template>
  <div class="container">
    <h1 class="page-title">Çalışanlar Listesi</h1>

    <!-- Search bar -->
    <div class="search-bar">
      <label for="employeeSearch">Çalışan Ara:</label>
      <input type="text" id="employeeSearch" v-model="searchQuery" />
    </div>

    <!-- Employee table -->
    <table class="employee-table">
      <thead>
        <tr>
          <th>Adı</th>
          <th>Soyadı</th>
          <th>Email</th>
          <th>Departman</th>
          <th>Kalan İzin Günleri</th> <!-- Yeni eklenen sütun -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in filteredEmployees" :key="employee.id" @click="showLeaveDays(employee)">
          <td>{{ employee.firstName }}</td>
          <td>{{ employee.lastName }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.department }}</td>
          <td>{{ employee.leaveDays }}</td> <!-- Yeni eklenen sütun -->
        </tr>
      </tbody>
    </table>

    <!-- Modal Bileşeni -->
    <div class="modal" v-if="selectedEmployee">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Kalan İzin Günleri: </h2>
        <p>{{ selectedEmployee.leaveDays }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getEmployees } from '../common/api.service';
import MyModal from './MyModal.vue';

export default {
  name: 'EmployeeList',
  components: {
    MyModal,
  },
  data() {
    return {
      employees: [],
      searchQuery: '',
      selectedEmployee: null,
    };
  },
  created() {
    this.fetchEmployees();
  },
  methods: {
    showLeaveDays(employee) {
      console.log(employee); // Employee nesnesini konsola yazdır
      console.log("Kalan izin günleri:", employee.leaveDays);
      this.selectedEmployee = employee;
    },
    closeModal() {
      // Modalı kapatmak için seçilen çalışanı null'a ayarla
      this.selectedEmployee = null;
    },
    fetchEmployees() {
      getEmployees()
        .then(response => {
          // Her çalışanın default olarak 15 izin günü olmasını sağla
          this.employees = response.data.map(employee => ({
            ...employee,
            leaveDays: 15,
          }));
        })
        .catch(error => {
          console.error('Error fetching employees:', error);
        });
    },
  },
  computed: {
    filteredEmployees() {
      const query = this.searchQuery.toLowerCase();
      return this.employees.filter(employee =>
        employee.firstName.toLowerCase().includes(query) ||
        employee.lastName.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.department.toLowerCase().includes(query)
      );
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

.search-bar {
  margin-bottom: 20px;
}

.employee-table {
  width: 80%;
  margin: 0 auto;
  border-collapse: collapse;
}

.employee-table th,
.employee-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  cursor: pointer;
}

.employee-table th {
  background-color: #3498db;
  color: #fff;
}

/* Modal stilleri */
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
