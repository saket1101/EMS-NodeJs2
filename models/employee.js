const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const {isEmail} = require("validator")

const employeeSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true ,validate: [ isEmail, 'invalid email' ],},
    password: { type: String, required: true },
    contact: { type: Number },
    address: { type: String },
    departmentName: {
      type: String,
      required: [true, "Departmetn is required"],
    },
    attendance: [],
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
