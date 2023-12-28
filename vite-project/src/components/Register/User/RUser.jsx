import  { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./RUser.css";
import UserService from "../../../services/RUserService";

function Registration() {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    middleName:"",
    mobile: "",
    email: "",
    address: "",
    username: "",
    customerId: "",
    password: "",
    userPhoto:null,
  });
  const userService = new UserService();
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === "file" ? e.target.files[0] : value;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: newValue,
    }));
    // if (e.target.type === 'file') {
    //   handleUserPhotoChange(e.target.files[0]);
    // }
    };

      const handleUserPhotoChange = (file) => {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUserInfo((prevInfo) => ({
            ...prevInfo,
            userPhoto: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      }
    };

  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await userService.sendUserData(userInfo);
        console.log('Server response:', response);
        showToastMessage(); // Show success message to the user
      } catch (error) {
        // Handle errors, such as displaying an error message to the user
        console.error('Registration error:', error.message);
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    }
  };


  const validateForm = () => {
    const errors = {};

    if (!userInfo.firstName) {
      errors.firstName = "First Name is required";
    }

    // if (!userInfo.middleName) {
    //   errors.middleName = "Middle Name is required";
    // }

    if (!userInfo.lastName) {
      errors.lastName = "lastName Name is required";
    }

    if (!userInfo.mobile) {
      errors.mobile = "Mobile Number is required";
    } else if (!/^\d{10}$/.test(userInfo.mobile)) {
      errors.mobile = "Invalid Mobile Number";
    }

    if (!userInfo.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
      errors.email = "Invalid Email Address";
    }

    if (!userInfo.address) {
      errors.address = "Address is required";
    }

    if (!userInfo.username) {
      errors.username = "Username is required";
    }

    if (!userInfo.userPhoto) {
      errors.customerId = "Customer ID is required";
    }

    if (!userInfo.customerId) {
      errors.customerId = "Customer ID is required";
    }

    if (!userInfo.password) {
      errors.password = "Password is required";
    } else if (userInfo.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    // if (!userInfo.firstName || !userInfo.middleName || !userInfo.lastName || !userInfo.mobile || !userInfo.email || !userInfo.address || !userInfo.username || !userInfo.customerId || !userInfo.password) {
    //   errors.general = "Please fill in all the details";
    //  }

    setValidationErrors(errors);

    const firstError = Object.values(errors)[0];
    if (firstError) {
      toast.error(firstError, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    }
    return errors;
  };

  const setValidationErrors = () => {};

  const showToastMessage = () => {
    toast.success("You have Registered Successfully!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 700,
    });
  };

  return (
    <div className="registration-container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <p></p>
        <h1 className="h11">User Registration</h1>
        <div className="label-row">
          <label className="label2">Name of the rider:</label>
          <div className="input-row">
            <input
              className="input2"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={userInfo.firstName}
              onChange={handleChange}
              // required
            />
            <input
              className="input2"
              type="text"
              name="middleName"
              placeholder="Middle Name"
              value={userInfo.middleName}
              onChange={handleChange}
              // required
            />
            <input
              className="input2"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={userInfo.lastName}
              onChange={handleChange}
              // required
            />
          </div>
        </div>
        <div className="label-row">
          <label className="label2" htmlFor="mobile">
            Mobile Number:
          </label>
          <input
            className="input2"
            type="tel"
            id="mobile"
            name="mobile"
            placeholder="Enter your mobile number"
            value={userInfo.mobile}
            onChange={handleChange}
            //  required
          />
        </div>
        <div className="label-row">
          <label className="label2" htmlFor="email">
            Email:
          </label>
          <input
            className="input2"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={userInfo.email}
            onChange={handleChange}
            // required
          />
        </div>
        <div className="label-row">
          <label className="label2" htmlFor="address">
            Address:
          </label>
          <textarea
            className="input2"
            id="address"
            name="address"
            placeholder="Enter your address"
            value={userInfo.address}
            onChange={handleChange}
            //  required
          ></textarea>
        </div>
        {/* Profile Information */}
        <h2 className="h22">Profile Information</h2>
        <div className="label-row">
          <label className="label2" htmlFor="username">
            Username:
          </label>
          <input
            className="input2"
            type="text"
            id="username"
            name="username"
            placeholder="Choose a username"
            value={userInfo.username}
            onChange={handleChange}
            // required
          />
        </div>
        <div className="label-row">
          <label className="label1">User Photo</label>
          <input
            className="input1"
            type="file"
            name="userPhoto"
            onChange={(e) => {
              handleUserPhotoChange(e.target.files[0]);
            }}            accept="image/*"
            
          />
           
        </div>
        {userInfo.userPhoto && (
          <div>
            <p>Image Preview:</p>
            <img
              src={userInfo.userPhoto}
              alt="User Preview"
              style={{ maxWidth: '100px' }}
            />
          </div>
        )}
       
        <div className="label-row">
          <label className="label2" htmlFor="customerId">
            Customer ID:
          </label>
          <input
            className="input2"
            type="text"
            id="customerId"
            name="customerId"
            placeholder="Enter your customer ID"
            value={userInfo.customerId}
            onChange={handleChange}
            //  required
          />
        </div>
        <div className="label-row">
          <label className="label2" htmlFor="password">
            Password:
          </label>
          <input
            className="input2"
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={userInfo.password}
            onChange={handleChange}
          />
        </div>
        <button className="button2" type="submit">
          Register
        </button>{" "}
        <ToastContainer />
      </form>
    </div>
  );
}

export default Registration;
