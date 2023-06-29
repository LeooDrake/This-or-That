import express from "express";
// routes
import {testRoute} from "./testRoute.js";
import {submissionsRoute} from "./submissionsRoute.js";
import {leaderboardRoute} from "./leaderboardRoute.js";
import {loginRoute} from "./loginRoute.js";
import {signupRoute} from "./signupRoute.js";
import {upvoteRoute} from "./upvoteRoute.js";
import {sessionRouter} from "./session.js";
import { dbName } from "../config/options.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import  'dotenv/config';
const router = express.Router();

router.use(
    session({
        store: MongoStore.create({
            mongoUrl: "mongodb://127.0.0.1:27017/",
            dbName: dbName
        }),
        secret: process.env.EXPRESS_SESSION_SECRET_KEY
    })
)

router.use(testRoute);
router.use(submissionsRoute);
router.use(leaderboardRoute);
router.use(loginRoute);
router.use(signupRoute);
router.use(upvoteRoute);
router.use(sessionRouter); // 

export const apiRouter = router;