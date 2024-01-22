import mongoose from "mongoose";
require('dotenv').config()
export default function DbConnection(){
    try {
      mongoose.connect(process.env.MONGODB_URL)
      
      mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to MongoDB atlas');
      });
      
      mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error: ' + err);
      });
      
      mongoose.connection.on('disconnected', () => {
        console.log('Mongoose disconnected.');
      });
    } catch (error) {
      console.log(error)
      process.exit(1);
    }

}