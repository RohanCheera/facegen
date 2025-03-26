import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./routes/auth.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(cors({ origin: "http://localhost:3000" }));

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
  

// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/history', require('./routes/history'));
// app.use('/api/images', require('./routes/images'));

app.use("/auth", authRouter);

const uri=process.env.MONGODB_URI ;

mongoose.connect(uri,{dbName:"rohan"})
    .then(()=> console.log("Mongodb connected"))
    .catch((err)=> console.log(err));

app.listen(process.env.PORT || 5000,()=> console.log(`Server is running on port ${process.env.PORT}`));

