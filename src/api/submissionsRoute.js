import express from "express";
import validator from "validator";
import mongoose from "mongoose";
import assert from "assert";
import {appDb} from "../db/appDb.js";
import {error500} from "../utils/errorHandler.js";
import {randPop} from "../utils/randPop.js";
/*
    /submissions
        .GET({})
            Get all submissions from db
        .POST({ postTitle, imageURL, userID })
            Post a new submission to store into db
            Params: {Required: All}
    /submissions/random/:amt
        .GET({})
            Get :amt submissions from db at random
    /submissions:id
        .DELETE({})
            Delete a submission referenced by :id from the db.
        .PUT({ postTitle, imageURL, userID, votes })
            Modify prop values of a submission referenced by :id in the db.
            Params: {Required: All}
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
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({extended: true}));
await appDb.ready;
const Submissions = appDb.models.Submissions;

function randPop(arr){
    return arr.splice(Math.floor(Math.random()*arr.length), 1)[0];
}

router.route('/submissions')
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

router.route('/submissions/:id')
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

router.route('/submissions/random/:amt')
    .get(async (_,res)=>{
        try{
            assert(validator.isInt(request.body.amt, {min: 1}));
            let amt = Number(request.body.amt);
            let submissionsList = await Submissions.find({}).lean().exec();
            assert(amt <= submissionsList.length);
            let picked = [];
            // not optimising cus too complex and not needed.
            for(let i; i<amt; ++i){
                picked.push(randPop(submissionsList));
            }
            response.status(200).json(picked);
        }catch(e){error500(e,response)}
    })
;

export default { router };