import mongodb from "mongoose"
import {DB_NAME} from "../constants.js"

const connectDB = async () => {
    try{
        const connectInstance = await mongodb.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectInstance.connection.host}`)

    } catch(error) {
        console.log("ERROR", error)
    }
}


export default connectDB