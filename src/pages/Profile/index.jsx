import React, { useEffect, useState } from "react";
import API from "../../services/api.js";
import "./index.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get("/users/profile");
        setUser(data);
      } catch (error) {
        setMessage(error.response?.data?.message || "Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match!");
      return;
    }

    try {
      const { data } = await API.put("/users/change-password", {
        currentPassword,
        newPassword,
      });
      setMessage(data.message || "Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error updating password");
    }
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      <div className="profile-section">
        {/* Profile Card */}
        {user && (
          <div className="profile-card">
            <h3>User Profile</h3>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Mobile:</strong> {user.mobile}</p>
          </div>
        )}

        {/* Password Card */}
        <div className="password-card">
          <h3>Change Password</h3>
          <form onSubmit={handleChangePassword}>
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit">Update Password</button>

            {/* ✅ Success / Error message */}
            {message && (
              <p
                className={`message ${
                  message.toLowerCase().includes("success") ? "success" : "error"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
