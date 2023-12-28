import React, { useState, useEffect } from "react";
import "./Profile.css"; 
import ProfileService from "../../services/ProfileService";

const ProfilePage = ({ token }) => {
  const [selectedContent, setSelectedContent] = useState("profile");
  const [clientForm, setClientForm] = useState({
    ownerName: "",
    phoneNumber: "",
    address1: "",
    email:"",
    // userPhoto:"",
  });
  const imageDataUri = clientForm.userPhoto.substring(1,clientForm.userPhoto.length - 1);
  const handleChangeContent = (content) => {
    setSelectedContent(content);
  };

  const handleUpdateClientProfile = async () => {
    // Add logic to update client profile here
    // const response = await ProfileService.updateUserData(clientForm);
    console.log("Updating client profile:", clientForm);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileService = new ProfileService();
        const userProfile = await profileService.getUserProfile(token);
        // console.log(userProfile);
        setClientForm({
          ownerName: userProfile.firstName,
          phoneNumber: userProfile.mobile,
          address1: userProfile.address,
          email:userProfile.email,
          userPhoto:userProfile.userPhoto,
        });
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
      }
    };

    fetchUserProfile();
  }, [token]);


  return (
    <div className="profile-container">
      
      <div className="profile-sidebar">
        <div className="profile-header">
          <img
            className="profile-image"
            //  src={imageDataUri}
            // src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            alt="Profile"
          />
          <div className="profile-details">
            <div className="profile-name">{clientForm.ownerName}</div>
            <div className="profile-email">{clientForm.email}</div>
          </div>
        </div>
        <ul className="profile-menu">
          <li
            className={`profile-menu-item ${
              selectedContent === "profile" && "active"
            }`}
            onClick={() => handleChangeContent("profile")}
          >
            Profile Settings
          </li>
          <li
            className={`profile-menu-item ${
              selectedContent === "password" && "active"
            }`}
            onClick={() => handleChangeContent("password")}
          >
            Change Password
          </li>
          <li
            className={`profile-menu-item ${
              selectedContent === "privacy" && "active"
            }`}
            onClick={() => handleChangeContent("privacy")}
          >
            Privacy
          </li>
          <li className="profile-menu-item">Billing Information</li>
        </ul>
      </div>
      <div className="profile-content">
        {selectedContent === "profile" && (
          <div className="profile-form">
            <h4 className="profile-title">Profile Settings</h4>
            <div className="my-form-container">
              <div className="my-form-row">
                <label className="my-label">Name</label>
                <input
                  type="text"
                  className="my-input"
                  placeholder="Enter name"
                  value={clientForm.ownerName}
                  onChange={(e) => setClientForm({ ...clientForm, ownerName: e.target.value })}
                />
              </div>
              <div className="my-form-row">
                <label className="my-label">Mobile Number</label>
                <input
                  type="text"
                  className="my-input"
                  placeholder="Enter phone number"
                  value={clientForm.phoneNumber}
                onChange={(e) => setClientForm({ ...clientForm, phoneNumber: e.target.value })}
                />
              </div>
              <div className="my-form-row">
                <label className="my-label">Address Line 1</label>
                <input
                  type="text"
                  className="my-input"
                  placeholder="Enter address line 1"
                  value={clientForm.address1}
                  onChange={(e) => setClientForm({ ...clientForm, address1: e.target.value })}
                />
              </div>
              <div className="my-form-row">
                <label className="my-label">Email ID</label>
                <input
                  type="text"
                  className="my-input"
                  placeholder="Enter email id"
                  value={clientForm.email}
                  onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                  readOnly
                />
              </div>
            </div>
            <button
              className="profile-button"
              type="button"
              onClick={handleUpdateClientProfile}
            >
              Update Profile
            </button>
          </div>
        )}
        {/* Add other content sections as needed */}
      </div>
    </div>
  );
};

export default ProfilePage;
