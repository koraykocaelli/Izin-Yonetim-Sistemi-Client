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
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in filteredEmployees" :key="employee.id" @click="showEmployee(employee)">
          <td>{{ employee.firstName }}</td>
          <td>{{ employee.lastName }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.department }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getEmployees } from '../common/api.service';

export default {
  name: 'EmployeeList',
  data() {
    return {
      employees: [],
      searchQuery: '',
    };
  },
  created() {
    this.fetchEmployees();
  },
  methods: {
    fetchEmployees() {
      getEmployees()
        .then(response => {
          this.employees = response.data;
        })
        .catch(error => {
          console.error('Error fetching employees:', error);
        });
    },
    showEmployee(employee) {
      // Implement this method to show detailed info of the clicked employee
      console.log('Selected employee:', employee);
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
</style>
