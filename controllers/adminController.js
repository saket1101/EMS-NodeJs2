const jwt = require("jsonwebtoken");
const moment = require("moment");
const Admin = require("../models/user");
const Department = require("../models/department");
const Employee = require("../models/employee");
const Supervisior = require("../models/supervisior");

// admin register
module.exports.adminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(401).json({ msg: "All fields are required" });
    }
    let user = await Admin.findOne({ email });
    if (user) {
      return res.status(401).json({ msg: "User already found Plz login!" });
    } else {
      user = await Admin.create({
        name: name,
        email: email,
        password: password,
      });
      const payload = {
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      };
      const token = await jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: "2D",
      });
      res.status(201).json({
        msg: "User registerd successfully",
        Email: user.email,
        Token: token,
      });
    }
  } catch (error) {
    res.status(501).json({ msg: "Server error occured", Error: error.message });
  }
};

// admin login
module.exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ msg: "All fields are required" });
    }
    const user = await Admin.findOne({ email });
    if (user) {
      const isPasswordMatched = await user.comparePassword(password);
      if (isPasswordMatched) {
        const payload = {
          user: {
            id: user._id,
            email: user.email,
            role: user.role,
          },
        };
        const token = await jwt.sign(payload, process.env.JWT_KEY, {
          expiresIn: "2D",
        });
        res
          .status(201)
          .json({ msg: "login successfull", email: user.email, token: token });
      } else {
        return res.status(401).json({ msg: "password is not correct" });
      }
    } else {
      res.status(401).json({ msg: "User not found plz register fisrt!" });
    }
  } catch (error) {
    res.status(501).json({ msg: "Server error occured", Error: error.message });
  }
};

// department create

module.exports.createDepartment = async (req, res) => {
  try {
    const departmentName = req.body.departmentName;
    // console.log("req.bodyy",req.body)
    // console.log(departmentName)
    const findDepartment = await Department.findOne({ departmentName });
    // console.log(findDepartment);
    if (!findDepartment) {
      const department = await Department.create({ departmentName });
      res.status(201).json({
        msg: "Department created successfully",
        Department: department.departmentName,
      });
    } else {
      return res
        .status(401)
        .json({ msg: "This Department has already created" });
    }
  } catch (error) {
    res.status(501).json({ msg: "Server error occured", Error: error.message });
  }
};

// create employee in any department;

module.exports.addEmployee = async (req, res) => {
  try {
    const departmentName = req.body.departmentName;
    if (!departmentName) {
      return res
        .status(401)
        .json({ msg: "plz provide the name of department" });
    }

    let existingEmail = await Employee.findOne({ email: req.body.email });
    if (existingEmail) {
      return res.status(401).json({ msg: "email already exist" });
    } else {
      let findDepartment = await Department.findOne({ departmentName });
      if (!findDepartment) {
        return res.status(401).json({ msg: "This department does not exist" });
      } else {
        const employee = await Employee.create(req.body);
        res.json({
          message: "New Employee Created!",
          EmployeeId:employee._id
        });
      }
    }
  } catch (error) {
    res.status(501).json({ msg: "Server error occured", Error: error.message });
  }
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
      res.status(201).json({ msg: "Attendance created " + doc.attendance });
    } else {
      return res.status(401).json({ msg: "Employee not available" });
    }
  } catch (error) {
    res.status(501).json({ msg: "server error occured", Error: error.message });
  }
};

module.exports.addEmployeeInDepartment = async (req, res) => {
  try {
    const dpartmentName = req.body;
    const dpartment = await Department.findOne(dpartmentName);
    if (dpartment) {
      // console.log(dpartment);
    }
  } catch (error) {
    res.status(201).json({ msg: "Server Error occured", error: error });
  }
};

// get attendancee by the name or months

module.exports.getAttendance = async (req, res) => {
  try {
    let { name, month } = req.query;
    let monthName = month.slice(0, 3);
    // console.log(shrtName);
    if (!name || !month) {
      return res.send("plz provide name or date in query");
    }
    const employee = await Employee.find({ name });
    // console.log(employee)
    if (!employee) {
      return res
        .status(404)
        .json({ msg: "no any employee found with this name" });
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
  } catch (error) {
    res.status(501).json({ msg: "Server error occured", error: error.message });
  }
};

// assigning supervisior

module.exports.makeSupervisior = async (req, res) => {
  try {
    const { name, email, password, departmentName } = req.body;
    // console.log(departmentName);
    const supervisior = await Supervisior.findOne({ email });
    if (supervisior) {
      return res.send("this email is already exist in database ");
    }
    const department = await Department.findOne({ departmentName });
    // console.log(department);
    if (!department) {
      return res.send("This department has not found");
    }
    const checkDepartment = await Supervisior.findOne({departmentName})
    if(checkDepartment){
      return res.send("Supervisior is already assigned for this department")
    }
      let makeSupervisior = await Supervisior.create({
        name: name,
        email: email,
        password: password,
        departmentName: departmentName,
      });
      const payload = {
        supervisior: {
          id: makeSupervisior._id,
          email: makeSupervisior.email,
          departmentName: makeSupervisior.departmentName,
        },
      };
      const token = await jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: "2D",
      });
      res.status(201).json({
        msg: "Supervisior has created",
      Token:token
      });
  
  } catch (error) {
    res.status(501).json({ msg: "Server error occured", error: error.message });
  }
};
