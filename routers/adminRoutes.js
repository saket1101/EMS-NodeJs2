const express = require('express');
const { adminRegister, adminLogin,createDepartment,addEmployee,addAttendance,addEmployeeInDepartment,getAttendance, makeSupervisior } = require('../controllers/adminController');
const {authUser,authorizePermission} = require('../middleware/auth');
const router = express.Router();

router.post('/register',adminRegister);
router.post('/login',adminLogin);

// department creation
router.post('/addDpartment',authUser,authorizePermission('admin'),createDepartment)

// employ add
router.post('/addEmploye',authUser,authorizePermission('admin'),addEmployee)
router.post('/addAttendance',authUser,authorizePermission('admin'),addAttendance)

// addin employee in department
router.post('/addEmployInDepartment',authUser,authorizePermission('admin'),addEmployeeInDepartment);

// get attendance 
router.get('/getAttendance',authUser,authorizePermission('admin'),getAttendance)

// assigning a supervisior

router.post('/createSupervisior',authUser,authorizePermission('admin'),makeSupervisior)

module.exports = router