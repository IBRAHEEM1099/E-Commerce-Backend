import express from "express";
import mongoose from "mongoose";
import bodyParser from "express";
import { config } from "dotenv";
import userRouter from "./routes/user.mjs";
import productRouter from "./routes/Product.mjs"
import cartRouter from "./routes/cart.mjs"
//1035


const app = express();


app.use(bodyParser.json())

config({ path: ".env" });


//User Router
app.use("/api/user",userRouter)

//Product Router
app.use("/api/product",productRouter)

//Cart Router
app.use("/api/cart",cartRouter)

const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO_URL
    ,
    {
        dbName: "E-Commerce_Website",
    }
).then(() => console.log("Mongodb Connected.....")).catch((err) => console.log(err))

app.get('/', (req, res) => {
    res.json({ message: "This is Home route.." })
})



app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))