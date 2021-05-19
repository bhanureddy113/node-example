let express = require('express')
const router = express.Router();
let {validate,CustomerModel} = require('../models/customerModel')

router.post('/add/cust',async (req,res)=>{
    console.log(req.body)
    if(!(req.body)){
        res.sendStatus(503).write('bad request').end()
    }

    if(!(validate(req.body))){
        console.log("validatign body");
        console.log(validate(req.body));
        res.sendStatus(503).write('bad request while valdiating body').end();
    }
console.log("validation compelted")
// console.log(CustomerModel.findOne({custEmail:req.body.custEmail}));
    if( (await CustomerModel.findOne({custEmail:req.body.custEmail}))){
        res.sendStatus(400).write('duplicate email exists').statusMessage('duplicate email exists').end();
    };
    let customer = new CustomerModel({
        custName:req.body.custName,
     custEmail:req.body.custEmail,
     custPhoneNumber:req.body.custPhoneNumber,
     custCity:req.body.custCity,
     custState:req.custState
    }) 
    customer=await customer.save();
    res.send(customer);
})

router.get('/getCust/:custEmail', async (req,res)=>{
 
    if(!(req.params.custEmail)){
        res.sendStatus(404).write('not found').end();
        console.log("inside if loop end")
    }
    console.log('after if condition');
  
    
    const customers= await CustomerModel.findOne({custEmail:req.params.custEmail})
    console.log(customers);
    if(customers){
        res.send(customers);
    }else{
        res.send(customers);

    }

})


router.delete('/delCust/:custEmail',async (req,res)=>{
    if(!(req.params.custEmail)){
        res.sendStatus(400).statusMessage('Bad request').end();
    }
    console.log("rewuest processingn");
    if(await CustomerModel.findOne({custEmail:req.params.custEmail})){
        console.log("deleting record");
        const result= await CustomerModel.deleteOne({custEmail:req.params.custEmail});
        console.log(result);
        res.send(result);
    }
    else{
        res.statusCode(200).statusMessage('User doesnt exist please register first').end();
    }
})

router.post('/updateCust',async (req,res)=>{
    if(!(req.body)){
        res.send({errorCode:400,message:"bad request...missing paramter in payload"});
    }
const body={
    custName:req.body.custName,
    custEmail:req.body.custEmail,
    custPhoneNumber:req.body.custPhoneNumber,
    custCity:req.body.custCity,
    custState:req.body.custState
}
    if(!(validate(body))){
        console.log("validatign body  failed");
        console.log(validate(req.body));
        res.sendStatus(503).write('bad request while valdiating body').end();
    }

    if((await CustomerModel.findOne({custEmail:req.body.oldcustEmail}))){
        console.log("deleting record");
        const result= await CustomerModel.updateOne({custEmail:req.body.oldcustEmail},{
            custEmail:req.body.custEmail
        })
        console.log(result);
        res.send(result);
    }
    else{
        res.send({});
    }
})
module.exports = router; 