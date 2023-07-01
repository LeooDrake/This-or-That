import 'dotenv/config';

// Database connection
export const dbName = "thisOrThatDB";
export const dbConnectionString = process.env.MONGO_DB_CONNECTION_STRING;

// Server configs
export const port = process.env.PORT || 3001;

// Regen database
export const repopulateWithDummyVals = true;

// Leaderboard
export const defaultLeaderboardAmt = 0;    // 0 for no-limit, rank everything

// https://github.com/kelektiv/node-cron
// Cron??: https://www.geeksforgeeks.org/writing-cron-expressions-for-scheduling-tasks/
export const cronLeaderboardUpdateInterval = '*/5 * * * * *';     // start of every minute

//session secret
export const sessionSecretKey = process.env.EXPRESS_SESSION_SECRET_KEY;