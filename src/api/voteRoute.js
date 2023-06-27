
import express from "express";
import mongoose from "mongoose";
import {appDb} from "../db/appDb.js";
import {error500} from "../utils/errorHandler.js";
/*
    /vote/:id
        .PATCH({})
            Upvotes the submissioned referenced by :id from the db.
    Params:
        :id: mongoose.Types.ObjectId    // _id value of Submissions object as string.
*/
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({extended: true}));
await appDb.ready;
const Submissions = appDb.models.Submissions;

router.route('/vote/:id')
    .patch(async (request,response)=>{
        try{
            var id = new mongoose.Types.ObjectId(request.params.id);
            let submission = await Submissions.findOne({_id: id}).exec();
            submission.total_votes = Number(submission.total_votes) + 1;
            await submission.save();
            response.status(200).json({'message':`successfully upvoted${request.params.id}`});
        }catch(e){error500(e,response)}
    })
;
export default { router };