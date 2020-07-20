const Chance = require('chance');
const random = require('fast-random');

const chance = new Chance();

const seed = Date.now();
const r = random(seed);

// get random number between a and b inclusive, ie (a <= x <= b)
function randBetween(a, b) {
  return a + (r.nextInt() % (b - a + 1));
}

function outputImageHeader() {
  const imageHeader = 'location_id,url,helpful,reported,profile,titletwo,userrating,description\n';
  process.stdout.write(imageHeader);
}

function outputLocationHeader() {
  const locHeader = 'location_id,title,rating,review\n';
  process.stdout.write(locHeader);
}

function writeNextLine(makeLine, currentId, maxId) {
  process.stdout.write(makeLine(currentId), () => {
    if (currentId < maxId) {
      writeNextLine(makeLine, currentId + 1, maxId);
    }
  });
}

function outputImages(n) {
  outputImageHeader();
  const profile = 'https://sdcbundles.s3.us-east-2.amazonaws.com/profile.jpg';
  const urlStart = 'https://sdcbundles.s3.us-east-2.amazonaws.com/';
  const titleTwos = [];
  const names = [];
  for (let c = 0; c < 1000; c += 1) {
    titleTwos.push(chance.word());
    names.push(chance.name());
  }
  const makeLine = (id) => {
    const varNumImages = randBetween(5, 10);
    const paddedId = id.toString().padStart(8, '0');
    let lines = '';
    for (let j = 0; j < varNumImages; j += 1) {
      const titleTwo = titleTwos[randBetween(0, 99)];
      const userRating = randBetween(0, 5 );
      const userName = names[randBetween(0, 99)];
      const timeOf = chance.year({ min: 2015, max: 2020 });
      const month = chance.month();
      const rando = randBetween(0, 10);
      const url = `${urlStart}${rando}.jpg`;
      const description = `Traveler photo submitted by ${userName} (${month} ${timeOf})`;
      lines += `${paddedId},${url},${false},${false},${profile},${titleTwo},${userRating},${description}\n`;
    }
    return lines;
  };
  writeNextLine(makeLine, 0, n);
}

// for speed reasons this is just a copy of the postgres function
function outputCassandraImages(n) {
  const profile = 'https://sdcbundles.s3.us-east-2.amazonaws.com/profile.jpg';
  const urlStart = 'https://sdcbundles.s3.us-east-2.amazonaws.com/';
  const titleTwos = [];
  const names = [];
  for (let c = 0; c < 1000; c += 1) {
    titleTwos.push(chance.word());
    names.push(chance.name());
  }
  const makeLines = (id) => {
    const varNumImages = randBetween(5, 10);
    const lines = [];
    const paddedId = id.toString().padStart(8, '0');
    for (let j = 0; j < varNumImages; j += 1) {
      const rando = randBetween(0, 10);
      const userName = names[randBetween(0, 99)];
      const timeOf = chance.year({ min: 2015, max: 2020 });
      const month = chance.month();
      lines.push({
        profile,
        titletwo: titleTwos[randBetween(0, 99)],
        userrating: randBetween(0, 5),
        url: `${urlStart}${rando}.jpg`,
        description: `Traveler photo submitted by ${userName} (${month} ${timeOf})`,
        helpful: false,
        reported: false,
      });
    }
    return `${paddedId},"${JSON.stringify(lines).replace(/"/g, '\'')}"\n`;
  };
  writeNextLine(makeLines, 0, n);
}

function outputCassandraLocations(n) {
  const sentences = [];
  const words = [];
  for (let s = 0; s < 1000; s += 1) {
    sentences.push(chance.sentence());
    words.push(chance.word());
  }
  const makeLine = (id) => {
    // paddedId
    const paddedId = id.toString().padStart(8, '0');
    // title
    const title = words[randBetween(0, 999)];
    // rating
    const rating = randBetween(0, 5);
    // review
    const review1 = sentences[randBetween(0, 999)];
    const review2 = sentences[randBetween(0, 999)];
    // const images = outputCassandraImages(id);
    return `${paddedId},${title},${rating},"[${review1},${review2}]"\n`;
  };
  writeNextLine(makeLine, 0, n);
}

function outputLocations(n) {
  outputLocationHeader();
  const sentences = [];
  const words = [];
  for (let s = 0; s < 1000; s += 1) {
    sentences.push(chance.sentence());
    words.push(chance.word());
  }
  const makeLine = (id) => {
    // paddedId
    const paddedId = id.toString().padStart(8, '0');
    // title
    const title = words[randBetween(0, 999)];
    // rating
    const rating = randBetween(0, 5);
    // review
    const review1 = sentences[randBetween(0, 999)];
    const review2 = sentences[randBetween(0, 999)];
    const review = `"{${review1},${review2}}"`;
    return `${paddedId},${title},${rating},${review}\n`;
  };
  writeNextLine(makeLine, 0, n);
}

switch (process.argv[2]) {
  case 'location':
    outputLocations(process.argv[3]);
    break;
  case 'image':
    outputImages(process.argv[3]);
    break;
  case 'cassandraLocations':
    outputCassandraLocations(process.argv[3]);
    break;
  case 'cassandraImages':
    outputCassandraImages(process.argv[3]);
    break;
  default:
    console.log('invalid input');
    break;
}
