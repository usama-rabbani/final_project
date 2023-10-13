import mongoose from "mongoose";
import colors from 'colors'
const ConnectDB = async ()=>{
  try {
    const Url = await mongoose.connect(process.env.URL)
    console.log(`Server is Connected To Mongo Db ${Url.connection.host}`.bgMagenta.black)
  } catch (error) {
    console.log(`Error in Mongo db ${error}`.bgCyan.blue);
  }

}
export default ConnectDB;