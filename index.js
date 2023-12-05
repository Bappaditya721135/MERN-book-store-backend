import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import router from "./routes/bookRoutes.js";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config.js";

const app = express();
app.use(express.json())
// app.use(express.urlencoded({extended: true}));
// app.use(bodyParser)
app.use(cors(
    // {
    //     origin: process.env.ORIGIN,
    //     methods: ["GET","POST","PUT","DELETE"],
    // }
));


app.get("/", (req, res) => {
    console.log("req is made on")
        res.status(222).json({message: "wellcome to mern stacks"})
    })

app.use("/books", router);





mongoose.connect(mongoDBURL).then(() => {
    console.log("database is connected")
    app.listen(PORT, () => {
        console.log(process.env.ORIGIN)
        console.log(`server is listing on ${PORT}`);
    })
}).catch(err => {
    console.log(err)
})