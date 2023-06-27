const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;
const uri = 'mongodb+srv://jlabruna:cPDBRwpqFplEoX8q@this-or-that.zvkvxg7.mongodb.net';

app.get('/recreate-posts', async (req, res) => {
  try {
    const dbName = 'ToOrFro';
    const collectionName = 'posts';

    // Connect to MongoDB
    const client = new MongoClient(uri);
    await client.connect();

    // Check if collection exists
    const db = client.db(dbName);
    const collectionExists = await db.listCollections({ name: collectionName }).hasNext();

    if (collectionExists) {
      await db.dropCollection(collectionName);
    }

    // Create the collection
    await db.createCollection(collectionName);

    // Insert documents into the collection
    const collection = db.collection(collectionName);
    await collection.insertMany([
      
        {
          title: "Apple",
          url: "https://cdn0.woolworths.media/content/wowproductimages/large/306343.jpg",
          username: "Alex",
          votes: 0,
        },
        {
          title: "Balrog",
          url: "https://www.denofgeek.com/wp-content/uploads/2022/10/lord-of-the-rings-of-power-balrog.jpg",
          username: "Alex",
          votes: 0,
        },
        {
          title: "corgi",
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Welchcorgipembroke.JPG/1200px-Welchcorgipembroke.JPG",
          username: "Justin",
          votes: 0,
        },
        {
          title: "Fred",
          url: "https://t4.ftcdn.net/jpg/01/89/54/45/360_F_189544505_bIxudrpBsIU9RNdSuiBRhmUfVfrjEUXf.jpg",
          username: "Leo",
          votes: 0,
        },
        {
          title: "Mum's old Holden Barina",
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/1997-2000_Holden_Barina_%28SB%29_City_3-door_hatchback_%2819794335806%29.jpg/1599px-1997-2000_Holden_Barina_%28SB%29_City_3-door_hatchback_%2819794335806%29.jpg?20151231020917",
          username: "Alex",
          votes: 0,
        },
        {
          title: "IKEA Kivik Sofa",
          url: "https://www.ikea.com/au/en/images/products/kivik-3-seat-sofa-with-chaise-longue-tibbleby-beige-grey__1056147_pe848280_s5.jpg",
          username: "Justin",
          votes: 0,
        },
        {
          title: "Ravi Shankar playing a Sitar",
          url: "https://i.ebayimg.com/images/g/PXoAAOSwCXJkeATL/s-l500.jpg",
          username: "Leo",
          votes: 0,
        },
        {
          title: "1968 Boston Celtics",
          url: "https://nbahoopsonline.com/teams/BostonCeltics/History/Championship/Champs_67_68.jpg",
          username: "Alex",
          votes: 0,
        },
        {
          title: "Minecraft Cosplayers kicking a Sand Castle",
          url: "https://static1.fjcdn.com/comments/Blank+_554da744a3c57e71b1d135cf90c93ecf.jpg",
          username: "Justin",
          votes: 0,
        },
        {
          title: "Woman Jumping Rope",
          url: "https://cdn2.stylecraze.com/wp-content/uploads/2014/07/Is-Rope-Jumping-Good-For-Health-Benefits-And-Precautions.jpg",
          username: "Leo",
          votes: 0,
        },
        {
          title: "Harley Davidson Tough Trike",
          url: "https://m.media-amazon.com/images/I/61F3p01-OpL.jpg",
          username: "Alex",
          votes: 0,
        },
        {
          title: "Macho Man Randy Savage",
          url: "https://image-cdn.essentiallysports.com/wp-content/uploads/Randy-Savage-3-370x355.png",
          username: "Justin",
          votes: 0,
        },
        {
          title: "Crab Juice",
          url: "https://static.simpsonswiki.com/images/3/30/Crab_Juice_Hit_%26_Run.png",
          username: "Leo",
          votes: 0,
        }


    ]);

    await client.close();

    res.status(200).send('POSTS Collection recreated successfully.');
  } catch (error) {
    console.error('Error recreating collection:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});