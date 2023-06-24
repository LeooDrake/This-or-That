import express from "express";
import validator from "validator";
import mongoose from "mongoose";
import assert from "assert";
import bcrypt from "bcrypt";

import {appDb} from "../db/appDb.js";
import {errorHandler, error500} from "../utils/errorHandler.js";

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({extended: true}));
await appDb.ready;
const Users = appDb.models.Users;

// basic get route users collection
router.route('/users')
    .get(async (_,response)=>{
        try{
            let document = await Users.find({}).exec();
            response.status(200).json(document);
        }
        catch(e){error500(e)}
    })
    .post(async (request,response)=>{
        /*
        because this information will eventually be made by a "renderPostUsers()" SPA function
        i think the information should be hashed by this api rather than hashed at the js form.
        */
        try{
            if(!request.body.name||!request.body.username||!request.body.password){
                response.status(400).json({"message": "missing required field"});
                return;
            }
            // asserts
            // <asserts here>
            // unescape
            let incoming = {
                name: validator.unescape(request.body.name),
                username: validator.unescape(request.body.username),
                password: validator.unescape(request.body.password),
            }
            // dupe check
            let document = await Users.findOne({username: request.body.username}).exec();
            if(document != null){
                response.status(400).json({"message": "username in db"});
                return;
            }
            // convert password to bcrypt hash
            let hashed = bcrypt.hashSync(incoming.password, bcrypt.genSaltSync());
            delete incoming.password;
            Object.assign(incoming, {password_hash: hashed});
            // insert into db
            let newUser = new Users(incoming);
            await newUser.save();
            response.status(200).json({"message": "success"});
        }catch(e){error500(e)}
    })
;

export { router };