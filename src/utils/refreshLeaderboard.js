import assert from "assert";
import { performance } from "perf_hooks";
import { appDb } from "../db/appDb.js";
import {defaultLeaderboardAmt} from "../config/options.js";
import { errorHandler } from "./errorHandler.js";

export async function refreshLeaderboard(amt=defaultLeaderboardAmt){
    try{
        assert(Number.isInteger(amt) && amt>=0);
        await appDb.ready;
        // let the top dawgs out
        let query = 
            appDb.models.Submissions
            .where({})
            .sort({total_votes: 'desc'})
            .populate({path: 'user', select: ['name', 'username']})
        ;
        if(amt > 0){query.limit(amt)};
        let topDawgs = await query.exec();
        let rank = 1;
        let newEntries = [];
        topDawgs.forEach((dawg)=>{
            newEntries.push({
                rank,
                submission: dawg,
            });
            rank += 1;
        })
        // erase and replace with new entries into db
        // all this extra stuff is just to time deleteMany and timeout 
        // by that much to hopefully allow deleteMany to fully complete
        let t0 = performance.now();
        await appDb.models.Leaderboard.deleteMany({}).exec();
        let t1 = performance.now();
        let waitTimeMs = Math.floor(t1-t0);
        await new Promise((resolve,reject)=>{
            setTimeout(() => {
                console.log(`Leaderboard: awaited extra ${waitTimeMs}ms to allow deleteMany to fully complete.`)
                resolve(true);
            }, waitTimeMs);
        })
        await appDb.models.Leaderboard.insertMany(newEntries);
        return true;
    }catch(e){
        errorHandler(e,false);
    }
}