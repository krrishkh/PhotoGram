import express from 'express'
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from './routes/user.routes.js'

const app = express()
const port = 5000

app.use(cors({    
  origin: [process.env.CORS_ORIGIN, "http://localhost:5173"],
  credentials: true 
}))

app.use(express.json({limit: "16kb"}))                         // to read req.body in post request 
app.use(express.urlencoded({extended:true, limit : "16kb"}))   // to read req.body in post request 
app.use(express.static("public"))
app.use(cookieParser())


//routes declaration
app.use("/api/v1/", userRouter)


export { app }