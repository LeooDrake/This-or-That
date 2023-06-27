import assert from "assert";
import { appDb } from "../db/appDb.js";
import { defaultLeaderboardNumberLimit } from "../config/options.js";

export async function loadLeaderboardInfo(amt=defaultLeaderboardNumberLimit){
    assert(Number.isInteger(amt) && amt > 1);
    await appDb.ready;
    let query = appDb.models.Leaderboard
        .where({})
        .sort({rank: 1})
        .populate({path: 'user', select: ['name', 'username']})
        .populate({path: 'submission', select: ['title', 'image_url', 'total_votes']})
        .limit(amt);
    return await query.lean().exec();
}