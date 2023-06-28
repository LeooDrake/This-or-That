// WARNING: This drops the db.
// This script should not be called while the app is running

import { appDb } from "../appDb.js";
import { repopulateWithDummyVals } from "../../config/options.js";
import { regenDummyUsers } from "./dummyUsers.js";
import { regenDummySubmissions } from "./dummySubmissions.js";
import { regenDummyLeaderboard } from "./dummyLeaderboard.js";

await appDb.ready;
await appDb.db.dropDatabase();

if(repopulateWithDummyVals){
    await regenDummyUsers();
    await regenDummySubmissions();
    await regenDummyLeaderboard();
}
appDb.db.close();
console.log("Regenerated db.");