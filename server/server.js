// require('newrelic');
const express = require('express');
const path = require('path');

const redis = require('redis');

const chalk = require('chalk');
const bodyParser = require('body-parser');
const db = require('../database/db.js');
const cors = require('cors');

const port = 2001;
const redisPort = 6379;

const client = redis.createClient(redisPort);
const app = express();
const expressStaticGzip = require('express-static-gzip');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.get('/bundle.js', cors(), (req, res) => {
  res.sendFile(path.join(__dirname, '../client/bundle.js'));
});

app.use('/', expressStaticGzip(path.join(__dirname, '../client'), {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
  setHeaders: function (res, path) {
    res.setHeader("Cache-Control", "client, max-age=31536000");
  }
}));

app.get('/loaderio-fdae82fdc78a185ad8c839f983e2fd91', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/loaderio-fdae82fdc78a185ad8c839f983e2fd91.txt'));
  console.log('File ostensibly sent to loaderio!');
});

app.use('/:songId', express.static(path.join(__dirname, '../client')));

function cache(req, res, next) {
  client.get(req.params.songId, (err, cacheData) => {
    if (err) { console.log(err); }
    if (cacheData !== null) {
      res.send(cacheData)
    } else {
      next();
    }
  })
};

app.get('/songDescription/:songId', cache, async(req, res) => {
  try {
    const description = await db.findDescription(req.params.songId);
    if (!description) {
      return res.status(400).json({
        success: false,
        msg: `No description for songId: ${req.params.songId}`
      });
    }
    client.setex(description.songId, 3600, JSON.stringify(description));
    res.status(200).send({
      success: true,
      data: description
    });
  } catch(err) {
    console.error(err);
    res.status(400).json({
      success: false,
      msg: err
    });
  }
});

app.post('/songDescription', async(req, res) => {
  try {
    const description = req.params;
    const result = await db.saveDescriptions(description);
    res.status(200).send({
      success: true,
      data: result
    });
  } catch(err) {
    console.error(err);
    res.status(400).json({
      success: false,
      msg: err
    });
  }
});

app.put('/songDescription/:songId', async(req, res) => {
  try {
    const description = await db.updateDescription(req.params.songId, req.params.description);
    if (!description) {
      return res.status(400).json({
        success: false,
        msg: `No description exists to be updated for songId: ${req.params.songId}`
      });
    }
    res.status(200).send({
      success: true,
      data: description
    });
  } catch(err) {
    console.error(err);
    res.status(400).json({
      success: false,
      msg: err
    });
  }
});

app.delete('/songDescription/:songId', async(req, res) => {
  try {
    const description = await db.deleteDescription(req.params.songId);
    if (!description) {
      return res.status(400).json({
        success: false,
        msg: `No description exists to delete for songId: ${req.params.songId}`
      });
    }
    res.status(200).send({
      success: true,
      data: description
    });
  } catch(err) {
    console.error(err);
    res.status(400).json({
      success: false,
      msg: err
    });
  }
});

// app.get('/:current', (req, res) => {
//   if (!req.params.current.includes('loaderio')) {
//     res.sendFile(path.join(__dirname, '../client/index.html'));
//   }
// });

app.listen(port, () => {
  console.log(chalk.magenta(`Server running on port at http://localhost:${port}`));
});

module.exports = app;