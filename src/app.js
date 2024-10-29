import express from "express"
import connectDB from "./db/connectDB.js"

const app = express()

//midlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))




// router
import router from "./routers/user.router.js"
app.use('/api/delivery', router)




// .env
import dotenv from "dotenv"
dotenv.config()




// DB connection
connectDB();

//server
app.get('/', (req, res)=>{
    res.send("Server is start successfuly!")
})

const port = process.env.PORT || 8000;
app.listen(port, ()=>{console.log(`Surver is connectedd successfully at port : ${port}`);})