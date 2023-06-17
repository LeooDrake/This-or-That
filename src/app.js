import express from "express";
import { MongoClient } from "mongodb";
import 'dotenv/config';

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


mongoClient.connect()
    .then(_ => {
        const db = mongoClient.db("test");
        gTestCollection = db.collection("test");
    })
    .catch(error => {
        console.log(error);
    })

apiRouter.use(express.json());

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
app.use("/", clientRouter);
app.use("/api", apiRouter);
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})