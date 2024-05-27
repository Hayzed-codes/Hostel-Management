const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: Number,
    require: true,
    unique: true
  },
  capacity: {
    type: Number,
    require: true
  },

  occupancy: {
    type: Number,
    ref: "Student"
},
location: {
    type: String,
    require: true
  },
  status: {
    type: String,
    default: "Unavailable"
  },
});


const Room = mongoose.model("Room", roomSchema);
module.exports = Room;