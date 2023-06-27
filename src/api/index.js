import express from "express";
// routes
import testRoute from "./testRoute.js";
import submissionsRoute from "./submissionRoute.js";
import leaderboardRoute from "./leaderboardRoute.js";
import loginRoute from "./loginRoute.js";
import signupRoute from "./signupRoute.js";
import voteRoute from "./voteRoute.js";

const router = express.Router();
router.use(testRoute);
router.use(submissionsRoute);
router.use(leaderboardRoute);
router.use(loginRoute);
router.use(signupRoute);
router.use(voteRoute);

export default { router };



