const RoleTable = ({ roles, onEdit, onDelete }) => (
  <table className="min-w-full table-auto border-collapse border border-gray-200">
    <thead>
      <tr className="bg-gray-100">
        <th className="px-4 py-2 text-left border-b">Role Name</th>
        <th className="px-4 py-2 text-left border-b">Permissions</th>
        <th className="px-4 py-2 text-left border-b">Actions</th>
      </tr>
    </thead>
    <tbody>
      {roles.map((role) => (
        <tr key={role.id} className="hover:bg-gray-50">
          <td className="px-4 py-2 border-b">{role.name}</td>
          <td className="px-4 py-2 border-b">{role.permissions.join(", ")}</td>
          <td className="px-4 py-2 border-b">
            <button
              onClick={() => onEdit(role)}
              className="text-blue-500 hover:text-blue-700 mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(role.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default RoleTable;
