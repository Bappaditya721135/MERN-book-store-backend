import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import router from "./routes/bookRoutes.js";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config.js";

const app = express();
app.use(express.json())
app.use(cors());


app.get("/", (req, res) => {
        res.status(222).json({message: "wellcome to mern stacks"})
    })

app.use("/books", router);





mongoose.connect(mongoDBURL).then(() => {
    app.listen(PORT, () => {
        console.log(`server is listing on ${PORT}`);
    })
}).catch(err => {
    console.log(err)
})