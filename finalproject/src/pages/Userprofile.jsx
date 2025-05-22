// import { useState, useContext, useEffect} from "react";
// import { AuthContext } from "../context/AuthProvider";
// import axios from "axios";
// import "../style/userprof.css"; // Import your CSS file
// import { useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import Navbar from "../components/header";
// import Footer from "../components/Footer";
// function Profile() {
//   const { user, loading, setUser } = useContext(AuthContext);
//   const [displayName, setDisplayName] = useState("");
//   const [image, setImage] = useState(null);
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const fileInputRef = useRef(null);
//   useEffect(() => {
//     if (user) {
//       setDisplayName(user.display_name || "");
//     }
//   }, [user]);

//   const updateProfile = async (data) => {
//     const formData = new FormData();
//     if (data.display_name) formData.append("display_name", data.display_name);
//     if (data.image) formData.append("image", data.image);

//     const res = await axios.put(
//       "https://myguide.onrender.com/api/users/update-profile",
//       formData,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     return res.data;
//   };

//   const updatePassword = async (passwords) => {
//     const res = await axios.put(
//       "https://myguide.onrender.com/api/users/update-password",
//       passwords,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     return res.data;
//   };

//   const handleProfileSubmit = async () => {
//     try {
//       const response = await updateProfile({
//         display_name: displayName,
//         image,
//       });

//       const freshUserResponse = await axios.get(
//         "https://myguide.onrender.com/api/auth/me",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           params: { t: Date.now() },
//         }
//       );

//       setUser(freshUserResponse.data.user);
//       setImage(null);
//       toast.success("Profile updated successfully");
//     } catch (err) {
//       toast.error("Update failed: " + (err.response?.data?.error || err.message));
//     }
//   };

//   const handlePasswordSubmit = async () => {
//     try {
//       await updatePassword({ currentPassword, newPassword });
//       toast.success("Password updated successfully!");
//       setCurrentPassword("");
//       setNewPassword("");
//     } catch (error) {
//       toast.error(
//         "Password update failed: " +
//           (error.response?.data?.message || error.message)
//       );
//     }
//   };

//   if (loading) return <div className="loading-text">Loading user data...</div>;
//   // if (!user) return <div className="error-text">If you dont have an account, please signup <br />
//   // <button onClick={() => navigate("/register")}>Sign In</button></div>;
//   useEffect(() => {
//     if (!user && !loading) {
//       toast.error("You must be logged in to view your profile.");
//     }
//   }, [user, loading]);
  
//   return (
//     <>
//       <Navbar />
//     <div className="profile-container">
//       <h2 className="profile-heading">User Profile</h2>

//       <div className="profile-section">
    
//         <input
//           ref={fileInputRef}
//           type="file"
//           name="image"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files[0])}
//           style={{ display: "none" }}
//         />

// <div className="profile-image-wrapper">
//   <img
//     src={
//       image
//         ? URL.createObjectURL(image)
//         : user?.image_path || "/default-profile.png"
//     }
//     alt="Profile"
//     className="profile-image hover-pointer"
//     onClick={() => fileInputRef.current.click()} // 👈 trigger click
//   />
// </div>
//        <h3 className="profile-label">Display Name</h3>
//         <input
//           className="profile-input"
//           value={displayName}
//           onChange={(e) => setDisplayName(e.target.value)}
//         />

  

//         <button className="profile-button" onClick={handleProfileSubmit}>
//           Update Profile
//         </button>
//       </div>

//       <div className="password-section">
//         <h3>Change Password</h3>

//         <input
//           type="password"
//           placeholder="Current Password"
//           className="profile-input"
//           value={currentPassword}
//           onChange={(e) => setCurrentPassword(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="New Password"
//           className="profile-input"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//         />

//         <button className="btn-black" onClick={handlePasswordSubmit}>
//           Update Password
//         </button>
//       </div>
//       </div>
//     <Footer />
//     </>
//   );
// }

// export default Profile;
// ... all existing imports
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import "../style/userprof.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/header";
import Footer from "../components/Footer";

function Profile() {
  const { user, loading, setUser } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState("");
  const [image, setImage] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user) setDisplayName(user.display_name || "");
  }, [user]);

  useEffect(() => {
    if (!user && !loading) {
      toast.error("You must be logged in to view your profile.");
    }
  }, [user, loading]);

  const fetchPurchases = async () => {
    try {
      const res = await axios.get("https://myguide.onrender.com/api/purchases", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPurchases(res.data);
    } catch (err) {
      toast.error("Failed to fetch purchases");
    }
  };

  const handleStatusChange = async (purchaseId, newStatus) => {
    try {
      await axios.patch(
        `https://myguide.onrender.com/api/purchases/${purchaseId}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Status updated");
      fetchPurchases();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleProfileSubmit = async () => {
    try {
      const formData = new FormData();
      if (displayName) formData.append("display_name", displayName);
      if (image) formData.append("image", image);

      await axios.put("https://myguide.onrender.com/api/users/update-profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const res = await axios.get("https://myguide.onrender.com/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
        params: { t: Date.now() },
      });

      setUser(res.data.user);
      setImage(null);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Update failed: " + (err.response?.data?.error || err.message));
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
      toast.error("Password update failed: " + (err.response?.data?.message || err.message));
    }
  };

  const toggleAdminPanel = () => {
    if (!showAdminPanel) fetchPurchases();
    setShowAdminPanel(!showAdminPanel);
  };

  if (loading) return <div className="loading-text">Loading user data...</div>;

  return (
    <>
      <Navbar />

      <div className="profile-container">
        <div>
          <h2 className="profile-heading">User Profile</h2>
          <h2>
            {user?.role === "admin" && (
              <button className="btn-black" onClick={toggleAdminPanel}>
                {showAdminPanel ? "Back to Profile" : "Go to Admin Panel"}
              </button>
            )}
          </h2>
        </div>

        {!showAdminPanel ? (
          <>
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
              <button className="btn-black" onClick={handlePasswordSubmit}>
                Update Password
              </button>
            </div>
          </>
        ) : (
          <div className="admin-panel">
            <h2 className="profile-heading">
              Admin Panel - Manage Enrollments
            </h2>
            {purchases.length === 0 ? (
              <p>No purchases found.</p>
            ) : (
              <table className="purchase-table">
                <thead>
                  <tr>
                    <th>Purchase ID</th>
                    <th>User</th>
                    <th>Payment Method</th>
                    <th>Proof</th>
                    <th>Transaction ID</th>
                    <th>Purchase Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {purchases.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.user?.display_name || p.user_id}</td>
                      <td>{p.payment_method}</td>
                      <td>
                        {p.proof_of_payment ? (
                          <a
                            href={p.proof_of_payment}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td>{p.transaction_id || "N/A"}</td>
                      <td>{new Date(p.purchase_date).toLocaleDateString()}</td>
                      <td>{p.status}</td>
                      <td>
                        <select
                          value={p.status}
                          onChange={(e) =>
                            handleStatusChange(p.id, e.target.value)
                          }
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Profile;
