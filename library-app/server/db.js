const { Pool } = require('pg');
const { connectionString } = require('pg/lib/defaults.js');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

module.exports = pool;