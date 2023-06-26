/*
    API ROUTES FOR SUBMISSIONS
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    /submission
        .GET({})
            Get all submissions from db
        .POST({ postTitle, imageURL, userID })
            Post a new submission to store into db
            Params: {Required: All}
    /submission:id
        .DELETE({})
            Delete a submission referenced by :id from the db.
        .PUT({ postTitle, imageURL, userID, votes })
            Modify prop values of a submission referenced by :id in the db.
            Params: {Required: All}
    /submission/upvote:id
        .PATCH({})
            Queries for the submission referenced by :id in the db
            then +1 to its total_vote value.
    Params: 
    // (Base types are described here. JSON/URL-encoded values are actually strings)
        :id: mongoose.Types.ObjectId        // _id value of Submissions object as string.
        postTitle: string                   // Title of submission/image
        imageURL: string                    // URL of image ("http" is required). Duplicates not allowed
        userID: mongoose.Types.ObjectId     // _id value of Users object.
        votes: number                       // total_votes of submission. Integer > 0 only.
    Notes:
        The userID should inherit from the user owning the session.
        The frontend is responsible for ensuring userID isn't spoofed.
*/
/*  Discussions:
    /submissions:id | PUT
        Leo:
            Exercise caution when submitting data via this route,
            im thinking we should reset votes to 0 if imgurl is changed.
        Alex:
            Use-case specific routes should be made instead. We can expose this API for our own use, 
            but I don't see any practicality in it besides as a project criteria to be ticked off.
            Users shouldn't be allowed to modify their submission. 
            If they want a different submission, delete and make a new one.
    /submissions | POST
        Alex:
            Enforing imageURL as unique is a deterrant, not a preventative measure against dupes.
            Do we actually want/need this enforcement?
 */

import express from "express";
import validator from "validator";
import mongoose from "mongoose";
import assert from "assert";

import {appDb} from "../db/appDb.js";
import {errorHandler, error500} from "../utils/errorHandler.js";

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({extended: true}));
await appDb.ready;
const Submissions = appDb.models.Submissions;

router.route('/submission')
    .get(async (_,response)=>{
        try{
           let document = await Submissions.find({}).exec();
           response.status(200).json(document);
        }catch(e){error500(e,response)}
    })
    .post(async (request,response)=>{
        try{
            // if no image, if no title or if user isnt signed in!
            if(!request.body.postTitle|| !request.body.imageURL|| !request.body.userID){
                response.status(400).json({"message": "missing required field"});
                return;
            }
            // if image already in db
            let document = await Submissions.findOne({"image_url": request.body.imageURL}).exec();
            if(document != null){
                response.status(400).json({"message": "image_url already in db"});
                return;
            }
            // asserts
            assert(validator.isURL(request.body.imageURL));
            // unescape:
            let imageData = {
                "title": validator.unescape(request.body.postTitle),
                "image_url": validator.unescape(request.body.imageURL),
                "user": new mongoose.Types.ObjectId(request.body.userID),
                "total_votes": 0,
            }
            let submission = new Submissions(imageData);
            await submission.save();
            response.status(200).json({"message": "submission success"})
        }catch(e){error500(e,response)}
    })
;

router.route('/submission/:id')
    .delete(async (request,response)=>{
        try{
            let id = new mongoose.Types.ObjectId(request.params.id);
            let result = await Submissions.findOneAndDelete({ _id: id}).exec();
            if(result == null){
                response.status(400).json('failed to delete submission')
            }else{
                response.status(200).json('successfully deleted submission')
            }
        }catch(e){error500(e,response)}
    })
    .put(async (request,response)=>{
        try{
            var id = new mongoose.Types.ObjectId(request.params.id);
            // asserts
            assert(validator.isURL(request.body.imageURL));
            assert(validator.isInt(request.body.votes), {min: 0});
            // unescape
            var incoming = {
                title: validator.unescape(request.body.postTitle),
                image_url: validator.unescape(request.body.imageURL),
                user: new mongoose.Types.ObjectId(request.body.userID),
                total_votes: Number(request.body.votes),
            }
            var opts = {
                runValidators: true,    // if true, runs update validators on this command. Update validators validate the update operation against the model's schema
                upsert: false,          // if true, and no documents found, insert a new document
            }
            await Submissions.findOneAndUpdate({_id: id}, {$set: incoming}, opts).exec();
            response.status(200).json('successfully updated one collection');
        }catch(e){error500(e,response)}
    })
;

router.route('/submission/upvote/:id')
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

export { router };