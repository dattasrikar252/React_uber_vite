import  { useState } from "react";
import "./RRider.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RiderService from "../../../services/RRiderService";

const RiderRegistration = () => {
  const [riderData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    mobileNo: "",
    email: "",
    password: "",
    vehicleType: "bike",
    Vehiclemodel: "",
    Year: "",
    vehicleofType: "Petrol",
    ChasisNo: "",
    EngineNo: "",
    rcPhoto: null,
    presentAddress: "",
    permanentAddress: "",

    proofOfIdentity: null,
    proofOfAddress: null,
    drivingLicenseNumber: "",
    issuingAuthority: "",

    bankAccountDetails: "",
    upiId: "",

    others: "",
  });
  const riderService = new RiderService();
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    const newValue = type === "file" ? e.target.files[0] : value;

    setFormData({ ...riderData, [name]: newValue });
    if (type === 'file') {
      handleImageChange(name, e.target.files[0]);
    }
  };

  const handleImageChange = (fieldName, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          [fieldName]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderImagePreview = (imageFieldName) => {
    const imageUrl = riderData[imageFieldName];

    if (imageUrl) {
      return (
        <div key={imageFieldName}>
          <p>{imageFieldName} Preview:</p>
          <img src={imageUrl} alt={`${imageFieldName} Preview`} style={{ maxWidth: '100px' }} />
        </div>
      );
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("FormData:", riderData);

    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await riderService.sendRiderData(riderData);
        console.log("Server response:", response);
        showToastMessage(); // Show success message to the user
      } catch (error) {
        // Handle errors, such as displaying an error message to the user
        console.error("Rider registration error:", error.message);
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!riderData.firstName) {
      errors.firstName = "First Name is required";
    }

    if (!riderData.middleName) {
      errors.middleName = "Middle Name is required";
    }

    if (!riderData.lastName) {
      errors.lastName = "lastName Name is required";
    }

    if (!riderData.mobileNo) {
      errors.mobile = "Mobile Number is required";
    } else if (!/^\d{10}$/.test(riderData.mobileNo)) {
      errors.mobileNo = "Invalid Mobile Number";
    }

    if (!riderData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(riderData.email)) {
      errors.email = "Invalid Email Address";
    }

    if (!riderData.password) {
      errors.password = "Password is required";
    } else if (riderData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (!riderData.fatherName) {
      errors.fatherName = "Father's Name is required";
    }

    // Validate motherName
    if (!riderData.motherName) {
      errors.motherName = "Mother's Name is required";
    }

    if (!riderData.vehicleType) {
      errors.vehicleType = "Type of Vehicle is required";
    }
    if (!riderData.Year) {
      errors.Year = "Make/Year is required";
    } else if (!/^\d{4}$/.test(riderData.Year)) {
      errors.Year = "Invalid Year format. Please enter a valid 4-digit year.";
    }

    if (!riderData.vehicleofType) {
      errors.vehicleofType = "Type of Vehicle is required";
    }

    // Validate ChasisNo
    if (!riderData.ChasisNo) {
      errors.ChasisNo = "ChasisNo is required";
    }

    // Validate EngineNo
    if (!riderData.EngineNo) {
      errors.EngineNo = "EngineNo is required";
    }

    // Validate rcPhoto
    if (!riderData.rcPhoto) {
      errors.rcPhoto = "Vehicle RC Photo is required";
    }

    // Validate presentAddress
    if (!riderData.presentAddress) {
      errors.presentAddress = "Present Address is required";
    }

    // Validate permanentAddress
    if (!riderData.permanentAddress) {
      errors.permanentAddress = "Permanent Address is required";
    }

    // Validate proofOfIdentity
    if (!riderData.proofOfIdentity) {
      errors.proofOfIdentity = "Proof of Identity is required";
    }

    // Validate proofOfAddress
    if (!riderData.proofOfAddress) {
      errors.proofOfAddress = "Proof of Address is required";
    }

    // Validate drivingLicenseNumber
    if (!riderData.drivingLicenseNumber) {
      errors.drivingLicenseNumber = "Driving License Number is required";
    }

    // Validate issuingAuthority
    if (!riderData.issuingAuthority) {
      errors.issuingAuthority = "Issuing Authority is required";
    }

    // Validate bankAccountDetails
    if (!riderData.bankAccountDetails) {
      errors.bankAccountDetails = "Bank Account Details is required";
    }

    // Validate upiId
    if (!riderData.upiId) {
      errors.upiId = "UPI ID is required";
    }

    // Validate others
    if (!riderData.others) {
      errors.others = "Others is required";
    }

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
    toast.success("You have Registered Successfully !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <div className="registration-container1">
      <form className="registration-form1" onSubmit={handleSubmit}>
        <h2>Rider Registration</h2>
        <div className="label-row">
          <label className="label1">Name of the rider:</label>
          <div className="input-row">
            <input
              className="input1"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={riderData.firstName}
              onChange={handleChange}
              // required
            />
            <input
              className="input1"
              type="text"
              name="middleName"
              placeholder="Middle Name"
              value={riderData.middleName}
              onChange={handleChange}
              // required
            />
            <input
              className="input1"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={riderData.lastName}
              onChange={handleChange}
              // required
            />
          </div>
        </div>
        <div className="label-row">
          <label className="label1">Father Name:</label>
          <input
            className="input1"
            type="text"
            name="fatherName"
            value={riderData.fatherName}
            onChange={handleChange}
            // required
          />
        </div>
        <div className="label-row">
          <label className="label1">Mother Name:</label>
          <input
            className="input1"
            type="text"
            name="motherName"
            value={riderData.motherName}
            onChange={handleChange}
            // required
          />
        </div>
        <div className="label-row">
          <label className="label1">Mobile No:</label>
          <input
            className="input1"
            type="text"
            name="mobileNo"
            value={riderData.mobileNo}
            onChange={handleChange}
            // required
          />
        </div>
        <div className="label-row">
          <label className="label1">Email:</label>
          <input
            className="input1"
            type="text"
            name="email"
            value={riderData.email}
            onChange={handleChange}
            // required
          />
        </div>
        <div className="label-row">
          <label className="label1">Password:</label>
          <input
            className="input1"
            type="password"
            name="password"
            value={riderData.password}
            onChange={handleChange}
            // required
          />
        </div>
        <div className="label-row">
          <label className="label1">Type of Vehicle:</label>
          <select
            className="input1"
            name="vehicleType"
            value={riderData.vehicleType}
            onChange={handleChange}
            // required
          >
            <option value="bike">Bike</option>
            <option value="auto">Auto</option>
            <option value="car">Car</option>
            <option value="bus">Bus</option>
            <option value="luxury">Luxury Vehicle</option>
          </select>
        </div>
        <h2>Vechicle Registration details</h2>
        <div className="label-row">
          <label className="label1">Vehiclemodel</label>
          <input
            className="input1"
            type="text"
            name="Vehiclemodel"
            value={riderData.Vehiclemodel}
            onChange={handleChange}
            // required
          />
        </div>
        <div className="label-row">
          <label className="label1">Make/Year</label>
          <input
            className="input1"
            type="text"
            name="Year"
            value={riderData.Year}
            onChange={handleChange}
            // required
          />
        </div>
        <div className="label-row">
          <label className="label1">Type of Vehicle:</label>
          <select
            className="input1"
            type="text"
            name="vehicleofType"
            value={riderData.vehicleofType}
            onChange={handleChange}
            // required
          >
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="CNG">CNG</option>
            <option value="EV">EV</option>
            {/* <option value="luxury"></option> */}
          </select>
        </div>
        <div className="label-row">
          <label className="label1">ChasisNo.</label>
          <input
            className="input1"
            type="text"
            name="ChasisNo"
            value={riderData.ChasisNo}
            onChange={handleChange}
            // required
          />
        </div>
        <div className="label-row">
          <label className="label1">Engine No.</label>
          <input
            className="input1"
            type="text"
            name="EngineNo"
            value={riderData.EngineNo}
            onChange={handleChange}
            // required
          />
        </div>
        <div className="label-row">
          <label className="label1">Vehicle RC Photo:</label>
          <input
            className="input1"
            type="file"
            name="rcPhoto"
            onChange={handleChange}
            // required
            accept="image/*" // Allow only image files
          />
         </div>
         {renderImagePreview('rcPhoto')}
        <div className="label-row">
          <label className="label1"> Present Address:</label>
          <textarea
            className="input1"
            name="presentAddress"
            value={riderData.presentAddress}
            onChange={handleChange}
            // required
          />
        </div>
        <div className="label-row">
          <label className="label1">Permanent Address:</label>
          <textarea
            className="input1"
            name="permanentAddress"
            value={riderData.permanentAddress}
            onChange={handleChange}
            // required
          />
        </div>
        {/* Identification Information */}
        <div className="label-row">
          <label className="label1">Proof of Identity:</label>
          <input
            className="input1"
            type="file"
            name="proofOfIdentity"
            onChange={handleChange}
            // required
            accept="image/*"
          />
        </div>
        {renderImagePreview('proofOfIdentity')}
        <div className="label-row">
          <label className="label1">Proof of Address:</label>
          <input
            className="input1"
            type="file"
            name="proofOfAddress"
            onChange={handleChange}
            // required
            accept="image/*"
          />
        </div>
        {renderImagePreview('proofOfAddress')}
        <div className="label-row">
          <label className="label1">Driving License Number:</label>
          <input
            className="input1"
            type="text"
            name="drivingLicenseNumber"
            value={riderData.drivingLicenseNumber}
            onChange={handleChange}
            // required
          />
        </div>
        <div className="label-row">
          <label className="label1">Issuing Authority:</label>
          <input
            className="input1"
            type="text"
            name="issuingAuthority"
            value={riderData.issuingAuthority}
            onChange={handleChange}
            // required
          />
        </div>
        {/* Financial Information */}
        <div className="label-row">
          <label className="label1">Bank Account Details:</label>
          <input
            className="input1"
            type="text"
            name="bankAccountDetails"
            value={riderData.bankAccountDetails}
            onChange={handleChange}
            // required
          />
        </div>
        <div className="label-row">
          <label className="label1">UPI ID:</label>
          <input
            className="input1"
            type="text"
            name="upiId"
            value={riderData.upiId}
            onChange={handleChange}
            // required
          />
        </div>
        {/* Other Information */}
        <div className="label-row">
          <label className="label1">Others:</label>
          <textarea
            className="input1"
            name="others"
            value={riderData.others}
            onChange={handleChange}
            // required
          />
        </div>
        <button className="button1" type="submit">
          Submit
        </button>{" "}
        <ToastContainer />
      </form>
    </div>
  );
};

export default RiderRegistration;
