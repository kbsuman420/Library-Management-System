import express, { urlencoded } from "express"
import cors from "cors"
import cookieparser from "cookie-parser"
const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
})) // its prevent to give access different ofigin


app.use(express.json()) // it allow json data
app.use(express.urlencoded({ extended: true })) // it encoded the url like "+,%"
app.use(express.static("public")) // it use to store some image inside the public folder
app.use(cookieparser())





export { app }