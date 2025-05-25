import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";
import Navbar from "../components/header";
import Footer from "../components/Footer";
import "../style/Material.css";
import confetti from "canvas-confetti";

const MaterialsPage = () => {
  const [materials, setMaterials] = useState([]);
  const [loadingMaterials, setLoadingMaterials] = useState(true);
  const [error, setError] = useState(null);
  const { user, logout } = useContext(AuthContext);
  const [celebrate, setCelebrate] = useState(false);
  const navigate = useNavigate();
  const baseURL = "http://localhost:3000"; // Update this to your actual base URL

  useEffect(() => {
    if (!user) return;

    const fetchMaterials = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${baseURL}/api/materials/materials`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMaterials(response.data);
        if (user.role !== "admin" && response.data.length > 0) {
          setCelebrate(true);
        }
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch materials");
        logout();
      } finally {
        setLoadingMaterials(false);
      }
    };

    fetchMaterials();
  }, [user, logout]);

  useEffect(() => {
    if (celebrate) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      const timer = setTimeout(() => setCelebrate(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [celebrate]);

  const handleDownload = (fileUrl) => {
    window.open(fileUrl, "_blank");
    if (user.role !== "admin") {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  if (!user) return null;

  if (loadingMaterials)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your materials...</p>
      </div>
    );

  if (error) return <div className="error-message">{error}</div>;

  if (user.role !== "admin" && materials.length === 0) {
    return (
      <div className="no-materials-container">
        <div className="no-materials-content">
          <h2>
            Welcome, {user.name}! <span className="wave">👋</span>
          </h2>
          <p>You haven't enrolled in any courses yet.</p>
          <button className="browse-btn" onClick={() => navigate("/courses")}>
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`page-container ${user.role}`}>
      <Navbar />
      <div className="materials-page">
        {celebrate && <div className="celebration-overlay"></div>}

        <div className="user-header">
          <div className="user-info">
            <h2>
              Hello, {user.name}! <span className="wave">👋</span>
              {user.role !== "admin" && materials.length > 0 && (
                <span className="sparkle">✨</span>
              )}
            </h2>
            <p className="role-badge">
              Role: <strong>{user.role}</strong>
            </p>
          </div>
        </div>

        <h1 className="page-title">
          {user.role === "admin"
            ? "📚 All Learning Materials"
            : "🎓 Your Study Materials"}
        </h1>

        <div className="materials-grid">
          {materials.map((material) => (
            <div
              key={material.id}
              className={`material-card ${user.role}`}
              onClick={() => handleDownload(material.file_url)}
            >
              <div className="card-content">
                <h3>{material.title}</h3>
                <p className="material-type">{material.material_type}</p>
                <button className="download-btn">
                  {user.role === "admin" ? "View File" : "Download Now"}
                </button>
              </div>
              {user.role !== "admin" && <div className="card-decoration"></div>}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MaterialsPage;