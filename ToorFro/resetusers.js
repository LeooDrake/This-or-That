const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;
const uri = 'mongodb+srv://jlabruna:cPDBRwpqFplEoX8q@this-or-that.zvkvxg7.mongodb.net';

app.get('/recreate-users', async (req, res) => {
  try {
    const dbName = 'ToOrFro';
    const collectionName = 'users';

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
        name: "Alex",
        username: "tadyen",
        password: "Password1",
      },
      {
        name: "Justin",
        username: "xen0n",
        password: "Password1",
      },
      {
        name: "Leo",
        username: "pisspiglet",
        password: "Password1",
      },
    ]);

    await client.close();

    res.status(200).send('USERS Collection recreated successfully.');
  } catch (error) {
    console.error('Error recreating collection:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});