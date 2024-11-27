import { useState } from "react";
import { createUser, updateUser } from "../services/api"; // Import the updateUser function

const UserTable = ({ users, setUsers, onDelete }) => {
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "User", // Default to "User"
    status: "Active", // Default to "Active"
  });

  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddUser = async (e) => {
    // e.preventDefault();
    try {
      const response = await createUser(newUser);
      setUsers((prevUsers) => [...prevUsers, response.data]);
      setShowAddUserForm(false);
      setNewUser({ name: "", email: "", role: "User", status: "Active" });
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  const handleEditInputChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setEditedUser(user);
  };

  const handleUpdateUser = async (e) => {
    try {
      const response = await updateUser(editedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUserId ? { ...user, ...response.data } : user
        )
      );
      setEditingUserId(null);
      setEditedUser({});
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditedUser({});
  };

  return (
    <div>
      <button
        onClick={() => setShowAddUserForm(!showAddUserForm)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {showAddUserForm ? "Cancel" : "Add User"}
      </button>

      {showAddUserForm && (
        <form
          onSubmit={handleAddUser}
          className="mb-4 p-4 border border-gray-300 rounded"
        >
          <div className="mb-2">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Role</label>
            <select
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block mb-1">Status</label>
            <select
              name="status"
              value={newUser.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Add User
          </button>
        </form>
      )}

      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left border-b">Name</th>
            <th className="px-4 py-2 text-left border-b">Email</th>
            <th className="px-4 py-2 text-left border-b">Role</th>
            <th className="px-4 py-2 text-left border-b">Status</th>
            <th className="px-4 py-2 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              {editingUserId === user.id ? (
                <>
                  <td className="px-4 py-2 border-b">
                    <input
                      type="text"
                      name="name"
                      value={editedUser.name}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border-b">
                    <input
                      type="email"
                      name="email"
                      value={editedUser.email}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border-b">
                    <select
                      name="role"
                      value={editedUser.role}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    >
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <select
                      name="status"
                      value={editedUser.status}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={handleUpdateUser}
                      className="text-green-500 hover:text-green-700 mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="px-4 py-2 border-b">{user.name}</td>
                  <td className="px-4 py-2 border-b">{user.email}</td>
                  <td className="px-4 py-2 border-b">{user.role}</td>
                  <td className="px-4 py-2 border-b">{user.status}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(user.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
