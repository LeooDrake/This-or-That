import 'dotenv/config';

// Database connection
export const dbName = "thisOrThatDB";
export const dbConnectionString = process.env.MONGO_DB_CONNECTION_STRING;

// Server configs
export const port = process.env.PORT || 3001;

// Regen database
export const repopulateWithDummyVals = true;

// Leaderboard
export const defaultLeaderboardNumberLimit = 10;
// https://github.com/kelektiv/node-cron
export const cronLeaderboardUpdateInterval = '* * * * * *';
