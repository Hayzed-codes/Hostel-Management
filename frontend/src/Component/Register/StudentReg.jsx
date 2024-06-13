import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  name: "",
  age: "",
  roomNum: "",
  email: "",
  gender: "",
  g_name: "",
  g_email: "",
  nationality: "",
};

const StudentReg = () => {
  const [formData, setFormData] = useState(initialState);
  const [formValidMessage, setFormValidMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { name, age, email, roomNum, gender, g_email, g_name, nationality } =
    formData;

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const registerStudent = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !age ||
      !email ||
      !roomNum ||
      !gender ||
      !g_email ||
      !g_name ||
      !nationality
    ) {
      toast.error("All field required");
      return;
    }
    // setIsSubmitting(true)

    axios
      .post("https://hostel-management-app-azure.vercel.app/student/register-student", formData)
      .then((response) => {
        console.log(response);
        setIsSubmitting(false);
        toast.success("Registration Successful");
        navigate("/studentdash");
      })
      .catch((error) => {
        setIsSubmitting(false);
        const message =
          error.response?.status === 400
            ? "A student with same email  already exist"
            : "Server error, unable to process the reg"
        
        setFormValidMessage(message)
        toast.error(message)
      });
  };

  return (
    <div className="container form__ ">
      <div className="form-container">
        <p className="title"> Student Registration.</p>

        <form className="form" onSubmit={registerStudent}>
          <div className="--dir-column">
            <label htmlFor="name">Student&apos;s Name:</label>
            <input
              type="text"
              className="input"
              name="name"
              placeholder="Enter student's name"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="--dir-column">
            <label htmlFor="email">Contact Email:</label>
            <input
              type="email"
              className="input"
              name="email"
              placeholder="example@yahoo.com"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="age">Age:</label>
            <input
              type="text"
              className="input"
              name="age"
              placeholder="18"
              required
              min={0}
              value={formData.age}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="--dir-column">
            <label htmlFor="gender">Gender:</label>
            <input
              type="text"
              className="input"
              name="gender"
              placeholder="LGBTQ"
              required
              value={formData.gender}
              onChange={handleInputChange}
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="roomNum">Room Number:</label>
            <input
              type="number"
              className="input"
              name="roomNum"
              placeholder="306"
              required
              value={formData.roomNum}
              onChange={handleInputChange}
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="g_name">Guardian&apos;s Name:</label>
            <input
              type="text"
              className="input"
              name="g_name"
              placeholder="Enter guardian's name"
              required
              value={formData.g_name}
              onChange={handleInputChange}
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="g_email">Guardian&apos;s Email:</label>
            <input
              type="email"
              className="input"
              name="g_email"
              placeholder="example@yahoo.com"
              required
              value={formData.g_email}
              onChange={handleInputChange}
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="nationality">Nationality:</label>
            <input
              type="text"
              className="input"
              name="nationality"
              placeholder="Galaxian"
              required
              value={formData.nationality}
              onChange={handleInputChange}
            />
          </div>

          <button className="--btn" disabled={isSubmitting}>
          {isSubmitting ? "Adding Student...." : "Add Student"}
          </button>
        </form>
        {formValidMessage && (
          <p className="error-message">{formValidMessage}</p>)}
      </div>
    </div>
  );
};

export default StudentReg;
