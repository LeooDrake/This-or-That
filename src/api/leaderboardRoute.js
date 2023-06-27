
import express from "express";
import {appDb} from "../db/appDb.js";
import {error500} from "../utils/errorHandler.js";
import { loadLeaderboardInfo } from "../utils/loadLeaderboardInfo.js";
/* 
    /leaderboard
        .GET({})
            Gets leaderboard info
*/
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({extended: true}));
await appDb.ready;

router.route('/leaderboard')
    .get(async (_,res)=>{
        try{
            let document = await loadLeaderboardInfo();
            res.status(200).json(document);
        }catch(e){error500(e,res)}
    })
;
export default { router };