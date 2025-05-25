import { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../style/userprof.css";

function UserProfile() {
  const { user, loading, setUser } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState("");
  const [image, setImage] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user) setDisplayName(user.display_name || "");
  }, [user]);

  useEffect(() => {
    if (!user && !loading) {
      toast.error("You must be logged in to view your profile.");
      navigate("/login");
    }
  }, [user, loading]);

  const handleProfileSubmit = async () => {
    try {
      const formData = new FormData();
      if (displayName) formData.append("display_name", displayName);
      if (image) formData.append("image", image);

      await axios.put(
        "https://myguide.onrender.com/api/users/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const res = await axios.get("https://myguide.onrender.com/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
        params: { t: Date.now() },
      });

      setUser(res.data.user);
      setImage(null);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(
        "Update failed: " + (err.response?.data?.error || err.message)
      );
    }
  };

  const handlePasswordSubmit = async () => {
    try {
      await axios.put(
        "https://myguide.onrender.com/api/users/update-password",
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      toast.error(
        "Password update failed: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  if (loading) return <div className="loading-text">Loading user data...</div>;

  return (
    <div className="profile-container">
      <h2 className="profile-heading">User Profile</h2>

      <div className="profile-section">
        <input
          ref={fileInputRef}
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ display: "none" }}
        />
        <div className="profile-image-wrapper">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image_path || "/default-profile.png"
            }
            alt="Profile"
            className="profile-image hover-pointer"
            onClick={() => fileInputRef.current.click()}
          />
        </div>

        <h3 className="profile-label">Display Name</h3>
        <input
          className="profile-input"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <button className="profile-button" onClick={handleProfileSubmit}>
          Update Profile
        </button>
      </div>

      <div className="password-section">
        <h3>Change Password</h3>
        <input
          type="password"
          placeholder="Current Password"
          className="profile-input"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          className="profile-input"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button className="profile-button" onClick={handlePasswordSubmit}>
          Update Password
        </button>
      </div>
    </div>
  );
}

export default UserProfile;