const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  roomNumber: {
    type: Number,
    require: true,
  },
  capacity: {
    type: Number,
    require: true,
    unique: true,
  },

  occupancy: {
    type: Number,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
});


const Room = mongoose.model("Room", roomSchema);
module.exports = Room;