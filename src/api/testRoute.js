import express from "express";

import {appDb} from "../db/appDb.js";
import {error500} from "../utils/errorHandler.js";

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({extended: true}));
await appDb.ready;
const Test = appDb.models.Test;

const dummyEntries = [
    {asdf: "this is a test entry 1"},
    {asdf: "this is a test entry 2"},
];

router.route('/test')
    .get(async(req,res)=>{
        try{
            let delcount = await Test.deleteMany({}).exec();
            await Test.insertMany(dummyEntries);
            let results = await Test.find({}).exec();
            let resOut = {
                delcount,
                results,
            }
            if(results == null){
                res.status(400).json(resOut);
            }else{
                res.status(200).json(resOut);
            }
        }catch(e){error500(e,res)}
    })

export const testRoute = router;