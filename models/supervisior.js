const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const supervisiorSchema = new Schema({
    name: {type:String,
    required:[true,'name is required']},
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    contact:{type:Number},
    address:{type:String},
    departmentName:{type:String,required:[true,'department is required']}
});

const Supervisior = mongoose.model('Supervisior',supervisiorSchema)

module.exports = Supervisior