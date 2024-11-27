import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3000"
});

// User CRUD operations
export const getUsers = () => api.get('/users');
export const createUser = (user) => api.post('/users', user);
export const updateUser = (user) => api.put(`/users/${user.id}`, user);
export const deleteUser = (userId) => api.delete(`/users/${userId}`);

// Role CRUD operations
export const getRoles = () => api.get('/roles');
export const createRole = (role) => api.post('/roles', role);
export const updateRole = (role) => api.put(`/roles/${role.id}`, role);
export const deleteRole = (roleId) => api.delete(`/roles/${roleId}`);

// Permission CRUD operations
export const getPermissions = () => api.get('/permissions');
