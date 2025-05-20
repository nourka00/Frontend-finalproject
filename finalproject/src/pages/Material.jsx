import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";

const MaterialsPage = () => {
  const [materials, setMaterials] = useState([]);
  const [loadingMaterials, setLoadingMaterials] = useState(true);
  const [error, setError] = useState(null);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const baseURL = "https://myguide.onrender.com";
  useEffect(() => {
    if (!user) return;

    const fetchMaterials = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${baseURL}/api/materials/materials`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMaterials(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch materials");
        logout();
      } finally {
        setLoadingMaterials(false);
      }
    };

    fetchMaterials();
  }, [user, logout]);

  const handleDownload = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  if (!user) return null;

  if (loadingMaterials) return <div>Loading materials...</div>;

  if (error) return <div className="error">{error}</div>;

  if (user.role !== "admin" && materials.length === 0) {
    return (
      <div className="no-materials">
        <h2>Welcome, {user.name}!</h2>
        <p>You haven't enrolled in any courses yet.</p>
        <button onClick={() => navigate("/courses")}>Browse Courses</button>
      </div>
    );
  }

  return (
    <div className="materials-container">
      <div className="user-greeting">
        <h2>Hello, {user.name}! 👋</h2>
        <p>Role: <strong>{user.role}</strong></p>
      </div>

      <h1>
        {user.role === "admin" ? "All Materials" : "Your Learning Materials"}
      </h1>

      <div className="materials-grid">
        {materials.map((material) => (
          <div key={material.id} className="material-card">
            <h3>{material.title}</h3>
            <button onClick={() => handleDownload(material.file_url)}>
              Download File
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MaterialsPage;
