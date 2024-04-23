import React from 'react'
import Sidebar from './Sidebar'
import './StudentDashboard.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'


const studentsData = [
    {
        id: 1,
        name: "Jon Doe",
        email: "Jon_Doe@outlook.com",
        idNumber: "12345",
        gender: "Female",
        age: 23,
        nationality: "American"
    },
    {
        id: 2,
        name: "Michelle Lilian",
        email: "bigbunda@gmail.com",
        idNumber: "12345",
        gender: "Female",
        age: 18,
        nationality: "Isrealite"
    },
    {
        id: 3,
        name: "olabode",
        email: "nitroeef@yahoo.com",
        idNumber: "12345",
        gender: "Male",
        age: 26,
        nationality: "Nigerian"
    },
]

const StudentDashboard = () => {
        const [searchTerm, setSearchTerm] = useState('');
        const [students, setStudents] = useState(studentsData);
        const [filteredData, setFilteredData] = useState(studentsData);
        

        const handleSearchChange = (e) => {
            // Get the search term from the input field and convert it to lowercase
            const term = e.target.value.toLowerCase()
             // Filter the studentsData based on the search term
            const filtered = studentsData.filter(
                (student) =>
                 // Check if the student's name or email contains the search term
                student.name.toLowerCase().includes(term) ||
                student.email.toLowerCase().includes(term)
            );
            // Set the filtered data to the state
            setFilteredData(filtered)
        }

        const handleDelete = (studentId) => {

        }

    
  return (
    <div>
        <Sidebar />
      <h1>Student</h1>

    </div>
  )
}

export default StudentDashboard
