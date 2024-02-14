import axios from "axios";

export function get(path = '') {
    return axios.get(path).catch(err => {
        console.log(err);
        throw Error('Http Get Error : api.service');
    });
}

export function post(path = '', params) {
    return axios.post(path, params).catch(err => {
        console.log(err);
        throw Error('Http Post Error : api.service');
    });
}

export function updateLeaveDays(employeeId, leaveDays) {
    return axios.put(`employee/${employeeId}`, { leaveDays }).catch(err => {
        console.log(err);
        throw Error('Http Put Error : api.service');
    });
}

export function saveEmployee(employee) {
    return axios.post('employee', employee).catch(err => {
        console.log(err);
        throw Error('Http Post Error : api.service');
    });
}

export function getEmployees() {
    return axios.get('employee').catch(err => {
        console.log(err);
        throw Error('Http Get Employees Error : api.service');
    });
}
