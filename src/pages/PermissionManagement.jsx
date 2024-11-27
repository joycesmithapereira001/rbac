import React, { useState, useEffect } from 'react';
import PermissionTable from '../components/PermissionTable';
import { getPermissions } from '../services/api';

const PermissionManagement = () => {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    loadPermissions();
  }, []);

  const loadPermissions = async () => {
    const response = await getPermissions();
    setPermissions(response.data);
  };

  return (
    <div>
      <h1>Permission Management</h1>
      <PermissionTable permissions={permissions} />
    </div>
  );
};

export default PermissionManagement;
