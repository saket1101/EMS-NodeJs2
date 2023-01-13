const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const {isEmail} = require("validator");
const bcrypt = require('bcrypt')

const userSchema =new Schema ({
  name: {
    type: String,
    required: true,
    minlength: [3, "name should not be less than three characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: [ isEmail, 'invalid email' ],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "your password should not be less than 6 character"],
  },
  role:{
    type:String,
    enum:['admin','supervisior','User'],
    default:'User'
} 
},{timestamps:true});

userSchema.pre('save',async function(){
    const genSalt = await bcrypt.genSalt(10);
    this.password =await bcrypt.hash(this.password,genSalt)
});

userSchema.methods.comparePassword = async function(userPassword){
    const isMatch = await bcrypt.compare(userPassword,this.password);

    return isMatch;
}

const Admin = mongoose.model("Admin", userSchema);

module.exports = Admin;
