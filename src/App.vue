<template>
  <div id="app">
    <header>
      <h1 class="logo">İZİN TAKİP SİSTEMİ</h1>
      <nav>
        <router-link to="/employee-entry">Çalışan Girişi</router-link>
        <router-link to="/employee-list">Çalışanları Listele</router-link>
        <router-link to="/leave-entry">İzin Girişi</router-link>
      </nav>
    </header>
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

body, html {
    margin: 0;
    padding: 0;
    background-color: #2c3e50; 
    color: #fff; 
  }

#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  color: #fff; 
  margin-top: 60px;
  background-color: #34495e; 
}

header {
  background-color: #2c3e50;
  padding: 10px 0;
}

.logo {
  font-size: 24px;
  color: #fff;
  margin-bottom: 10px;
}

nav {
  margin-top: 10px;
}

nav a {
  margin: 0 15px;
  text-decoration: none;
  color: #fff;
  font-size: 18px;
}

nav a:hover {
  text-decoration: underline;
}
</style>
