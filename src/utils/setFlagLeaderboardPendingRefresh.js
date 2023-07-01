import { appDb } from "../db/appDb.js";
import { flagNames } from "../config/options.js";
import assert from "assert";
export async function setFlagLeaderboardPendingRefresh(flagVal){
  assert(typeof flagVal == 'boolean');
  await appDb.ready;
  let flag = await appDb.models.Flags.findOne({name: flagNames.leaderboardPendingRefresh}).exec();
  flag.flag = flagVal;
  await flag.save();
  return true;
}