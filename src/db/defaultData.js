const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const db = client.db('<dbname>');
  const userTable = db.collection('<User Table>');
  const subTable = db.collection('<Submissions Table>');
  const users = [
    { id: '1' name: 'Alex', username: 'tadyen', passwordhash: 'password1' },
    { id: '2' name: 'Leo', username: 'piglet', passwordhash: 'password1' },
    { id: '3' name: 'Justin', username: 'tadyen', passwordhash: 'password1' },
    { id: '1' name: 'Alex', username: 'tadyen', passwordhash: 'password1' },
  ];
  const subs = [
    { title: 'Document 1', imgUrl: 'Lorem ipsum dolor sit amet.' },
    { title: 'Document 2', imgUrl: 'Consectetur adipiscing elit.' },
    { title: 'Document 3', imgUrl: 'Sed do eiusmod tempor incididunt.' }
  ];

  userTable.insertMany(users, (err, result) => {
    if (err) throw err;
    console.log(`${result.insertedCount} documents inserted into userTable`);
  });

  subTable.insertMany(subs, (err, result) => {
    if (err) throw err;
    console.log(`${result.insertedCount} documents inserted into subTable`);
    client.close();
  });
});