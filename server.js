import express from "express";
import dotenv from "dotenv";
import "colors"
import morgan from "morgan";

const app = express()

dotenv.config()
app.use(express.json())
app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'));


import connectDB from "./config/database.js";
import userRouter from "./routes/api/userRoute.js";
connectDB()


app.use('/api/v1', userRouter)
app.use("/", (req, res) => {
    res.send(`<h1>Welcome to Node.js Project</h1>`)
})


const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`server is runnig on port ${PORT}`.bgMagenta.white)
})