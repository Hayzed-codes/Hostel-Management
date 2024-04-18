import React from 'react'
import './Register.css'

const StudentReg = () => {
  return (
    <div className="container form__ ">
    <div className="form-container">
      <p className="title"> Student Registration.</p>

      <form className="form">
        <div className="--dir-column">
          <label htmlFor="name">Student&apos;s Name:</label>
          <input
            type="text"
            className="input"
            name="name"
            placeholder="Enter student's name"
            required
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
          />
        </div>

        <div className="--dir-column">
          <label htmlFor="number">Room Number:</label>
          <input
            type="text"
            className="input"
            name="number"
            placeholder="306"
            required
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
          />
        </div>

        <div className="--dir-column">
          <label htmlFor="name">Guardian&apos;s Name:</label>
          <input
            type="text"
            className="input"
            name="name"
            placeholder="Enter guardian's name"
            required
          />
        </div>

        <div className="--dir-column">
          <label htmlFor="email">Guardian&apos;s Email:</label>
          <input
            type="email"
            className="input"
            name="email"
            placeholder="example@yahoo.com"
            required
          />
        </div>

        <button className="--btn">Add Student</button>
      </form>
    </div>
  </div>
  )
}

export default StudentReg
