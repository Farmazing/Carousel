const express = require('express');
const db = require('./db.js')
const cors = require('cors')

const app = express();

app.use(express.static(__dirname + '/../dist'));
app.use(express.json());
app.use(cors());

app.get('/carousel', (req, res) => {
  let id = req.query.id;
  console.log(req);
  db.getCategory(id, (err, results) => {
    if(err) {
      console.log(err);
    } else {
      res.send(results);
    }
    res.end();
  })
})

app.get('/images', (req, res) => {
  let id = req.query.id;
  db.getImages(id, (err,results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    }
    res.end();
  })
})

app.listen(3002, () => {
  console.log('server listening on port 3002');
});