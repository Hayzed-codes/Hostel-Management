const express = require("express");
const { register, getAdmin, login, deleteAdmin, getAdmins, updateAdmin, logoutAdmin } = require("../controllers/adminController");
const router = express.Router();

router.post("/register", register)
router.post("/login", login)

router.get("/:adminId", getAdmin)
router.delete("/:adminId", deleteAdmin)
router.get("/", getAdmins)
router.put("/:adminId", updateAdmin)
router.post("/logout", logoutAdmin)


module.exports = router;