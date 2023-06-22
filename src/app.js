import express, { json } from "express";
import { MongoClient,ObjectId } from "mongodb";
import 'dotenv/config';
import bcrypt from "bcrypt";
// import {router} from "./utils/userApi.js";

const app = express();
const apiRouter = express.Router();
const clientRouter = express.Router();
const port = process.env.PORT || 3001;

const mongoClient = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING);

const defaultCollectionVal = [
    {asdf: "this is a test entry 1"},
    {asdf: "this is a test entry 2"},
];

var gTestCollection;
var gUsersCollection;

mongoClient.connect()
    .then(_ => {
        let db = mongoClient.db("test");
        gTestCollection = db.collection("test");
        console.log('runs')
    })
    .catch(error => {
        console.log(error);
    })

apiRouter.use(express.json());


mongoClient.connect().
then(response=>{

    let db = mongoClient.db('test')
    gUsersCollection = db.collection('users')
    console.log(`inside mongo connect:${gUsersCollection}`)

    gUsersCollection.find().toArray().       // basic json layout for db w/ some dummy data.
    then(documents =>{
        if(documents.length <1){
            gUsersCollection.insertOne(
                { name: "random" ,username: 'random1', hashedpassword: "this will be hashed" }
              )
        }
})
}).catch(error => {
    console.log("error occured")
    console.log(error)
}).finally(() =>{console.log("operation has finished")})

let gImagesCollection;
mongoClient.connect().      // this is for the images submissions
then(response=>{

    let db = mongoClient.db('test')
    gImagesCollection = db.collection('images')
    console.log(`inside mongo connect:${gImagesCollection}`)

    gImagesCollection.find().toArray().       // basic json layout for db w/ some dummy data.
    then(documents =>{
        if(documents.length <1){
            gImagesCollection.insertOne(
                { postTitle: "Image Title" ,imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HelloWorld.svg/2560px-HelloWorld.svg.png', userID: "Id of user whom submitted post", votes: 0 } // used data - JL added proper url
              )
        }
})
}).catch(error => {
    console.log("error occured")
    console.log(error)
}).finally(() =>{console.log("operation has finished")})



                                                // basic get route users collection
apiRouter.get('/users',(request,response)=>{
    console.log(`inside get:${gUsersCollection}`)

    gUsersCollection.find().toArray().   // make find once working
    then(documents =>{

        response.json(documents)
    })
    })

apiRouter.post('/users',(request,response)=>{
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
        gUsersCollection.findOne({username: request.body.username}).then(_response=>{

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
    
        gUsersCollection.insertOne(userInformation).
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

apiRouter.get('/submission',(request,response) => {
    gImagesCollection.find().toArray().
    then(documents => response.json(documents))

})

apiRouter.post('/submission',(request,response)=> {
    try{
        // if no image, if no title or if user isnt signed in!
        if(!request.body.postTitle|| !request.body.imageURL|| !request.body.userID){
            response.status(400).json({
                "message": "missing required field"
            })
            return
        }
        // if image already in db 
        gImagesCollection.findOne({"imageURL":request.body.imageURL}).
        then(document =>{
            if (document!=null){
                response.status(400).json({
                    "message": "image already in db"
                })
                return
                
            }})
        
        let imageData = {
            "postTitle": request.body.postTitle,
            "imageURL": request.body.imageURL,
            "userID": request.body.userID,
            "votes": 0
        }

        gImagesCollection.insertOne(imageData).
        then(_response => response.json({"message": "image inserted successfully"}))

    }catch(exception) {
        console.log(exception)
        response.status(500).json({
            "message": 'unknown error'
        })
    }
})


apiRouter.delete('/submission/:id',(request,response)=>{
    /* 
    "_id" is how id is stored in a mongoDB
    The significance of using ObjectId in this code is to ensure that
    the queried document has a unique identifier and
    to make sure that the query is accurate and specific.
    */
    var query = { _id: new ObjectId(request.params.id)}

    gImagesCollection.deleteOne(query).
    then(_response_ =>{
        response.json('successfully deleted one image collection')
    })
})


apiRouter.put('/submission/:id',(request,response)=>{
    var imageID = { _id: new ObjectId(request.params.id)}
    // HAVE CARE WHEN INPUTTING SUCH DATA. 
    var updatedImageData = {$set:{ 
        postTitle: request.body.postTitle,
        imageURL: request.body.imageURL,
        userID: request.body.userID,
        votes: request.body.votes
    }
    }
    gImagesCollection.updateOne(imageID,updatedImageData).
    then(_response_ => {
        response.json('successfully updated one collection')
    })

})

/*
db.collection.updateOne(
   { _id: ObjectId("document_id") },
   { $set: { field1: "new_value1", field2: "new_value2" } }
)

*/

apiRouter.patch('/submission/:id',(request,response)=>{
    var imageID = {_id: new ObjectId(request.params.id)}

    gImagesCollection.findOne(imageID).
    then(document => {
        var oldVotes = document.votes
        var currentVotes = {$set: {votes: oldVotes+=1}}

        gImagesCollection.updateOne(imageID, currentVotes).
        then(_response_ =>{ 

            response.json({'message':`successfully updated${request.params.id}`})
        })
    })

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