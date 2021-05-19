const Express=require('express');
const router=Express.Router();
const {OrderModel, getNextSeqValue}=require('../models/orderModel');
const { ManagerModel} = require('../models/managerModel');
const {CustomerModel} = require('../models/customerModel');
const {SeqValue}=require('../models/orderModel')

router.post('/createOrder',async (req,res)=>{
console.log("entered teh create order method");
    if(!(req.body)){
        res.send({code:400,message:"bad request no body sent"});
    }
    console.log("validated req.body");
console.log("req.body");
    console.log(req.body);
    // const manager=new ManagerModel({
    //     mngrShopId:req.body.shopDetails
    // });
    const mng=await CustomerModel.findOne({custEmail:req.body.customerDetails});
    console.log("mng"+mng);
    if(!(await ManagerModel.findOne({mngrShopId:req.body.shopDetails}))){
        console.log("inside mangarmodel if condotion");

        res.send({code:404,message:"unable to recognise the merchant details"});
    }
console.log("mangermodel validated successfull");
    
    if(!(await CustomerModel.findOne({custEmail:req.body.customerDetails}))){
        console.log("customer model validaation failed inside if condtion");

        res.send({code:404,message:"unable to recognise the customer details"});
    }

    console.log("customer model validation sucessfull");
var ordDate=new Date();
ordDate.setDate(ordDate.getDate() + 3);
console.log("ordDate"+ordDate)
const ordSeq=await getNextSeqValue("ordersId");
console.log(ordSeq);
    const order= new OrderModel({
        orderId:ordSeq,
        orderDate:new Date(),
        shopDetails: new ManagerModel({mngrShopId:req.body.shopDetails}),
        customerDetails:new CustomerModel({custEmail:req.body.customerDetails}),
        expectedDoD: ordDate,
        quantity:req.body.quantity,
        itemId:req.body.itemId,
        status:"received"
    })
    console.log("log before saving");
    console.log(order);
    const orderResult = await order.save()
    console.log("order successfull");
    console.log(orderResult);

    res.send(orderResult);
})

router.get("/cancel/:orderId",async (req,res)=>{
    if(!(req.params.orderId)){
        res.send({code:400,message:"bad request...orderId didnt recieved pleaset ry again"})
    }

    const result=await OrderModel.findOneAndUpdate({orderId:req.params.orderId},
        {status:"cancelled"},
        {new:true})
        console.log("The final result is")
console.log(result)
        if(result !=null){
           res.send(result)
        }else{
            res.send({code:200,message:"there is no such order to delete"})
        }

    })

router.get('/ordersByDate/:date',async (req,res)=>{
    if(!(req.params.date)){
        res.send({code:400,message:"bad req"})
    }
    var ordDate=req.params.date;
    console.log("ordDate"+ordDate);
    const result=await OrderModel.find({orderDate: {$eq:ordDate+"T00.00.00.000Z",
$lt:ordDate+"T23.59.59.000Z"
    }},{orderId:1})

console.log("the query failed") ;
   console.log(result)
   res.send(result);

})

module.exports = router; 