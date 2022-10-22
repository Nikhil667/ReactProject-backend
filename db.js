
 const mongoose = require('mongoose');

 const mongoURI = "mongodb://localhost:27017/cloudNotebook"

 const connectToMongo = async() => {
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully")
    })
 }

 module.exports = connectToMongo;