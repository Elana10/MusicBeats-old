" use strict";

const {Client} = require('pg');
const { getDatabaseUri} = require('./config');

let db;

if (process.env.NODE_ENV === "production") {
    db = new Client({
        connectionString: getDatabaseUri(),
      // host : '/var/run/postgresql',
      // database: getDatabaseUri(),
      ssl: {
        rejectUnauthorized: false
      }
    });
  } else {
    db = new Client({
      // host : '/var/run/postgresql',
      database: getDatabaseUri()
    });
  }
  
  db.connect();

module.exports = db;
