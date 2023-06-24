import express from "express";
// routes
import {router as usersRouter } from "./usersRoute.js";
import {router as submissionRouter } from "./submissionRoute.js";
import {router as testRouter } from "./testRoute.js";

const router = express.Router();
router.use(usersRouter);
router.use(submissionRouter);
router.use(testRouter);

export { router };



