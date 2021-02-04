const streamToMongoDB = require('stream-to-mongo-db').streamToMongoDB;
const Multistream     = require('multistream');
const JSONStream      = require('JSONStream');
const { dirname }     = require('path');
const fs              = require('fs');

const db = require('../database/db.js');
const path = require('path');
const outputDBConfig = { dbURL: 'mongodb://3.17.27.20/descriptions', collection: 'descriptions', batchSize: 200 };
const writableStream = streamToMongoDB(outputDBConfig);

let readStreams = [];
for (var i = 0; i < 10; i++) {
  readStreams[i] = fs.createReadStream(`${__dirname}/data/batch${i}.json`)
  console.log(`Created read stream ${i}`);
}

function seedDatabase() {
  console.log('Attempting to seed database');
  db.dropDb();
  console.log('DB dropped. Creating multistream (reads)');
  new Multistream(readStreams)
    .pipe(JSONStream.parse('*'))
    .pipe(writableStream);
  console.log('Possibly finished seeding? Check!');
}

seedDatabase();