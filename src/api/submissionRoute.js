/*
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    API ROUTES FOR SUBMISSIONS!   ('/submission')
    ##############################################
    POST: UPLOADING IMAGE.

    GET: COLLECTION OF IMAGES.

    DELETE: DELETING AN IMAGE POST.

    UPDATE: updating url or name.
    (have extreme care when submitting data into this route,
    im thinking we should make
    votes go to 0 if img url is changed but not otherwise.)
    ##############################################
    ID (default hashed)
    PostTitle (text)
    PostImg (text) (img url)
    UserID(text) (the user who posted this item)
    Votes (Integer)
    ##############################################
    NOTES:
    when being used by the front end *ID* must be 
    made sure that it is infact owned by
    the same user ID before using.
    ##############################################
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
        }catch(e){error500(e)}
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
        }catch(e){error500(e)}
    })
;

router.route('/submission/:id')
    /* 
        "_id" is how id is stored in a mongoDB
        The significance of using ObjectId in this code is to ensure that
        the queried document has a unique identifier and
        to make sure that the query is accurate and specific.
    */
    .delete(async (request,response)=>{
        try{
            let id = new mongoose.Types.ObjectId(request.params.id);
            let result = await Submissions.findOneAndDelete({ _id: id}).exec();
            if(result == null){
                response.status(400).json('failed to delete submission')
            }else{
                response.status(200).json('successfully deleted submission')
            }
        }catch(e){error500(e)}
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
        }catch(e){error500(e)}
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
        }catch(e){error500(e)}
    })
;

export { router };