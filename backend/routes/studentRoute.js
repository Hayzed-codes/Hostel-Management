const express = require("express");
const { registerStudent, getAllStudents, getStudent, changeStudentRoom, updateStudentProfile, updateCheckInStatus, deleteStudent } = require("../controllers/studentController");
// const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register-student", registerStudent)
router.get("/", getAllStudents)
router.get("/:_id", getStudent)
router.patch("/:_id", updateStudentProfile)
router.post("/change-room", changeStudentRoom)
router.post("/check-in-status", updateCheckInStatus)
router.delete("/delete-student/:_id", deleteStudent)


module.exports = router;