import { useState, useContext, useEffect} from "react";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import "../style/userprof.css"; // Import your CSS file
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


function Profile() {
  const { user, loading, setUser } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState("");
  const [image, setImage] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const fileInputRef = useRef(null);
  useEffect(() => {
    if (user) {
      setDisplayName(user.display_name || "");
    }
  }, [user]);

  const updateProfile = async (data) => {
    const formData = new FormData();
    if (data.display_name) formData.append("display_name", data.display_name);
    if (data.image) formData.append("image", data.image);

    const res = await axios.put(
      "https://myguide.onrender.com/api/users/update-profile",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  };

  const updatePassword = async (passwords) => {
    const res = await axios.put(
      "https://myguide.onrender.com/api/users/update-password",
      passwords,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  };

  const handleProfileSubmit = async () => {
    try {
      const response = await updateProfile({
        display_name: displayName,
        image,
      });

      const freshUserResponse = await axios.get(
        "https://myguide.onrender.com/api/auth/me",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { t: Date.now() },
        }
      );

      setUser(freshUserResponse.data.user);
      setImage(null);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Update failed: " + (err.response?.data?.error || err.message));
    }
  };

  const handlePasswordSubmit = async () => {
    try {
      await updatePassword({ currentPassword, newPassword });
      toast.success("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      toast.error(
        "Password update failed: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  if (loading) return <div className="loading-text">Loading user data...</div>;
  // if (!user) return <div className="error-text">If you dont have an account, please signup <br />
  // <button onClick={() => navigate("/register")}>Sign In</button></div>;
  useEffect(() => {
    if (!user && !loading) {
      toast.error("You must be logged in to view your profile.");
    }
  }, [user, loading]);
  
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
    onClick={() => fileInputRef.current.click()} // 👈 trigger click
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

        <button className="btn-black" onClick={handlePasswordSubmit}>
          Update Password
        </button>
      </div>
    </div>
  );
}

export default Profile;
