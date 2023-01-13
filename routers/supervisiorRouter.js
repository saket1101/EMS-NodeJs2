const express = require("express");
const { getAttendance,filterAttendance, addAttendance, addEmployee } = require("../controllers/supervisiorController");
const {  authSupervisior } = require("../middleware/auth");
const router = express.Router();

router.get("/getAttendance",authSupervisior,getAttendance)

router.get("/filterAttendance",authSupervisior,filterAttendance);

router.post("/addAttendance",authSupervisior,addAttendance);

router.post("/addEmployee",authSupervisior,addEmployee)

module.exports = router