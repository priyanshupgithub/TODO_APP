import mongoose from "mongoose"

const MONGODBCONNECTIONURL = process.env.MONGODBCONNECTIONURL;
const connectDb = async()=>{

  await mongoose.connect(process.env.MONGODBCONNECTIONURL)
}
export default connectDb;