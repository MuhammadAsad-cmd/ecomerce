let express=require('express');
const productRoute = require('./routes/productRoute');
const errorMiddleware = require('../../myfiles/middleware/errorMiddleware');
const userRoute = require('./routes/userRoute');
const orderRoute = require('./routes/orderRoute');
const cookieParser = require('cookie-parser');
const fileUploader = require('express-fileupload');
const bodyParser = require('body-parser');



const cors=require('cors');
const paymentRoute = require('./routes/PaymentRoute');
let app=express();

app.use(cookieParser())
app.use(express.json());
// app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUploader());


app.use('*',cors({
    origin:true,
    credentials:true
}))

app.use('/api/v1/products',productRoute);
app.use('/api/v1/user',userRoute);
app.use('/api/v1/order',orderRoute);
app.use('/api/v1/payment',paymentRoute)


 
//erorr handler middleware 
app.use(errorMiddleware)
module.exports=app