const express = require('express');
const connectDatabase = require('./db/database')
const config = require('./config')
const scheduler = require('./scheduler')
const dotenv = require('dotenv');
const cookieparser = require('cookie-parser');
const userRouter = require('./routers/userRouter');

scheduler.initCrons(config)

const app = express()

app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);
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