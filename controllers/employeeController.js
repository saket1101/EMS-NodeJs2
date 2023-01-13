
const Employee = require("../models/employee");

module.exports.getAttendance = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email, password);
    if (!email || !password) {
      return res
        .status(201)
        .json({ msg: "Employee email and password is required" });
    }
    const employee = await Employee.findOne({ email: email });
    if (!employee) {
      return res.status(401).json({ msg: "Employee is not available" });
    }if(employee.password !== password){
      return res.status(404).json({msg:"password does not matched"})
    }
    let monthName = req.query.monthName;
    if(!monthName & !monthName.length>0){
      return res.status(401).json({msg:"plz provide month name in query"})
    }
    let name = monthName.slice(0, 3);
    let  shortMontnName = name[0].toUpperCase() + name.substring(1);
    // console.log("employee",employee)
    let attendance = employee.attendance;
    let atte = [];
    attendance.forEach((element) => {
      date = element.date;
      month = date.slice(0,3);
      if(monthName.trim().toUpperCase().slice(0,3)==month.trim().toUpperCase()){
        atte.push(element);
      }
    });
    res
      .status(201)
      .json({
        msg: "your Attendance is given",
        attendance: atte,
      });
    // }
  } catch (error) {
    res.status(501).json({ msg: "Server error occured", Error: error.message });
  }
};
