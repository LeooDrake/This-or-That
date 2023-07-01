import assert from "assert";
import { appDb } from "../db/appDb.js";
import {defaultLeaderboardAmt} from "../config/options.js";

export async function refreshLeaderboard(amt=defaultLeaderboardAmt){
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
    await appDb.models.Leaderboard.deleteMany({}).exec();
    await appDb.models.Leaderboard.insertMany(newEntries);
    return true;
}