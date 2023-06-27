import express from "express";
// routes
import {testRoute} from "./testRoute.js";
import {submissionsRoute} from "./submissionsRoute.js";
import {leaderboardRoute} from "./leaderboardRoute.js";
import {loginRoute} from "./loginRoute.js";
import {signupRoute} from "./signupRoute.js";
import {upvoteRoute} from "./upvoteRoute.js";

const router = express.Router();
router.use(testRoute);
router.use(submissionsRoute);
router.use(leaderboardRoute);
router.use(loginRoute);
router.use(signupRoute);
router.use(upvoteRoute);

export const apiRouter = router;