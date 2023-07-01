// libs
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
// routes
import {testRoute} from "./testRoute.js";
import {submissionsRoute} from "./submissionsRoute.js";
import {leaderboardRoute} from "./leaderboardRoute.js";
import {loginRoute} from "./loginRoute.js";
import {signupRoute} from "./signupRoute.js";
import {upvoteRoute} from "./upvoteRoute.js";
import {sessionRouter} from "./sessionRoute.js";
// shared imports
import { dbName, sessionSecretKey } from "../config/options.js";
import { appDb } from "../db/appDb.js";

const router = express.Router();

// session store
// https://github.com/jdesboeufs/connect-mongo/blob/master/example/mongoose.js
router.use(
    session({
        secret: sessionSecretKey,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 5 * 60 * 1000 }, // store for 5 mins
        store: MongoStore.create({
            client: appDb.db.getClient(),
            dbName: dbName
        })
    })
);
router.use(testRoute);
router.use(submissionsRoute);
router.use(leaderboardRoute);
router.use(loginRoute);
router.use(signupRoute);
router.use(upvoteRoute);
router.use(sessionRouter);

export const apiRouter = router;