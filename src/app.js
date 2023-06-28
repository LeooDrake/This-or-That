import express from "express";
import { port } from "./config/options.js";
import { cronUpdateLeaderboard } from "./utils/cronUpdateLeaderboard.js";

// routers
import {apiRouter} from "./api/index.js";
const clientRouter = express.Router();
clientRouter.use(express.static("./src/client"));

// app
const app = express();

// mount routes
app.use("/", clientRouter);
app.use("/api", apiRouter);

// begin cronJobs
cronUpdateLeaderboard.start();

// start listening
app.listen(port, ()=>{
    console.log(`listening at http://127.0.0.1:${port} `);
})