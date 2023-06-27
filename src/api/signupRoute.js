import express from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import {appDb} from "../db/appDb.js";
import {error500} from "../utils/errorHandler.js";
/*
    /signup
        .POST({name, username, password})
            Signup using provided params.
            Params: {Required: All}
    Params:
        name: string
        username: string
        password: string
*/
const router = express.Router();
router.use(express.json());
router.use(cookieParser());
router.use(express.urlencoded({extended: true}));
await appDb.ready;
const Users = appDb.models.Users;

router.route('/signup')
    .post(async (req,res)=>{
        try{
            if(!req.body.name || !req.body.username || !req.body.password){
                res.status(400).json({"message": "missing required fields"});
                return;
            }
            // unescape
            let incoming = {
                name: validator.unescape(req.body.name),
                username: validator.unescape(req.body.username),
                password: validator.unescape(req.body.password),
            }
            // dupe check
            let document = await Users.where({username: req.body.username}).findOne().exec();
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
            res.status(200).json({"message": "success"});
        }catch(e){error500(e,res)}
    })
;

export const signupRoute = router;