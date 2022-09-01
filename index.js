const express = require('express');
const connectDatabase = require('./db/database')
const dotenv = require('dotenv');
const cookieparser = require('cookie-parser');
const userRouter = require('./routers/userRouter');
//const cron = require('node-cron');

const app = express()

app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);
//connecting to Database
connectDatabase();

//connecting to env file
dotenv.config();
/*
var someDate = new Date();
var numberOfDaysToAdd = 3;
var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
//console.log(new Date(result).getMonth())// added a certain nuber of days
//var dd =new Date(result).getDate()// added date
//var mm =new Date(result).getMonth()// added date

cron.schedule(`0 0 ${dd} ${mm} *`, () => {
  console.log(new Date(result))// added a certain number of days
  console.log(new Date())//today
});
*/

app.get('/', (req, res) => {
  res.send('scheduler API');
});
const port = process.env.PORT || 5000;
 app.listen(port, () => {
   console.log(`Serve at http://localhost:${port}`);
});