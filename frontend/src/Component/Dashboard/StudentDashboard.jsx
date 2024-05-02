import React from "react";
import Sidebar from "./Sidebar";
import "./StudentDashboard.css";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const studentsData = [
  {
    id: 1,
    name: "Jon Doe",
    email: "Jon_Doe@outlook.com",
    idNumber: "12345",
    gender: "Female",
    age: 23,
    nationality: "American",
  },
  {
    id: 2,
    name: "Mara Lilian",
    email: "bigbunda@gmail.com",
    idNumber: "12345",
    gender: "Female",
    age: 18,
    nationality: "Isrealite",
  },
  {
    id: 3,
    name: "olabode Eef",
    email: "nitroeef@yahoo.com",
    idNumber: "12345",
    gender: "Male",
    age: 26,
    nationality: "Nigerian",
  },
];

const StudentDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState(studentsData);
  const [filteredData, setFilteredData] = useState(studentsData);
  const [issideBarToggle, setIsSideBarToggle] = useState(false);

  const handleSearchChange = (e) => {
    // Get the search term from the input field and convert it to lowercase
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    // Filter the studentsData based on the search term
    const filtered = studentsData.filter(
      (student) =>
        // Check if the student's name or email contains the search term
        student.name.toLowerCase().includes(term) ||
        student.email.toLowerCase().includes(term)
    );
    // Set the filtered data to the state
    setFilteredData(filtered);
  };

  const handleDelete = (studentId) => {
    // Filter out the student with the specified studentId from the students array
    const updatedStudents = students.filter(
      (student) => student.id !== studentId
    );
    // Update the students array
    setStudents(updatedStudents);

    // Filter out the student with the specified studentId from the filteredData array
    const updatedFilteredData = filteredData.filter(
      (student) => student.id !== studentId
    );
    // Update the filteredData array
    setFilteredData(updatedFilteredData);
  };

  return (
    <div>
      {issideBarToggle && (
         <div className="mobile-side-nav"><Sidebar/></div>
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
              <FaTimes className="sidebar-toggle-iconB" onClick={() => setIsSideBarToggle(false)}/>
            ) : (
              <FaBars className="sidebar-toggle-iconB" onClick={() => setIsSideBarToggle(true)}/>
            )}
          </div>

          <p>Search students</p>

          <input
            placeholder="Search by name, email, or ID number"
            type="text"
            className="search"
            value={searchTerm}
            onChange={handleSearchChange}
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
                    <td className="same_class">{student.idNumber}</td>
                    <td className="same_class">{student.gender}</td>
                    <td className="same_class">{student.age}</td>
                    <td className="same_class">{student.nationality}</td>
                    <td className="same_class">
                      <RiDeleteBin6Line
                        size={25}
                        color="red"
                        onClick={() => handleDelete(student.id)}
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
    </div>
    

  );
};

export default StudentDashboard;
