let express = require('express')
const router = express.Router();
let {validateMngr,ManagerModel} = require('../models/managerModel')

router.post('/add/mngr',async (req,res)=>{
    console.log(req.body)
    if(!(req.body)){
        res.sendStatus(503).write('bad request').end()
    }

    if(!(validateMngr(req.body))){
        console.log("validatign body");
        console.log(validateMngr(req.body));
        res.sendStatus(503).write('bad request while valdiating body').end();
    }
console.log("validation compelted")
// console.log(ManagerModel.findOne({mngrEmail:req.body.mngrEmail}));
    if( (await ManagerModel.findOne({mngrEmail:req.body.mngrEmail}))){
        res.send({code:200,message:"already exists in DB"});
    };

    if( (await ManagerModel.findOne({mngrShopId:req.body.mngrShopId}))){
        res.send({code:200,message:"THere is a manager for thsi shop. Please unregister/delete to add new manager to this shop"});
    };

    let manager = new ManagerModel({
        mngrName:req.body.mngrName,
     mngrEmail:req.body.mngrEmail,
     mngrPhoneNumber:req.body.mngrPhoneNumber,
     mngrCity:req.body.mngrCity,
     mngrState:req.body.mngrState,
     mngrShopId:req.body.mngrShopId
    }) 
    manager=await manager.save();
    res.send(manager);
})

router.get('/getMngr/:mngrEmail', async (req,res)=>{
 
    if(!(req.params.mngrEmail)){
        res.sendStatus(404).write('not found').end();
        console.log("inside if loop end")
    }
    console.log('after if condition');
  
    
    const managers= await ManagerModel.findOne({mngrEmail:req.params.mngrEmail})
    console.log(managers);
    if(managers){
        res.send(managers);
    }else{
        res.send(managers);

    }

})


router.delete('/delMngr/:mngrEmail',async (req,res)=>{
    if(!(req.params.mngrEmail)){
        res.sendStatus(400).statusMessage('Bad request').end();
    }
    console.log("rewuest processingn");
    if(await ManagerModel.findOne({mngrEmail:req.params.mngrEmail})){
        console.log("deleting record");
        const result= await ManagerModel.deleteOne({mngrEmail:req.params.mngrEmail});
        console.log(result);
        res.send(result);
    }
    else{
        res.statusCode(200).statusMessage('User doesnt exist please register first').end();
    }
})

router.post('/updateMngr',async (req,res)=>{
    if(!(req.body)){
        res.send({errorCode:400,message:"bad request...missing paramter in payload"});
    }
const body={
    mngrName:req.body.mngrName,
     mngrEmail:req.body.mngrEmail,
     mngrhoneNumber:req.body.mngrPhoneNumber,
     mngrCity:req.body.mngrCity,
     mngrState:req.body.mngrState,
     mngrShopId:req.body.mngrShopId
}
    if(!(validateMngr(body))){
        console.log("validatign body  failed");
        console.log(validateMngr(req.body));
        res.sendStatus(503).write('bad request while valdiating body').end();
    }

    if((await ManagerModel.findOne({custEmail:req.body.oldmngrEmail}))){
        console.log("deleting record");
        const result= await ManagerModel.updateOne({custEmail:req.body.oldmngrEmail},body)
        console.log(result);
        res.send(result);
    }
    else{
        res.send({});
    }
})
module.exports = router; 