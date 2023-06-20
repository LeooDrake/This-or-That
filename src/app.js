import express from "express";
import { MongoClient } from "mongodb";
import 'dotenv/config';
import bcrypt from "bcrypt";
// import {router} from "./utils/userApi.js";

const app = express();
const apiRouter = express.Router();
const clientRouter = express.Router();
const port = process.env.PORT || 3001;
// app.use(express.Router())
const mongoClient = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING); 

const defaultCollectionVal = [
    {asdf: "this is a test entry 1"},
    {asdf: "this is a test entry 2"},
];
var gTestCollection;


// mongoClient.connect()
//     .then(_ => {
//         const db = mongoClient.db("test");
//         gTestCollection = db.collection("test");
//         console.log('runs')
//     })
//     .catch(error => {
//         console.log(error);
//     })

apiRouter.use(express.json());

let usersCollection;
let db;

mongoClient.connect().
then(response=>{

    db = mongoClient.db('users')
    usersCollection = db.collection('usersCollection')
    console.log(`inside mongo connect:${usersCollection}`)

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
}).finally(() =>{console.log("operation has finished")})


                                                // basic get route users collection
apiRouter.get('/api/users',(request,response)=>{
    console.log(`inside get:${usersCollection}`)

    usersCollection.find().toArray().   // make find once working
    then(documents =>{

        response.json(documents)
    })
})

apiRouter.post('/api/users',(request,response)=>{
    console.log(`body : ${request.body}`)
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

        let hashedPlainTextPassword = bcrypt.hashSync(request.body.password,bcrypt.genSaltSync())
        
        let userInformation ={                // converting body information into that which would be inserted into DB.
            "name": request.body.name,
            "username":request.body.username,
            "hashedpassword": hashedPlainTextPassword
        }
        console.log(`information: ${userInformation}`)
    
        usersCollection.insertOne(userInformation).
        then((resp)=>{
        response.json({"message": "success"})
        })

        })

    }catch(exception) {
        console.log(exception)
        response.status(500).json({
            "message": 'unknown error'
        })
    }
})

apiRouter.get("/test", (_, response) => {
    gTestCollection.find().toArray().then((result) => {
        response.json(result);
    });
});

apiRouter.post("/test", (request, response) => {
    gTestCollection.insertOne(request.body).then((_) => {
        response.json();
    });
});

apiRouter.get("/test-collection", async (_, response) => {
    await gTestCollection.insertOne({});
    await gTestCollection.drop();
    await gTestCollection.insertMany(defaultCollectionVal);
    let result = await gTestCollection.find().toArray()
    response.json(result);
});

clientRouter.use(express.static("./src/client"));
// app.use("api/users",router);    // imported from userApi.JS
app.use("/", clientRouter);
app.use("/api", apiRouter);
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})