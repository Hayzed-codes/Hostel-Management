const asyncHandler = require("express-async-handler");
const Room = require("../models/roomModel");

const createNewRoom = asyncHandler(async (req, res) => {
    const { roomNumber, roomCapacity, roomLocation, roomOccupancy, roomStatus } = req.body;
    !roomNumber ||
        !roomCapacity ||
        (!roomLocation &&
            (() => {
                res.status(400);
                throw new Error("Please fill all require fields");
            })());

    const roomExists = await Room.findOne({ roomNumber });
    roomExists &&
        (() => {
            res.status(400);
            throw new Error("Room already exists");
        })();

    const room = await Room.create({
        roomNumber,
        roomCapacity,
      roomLocation,
        roomStatus
    });

    if (room) {
        const {
            _id,
            roomNumber,
            roomCapacity,
            roomLocation,
            roomStatus,
        } = room;

        res.status(201).json({
            _id,
            roomNumber,
            roomCapacity,
            roomLocation,
            roomStatus,
        });
    } else {
        res.status(400);
        throw new Error("Invalid Data");
    }
});

const getAllRooms = asyncHandler(async (req, res) => {
    const rooms = await Room.find().sort("roomNumber");
    if (!rooms) {
        res.status(500);
        throw new Error("Something went wrong");
    }
    res.status(200).json(rooms);
});

const getRoom = asyncHandler(async (req, res) => {

  const { roomId } = req.params;

  const room = await Room.findById(roomId);

  if (room) {
    const {
      _id,
      roomNumber,
      roomCapacity,
      roomLocation,
      roomOccupancy,
      roomStatus,
    } = room;

    res.status(200).json({
      _id,
      roomNumber,
      roomCapacity,
      roomLocation,
      roomOccupancy,
      roomStatus,
    });
  } else {
    res.status(404).json({ message: "Room not found" });
  }
});

const updateRoom = asyncHandler(async (req, res) => {
    try {
        const { roomId } = req.params;
      
        const room = await Room.findById(roomId);
        if (room) {
            if (req.body.roomNumber) room.roomNumber = req.body.roomNumber;
            if (req.body.roomCapacity) room.roomCapacity = req.body.roomCapacity;
            if (req.body.roomLocation) room.roomLocation = req.body.roomLocation;
            if (req.body.roomStatus) room.roomStatus = req.body.roomStatus;
            if (req.body.roomOccupancy) room.roomOccupancy = req.body.roomOccupancy;
      
            const updatedRoom = await room.save();
      
            return res.status(200).json(updatedRoom);
        } else {
            return res.status(404).json({ Message: "Room not found" });
        }
        
    } catch (error) {
        return res.status(500).json({ message: "An error occurred while updating the room", error: error.message });
    }
});



const deleteRoom = asyncHandler(async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = Room.findById(roomId);
    if (!room) {
      res.status(404);
      throw new Error("Room not found");
    }

    await room.deleteOne();
    res.status(200).json({
      Message: "Room deleted successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// createRoom, getRoom, getAllRoom, updateRoom and deleteRoom
module.exports = {
  createNewRoom,
  getAllRooms,
  getRoom,
  updateRoom,
  deleteRoom,
};
