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
          <th>Kalan İzin Günleri</th> 
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in filteredEmployees" :key="employee.id" @click="showDayOff(employee)">
          <td>{{ employee.firstName }}</td>
          <td>{{ employee.lastName }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.department }}</td>
          <td>{{ employee.dayOff }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Bileşeni -->
    <div class="modal" v-if="selectedEmployee">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Kalan İzin Günleri: </h2>
        <p>{{ selectedEmployee.dayOff }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getEmployees, updateEmployee } from '../common/api.service';

export default {
  name: 'EmployeeList',
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
    showDayOff(employee) {
      console.log("Kalan izin günleri:", employee.dayOff);
      this.selectedEmployee = employee;
    },
    closeModal() {
      this.selectedEmployee = null;
    },
    fetchEmployees() {
      getEmployees()
        .then(response => {
          this.employees = response.data;
        })
        .catch(error => {
          console.error('Error fetching employees:', error);
        });
    },
    updateEmployeeDayOff() {
  if (this.selectedEmployee && this.selectedEmployee.id) {
    updateEmployee(this.selectedEmployee.id, this.selectedEmployee)
      .then(() => {
        console.log('Leave days updated successfully');
        this.fetchEmployees(); // Güncelleme işlemi sonrasında çalışan verilerini yeniden al
      })
      .catch(error => {
        console.error('Error updating leave days:', error);
      });
  } else {
    console.error('Çalışan seçilmedi.');
  }


    },
  },
  computed: {
    filteredEmployees() {
  const query = this.searchQuery.toLowerCase();
  return this.employees.filter(employee => {
    if (employee.firstName && employee.lastName && employee.email && employee.department) {
      return (
        employee.firstName.toLowerCase().includes(query) ||
        employee.lastName.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.department.toLowerCase().includes(query)
      );
    }
    return false;
  });
}
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