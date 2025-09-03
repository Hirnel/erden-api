// CommonJS
const { MongoClient } = require("mongodb");

const MONGO_URL = process.env.MONGO_URL || "mongodb://erden-db:27017/erden";

let client;
let db;

function connectMongo() {
  if (db) return { client, db };
  client = new MongoClient(MONGO_URL);
  client.connect();
  db = client.db();              // usa el dbName del URI: "clases"
  return { client, db };
}

function getDb() {
  if (!db) throw new Error("Mongo no conectado. Llama antes a connectMongo().");
  return db;
}

module.exports = { connectMongo, getDb };
