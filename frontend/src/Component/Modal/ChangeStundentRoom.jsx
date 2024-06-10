import React, { useState } from "react";
import axios from "axios";

const ChangeStundentRoom = ({student, onClose}) => {
  const [newRoom, setNewRoom] = useState("");

  const handleChange = (e) => {
    setNewRoom(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3500/change-room", {
        studentId: student._id,
        newRoom,
      });
    } catch (error) {
      console.error("Error changing room", error);
    }
  };
  return (
  <div className="modal">
      <div className="modal-content">
        <h2>Change Student&apos;s Room</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">New Room Number</label>

            <input type="text" value={newRoom} onChange={handleChange} />
          </div>

          <button>Change Room</button>
          <button onClick={onClose}> Close</button>
        </form>
    </div>
  </div>
  );
};

export default ChangeStundentRoom;
