let app=require('./app');
let dotenv=require('dotenv');
const cloudinary = require('cloudinary');

dotenv.config({path:'BackEnd/config/.env'});
require('./config/database')

process.on('uncaughtException',(err)=>{

    console.log(err);
    process.exit(1)
})

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.C_API_KEY,
    api_secret: process.env.C_API_SECRET,
    secure: true,
});


let server=app.listen(process.env.PORT,()=>{
    console.log(`server is listing on port ${process.env.PORT}`);
})

process.on("unhandledRejection",()=>{
    // server.close(()=>{
    //     console.log('server is closed due to unhandledRejection');
    //     process.exit(1)
    // })
})