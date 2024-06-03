const express = require("express");
const { createNewRoom, getAllRooms, getRoom, updateRoom, deleteRoom } = require("../controllers/roomController");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware")


router.post("/create-room",protect, createNewRoom)
router.get("/",protect, getAllRooms)
router.get("/:roomId",protect, getRoom)
router.patch("/:roomId",protect, updateRoom)
router.delete("/:roomId",protect, deleteRoom)



module.exports = router;
