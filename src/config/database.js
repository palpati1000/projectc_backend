import pg from 'pg';
const { Pool } = pg;

// Postgres DB setup
// const pool = new Pool({
//     user: process.env.projetC_DB_USER,
//     host: process.env.projetC_DB_HOST,
//     database: process.env.projetC_DB_NAME,
//     password: process.env.projetC_DB_PASSWORD,
//     port: process.env.projectC_DB_PORT,
// });
//
// pool.on('error', (err) => {
//     console.log('Unexpected error on client', err);
// });
//
// export default { query: (text, params) => pool.query(text, params) };
