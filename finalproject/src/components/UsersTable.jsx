import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../style/usersTable.css"; // Assuming you have a CSS file for styling
const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const baseURL = "https://myguide.onrender.com/api";
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${baseURL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${baseURL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("User deleted successfully");
      setUsers(users.filter((user) => user.id !== userId));
    } catch (err) {
      toast.error("Failed to delete user");
      console.error(err);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      const response = await axios.patch(
        `${baseURL}/users/${userId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("User role updated");
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
      setEditingUser(null);
    } catch (err) {
      toast.error("Failed to update user role");
      console.error(err);
    }
  };

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="users-table">
      <h2>Users Management</h2>
      <table>
        <thead>
          <tr>
            <th>Profile</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {user.image_path ? (
                  <img
                    src={`${user.image_path}?${Date.now()}`}
                    alt={user.name}
                    className="user-avatar"
                  />
                ) : (
                  <div className="avatar-placeholder">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {editingUser === user.id ? (
                  <select
                    value={user.role}
                    onChange={(e) => updateUserRole(user.id, e.target.value)}
                    className="role-select"
                  >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  <span className={`role-badge ${user.role}`}>{user.role}</span>
                )}
              </td>
              <td>{new Date(user.created_at).toLocaleDateString()}</td>
              <td>
                <button
                  className="btn-edit"
                  onClick={() => setEditingUser(user.id)}
                >
                  {editingUser === user.id ? "Cancel" : "Edit Role"}
                </button>
                <button
                  className="btn-delete"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this user?"
                      )
                    ) {
                      deleteUser(user.id);
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;