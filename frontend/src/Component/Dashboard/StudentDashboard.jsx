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
            const term = e.target.value.toLowerCase()
            const filtered = studentsData.filter(
                (student) =>
                student.name.toLowerCase().includes(term) ||
                student.email.toLowerCase().includes(term)
            );
            setFilteredData(filtered)
        }

    
  return (
    <div>
        <Sidebar />
      <h1>Student</h1>

      {/* {studentsData.map(({id, name, email, idNumber, gender, age, nationality}, i) => )} */}
    </div>
  )
}

export default StudentDashboard
