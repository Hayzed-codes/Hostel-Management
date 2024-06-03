const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Admin = require("../models/AdminModel");
const generateToken = require("../utils/index");

// Register a new admin
const register = asyncHandler(async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    !fullname ||
      !email ||
      !password &&
        (() => {
          res.status(400);
          throw new Error("Please fill all the require fields");
        })();

    password.length < 6 &&
      (() => {
        res.status(400);
        throw new Error("Password must be up to 6 characters!");
      })();

    // Check if admin already exist
    const adminExists = await Admin.findOne({ email });

    adminExists &&
      (() => {
        res.status(400);
        throw new Error("Email already exists");
      })();

    // To create new admin
    const admin = await Admin.create({
      fullname,
      email,
      password,
    });

    const token = generateToken(admin._id);

    // send http-only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), //1 day
      sameSite: "none",
      secure: true,
    });

    if (admin) {
      const { _id, fullname, email, role } = admin;

      res.status(201).json({
        _id,
        fullname,
        email,
        role,
        token,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Data");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Admin login
const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    // To find an admin
    let admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    //  Check password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credientials!" });
    }

    const token = generateToken(admin._id);

    if (admin && isMatch) {
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: "none",
        secure: true,
      });

      const { _id, fullname, email, role } = admin;

      //
      res.status(201).json({
        _id,
        fullname,
        email,
        role,
        token,
      });
    } else {
      res.status(500);
      throw new Error("something went wrong!");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

const getAdmin = asyncHandler(async (req, res) => {
  // try {
  const { adminId } = req.params;

  const admin = await Admin.findById(adminId);

  if (admin) {
    const { _id, fullname, email, role } = admin;

    res.status(200).json({
      _id,
      fullname,
      email,
      role,
    });
  } else {
    res.status(404).json({ message: "Admin not found" });
  }
  // } catch (error) {
  //   console.error(error.message);
  //   res.status(500).send("Server error");
  // }
});

// Delete an admin
const deleteAdmin = asyncHandler(async (req, res) => {
  try {
    const { adminId } = req.params;
    const admin = Admin.findById(adminId);
    if (!admin) {
      res.status(404);
      throw new Error("User not found");
    }

    await admin.deleteOne();
    res.status(200).json({
      Message: "Admin data deleted successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Get details of all admins
const getAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find().sort("-createdAt").select("-password");
  if (!admins) {
    res.status(500);
    throw new Error("Something went wrong");
  }
  res.status(200).json(admins);
});

const updateAdmin = asyncHandler(async (req, res) => {
  const { adminId } = req.params;

  // Find the admin by ID, excluding the password field
  const admin = await Admin.findById(adminId).select("-password");

  if (admin) {
    // Update the admin fields if new values are provided in req.body
    if (req.body.fullname) admin.fullname = req.body.fullname;
    if (req.body.email) admin.email = req.body.email;
    if (req.body.role) admin.role = req.body.role;

    const result = await admin.save();

    return res.status(200).json(result); // Send the updated admin as JSON response
  } else {
    return res.status(404).json({ message: "Admin not found" }); // Send a 404 response if admin not found
  }
});


// const updateAdmin = asyncHandler(async (req, res) => {
//   const { adminId } = req.params;

//   const admin = await Admin.findById(adminId).select("-password");

//   if (admin) {
//     if (req.body?.fullname) admin.fullname = req.body.fullname;
//     if (req.body?.email) admin.email = req.body.email;
//     if (req.body?.role) admin.role = req.body.role;

//     const result = await admin.save();

//     res.json(result);
//   }
// });

const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("token", "none", {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now()), // Set expiration to now to effectively delete the cookie
    sameSite: "none",
    secure: true,
  });

  return res.status(200).json({ message: "Logged out successfully" });
});



module.exports = {
  register,
  login,
  getAdmin,
  deleteAdmin,
  getAdmins,
  updateAdmin,
  logoutAdmin,
};
