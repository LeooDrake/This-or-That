/*

Im thinking we should only whitelist render and our own devices for Mongo DB.
For example,if a random user were to call our get route for users,
then it would leak important usernames/emails and names of users.

*/

import bcrypt from "bcrypt";
import express from "express";
import { mongoClient } from "../app";

const router = express.Router()                 // router for http operations to be used on

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


