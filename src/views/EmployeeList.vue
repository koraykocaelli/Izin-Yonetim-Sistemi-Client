<template>
  <div class="container">
    <h1 class="page-title">Çalışanlar Listesi</h1>

    <div class="search-bar">
      <label for="employeeSearch">Çalışan Ara:</label>
      <input type="text" id="employeeSearch" v-model="searchQuery" />
    </div>

    <table class="employee-table">
      <thead>
        <tr>
          <th>Adı</th>
          <th>Soyadı</th>
          <th>Email</th>
          <th>Departman</th>
          <th>İzin Günleri</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in filteredEmployees" :key="employee.id" @click="showRemainingLeaveDays(employee)">
          <td>{{ employee.firstName }}</td>
          <td>{{ employee.lastName }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.department }}</td>
          <td>{{ employee.leaveDays }}</td>
        </tr>
      </tbody>
    </table>

    <VueModal v-if="selectedEmployee" @close="selectedEmployee = null">
      <h2>{{ selectedEmployee.firstName }} {{ selectedEmployee.lastName }} - İzin Günleri</h2>
      <p>Kalan İzin Günleri: {{ defaultLeaveDays - selectedEmployee.leaveDays }}</p>
    </VueModal>
  </div>
</template>

<script>
import { getEmployees } from '../common/api.service';

export default {
  name: 'EmployeeList',
  data() {
    return {
      employees: [], // employees olarak değiştirildi
      defaultLeaveDays: 15,
      searchQuery: '',
      selectedEmployee: null,
    };
  },
  created() {
    // Component oluşturulduğunda çalışanları getir
    this.getEmployees();
  },
  methods: {
    getEmployees() {
      getEmployees()
        .then(response => {
          this.employees = response.data; // employees veri özelliğine atanır
        })
        .catch(error => {
          console.error('Çalışanları getirirken bir hata oluştu:', error);
        });
    },
    showRemainingLeaveDays(employee) {
      this.selectedEmployee = employee;
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

.vue-modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
}
</style>
