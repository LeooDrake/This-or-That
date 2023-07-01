import cron from "cron";
import { errorHandler } from "./errorHandler.js";
import { cronLeaderboardUpdateInterval } from "../config/options.js";
import { refreshLeaderboard } from "./refreshLeaderboard.js";

export const cronUpdateLeaderboard = new cron.CronJob(
    cronLeaderboardUpdateInterval,
    async function(){
        try{
            await refreshLeaderboard();
            console.log(`${this.lastDate().toString().match(/\d{2}:\d{2}:\d{2}/)[0]} Cron: Refreshed leaderboard!`);
        }catch(e){errorHandler(e)}
        return;
    }
)