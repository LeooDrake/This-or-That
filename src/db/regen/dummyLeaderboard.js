import { refreshLeaderboard } from "../../utils/refreshLeaderboard.js";
import { appDb } from "../appDb.js";

export async function regenDummyLeaderboard(){
    await appDb.ready;
    await refreshLeaderboard();
    return true;
}