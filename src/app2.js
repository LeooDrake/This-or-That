import express from "express";

// routers
import {router as apiRouter} from "./api/indexRoute.js";
const clientRouter = express.Router();
clientRouter.use(express.static("./src/client"));

// app
const app = express();
const port = process.env.PORT || 3001;

// mount routes
app.use("/", clientRouter);
app.use("/api", apiRouter);

// start listening
app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})