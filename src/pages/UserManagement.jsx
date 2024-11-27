import React, { useState, useEffect } from 'react';
import UserTable from '../components/UserTable';
import { getUsers, createUser, updateUser, deleteUser } from '../services/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const response = await getUsers();
    setUsers(response.data);
  };

  const handleEdit = (user) => {
    // Handle edit logic here
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    loadUsers();
  };

  return (
    <div>
      <h1>User Management</h1>
      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default UserManagement;
