const {getDatabase} = require('./mongo');
const {ObjectID} = require('mongodb');

const collectionName = 'currentPlayers';

async function removePlayer(id) {
    const database = await getDatabase();
    await database.collection(collectionName).deleteOne({
      _id: new ObjectID(id),
    });
}


async function insertPlayer(player) {
  const database = await getDatabase();
  const {insertedId} = await database.collection(collectionName).insertOne(player);
  return insertedId;
}

async function getPlayers() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

module.exports = {
  insertPlayer,
  getPlayers,
  removePlayer,
  
};