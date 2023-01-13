const Employee = require("../models/employee");
const Department = require("../models/department");
const Supervisior = require("../models/supervisior");
const moment = require("moment");

// get attendance by supevisior for his/har own department
module.exports.getAttendance = async (req, res) => {
  try {
    const departmentName = req.supervisior.departmentName;
    let employee = await Employee.find({ departmentName });
    if (!employee) {
      return res.send("not any employee in this deparment");
    }
    let allAttendance = [];

    employee.forEach((element) => {
      let attend = [];
      let attendance = element.attendance;
      //  console.log(attendance)
      attendance.forEach((_element) => {
        attend.push(_element);
      });
      let obj = {
        Name: element.name,
        Attendance: attend,
      };
      allAttendance.push(obj);
    });
    res.status(201).json({ employee: allAttendance });
  } catch (error) {
    res.status(501).json({ msg: "server error", Error: error.message });
  }
};

// get attendance by month and employee name

module.exports.filterAttendance = async (req, res) => {
  try {
    let { name, month } = req.query;
    let monthName = month.slice(0, 3);
    if (!name || !month) {
      return res.send("plz provide name or date in query");
    }
    const departmentName = req.supervisior.departmentName;
    let employee = await Employee.find({
      departmentName: departmentName,
    });
    if (!employee) {
      return res.send("not any employee in this deparment");
    }
    let allAttendance = [];
    employee.forEach((element) => {
      let attendMonth = [];
      let attendance = element.attendance;
      attendance.forEach((_element) => {
        date = _element.date;
        month = date.slice(0, 3);
        if (monthName.trim().toUpperCase() == month.trim().toUpperCase()) {
          attendMonth.push(_element);
        }
      });
      let obj = {
        name: element.name,
        _id: element._id,
        attendance: attendMonth,
      };

      allAttendance.push(obj);
    });
    res.status(201).json({ employee: allAttendance });
  } catch (error) {}
};

// attendance addition
module.exports.addAttendance = async (req, res) => {
  try {
    const employeeId = req.body.employeeId;
    const a = await Employee.findOne({ _id: employeeId });
    let date = moment().format("MMM Do YY");
    // console.log(date);
    if (a) {
      let dates = a.attendance;
      if (dates.length > 0) {
        let attenda = dates[dates.length - 1];
        let lastDate = attenda.date;
        // console.log(moment.defaultFormat())
        if (lastDate === moment().format("MMM Do YY")) {
          return res.status(401).json({ msg: "Attendance has already true" });
        }
      }
      let attend = [];
      attend = a.attendance;
      aMap = {
        status: req.body.status,
        employeeId: employeeId,
        date: date,
      };
      attend.push(aMap);
      let doc = await Employee.findOneAndUpdate(
        { _id: employeeId },
        {
          attendance: attend,
        }
      );
      res.status(201).json({ msg: "Attendance created " });
    } else {
      return res.status(401).json({ msg: "Employee not available" });
    }
  } catch (error) {
    res.status(501).json({ msg: "server error occured", Error: error.message });
  }
};

// add employee by supervisior
module.exports.addEmployee = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const departmentName = req.supervisior.departmentName;
    if (!name || !email || !password) {
      return res.send("all given field is required");
    }
    const employees = await Employee.create({
      name: name,
      email: email,
      password: password,
      departmentName: departmentName,
    });
    res.status(201).json({
      msg: "Employee created",
      Name: employees.name,
      email: employees.email,
      department: employees.departmentName,
    });
  } catch (error) {
    res.status(501).json({ msg: "server error occured", Error: error.message });
  }
};
