<template>
  <div>
    <h1>Çalışan Girişi</h1>

    <form>
      <label for="firstName">Adı:</label>
      <input type="text" id="firstName" v-model="employee.firstName" />

      <label for="lastName">Soyadı:</label>
      <input type="text" id="lastName" v-model="employee.lastName" />

      <label for="email">Email:</label>
      <input type="email" id="email" v-model="employee.email" />

      <label for="department">Departman:</label>
      <input type="text" id="department" v-model="employee.department" />

      <button type="button" @click="saveEmployee">Kaydet</button>
    </form>

  </div>
</template>

<script>
export default {
  name: 'EmployeeEntry',
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
      console.log('Kaydedilen Çalışan:', this.employee);
    },
  },
};
</script>

<style scoped></style>

