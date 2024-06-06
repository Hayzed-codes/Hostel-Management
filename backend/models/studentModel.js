const mongoose = require("mongoose")

const guardianSchema = new mongoose.Schema({
    guardianName: {
        type: String,
        require: true
    },
    guardianEmail: {
        type: String,
        require: [true, 'Please add an email'],
        trim: true
    }
});

const studentSchema = new mongoose.Schema({
    _id: {
        type: String,
        unique: true,
        require: true
      },
    name: {
        type: String,
        require: true,
    },
    age: {
        type: Number,
        require: true
    },
    gender: {
        type: String,
        require: true,
        enum: ["Female", "Male", "Others"]
    },
    nationality: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: [true, "Please add an Email"],
        trim: true,
        unique: true
    },
    guardian: guardianSchema,
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        default: null,
    },
    role: {
        type: String,
        enum: ["student"],
        default: "student"
    },
    checkedIn: {
        type: Boolean,
        default: false
    },
    checkedInTime: {
        type: Date,
        default: null
    },
    checkedOutTime: {
        type: Date,
        default: null
    },
},
    {
        timestamps: true,
        minimize: false,
        toJSON: { getters: false }
    }
);


// studentSchema.methods.checkIn = function () {
//     this.checkedIn = true;
//     this.checkedInTime = new Date();
//     this.checkedOutTime = null;
// }

// studentSchema.methods.checkOut = function () {
//     this.checkedIn = false;
//     this.checkedOutTime = new Date();
//     this.checkedInTime = null;
// };


const Student = mongoose.model("Student", studentSchema)
module.exports = Student;