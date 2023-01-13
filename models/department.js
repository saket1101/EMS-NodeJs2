const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const departmentSchema = new Schema({
  departmentName: {
    type: String,
    required: true,
  },
 

});


const Department = mongoose.model("Department",departmentSchema);

module.exports = Department