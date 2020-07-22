require('newrelic');
const express = require('express');
const db = require('../database');

const app = express();
const port = process.env.PORT || 3012;

app.use('/:id/imageMain', express.static('public'));
app.get('/loaderio-717dfe1fb451febb00d8e9ad1aaf8f3e', (req, res) => {
  res.send('loaderio-717dfe1fb451febb00d8e9ad1aaf8f3e');
});

app.get('/:id/api/carousels', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM locations WHERE location_id = ?';
  db.execute(query, [id])
    .then((result) => {
      res.send(result.rows[0]);
    });
});
/*
app.patch('/:imgId/api/carousels/helpful', (req, res) => {
  const { imgId } = req.params;
  Carousel.collection.updateOne({ 'images.imgId': `${imgId}` }, {
    $set: { 'images.$.helpful': true },
  })
    .then((response) => {
      res.status(200);
      res.send(response);
    })
    .catch((err) => {
      res.status(404);
      res.send(err);
    });
});
app.patch('/:imgId/api/carousels/reported', (req, res) => {
  const { imgId } = req.params;
  Carousel.collection.updateOne({ 'images.imgId': `${imgId}` }, {
    $set: { 'images.$.reported': true },
  })
    .then((response) => {
      res.status(200);
      res.send(response);
    })
    .catch((err) => {
      res.status(404);
      res.send(err);
    });
});
*/

app.listen(port, () => console.log(`server listening to locolhost${port}`));
