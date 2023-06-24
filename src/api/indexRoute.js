import express from "express";
// routes
import {router as usersRouter } from "./usersRoute.js";
import {router as submissionRouter } from "./submissionRoute.js";

const router = express.Router();
router.use(usersRouter);
router.use(submissionRouter);

export { router };



