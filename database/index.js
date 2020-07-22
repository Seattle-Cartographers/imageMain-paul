const cassandra = require('cassandra-driver');

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || '9042';

const client = new cassandra.Client({
  contactPoints: [`${host}:${port}`],
  localDataCenter: 'datacenter1',
  keyspace: 'carousel',
});

module.exports = client;
