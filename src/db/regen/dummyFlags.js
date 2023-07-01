import { appDb } from "../appDb.js";
import { flagNames } from "../../config/options.js";
export async function regenDummyFlags(){
    await appDb.ready;
    await appDb.models.Flags.deleteMany({}).exec();
    let flag = new appDb.models.Flags({
        name: flagNames.leaderboardPendingRefresh,
        flag: true,
    });
    await flag.save();
    return true;
}