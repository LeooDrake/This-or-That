import assert from "assert";
import { appDb } from "../db/appDb.js";
import { defaultLeaderboardAmt } from "../config/options.js";

export async function loadLeaderboardInfo(amt=defaultLeaderboardAmt){
    assert(Number.isInteger(amt) && amt >= 0);
    await appDb.ready;
    let query = appDb.models.Leaderboard
        .where({})
        .sort({rank: 1})
    if(amt > 0){ query.limit(amt) };
    return await query.lean().exec();
}