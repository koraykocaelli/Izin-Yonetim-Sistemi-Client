<template>
  <div class="container">
    <h1 class="page-title">Çalışanlar Listesi</h1>

    <!-- Search bar -->
    <div class="search-bar">
      <label for="employeeSearch" class="form-label">Çalışan Ara:</label>
      <input type="text" id="employeeSearch" v-model="searchQuery" class="custom-input" placeholder="Çalışan arayın..." />
    </div>

    <!-- Employee table -->
    <table class="employee-table">
      <thead>
        <tr>
          <th>Adı</th>
          <th>Soyadı</th>
          <th>Email</th>
          <th>Departman</th>
          <th>İşlemler</th> 
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in filteredEmployees" :key="employee.id" @click="showDayOff(employee)">
          <td>{{ employee.firstName }}</td>
          <td>{{ employee.lastName }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.department }}</td>
          <td>
            <button @click="deleteEmployee(employee.id)">Sil</button>
          </td>
        </tr>
      </tbody>
    </table>

    
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
import { getEmployees, updateEmployee, deleteEmployee } from '../common/api.service';

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
            this.fetchEmployees(); 
          })
          .catch(error => {
            console.error('Error updating leave days:', error);
          });
      } else {
        console.error('Çalışan seçilmedi.');
      }
    },
    deleteEmployee(id) {
      if (confirm('Çalışanı silmek istediğinizden emin misiniz?')) {
        deleteEmployee(id)
          .then(() => {
            console.log('Employee deleted successfully');
            this.fetchEmployees(); 
          })
          .catch(error => {
            console.error('Error deleting employee:', error);
          });
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

body, html {
    margin: 0;
    padding: 0;
    background-color: #2c3e50; 
    color: #fff; 
  }
.container {
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;
  color: #fff; 
}

.search-bar {
  margin-bottom: 20px;
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

.employee-table {
  width: 100%;
  border-collapse: collapse;
}

.employee-table th,
.employee-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
  cursor: pointer;
  color: #fff; 
}

.employee-table th {
  background-color: #2c3e50; 
}


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
  color: #333; 
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
