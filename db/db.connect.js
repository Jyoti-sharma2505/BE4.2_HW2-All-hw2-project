const mongoose =require("mongoose");
require("dotenv").config();

const mongo = process.env.Mongo_Url;

const initilizationData =async()=>{
    await mongoose.connect(mongo)
    .then(()=>{
        console.log("Connected Successfully")
    })
    .catch((error)=>console.log("Not connected",error));

}

module.exports={initilizationData}