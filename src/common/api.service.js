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

export function updateEmployee(employeeId, employeeData) {
    // Update the employeeData object to match the backend's data structure
    const updatedEmployeeData = {
        firstName: employeeData.firstName,
        lastName: employeeData.lastName,
        email: employeeData.email,
        department: employeeData.department,
        dayOff: employeeData.dayOff, // New property added to match backend
        usedDayOff: employeeData.usedDayOff // New property added to match backend
    };

    return axios.put(`/employee/edit/${employeeId}`, updatedEmployeeData).then(response => {
        return response.data; // Return the response from the backend
    }).catch(err => {
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

export function getEmployees() {
    return axios.get('/employee/getAll').catch(err => {
        console.error(err);
        throw new Error('Http Get Employees Error : api.service');
    });
}

