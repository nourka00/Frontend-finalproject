import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../style/usersTable.css";
const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); 
  const [showDetails, setShowDetails] = useState(false); 
  const baseURL = "https://myguide.onrender.com/api";
  const token = localStorage.getItem("token");
  const showConfirmationToast = (message, onConfirm, onCancel = () => {}) => {
    toast.custom(
      (t) => (
        <div
          className={`confirmation-toast ${
            t.visible ? "animate-enter" : "animate-leave"
          }`}
        >
          <div className="confirmation-content">
            <div className="confirmation-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="confirmation-text">
              <h4>Confirm Action</h4>
              <p>{message}</p>
            </div>
          </div>
          <div className="confirmation-actions">
            <button
              className="confirmation-btn confirmation-btn-cancel"
              onClick={() => {
                toast.dismiss(t.id);
                onCancel();
              }}
            >
              Cancel
            </button>
            <button
              className="confirmation-btn confirmation-btn-confirm"
              onClick={() => {
                toast.dismiss(t.id);
                onConfirm();
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      ),
      {
        duration: Number.POSITIVE_INFINITY,
        position: "top-center",
      }
    );
  };
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
    const user = users.find((u) => u.id === userId);
    const userName = user ? user.name : "this user";

    showConfirmationToast(
      `Are you sure you want to delete "${userName}"? This action cannot be undone and will remove all associated data.`,
      async () => {
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
      }
    );
  };

  const updateUserRole = async (userId, newRole) => {
    const user = users.find((u) => u.id === userId);
    const userName = user ? user.name : "this user";
    const currentRole = user ? user.role : "unknown";

    showConfirmationToast(
      `Are you sure you want to change ${userName}'s role from "${currentRole}" to "${newRole}"?`,
      async () => {
        try {
          const response = await axios.patch(
            `${baseURL}/users/${userId}/role`,
            { role: newRole },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          toast.success("User role updated successfully");
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
      },
      () => {
        setEditingUser(null);
      }
    );
  };
  const handleRoleChange = (userId, newRole) => {
    const user = users.find((u) => u.id === userId);
    if (user && user.role !== newRole) {
      updateUserRole(userId, newRole);
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
      <div className="table-header">
        <h2>Users Management</h2>
        <div className="table-stats">
          <span className="stat-item">
            Total Users: <strong>{users.length}</strong>
          </span>
          <span className="stat-item">
            Admins:
            <strong>{users.filter((u) => u.role === "admin").length}</strong>
          </span>
          <span className="stat-item">
            Students:
            <strong>{users.filter((u) => u.role === "student").length}</strong>
          </span>
        </div>
      </div>
      <div className="table-container">
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
                <td data-label="Name">{user.name}</td>
                <td data-label="Email">{user.email}</td>
                <td data-label="Role">
                  {editingUser === user.id ? (
                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user.id, e.target.value)}
                      className="role-select"
                      autoFocus
                    >
                      <option value="student">Student</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    <span className={`role-badge ${user.role}`}>
                      {user.role}
                    </span>
                  )}
                </td>
                <td data-label="Joined">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td data-label="Actions">
                  <button
                    className="btn-edit"
                    onClick={() => {
                      if (editingUser === user.id) {
                        setEditingUser(null);
                      } else {
                        setEditingUser(user.id);
                      }
                    }}
                  >
                    {editingUser === user.id ? "Cancel" : "Edit Role"}
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
