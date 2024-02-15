<template>
  <div id="app">
    <nav>
      <router-link to="/employee-entry">Çalışan Girişi</router-link>
      <router-link to="/employee-list">Çalışanları Listele</router-link>
      <router-link to="/leave-entry">İzin Girişi</router-link>
    </nav>
    <router-view @employeeAdded="addEmployeeToList" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      employees: []
    };
  },
  methods: {
    addEmployeeToList(employee) {
      this.employees.push(employee);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  background-color: #f8f9fa;
  padding: 10px;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
}
</style>
