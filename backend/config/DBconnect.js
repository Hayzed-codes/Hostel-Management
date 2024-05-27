const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://Hayzed:hayzed222@cluster0.guwetq6.mongodb.net/Hostel");
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
