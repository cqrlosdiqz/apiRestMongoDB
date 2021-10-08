const { Router } = require('express');
const router = Router();
const { MongoClient } = require('mongodb');

const URI = process.env.MONGODB_URI;
const client = new MongoClient(URI);

//Get all characters
router.get('/', async (req, res) => {
  try {
    const database = await client.connect();
    const result = await database
      .db('characters_db')
      .collection('characters')
      .find({}, { projection: { _id: 0 } })
      .toArray();

    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
});

//Get character by name
router.get('/name/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const database = await client.connect();
    const result = await database
      .db('characters_db')
      .collection('characters')
      .findOne({ username: name }, { projection: { _id: 0 } });

    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
});

//Get characters by profile
router.get('/profile/:profile', async (req, res) => {
  const { profile } = req.params;

  try {
    const database = await client.connect();
    const result = await database
      .db('characters_db')
      .collection('characters')
      .find({ role: profile }, { projection: { _id: 0 } })
      .toArray();

    res.send(result);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
});

router.post('/new', async (req, res) => {
  const { id, username, role } = req.body;
  const doc = {
    id: parseInt(id),
    username,
    role,
  };

  try {
    const database = await client.connect();
    const result = await database
      .db('characters_db')
      .collection('characters')
      .insertOne(doc);

    res.send(`A document was inserted with the _id: ${result.insertedId}`);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
});

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const database = await client.connect();

    const result = await database
      .db('characters_db')
      .collection('characters')
      .deleteOne({ id: parseInt(id) });
    if (result.deletedCount === 1) {
      res.send('Successfully deleted one document.');
    } else {
      res.send('No documents matched the query. Deleted 0 documents.');
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
});

router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { username, role } = req.body;

  try {
    const database = await client.connect();

    const filter = { id: parseInt(id) };
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        username,
        role,
      },
    };

    const result = await database
      .db('characters_db')
      .collection('characters')
      .updateOne(filter, updateDoc, options);
    res.send(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
});

module.exports = router;
