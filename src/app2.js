import express from "express";
import {errorHandler} from "./utils/errorHandler.js"
import { appDb } from "./db/appDb.js";

// routers
import {router as apiRouter} from "./api/indexRoute.js";
const clientRouter = express.Router();
clientRouter.use(express.static("./src/client"));

const app = express();
const port = process.env.PORT || 3001;

app.use("/", clientRouter);
app.use("/api", apiRouter);

try{
    app.listen(port, ()=>{
        console.log(`listening on port ${port}`);
    })
}catch(e){
    console.log("AHFGDSHJFGHHJDSGHJFGJHSD");
    appDb.db.close();
    errorHandler(e, true);
}