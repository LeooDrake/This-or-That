import express from "express";
// routes
import {testRoute} from "./testRoute.js";
import {submissionsRoute} from "./submissionsRoute.js";
import {leaderboardRoute} from "./leaderboardRoute.js";
import {loginRoute} from "./loginRoute.js";
import {signupRoute} from "./signupRoute.js";
import {upvoteRoute} from "./upvoteRoute.js";
import {sessionRouter} from "./session.js";

const router = express.Router();
router.use(testRoute);
router.use(submissionsRoute);
router.use(leaderboardRoute);
router.use(loginRoute);
router.use(signupRoute);
router.use(upvoteRoute);
router.use(sessionRouter);

export const apiRouter = router;