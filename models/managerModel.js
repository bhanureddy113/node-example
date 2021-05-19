const Joi= require('joi')
const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost:27017/fabfeet')
// .then(console.log('connected successfully to mongodb'))
// .catch('an error occured while connecting to mongoDb...pleas restart');

const mngrSchema = {

    mngrName:{ type:String,
        required:true,
                minLength:5,
                maxLength:20},
    mngrEmail:{type:String,required:true,unique:true},
    mngrPhoneNumber:{type:String,minLength:10,maxLength:10,required:true},
    mngrCity:{type:String,required:true},
    mngrState:{type:String,required:true},
    mngrShopId:{type:Number,minLength:3,unique:true,required:true}
}
let Manager = mongoose.model('Manager',mngrSchema)


function validateManagerDetails(body){
 const mngrSchema = {
     mngrName:Joi.string().min(5).max(20).required(),
     mngrEmail:Joi.string().email().required(),
     mngrPhoneNumber:Joi.string().min(10).max(10).allow(""),
     mngrShopCity:Joi.string().allow(""),
     mngrShopState:Joi.string().allow(""),
     mngrShopId:Joi.string().required().min(3)
 }

 const JoiVlidationResult=Joi.validate(body,mngrSchema);
 return JoiVlidationResult;
}


module.exports.ManagerModel=Manager;
module.exports.validateMngr=validateManagerDetails;