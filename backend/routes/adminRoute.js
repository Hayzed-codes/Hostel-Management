const express = require("express");
const { register, getAdmin, login, deleteAdmin, getAdmins, updateAdmin, logoutAdmin } = require("../controllers/adminController");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware")

router.post("/register", register)
router.post("/login", login)

router.get("/:adminId", getAdmin)
router.delete("/:adminId", deleteAdmin)
router.get("/", getAdmins)
router.patch("/:adminId", updateAdmin)
router.post("/logout", logoutAdmin)


module.exports = router;