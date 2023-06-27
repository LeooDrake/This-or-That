import express from "express";
import { port } from "./config/options.js";

// routers
import {router as apiRouter} from "./api/index.js";
const clientRouter = express.Router();
clientRouter.use(express.static("./src/client"));

// app
const app = express();

// mount routes
app.use("/", clientRouter);
app.use("/api", apiRouter);

// start listening
app.listen(port, ()=>{
    console.log(`listening at http://127.0.0.1:${port} `);
})