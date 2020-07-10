CREATE KEYSPACE carousel WITH replication =
  {‘class’: ‘SimpleStrategy’, ‘replication_factor’ : 3};

CREATE TYPE carousel.image (
  url TEXT,
  helpful BOOLEAN,
  reported BOOLEAN,
  profile TEXT,
  titleTwo TEXT,
  userRating TINYINT,
  description TEXT
);

CREATE TABLE carousel.locations (
  location_id TEXT PRIMARY KEY,
  title TEXT,
  rating TINYINT,
  images LIST<FROZEN<carousel.image>>,
  review LIST<TEXT>
);
