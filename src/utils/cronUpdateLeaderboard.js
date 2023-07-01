import cron from "cron";
import { errorHandler } from "./errorHandler.js";
import { cronLeaderboardUpdateInterval } from "../config/options.js";
import { refreshLeaderboard } from "./refreshLeaderboard.js";
import { appDb } from "../db/appDb.js";
import { flagNames } from "../config/options.js";
export const cronUpdateLeaderboard = new cron.CronJob(
    cronLeaderboardUpdateInterval,
    async function(){
        let hhmmss = `${this.lastDate().toString().match(/\d{2}:\d{2}:\d{2}/)[0]}`;
        try{
            await appDb.ready;
            let flag = await appDb.models.Flags.findOne({name: flagNames.leaderboardPendingRefresh}).exec();
            if(flag.flag){
                await refreshLeaderboard();
                flag.flag = false;
                await flag.save();
                console.log(`${hhmmss} Cron: Refreshed leaderboard.`);
                    
            }else{
                console.log(`${hhmmss} Cron: No updates for leaderboard.`);
            }
            return;
        }catch(e){errorHandler(e)}
        return true;
    }
)