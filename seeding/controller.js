const db = require('../database/db.js');
const maker = require('../database/maker.js');

async function batchSeed(batches, batchSize) {
  for (let i = 0; i < batches; i++) {
    let newBatch = maker.makeBatch(batchSize);
    await newBatch
      .save()
      .then(success => {
        console.log(`Batch ${i} done.`);
      })
      .catch(err => {
        console.log(err)
      });
  }
};

const runSeed = function () {
  db.dropDb((err) => {
    if (err) {
      console.log(`Error dropping database: ${err}`);
    } else {
      batchSeed(20000, 500)
    }
  });
};

runSeed();