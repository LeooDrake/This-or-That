import express from "express";
import cookieParser from "cookie-parser";
import validator from "validator";
import bcrypt from "bcrypt";
import {appDb} from "../db/appDb.js";
import {error500} from "../utils/errorHandler.js";
/*
    /login
        .POST({username, password})
            Login using provided params.
            Params: {Required: All}
    Params:
        username: string
        password: string
*/
const router = express.Router();
router.use(express.json());
router.use(cookieParser());
router.use(express.urlencoded({extended: true}));
await appDb.ready;
const Users = appDb.models.Users;

router.route('/login')
    .post(async (req,res)=>{
        try{
            if(!req.body.username || !req.body.password){
                res.status(400).json({"message": "missing required fields"});
                return;
            }
            let username = validator.unescape(req.body.username);
            let password = validator.unescape(req.body.password);
            let user = await Users.where({username}).findOne().exec();
            if(user == null){
                res.status(401).json({message: "Invalid username or password combination." });
                return;
            }
            let ok = bcrypt.compareSync(password, user.password_hash);
            if(ok){
                console.log("user authenticated!!");
                // set a cookie with the user ID
                res.cookie('UserID', user._id).send('cookie set');
            }else{
                res.status(401).json({message: "Invalid username or password combination." });
            }
            return;
        }
        catch(e){error500(e,res)}
    })
;

export const loginRoute = router;