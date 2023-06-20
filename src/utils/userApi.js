/*

Im thinking we should only whitelist render and our own devices for Mongo DB.
For example,if a random user were to call our get route for users,
then it would leak important usernames/emails and names of users.

                        --##ALSO##--

Should we do either username or email ? or both????

*/

import bcrypt from "bcrypt";
import express from "express";
import { mongoClient } from "../app";

export const router = express.Router()                 // router for http operations to be used on

mongoClient.connect().
then(response=>{

    const db = mongoClient.db('users')
    let usersCollection = db.collection('users')

    usersCollection.find().toArray().           // basic json layout for db w/ some dummy data.
    then(documents =>{
        if(documents.length <1){
            usersCollection.insertOne(
                { name: "random" ,username: 'random1', hashedpassword: "this will be hashed" }
              )
        }
})
}).catch(error => {
    console.log("error occured")
    console.log(error)
}).finally(() =>{"operation has finished"})


                                                // basic get route users collection
router.get('/',(request,response)=>{
    usersCollection.find().toArray().
    then(documents =>{

        response.json(documents)
    })
})

router.post('/',(request,response)=>{
    try{

        if(!request.body.name||!request.body.username||!request.body.password){
        /*
        because this information will eventually be made by a "renderPostUsers()" SPA function
        i think the information should be hashed by this api rather than hashed at the js form.
        */
            response.status(400).json({
                "message": "missing required field"
            })
            return
        }
        usersCollection.findOne({username: request.body.username}).then(_response=>{

            if (_response != null){
            response.status(400).json({
                
                "message": "username in db"
            })
            return
        }

        const hashedPlainTextPassword = bcrypt.hashSync(request.body.hashedpassword,bcrypt.genSaltSync())
        
        const userInformation ={                // converting body information into that which would be inserted into DB.
            "name": request.body.name,
            "username":request.body.username,
            "hashedpassword": hashedPlainTextPassword
        }
    
        usersCollection.insertOne(userInformation).
        then((resp)=>{
        response.json({"message": "success"})
        })

        })

    }catch(exception) {
        response.status(500).json({
            "message": 'unknown error'
        })
    }
})

