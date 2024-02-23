import axios from "axios";

export function get(path = '') {
    return axios.get(path).catch(err => {
        console.error(err);
        throw new Error('Http Get Error : api.service');
    });
}

export function post(path = '', params) {
    return axios.post(path, params).catch(err => {
        console.error(err);
        throw new Error('Http Post Error : api.service');
    });
}

export function updateEmployee(id, employeeData) {
    return axios.put(`/employee/edit/${id}`, employeeData)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.error(err);
            throw new Error('Http Put Error : api.service');
        });
}

export function createEmployee(employee) {
    return axios.post('/employee/create', employee).catch(err => {
        console.error(err);
        throw new Error('Http Post Error : api.service');
    });
}

export function deleteEmployee(id) {
    return axios.delete(`/employee/remove/${id}`).catch(err => {
        console.error(err);
        throw new Error('Http Delete Error : api.service');
    });
}

export function getEmployees() {
    return axios.get('/employee/getAll').catch(err => {
        console.error(err);
        throw new Error('Http Get Employees Error : api.service');
    });
}
