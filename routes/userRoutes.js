const express = require("express");
const { getAllUsers } = require("../controllers/userController");

// router object
const router = express.Router();

// GET ALL USERS || GET
router.get("all-users", getAllUsers);

module.exports = router;
