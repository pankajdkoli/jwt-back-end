import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("http://localhost:3003/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfileData(response.data);
      } catch (error) {
        console.log("Failed to fetch profile data:", error.response.data.error);
      }
    };

    fetchProfileData();
  }, []);
  console.log(profileData);
  return (
    <div>
      <h2>Profile</h2>
      {profileData ? (
        <div>
          <p>First Name: {profileData.firstname}</p>
          <p>Last Name: {profileData.lastname}</p>
          <p>Email Address: {profileData.email}</p>
          <p>Phone Number: {profileData.mobilenumber}</p>
        </div>
      ) : (
        <p>Loading profile data...</p>
      )}
    </div>
  );
};

export default Profile;
