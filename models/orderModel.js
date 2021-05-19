const mongoose=require('mongoose');
const Joi=require('joi');

const seqValueSchema=new mongoose.Schema({
    _id:{type:String},
    sequence_value:{type:Number,default:0}
});

const SeqValue=mongoose.model('SeqValue',seqValueSchema)
mongoose.set('useFindAndModify', false);
async function getNextSeqValue(sequenceName){
    try{
        var sequenceDocument = await SeqValue.findOneAndUpdate(
           {_id: sequenceName },
             {$inc:{sequence_value:1}},
            {new:true,upsert:true }
         );
          console.log(sequenceDocument);
console.log("retriving sequence is succesfull");
         return sequenceDocument.sequence_value;

}
catch(e){
    console.log("failling here only")
    console.log(e)
    return null;
}

}

const orderSchema=new mongoose.Schema({
    orderId:{type:Number,required:true,unique:true},
    orderDate:{type:"date"},
    shopDetails:{_id:{type: mongoose.Schema.Types.ObjectId,ref:'Manager'},
    mngrShopId:{type:Number}},
    customerDetails:{_id:{type:mongoose.Schema.Types.ObjectId,ref:'Customer'},
custEmail:{type:String}},
    expectedDoD:{type: Date},
    quantity:{type:Number,required:true,minlength:1},
    itemId:{type:String,required:true},
    status:{type:String,required:true}
});

let Order = mongoose.model('Order',orderSchema)

// function validateOrderDetails(body){
//     const validateSchema={
//         orderDate:Joi().Date().max('now').required(),
//         shopDetails:
//     }
// }

module.exports.OrderModel=Order;
module.exports.getNextSeqValue=getNextSeqValue;
module.exports.SeqValue=SeqValue;