import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (!storedUser || !token) {
        navigate("/login");
        return;
      }

      try {
        const parsedUser = JSON.parse(storedUser);
        const userId = parsedUser._id;

        const res = await axios.get(
          `http://localhost:2809/api/user/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res?.data ) {
          setUser(res?.data);
        } else {
          console.error("Invalid profile response");
          navigate("/profile");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!user) return <div>Loading profile...</div>;

  return (
    <div className="profile-container">
      <h2>👤 Profile</h2>
      <div className="profile-card">
        <p>
          <strong>Name:</strong> {user.data.name}
        </p>
        <p>
          <strong>Email:</strong> {user.data.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.data.phone || "Not Provided"}
        </p>
      </div>
    </div>
  );
};

export default Profile;
