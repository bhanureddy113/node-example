let express = require('express');
let app = express();
let mongoose=require('mongoose');
const customers=require('./routes/customers');
const managers=require('./routes/managers');
const orders=require('./routes/orders');

app.use(express.json());
app.use('/api/customer',customers);
app.use('/api/manager',managers);
app.use('/api/orders',orders);
mongoose.connect('mongodb://localhost:27017/fabfeet')
.then(console.log('connected successfully to mongodb'))
.catch('an error occured while connecting to mongoDb...pleas restart');


const port = process.env.port || 3000

app.listen(port,()=>{
    console.log(`Server listenting on port ${port}`)
})

