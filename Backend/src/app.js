import express, { urlencoded } from "express"
import cors from "cors"
import cookieparser from "cookie-parser"
const app = express();
import { borrowRouter } from "./routes/borrow.route.js"


import { userrouter } from "./routes/user.route.js";
import { bookrouter } from "./routes/books.route.js"

console.log(process.env.CORS_ORIGIN)

const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : [];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, postman, curl)
        if (!origin) return callback(null, true);
        
        // Check if origin is allowed or if all origins are allowed
        if (allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
            return callback(null, true);
        } else {
            return callback(new Error(`Origin ${origin} not allowed by CORS`));
        }
    },
    credentials: true
})) // prevents access from unauthorized origins


app.use(express.json()) // it allow json data
app.use(express.urlencoded({ extended: true })) // it encoded the url like "+,%"
app.use(express.static("public")) // it use to store some image inside the public folder
app.use(cookieparser())


app.use("/api/users", userrouter)

app.use("/api/books", bookrouter)

app.use("/api/borrow", borrowRouter)





export { app }