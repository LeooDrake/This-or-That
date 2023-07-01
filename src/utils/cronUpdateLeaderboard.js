import cron from "cron";
import { cronLeaderboardUpdateInterval } from "../config/options.js";
import { refreshLeaderboard } from "./refreshLeaderboard.js";

export const cronUpdateLeaderboard = new cron.CronJob(
    cronLeaderboardUpdateInterval,
    function(){
        refreshLeaderboard();
        console.log(`${this.lastDate().toString().match(/\d{2}:\d{2}:\d{2}/)[0]} Cron: Refreshed leaderboard!`);
        return;
    }
)