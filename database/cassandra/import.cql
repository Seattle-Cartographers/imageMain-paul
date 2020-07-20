copy carousel.locations(location_id,images) from './database/cassandra/image.csv';
copy carousel.locations (location_id,title,rating,review) from './database/cassandra/loc.csv';