import pg from 'pg';
const { Pool } = pg;

// Postgres DB setup

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.on('error', (err) => {
    console.log('Unexpected error on client', err);
});

export default { query: (text, params) => pool.query(text, params) };