//import 'dotenv/config.js'
import express from 'express';
import cors from 'cors';
import registerRoutes from './src/routes/index.js';

// console.log(process.env);

const app = express();
const router = express.Router();

registerRoutes(router);

app.use(cors());
app.use(express.json());
app.use('/api', router);

// Add a route for the root path
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

app.listen(8080, () => {
    console.log('Server started running on port 8080');
});

// Postgres@1