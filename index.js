import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import router from "./routes/bookRoutes.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(express.json())
// app.use(express.urlencoded({extended: true}));
// app.use(bodyParser)
app.use(cors(
    {
        origin: ["*","http://localhost:3000"],
        methods: ["GET","POST","PUT","DELETE"],
        allowedHeaders: ["Content-Type"]
    }
));


app.get("/", (req, res) => {
        console.log(req)
        res.status(222).json({message: "wellcome to mern stacks"})
    })

app.use("/books", router);





mongoose.connect(mongoDBURL).then(() => {
    console.log("database is connected")
    app.listen(PORT, () => {

        console.log(`server is listing on ${PORT}`);
    })
}).catch(err => {
    console.log(err)
})