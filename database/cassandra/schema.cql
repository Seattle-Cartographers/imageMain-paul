CREATE KEYSPACE IF NOT EXISTS carousel WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 1};

CREATE TYPE IF NOT EXISTS carousel.image (
  url TEXT,
  helpful BOOLEAN,
  reported BOOLEAN,
  profile TEXT,
  titleTwo TEXT,
  userRating TINYINT,
  description TEXT
);

CREATE TABLE IF NOT EXISTS carousel.locations (
  location_id TEXT PRIMARY KEY,
  title TEXT,
  rating TINYINT,
  images LIST<FROZEN<carousel.image>>,
  review LIST<TEXT>
);
