const maker = require('./maker.js');
const path = require('path');
const fs = require('fs');

async function batchSeed(records) {
  let writeStreams = [];
  for (let i = 0; i < 10; i++) {
    writeStreams[i] = fs.createWriteStream(`${__dirname}/data/batch${i}.json`)
  }
  let writeStream = writeStreams[0];

  for (let i = 1; i <= records; i++) {
    if (i % 1000000 === 1) {
      console.log(`Now on record ${i}`);
      writeStream = writeStreams[Math.floor(i % 1000000)]
    }
    if (!writeStream.write('')) {
      await new Promise((resolve) => writeStream.once('drain', resolve));
    }

    try {
      let newRecord = await maker.makeEntry(i);
      let str = JSON.stringify(newRecord);
      let temp = str;
      if (i % 1000000 === 0) {
        str = `,${temp}]`;
      } else if (i % 1000000 === 1) {
        str = `[${temp}`;
      } else {
        str = `,${temp}`;
      }
    writeStream.write(str);
    }
    catch (err) {
      console.log(`Error in writing stream: ${err}`);
    }
  };

};

async function runSeed () {
  try {
    await batchSeed(10000000)
    console.log('Successful file seeding to local');
  }
  catch (err) {
    throw new Error(`Error seeding database: ${err}`);
  }
};

runSeed();