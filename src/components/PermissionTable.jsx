const PermissionTable = ({ permissions }) => (
  <table className="min-w-full table-auto border-collapse border border-gray-200">
    <thead>
      <tr className="bg-gray-100">
        <th className="px-4 py-2 text-left border-b">Permission Name</th>
        <th className="px-4 py-2 text-left border-b">Description</th>
      </tr>
    </thead>
    <tbody>
      {permissions.map((permission) => (
        <tr key={permission.id} className="hover:bg-gray-50">
          <td className="px-4 py-2 border-b">{permission.name}</td>
          <td className="px-4 py-2 border-b">{permission.description}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default PermissionTable;
