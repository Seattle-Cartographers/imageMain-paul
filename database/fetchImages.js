const path = require('path');
const axios = require('axios');
const { createWriteStream } = require('fs');
const { stat, mkdir } = require('fs').promises;

async function getImage(id) {
  const image = await axios({
    method: 'get',
    url: 'http://lorempixel.com/1000/550/',
    responseType: 'stream',

  });
  const imagePath = path.join(__dirname, 'images');
  stat(imagePath)
    .catch((err) => {
      if (err.code === 'ENOENT') {
        return mkdir(imagePath);
      }
      throw err;
    })
    .then(() => {
      image.data.pipe(createWriteStream(path.join(imagePath, `${id}.jpg`)));
    });
}

for (let i = 0; i < 100; i += 1) {
  getImage(i);
}
