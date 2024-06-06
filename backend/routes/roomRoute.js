const express = require("express");
const { createNewRoom, getAllRooms, getRoom, updateRoom, deleteRoom } = require("../controllers/roomController");
const router = express.Router();
// const {protect} = require("../middleware/authMiddleware")


router.post("/create-room", createNewRoom)
router.get("/", getAllRooms)
router.get("/:roomId", getRoom)
router.patch("/:roomId", updateRoom)
router.delete("/:roomId", deleteRoom)



module.exports = router;
