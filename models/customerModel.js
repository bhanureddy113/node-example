const Joi= require('joi')
const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost:27017/fabfeet')
// .then(console.log('connected successfully to mongodb'))
// .catch('an error occured while connecting to mongoDb...pleas restart');

const custSchema = {

    custName:{ type:String,
        required:true,
                minLength:5,
                maxLength:20},
    custEmail:{type:String,required:true,unique:true},
    custPhoneNumber:{type:String,minLength:10,maxLength:10,required:true},
    custCity:{type:String,required:true},
    custState:{type:String,required:true}
}
let Customer = mongoose.model('Customer',custSchema)


function validateCustDetails(body){
 const custSchema = {
     custName:Joi.string().min(5).max(20).required(),
     custEmail:Joi.string().email().required(),
     custPhoneNumber:Joi.string().min(10).max(10).allow(""),
     custCity:Joi.string().allow(""),
     custState:Joi.string().allow("")
 }

 const JoiVlidationResult=Joi.validate(body,custSchema);
 return JoiVlidationResult;
}


module.exports.CustomerModel=Customer;
module.exports.validate=validateCustDetails;