const express = require("express");
const { registerStudent, getAllStudents, getStudent, changeStudentRoom, updateStudentProfile, updateCheckInStatus, deleteStudent } = require("../controllers/studentController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register-student",protect, registerStudent)
router.get("/", protect , getAllStudents)
router.get("/:_id", protect , getStudent)
router.patch("/:_id", protect , updateStudentProfile)
router.post("/change-room", protect , changeStudentRoom)
router.post("/check-in-status", protect , updateCheckInStatus)
router.delete("/delete-student/:_id", protect , deleteStudent)


module.exports = router;