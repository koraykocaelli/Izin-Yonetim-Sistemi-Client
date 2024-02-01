<template>
  <div>
    <h1>Çalışanları Listele</h1>

    <table>
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
        <tr v-for="employee in employees" :key="employee.id">
          <td>{{ employee.firstName }}</td>
          <td>{{ employee.lastName }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.department }}</td>
          <td>{{ employee.id }}</td>
        </tr>

      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'EmployeeList',
  data() {
    return {
      // API
      employees: [
        { id: 1, firstName: 'İsim1', lastName: 'Soyisim1', email: 'email1@example.com', department: 'Departman1' },
        { id: 2, firstName: 'İsim2', lastName: 'Soyisim2', email: 'email2@example.com', department: 'Departman2' },
        
      ],
    };
  },
};
  
</script>

<style scoped>


</style>


<!-- <template>
  <div>
    <h2>Employee List</h2>
    <ul>
      <li v-for="employee in employees" :key="employee.id">
        {{ employee.firstName }} {{ employee.lastName }} - {{ employee.email }} - {{ employee.department }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      employees: [] // API
    };
  },
  mounted() {
    // API
  }
};
</script>

<style scoped>

</style> -->
