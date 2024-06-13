import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./StudentDashboard.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaPenFancy } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import useAuthRedirect from "../../../context/useAuth";
import axios from "axios";
import UpdateCheckIn from "../Modal/UpdateCheckIn";
import ChangeStundentRoom from "../Modal/ChangeStundentRoom";
import UpdateStudentProfile from "../Modal/UpdateStudentProfile";



const StudentDashboard = () => {
  const [search, setSearch] = useState("");
  // const [filteredData, setFilteredData] = useState(studentsData);
  const [issideBarToggle, setIsSideBarToggle] = useState(false);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState("");
  const [SelectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("https://hostel-management-app-azure.vercel.app/student");
        setData(response.data);
      } catch (error) {
        console.error("Error fethching data", error);
        setMessage(error.message);
      }
    };
    fetchStudents();
  }, []);

  const handleModalOpen = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedModal("");
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const handleModalSelect = (modalType) => {
    setSelectedModal(modalType);
  };

  const removeUser = async (_id) => {
    try {
      console.log(`Delete student by id:${_id}`);
      const response = await axios.delete(
        `https://hostel-management-app-azure.vercel.app/student/delete-student/${_id}`
      );
      console.log(response.data);

      // filtering out the deleted student from the data
      setData((prev) => prev.filter((student) => student._id !== _id));

      //setting success message
      setMessage("Student deleted successfully");
    } catch (error) {
      // Setting error message
      setMessage("Failed to delete student");
      console.error("Error deletign students!", error);
    }
  };

  const confirmDelete = (_id) => {
    confirmAlert({
      title: "Delete this student",
      message: "Are You Sure You Want To Delete This Student?",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeUser(_id),
        },
        {
          label: "Cancel",
          onClick: () => alert("Deletion cancelled"),
        },
      ],
    });
  };

  const filteredData = data.filter(
    (item) =>
      item.nationality.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase())
  );

  // const handleSearchChange = (e) => {
  //   // Get the search term from the input field and convert it to lowercase
  //   const term = e.target.value.toLowerCase();
  //   setSearchTerm(term);
  //   // Filter the studentsData based on the search term
  //   const filtered = studentsData.filter(
  //     (student) =>
  //       // Check if the student's name or email contains the search term
  //       student.name.toLowerCase().includes(term) ||
  //       student.email.toLowerCase().includes(term)
  //   );
  //   // Set the filtered data to the state
  //   setFilteredData(filtered);
  // };

  // const handleDelete = (studentId) => {
  //   // Filter out the student with the specified studentId from the students array
  //   const updatedStudents = students.filter(
  //     (student) => student.id !== studentId
  //   );
  //   // Update the students array
  //   setStudents(updatedStudents);

  //   // Filter out the student with the specified studentId from the filteredData array
  //   const updatedFilteredData = filteredData.filter(
  //     (student) => student.id !== studentId
  //   );
  //   // Update the filteredData array
  //   setFilteredData(updatedFilteredData);
  // };

  return (
    <div>
      {issideBarToggle && (
        <div className="mobile-side-nav">
          <Sidebar />
        </div>
      )}

      <div className="--flex --overflow-hidden">
        <div className="desktop-side-nav">
          <Sidebar />
        </div>

        <div className=" --flex-dir-column --overflow-y-auto --flex-1 overflow-x-hidden">
          <main className="--flex-justify-center w-full">
            <div className="right dash-main">
              <div className="--flex-justify-between">
                <p>Students</p>
                {issideBarToggle ? (
                  <FaTimes
                    className="sidebar-toggle-iconB"
                    onClick={() => setIsSideBarToggle(false)}
                  />
                ) : (
                  <FaBars
                    className="sidebar-toggle-iconB"
                    onClick={() => setIsSideBarToggle(true)}
                  />
                )}
              </div>

              <p>Search students</p>

              <input
                placeholder="Search by name, email, or ID number"
                type="text"
                className="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <div className="table">
                <table className="table_wrapper">
                  <thead className="table__head">
                    <tr className="table__row">
                      <th className="same_class">Student Name</th>
                      <th className="same_class">Email</th>
                      <th className="same_class">ID Number</th>
                      <th className="same_class">Gender</th>
                      <th className="same_class">Age</th>
                      <th className="same_class">Nationality</th>
                      <th className="same_class">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="table__body">
                    {filteredData.map((student, index) => (
                      <tr key={index} className="table__row">
                        <td className="same_class">{student.name}</td>
                        <td className="same_class">{student.email}</td>
                        <td className="same_class">{student._id}</td>
                        <td className="same_class">{student.gender}</td>
                        <td className="same_class">{student.age}</td>
                        <td className="same_class">{student.nationality}</td>
                        <td className="same_class">
                          <RiDeleteBin6Line
                            size={25}
                            color="red"
                            onClick={() => confirmDelete(student._id)}
                          />
                          &nbsp;&nbsp;
                          <FaPenFancy
                            size={25}
                            color="blue"
                            onClick={() => handleModalOpen(student)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="btn-secondary">
                <Link to="/student-reg"> Add a student</Link>
              </button>
            </div>
          </main>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Select an Option</h2>
            <button
              onClick={() => handleModalSelect("UpdateStudentProfile")}
              className="one"
            >
              Update Student Profile
            </button>

            <button
              onClick={() => handleModalSelect("ChangeStudentRoom")}
              className="two"
            >
              Change Student Room
            </button>

            <button
              onClick={() => handleModalSelect("UpdateCheckIn")}
              
            >
              Update Check-In
            </button>

            <button onClick={() => handleModalClose("Close")} className="three">Close</button>
          </div>
        </div>
      )}

      {
        selectedModal === "UpdateStudentProfile" && (
          <UpdateStudentProfile
            student={SelectedStudent}
            onClose={handleModalClose}
          />
        )
      }
      {
        selectedModal === "ChangeStudentRoom" && (
          <ChangeStundentRoom
            student={SelectedStudent}
            onClose={handleModalClose}
          />
        )
      }
      {
        selectedModal === "UpdateCheckIn" && (
          <UpdateCheckIn
            student={SelectedStudent}
            onClose={handleModalClose}
          />
        )
      }
    </div>
  );
};

export default StudentDashboard;
