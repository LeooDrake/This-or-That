import { appDb } from "../db/appDb.js";
import { refreshLeaderboard } from "./refreshLeaderboard.js";
export async function loadLeaderboardInfo(){
    await appDb.ready;
    let query = appDb.models.Leaderboard
        .where({})
        .sort({rank: 1})
        .populate({path: 'user', select: ['name', 'username']})
        .populate({path: 'submission', select: ['title', 'image_url', 'total_votes']})
    return await query.exec();
}