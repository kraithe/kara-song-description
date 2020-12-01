const database = require('./database/db.js');
const bands = require('./bandNames.js');
const studios = require('./studioNames.js');
// chunking records to upload - 500? 1000?
// then insert chunk
// next deadline - just upload efficiently

const seedDatabase = async() => {
  var deleted = await database.deleteDescriptions();
  for (var i = 0; i < 100; i++) {
    var descriptionObj = {
      songId: i + 1,
      bandId: i + 1,
      bandName: bands.bandNames[i],
      description: `Recorded, mixed, and mastered at ${studios.studioNames[i]} Studios. Produced by ${bands.bandNames[i]}. © 2020 ${bands.bandNames[i]}. All rights reserved.`
    }
    database.saveDescriptions(descriptionObj)
      .then((response) => {
        console.log('Response from saveDescriptions to db: ', response);
      })
      .catch((error) => {
        console.log('Error saving descriptions to db: ', error);
      });
  };
};

seedDatabase();