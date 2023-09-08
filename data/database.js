import mongoose from 'mongoose';

//const MONGO_URI = 'mongodb://127.0.0.1:27017'; 




const connectDB = () =>  mongoose.connect(process.env.MONGO_URI,{
          dbName:"urlShortener"
    }).then((connection)=>console.log(`db is connected at URI = ${process.env.MONGO_URI} & to ${connection.connection.host}`)).catch(e=>console.log(e));

export default connectDB;