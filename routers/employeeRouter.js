const express = require("express");
const { getAttendance } = require("../controllers/employeeController");
const router = express.Router();


router.get('/getAttendance',getAttendance);

module.exports = router