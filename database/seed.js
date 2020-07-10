const Chance = require('chance');
const chance = new Chance();

function outputImageHeader() {
  const imageHeader = 'location_id,url,helpful,reported,profile,titletwo,userrating,description\n';
  console.log(imageHeader);
}

function outputLocationHeader() {
  const locHeader = 'location_id,title,rating,review\n';
  console.log(locHeader);
}

function outputImages(id) {
  let imageRows = '';
  const paddedId = (id + 1).toString().padStart(8, '0');
  const varNumImages = chance.integer({ min: 5, max: 10 });
  for (let j = 0; j < varNumImages; j += 1) {
    const titleTwo = chance.word();
    const userRating = chance.integer({ min: 0, max: 5 });
    const userName = chance.name();
    const timeOf = chance.year({ min: 2015, max: 2020 });
    const month = chance.month();
    const urlStart = 'https://sdcbundles.s3.us-east-2.amazonaws.com/';
    const rando = chance.integer({ min: 0, max: 100 });
    const urlEnd = '.jpg';
    const profile = 'https://sdcbundles.s3.us-east-2.amazonaws.com/profile.jpg';
    const url = `${urlStart}${rando}${urlEnd}`;
    const description = `Traveler photo submitted by ${userName} (${month} ${timeOf})`;
    imageRows += `${paddedId},${url},${false},${false},${profile},${titleTwo},${userRating},${description}\n`;
  }
  console.log(imageRows);
}

function outputLocations(n) {
  for (let id = 0; id < n; id += 1) {
    const title = chance.word();
    const rating = chance.integer({ min: 0, max: 5 });
    const paddedId = (id + 1).toString().padStart(8, '0');
    const review = `"{${chance.sentence()}, ${chance.sentence()}}"`;
    console.log(`${paddedId},${title},${rating},${review}\n`);
  }
}

console.log(process.argv)

switch (process.argv[2]) {
  case 'location':
    outputLocations(process.argv[3]);
    break;
  case 'image':
    outputImages(process.argv[3]);
    break;
  case 'locationHeader':
    outputLocationHeader();
    break;
  case 'imageHeader':
    outputImageHeader();
    break;
  default:
    console.log('invalid input');
    break;
}
