const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'pokemon_token',
  password: 'postgree',
  port: 5432,
});

const query = async (text, params) => {
  return await pool.query(text, params);
};


module.exports = query;