import express from "express";
// import session from "express-session";
// import {appDb} from "../db/appDb.js";
// import {error500} from "../utils/errorHandler.js";
/*
Cookie parser occurs browserside and is stored locally which is bad security practice because 
someone could edit their own cookie therefore editing someone elses account information.

So This api will implement sessions, to be used efficiently across the entire app.
problem before was the way cookie parser was set up that i couldn't access the cookie from
inside the "profile.js".

*/
const router = express.Router();
router.use(express.json());

router.route('/session')
    .post((request,response)=>{
        console.log('request body below')
        console.log(request.body)
        console.log(request.session)
        request.session._id =request.body._id; // think this is correct but may just be the data that its being called with is wrong
        response.json({message:"cookie set"})
    })
    .get((request,response)=>{
        if(request.session._id){
            response.json({'session': true,'_id':request.session._id})
        }
        else {
            response.json({'session': false})
        }
    })
    .delete((request, response) => {
        console.log(`before delete ${request.session}`)
        request.session.destroy();
        console.log(`after delete ${request.session}`)
        response.json({ message: "logged out successfully" });
    })
;
    
export const sessionRouter = router;