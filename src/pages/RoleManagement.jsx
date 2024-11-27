import React, { useState, useEffect } from 'react';
import RoleTable from '../components/RoleTable';
import { getRoles, createRole, updateRole, deleteRole } from '../services/api';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    const response = await getRoles();
    setRoles(response.data);
  };

  const handleEdit = (role) => {
    // Handle edit logic here
  };

  const handleDelete = async (id) => {
    await deleteRole(id);
    loadRoles();
  };

  return (
    <div>
      <h1>Role Management</h1>
      <RoleTable roles={roles} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default RoleManagement;
