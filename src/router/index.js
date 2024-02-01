import { createRouter, createWebHistory } from 'vue-router'
import EmployeeEntry from '@/views/EmployeeEntry.vue'
import EmployeeList from '@/views/EmployeeList.vue'
import LeaveEntry from '@/views/LeaveEntry.vue'

const routes = [
  { path: '/', redirect: '/employee-entry' }, 
  { path: '/employee-entry', component: EmployeeEntry },
  { path: '/employee-list', component: EmployeeList },
  { path: '/leave-entry', component: LeaveEntry },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router





