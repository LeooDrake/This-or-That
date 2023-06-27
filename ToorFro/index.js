
// express
const express = require("express");
const app = express();
const port = 3000;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cookieParser = require('cookie-parser');


app.use(cookieParser());
app.use(express.json());
app.use(express.static("client"));

// Mongo stuff
const { MongoClient, ObjectId } = require("mongodb"); 
const mongoClient = new MongoClient("mongodb+srv://jlabruna:cPDBRwpqFplEoX8q@this-or-that.zvkvxg7.mongodb.net")

// leaving this here for later due to JS scope chicanery
let db; 
let postsCollection;
let usersCollection;


// DO MONGO CONNECTION OUT OF SCOPE BECAUSE I KEEP GETTING ERRORS
mongoClient.connect().then(res => {
  db = mongoClient.db("ToOrFro")
  usersCollection = db.collection("users")
  postsCollection = db.collection("posts")
  console.log("connected to mongo success")

  // tried some error handling
}).catch(error => {
  console.log("failed to connect to mongo: ")
  console.log(error)
});


// the api that feeds the home page (apparently its called an "endpoint")
app.get('/api/home', async (req, res) => {
  try {

    // getting 2 random numbers with math floor then checking they aint the same (0 to max size of posts)
    const totalItems = await postsCollection.countDocuments();
    const randomIndices = [];
    while (randomIndices.length < 2) {
      const randomIndex = Math.floor(Math.random() * (totalItems -1));
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    
    }
    // finding docs at the random numbers gotten above
    const randomItems = await postsCollection.find({}).limit(2).skip(randomIndices[0]).toArray();

    // Separate the contents of each item into separate arrays
    const array1 = randomItems[0];
    const array2 = randomItems[1];
    console.log("retrieved below two items: ");
    console.log(array1.title);
    console.log(array2.title);

    // get them arrays working as a res, so then we can pull em in to html (see html)
    // ie "take array1 and array2, turn em into json, then send back as a response"
    res.json({ array1, array2 });

  } catch (error) {
    console.log("failed to retireve posts from db");
    console.log(error);
  }
});

app.post('/api/login', async (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

if (!username) {
    res.status(400).json({message: "You need a username" });
    return;
}
if (!password) {
    res.status(400).json({message: "You need a password" });

    return;
}

let user = await usersCollection.findOne({username: username})
  try {
    if(await bcrypt.compare(password, user.password)) {
      console.log("user authenticated!!")
      res.cookie('UserID', user._id).send('cookie set'); // sets a cookie with the user ID
    } else {
      res.status(401).json({message: "Incorrect Password" });
    }
  } catch {
      res.status(500).json({message: "General error" });
  }
});

app.post('/api/signup', (req, res) => {
  try {

    if (!req.body.name) {
      res.status(400).json({message: "You need to put something in the name field" });

      return;
  }
  if (!req.body.username) {
      res.status(400).json({message: "dont make your username too cringe" });

      return;
  }
  if (!req.body.password) {
      res.status(400).json({message: "need a password" });

      return;
  }

let hashPw = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync())
let signupData = {
    "name": req.body.name,
    "username":req.body.username,
    "password": hashPw
}

  usersCollection.insertOne(signupData).then((_) => {
      res.json();
      console.log("added user to db: ")
      console.log(signupData)
  })


  } catch (error) {
    console.log("bcrypt just failed");
    console.log(error);
  }
});


app.get('/api/leaderboard', async (req, res) => {
  try {    
    const getLeaderboard = await postsCollection.find({}).limit(10).sort({votes:-1}).toArray();

    res.json({ getLeaderboard });

  } catch (error) {
    console.log("failed to get leaderboard data");
    console.log(error);
  }
});

app.get('/api/vote/:id', async (req, res) => {
  try {    
    const votesField = 'votes'
    let imgObjID = new ObjectId(req.params.id);

    const updateVote = await postsCollection.updateOne({_id: imgObjID}, 
    {$inc:{[votesField]:1}})
    
    console.log("Vote Added to database: ")
    console.log(updateVote)
    
    // redirect to home page
    res.redirect("/");
    
  } catch (error) {
    console.log("failed adding vote to DB");
    console.log(error);
  }
});


// start the web server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});