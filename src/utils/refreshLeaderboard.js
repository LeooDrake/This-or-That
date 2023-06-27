import assert from "assert";
import { appDb } from "../db/appDb.js";
import {defaultLeaderboardNumberLimit} from "../config/options.js";

export async function refreshLeaderboard(numberLimit=defaultLeaderboardNumberLimit){
    assert(Number.isInteger(numberLimit) && numberLimit>0);
    await appDb.ready;
    // let the top dawgs out
    let query = 
        appDb.models.Submissions
        .where({})
        .sort({total_votes: 'desc'})
        .limit(numberLimit)
        .select({user: 1})
        ;
    let topDawgs = await query.exec();
    let rank = 1;
    let newEntries = [];
    topDawgs.forEach((dawg)=>{
        newEntries.push({
            rank, 
            user: dawg.user._id,
            submission: dawg._id,
        });
        rank += 1;
    })
    // erase and replace with new entries into db
    await appDb.models.Leaderboard.deleteMany({}).exec();
    await appDb.models.Leaderboard.insertMany(newEntries);
    return true;
}