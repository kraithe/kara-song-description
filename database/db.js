// ----------- DB CONNECTION ---------- //

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/descriptions', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB!');
});

const dropDb = async() => {
  await db.dropDatabase();
  console.log(`Dropped Song Description database successfully.`);
};

// ------------- DB SCHEMA ------------ //

const infoSchema = new mongoose.Schema({
  songId: {
    type: Number,
    unique: true,
    required: true
  },
  bandId: {
    type: Number,
    unique: true,
    required: true
  },
  bandName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Description = mongoose.model('Description', infoSchema);

// -------- SAVE DESCRIPTION FUNC -------- //

const saveDescriptions = (descriptionData) => {
  var description = new Description(descriptionData);
  return description.save()
    .catch((error) => {
      console.log('Error saving to database: ', error);
    });
};

// --------- SAVE BATCH DESCRIPTIONS ------ //

const saveBatch = (items) => {
  return Description.insertMany(items)
    .catch((err) => {
      console.log(`Error inserting a batch: ${err}`);
    });
};

// --------- FIND SONG DESCRIPTION -------- //

const findDescription = function(id) {
  return Description.findOne({songId: id})
    .catch((error) => {
      console.log('DB Error finding song description: ', error);
    });
};

// ----- DELETE ONE SET OF ITEM DESCRIPTIONS ----- //
const deleteDescription = function(id) {
  return Description.deleteOne({songId: id})
    .catch((error) => {
      console.log('DB Error deleting song description: ', error);
    });
};

// ---------- UPDATE DESCRIPTIONS ---------- //

const updateDescription = function(id, val) {
  return Description.updateOne({songId: id}, {description: val})
    .catch((err) => {
      console.log(`DB Error updating song description: ${err}`);
    })
};


// --------------- EXPORTS ----------------- //

module.exports.findDescription = findDescription;
module.exports.saveDescriptions = saveDescriptions;
module.exports.saveBatch = saveBatch;
module.exports.deleteDescription = deleteDescription;
module.exports.updateDescription = updateDescription;
module.exports.dropDb = dropDb;