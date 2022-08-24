const express = require('express');
const connectDatabase = require('./db/database')
const config = require('./config')
const scheduler = require('./scheduler')
const dotenv = require('dotenv');

scheduler.initCrons(config)

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connecting to Database
connectDatabase();

//connecting to env file
dotenv.config();

app.get('/', (req, res) => {
   res.send('scheduler API');
 });

 const port = process.env.PORT || 5000;
 app.listen(port, () => {
   console.log(`Serve at http://localhost:${port}`);
 });