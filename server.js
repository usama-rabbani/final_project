import express from 'express'
import colors from "colors"
import dotenv from 'dotenv'
import morgan from 'morgan'
import ConnectDB from './config/db.js'
import router from './Routes/authroutes.js'
import cors from 'cors'
import categoryroutes from './Routes/categoryroutes.js'
import productroutes from './Routes/productroutes.js'
// .env config

dotenv.config();

// database config

ConnectDB();

// rest object 

const app = express()

// middlewares
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

// Routes

app.use('/api/vi/auth',router)
app.use('/api/vi/category',categoryroutes)
app.use('/api/vi/product',productroutes)

app.get('/', (req, res) => {
    res.send("<h1>Welcome To Mern Stack Project</h1>")
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`server running on ${process.env.MODE} mode on port ${PORT}`.bgCyan.white)
})


// nodemon running command  {npm run server}